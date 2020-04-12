import React, { useState, useEffect } from "react";
import { AiOutlineRedo } from "react-icons/ai";
import Tile from "./components/Tile";
import styled from "styled-components";
import Sudoku from "./lib/Sudoku";
import Board from "./components/Board";
import useSudoku from "./lib/useSudoku";
import CellComponent from "./components/Cell";
import CellOption from "./components/CellOption";

const BoardShape = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 540px;
  height: 540px;
  margin: 30px auto;
  border: 1px solid black;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Reset = styled(AiOutlineRedo)`
  :hover {
    transform: scale(1.1);
  }
`;

function App() {
  const game = useSudoku();

  const [selected, select] = useState(game.getSelected());
  const [options, setOptions] = useState<number[]>();

  console.log(game.getSelected());
  console.log(game.getTiles());

  console.log(options);

  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          cursor: "pointer",
        }}
      >
        <Reset
          size="2rem"
          onClick={() => {
            game.initBoard();
            select(undefined);
            setOptions(undefined);
          }}
        />
      </div>
      <BoardShape>
        {game.getTiles().map((tile) => {
          let tileCells = [];
          for (let key in tile.cells) {
            let cell = tile.cells[key];
            const cellComponent = (
              <CellComponent
                value={cell.value}
                isFixed={cell.isFixed}
                pos={cell.pos}
                updateValue={(pos, newValue) =>
                  game.setCellValue(pos, newValue)
                }
                selected={selected}
                selectCell={() => {
                  game.selectCell(cell.pos);
                  select(game.getSelected());
                  setOptions(game.getOptions());
                }}
              />
            );
            tileCells.push(cellComponent);
          }
          return <Tile cells={tileCells} />;
        })}
      </BoardShape>
      <Options>
        {options && options.length > 0 ? (
          options.map((option) => (
            <CellOption
              option={option}
              selected={selected}
              updateValue={(pos, newValue) => {
                game.setCellValue(pos, newValue);
                setOptions(game.getOptions());
              }}
            />
          ))
        ) : (
          <h3>Select a Cell</h3>
        )}
      </Options>
    </React.Fragment>
  );
}

export default App;

import React from "react";
import { Cell, FixedCell, PlayableCell } from "../Cell/Cell";
import styled from "styled-components";

// Tile is a 3x3 grid of cells
// the board will contain a 3x3 grid of tiles
type Props = {
  cells: Cell[];
  selectedCell?: [number, number, number];
  selectCell: React.Dispatch<
    React.SetStateAction<[number, number, number] | undefined>
  >;
  neighbors?: [[number, number, number]];
  setNeighbors: React.Dispatch<
    React.SetStateAction<[[number, number, number]] | undefined>
  >;
};

const TileGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid black;
`;

export default function Tile({
  cells,
  selectedCell,
  selectCell,
  neighbors,
  setNeighbors,
}: Props) {
  const tileCells = cells.map((cell: Cell) => {
    return cell.isFixed ? (
      <FixedCell
        value={cell.value}
        pos={cell.pos}
        key={`${cell.pos[0]},${cell.pos[1]},${cell.pos[2]}`}
        selectedCell={selectedCell}
        selectCell={selectCell}
        setNeighbors={setNeighbors}
      />
    ) : (
      <PlayableCell
        value={cell.value}
        pos={cell.pos}
        selectedCell={selectedCell}
        selectCell={selectCell}
        neighbors={neighbors}
        setNeighbors={setNeighbors}
        key={`${cell.pos[0]},${cell.pos[1]},${cell.pos[2]}`}
      />
    );
  });

  return <TileGrid>{tileCells}</TileGrid>;
}

import React, { useState } from "react";
import styled from "styled-components";
import Tile from "../Tile/Tile";
import { Cell } from "../Cell/Cell";

// index: tile number, arr[index]: tiles that may contain neighbors
const tileNeighbors: number[][] = [
  [0, 1, 2, 3, 6],
  [0, 1, 2, 4, 7],
  [0, 1, 2, 5, 8],
  [0, 3, 4, 5, 6],
  [1, 3, 4, 5, 7],
  [2, 3, 4, 5, 8],
  [0, 3, 6, 7, 8],
  [1, 4, 7, 6, 8],
  [2, 5, 8, 6, 7],
];

type Props = {
  board: string;
  solution: string;
};

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);

  width: 540px;
  height: 540px;
  margin: 100px auto;

  border: 1px solid black;
`;

export default function Board({ board, solution }: Props) {
  const [selectedCell, selectCell] = useState<[number, number, number]>();

  // array of positions
  const [neighbors, setNeighbors] = useState<
    [[number, number, number]] | undefined
  >();

  function parseBoardString() {
    // tile0 = [0,1,2], [9,10,11], [18,19,20]
    // tile1 = [3,4,5], [12,13,14], [21,22,23]
    // tile2 = [6,7,8], [15,16,17], [24,25,26]
    // 3 9
    // 4 12
    // 5 15
    // 6 18
    // 7 21
    // 8 24
    // tiles = [tile0, tile1, tile2, ..., tile8 ]

    let tiles: number[][] = [];

    // for (let tileRow: number = 0; tileRow < 2; tileRow++) {
    //   for (let i: number = tileRow * 1; i < 27; i += 3) {}
    // }

    for (let i: number = 0; i < 61; i += 3) {
      if (i === 9) i = 27;
      else if (i === 36) i = 54;

      let tile = [
        // row 1
        parseInt(board[i], 10),
        parseInt(board[i + 1], 10),
        parseInt(board[i + 2], 10),

        // row 2
        parseInt(board[i + 9], 10),
        parseInt(board[i + 10], 10),
        parseInt(board[i + 11], 10),

        // row 3
        parseInt(board[i + 18], 10),
        parseInt(board[i + 19], 10),
        parseInt(board[i + 20], 10),
      ];

      tiles.push(tile);
    }

    // console.log(tiles);
    return tiles;
  }

  function getRow(num: number): number {
    if (num < 3) {
      return 0;
    } else if (num > 2 && num < 6) {
      return 1;
    } else {
      return 2;
    }
  }

  function getCol(num: number): number {
    if (num === 0 || num === 3 || num === 6) {
      return 0;
    } else if (num === 1 || num === 4 || num === 7) {
      return 1;
    } else {
      return 2;
    }
  }

  function generateTiles(tiles: number[][]) {
    return tiles.map((tile, index) => {
      const tileIndex = index;
      const tileCells: Cell[] = tile.map((value, _index) => {
        const row: number = getRow(_index);
        const col: number = getCol(_index);
        const cell: Cell = {
          isFixed: value !== 0,
          value: value,
          pos: [tileIndex, row, col],
        };

        return cell;
      });
      return (
        <Tile
          cells={tileCells}
          selectedCell={selectedCell}
          selectCell={selectCell}
          neighbors={neighbors}
          setNeighbors={setNeighbors}
          key={index}
        />
      );
    });
  }

  const tiles = generateTiles(parseBoardString());
  // console.log(tiles);

  if (selectedCell) {
    console.log(selectedCell);
  }

  return <GameBoard>{tiles}</GameBoard>;
}

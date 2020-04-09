import React, { useState } from "react";
import styled from "styled-components";

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

export type Cell = {
  isFixed: boolean;
  value: number;

  // position in the board [tile, row, col]
  pos: [number, number, number];
};

type Props = {
  value: number;
  pos: [number, number, number];

  selectedCell?: [number, number, number];
  selectCell: React.Dispatch<
    React.SetStateAction<[number, number, number] | undefined>
  >;
  neighbors?: [[number, number, number]];
  setNeighbors: React.Dispatch<
    React.SetStateAction<[[number, number, number]] | undefined>
  >;
};

const CellShape = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${(props: { shaded: boolean }) =>
    props.shaded ? "rgba(0, 0, 0, 0.25)" : "white"};

  :hover {
    background-color: rgba(147, 112, 219, 0.25);
  }
`;

const CellOverlay = styled.div`
  display: flex;
  ${(props: { selected: boolean; neighbor: boolean }) => {
    const styleSelected = `border: ${
      props.selected ? "3px solid rgba(147, 112, 219)" : "1px solid grey"
    };`;

    const neighborStyle = `background-color: ${
      props.neighbor ? "rgba(147, 112, 219, .25)" : ""
    };`;

    // console.log(styleSelected + neighborStyle);

    return styleSelected + neighborStyle;
  }};

  width: calc(100% - 3px);
  height: calc(100% - 3px);
  align-items: center;
  justify-content: center;
`;

// const CellShapePlayable = styled.div`
//   height: 100%;
//   display: grid;
//   grid-template:
//     "s1 s2 s3"
//     "s4 s5 s6"
//     "s7 s8 s9";
// `;

const CellValue = styled.p`
  font-weight: ${(props: { bold: boolean }) =>
    props.bold ? "bolder" : "normal"};
  margin: 0;
  font-size: 24px;
`;

export function FixedCell({ value, pos, selectedCell }: Props) {
  return (
    <CellShape shaded={true} key={`${pos}`}>
      <CellOverlay selected={false} neighbor={false}>
        <CellValue bold={true}>{value}</CellValue>
      </CellOverlay>
    </CellShape>
  );
}

export function PlayableCell({
  value,
  pos,
  selectCell,
  selectedCell,
  neighbors,
  setNeighbors,
}: Props) {
  // const [currentValue, setValue] = useState(value);

  function generateNeighbors(neighborTiles: number[]) {}

  function getTilesNext(tile: number) {
    const adjTiles = [
      [1, 2],
      [0, 2],
      [0, 1],
      [4, 5],
      [3, 5],
      [3, 4],
      [7, 8],
      [6, 8],
      [6, 7],
    ];

    return adjTiles[tile];
  }

  function getTilesUnder(tile: number) {
    const adjTiles = [
      [3, 6],
      [4, 7],
      [5, 8],
      [0, 6],
      [1, 7],
      [2, 8],
      [0, 3],
      [1, 7],
      [2, 8],
    ];

    return adjTiles[tile];
  }

  // function findNeighbors(
  //   selectedPos: [number, number, number]
  // ): [[number, number, number]] {
  //   let neighbors = [];

  //   const selectedTile = selectedPos[0];
  //   const selectedRow = selectedPos[1];
  //   const selectedCol = selectedPos[2];

  //   const adjacentTiles = getTilesNext(selectedTile);
  //   const underTiles = getTilesUnder(selectedTile);

  //   console.log(`next: ${adjacentTiles}\nunder: ${underTiles}`);

  //   // get neighbors in selectedTile first

  //   return [[1, 2, 3]];
  // }

  function isNeighbor(): boolean {
    let neighbors = [];

    if (!selectedCell) {
      return false;
    }

    const selectedTile = selectedCell[0];
    const selectedRow = selectedCell[1];
    const selectedCol = selectedCell[2];

    const adjacentTiles = getTilesNext(selectedTile);
    const underTiles = getTilesUnder(selectedTile);

    console.log(`next: ${adjacentTiles}\nunder: ${underTiles}`);

    // get neighbors in selectedTile first
    if (pos[0] === selectedTile) {
      if (selectedRow === pos[1]) {
        return true;
      }

      if (selectedCol === pos[2]) {
        return true;
      }
    }

    for (let i = 0; i < adjacentTiles.length; i++) {
      if (pos[0] === adjacentTiles[i] && pos[1] === selectedRow) {
        // console.log(`@ tile ${adjacentTiles[i]}: ${pos[1]} === ${selectedRow}`);
        return true;
      }
    }

    for (let i = 0; i < underTiles.length; i++) {
      if (pos[0] === underTiles[i] && pos[2] === selectedCol) {
        // console.log(`@ tile ${underTiles[i]}: ${pos[2]} === ${selectedCol}`);
        return true;
      }
    }

    return false;
  }

  function isSelected(): boolean {
    if (!selectedCell) {
      return false;
    } else {
      const selectedTile = selectedCell[0];
      const selectedRow = selectedCell[1];
      const selectedCol = selectedCell[2];

      if (
        selectedTile === pos[0] &&
        selectedRow === pos[1] &&
        selectedCol === pos[2]
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  const selected = isSelected();
  const amNeighbor = isNeighbor();

  return (
    <CellShape
      shaded={false}
      key={`${pos}`}
      onClick={() => {
        selectCell(pos);
        // const neighbors = findNeighbors(pos);
        // setNeighbors();
      }}
    >
      <CellOverlay selected={selected} neighbor={amNeighbor}>
        <CellValue bold={true}>{value !== 0 ? value : ""}</CellValue>
      </CellOverlay>
    </CellShape>
  );
}

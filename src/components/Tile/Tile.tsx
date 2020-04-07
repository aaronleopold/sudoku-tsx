import React from "react";
import { Cell, FixedCell, PlayableCell } from "../Cell/Cell";
import styled from "styled-components";

// Tile is a 3x3 grid of cells
// the board will contain a 3x3 grid of tiles
type Props = {
  cells: Cell[];
};

const TileGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid black;
`;

export default function Tile({ cells }: Props) {
  const tileCells = cells.map((cell: Cell) => {
    return cell.isFixed ? (
      <FixedCell
        value={cell.value}
        key={`${cell.pos[0]},${cell.pos[1]},${cell.pos[2]}`}
      />
    ) : (
      <PlayableCell
        value={cell.value}
        key={`${cell.pos[0]},${cell.pos[1]},${cell.pos[2]}`}
      />
    );
  });

  return <TileGrid>{tileCells}</TileGrid>;
}

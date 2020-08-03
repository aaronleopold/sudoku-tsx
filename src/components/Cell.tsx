import React, { useState } from "react";
import styled from "styled-components";
import { Cell } from "../types/types";

type Props = {
  value: number;
  isFixed: boolean;
  isNeighbor: boolean;
  pos: [number, number];
  selected: boolean;

  updateValue(pos: [number, number], newValue: number): void;
  selectCell(pos: [number, number]): void;
};

const CellShapeFixed = styled.div`
  height: calc(100% - 1px);
  width: calc(100% - 1px);
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template:
    "s1 s2 s3"
    "s4 s5 s6"
    "s7 s8 s9";

  background-color: lightgrey;
  border: 1px solid grey;
`;

type CellShapeProps = {
  selected_cell: boolean;
  isNeighbor: boolean;
};

const CellShape = styled.div`
  height: calc(100% - 1px);
  width: calc(100% - 1px);
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template:
    "s1 s2 s3"
    "s4 s5 s6"
    "s7 s8 s9";

  background-color: ${({ selected_cell, isNeighbor }: CellShapeProps) =>
    selected_cell
      ? "rgba(147, 112, 219, 0.35)"
      : isNeighbor
      ? "rgba(147, 112, 219, 0.15)"
      : "#fff"};

  :hover {
    background-color: rgba(147, 112, 219, 0.25);
  }
  border: 1px solid grey;
  cursor: pointer;
`;
const CellValue = styled.p``;

export default function CellComponent({
  value,
  isFixed,
  isNeighbor,
  pos,
  selected,
  updateValue,
  selectCell,
}: Props) {
  return isFixed ? (
    <CellShapeFixed>
      <CellValue>{value}</CellValue>
    </CellShapeFixed>
  ) : (
    <CellShape
      selected_cell={selected}
      isNeighbor={isNeighbor}
      onClick={() => {
        selectCell(pos);
        // updateValue(pos, 5);
      }}
    >
      <CellValue>{value !== 0 ? value : ""}</CellValue>
    </CellShape>
  );
}

import React, { useState } from "react";
import styled from "styled-components";
import { Cell } from "../types/types";

type Props = {
  value: number;
  isFixed: boolean;
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

  background-color: ${(props: CellShapeProps) =>
    props.selected_cell ? "rgba(147, 112, 219, 0.25)" : "#fff"};

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
      onClick={() => {
        selectCell(pos);
        // updateValue(pos, 5);
      }}
    >
      <CellValue>{value !== 0 ? value : ""}</CellValue>
    </CellShape>
  );
}

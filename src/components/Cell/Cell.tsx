import React from "react";
import styled from "styled-components";

export type Cell = {
  isFixed: boolean;
  value: number;

  // position in the board [tile, row, col]
  pos: [number, number, number];
};

type Props = {
  value: number;
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

export function FixedCell({ value }: Props) {
  return (
    <CellShape shaded={true}>
      <CellValue bold={true}>{value}</CellValue>
    </CellShape>
  );
}

export function PlayableCell({ value }: Props) {
  return (
    <CellShape shaded={false}>
      <CellValue bold={true}></CellValue>
    </CellShape>
  );
}

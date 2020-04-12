import React from "react";
import styled from "styled-components";

type Props = {
  cells: JSX.Element[];
};

const TileShape = styled.div`
  display: grid;
  z-index: 100;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid black;
`;

export default function Tile({ cells }: Props) {
  return <TileShape>{cells}</TileShape>;
}

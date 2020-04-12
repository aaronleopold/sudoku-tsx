import React from "react";
import { Tile } from "../types/types";
import styled from "styled-components";

type Props = {
  tiles: Tile[] | undefined;
};

const BoardShape = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 540px;
  height: 540px;
  margin: 100px auto;
  border: 1px solid black;
`;

export default function Board({ tiles }: Props) {
  function renderTiles() {}

  return <BoardShape></BoardShape>;
}

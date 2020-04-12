import React from "react";
import styled from "styled-components";
import { Cell } from "../types/types";

type Props = {
  option: number;
  selected: Cell | undefined;
  updateValue(pos: [number, number, number], newValue: number): void;
};

const OptionValue = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: grey;
  cursor: pointer;
`;

export default function CellOption({ option, selected, updateValue }: Props) {
  return (
    <OptionValue
      onClick={() => {
        if (selected) {
          updateValue(selected.pos, option);
        } else {
          console.log("why");
        }
      }}
    >
      {option}
    </OptionValue>
  );
}

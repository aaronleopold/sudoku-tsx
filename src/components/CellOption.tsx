import React from "react";
import styled from "styled-components";
import { Cell } from "../types/types";

type CellOptionProps = {
  option: number;
  selected: Cell | undefined;
  updateValue(pos: [number, number, number], newValue: number): void;
};

type ClearProps = {
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

export default function CellOption({
  option,
  selected,
  updateValue,
}: CellOptionProps) {
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

export function ClearOption({ selected, updateValue }: ClearProps) {
  return (
    <OptionValue
      onClick={() => {
        if (selected) {
          updateValue(selected.pos, 0);
        } else {
          console.log("why");
        }
      }}
    >
      X
    </OptionValue>
  );
}

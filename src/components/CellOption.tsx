import React from "react";
import styled from "styled-components";
import { Cell } from "../types/types";

type CellOptionProps = {
  option: number;
  selected: Cell | undefined;
  updateValue(pos: [number, number], newValue: number): void;
};

type ClearProps = {
  selected: Cell | undefined;
  updateValue(pos: [number, number], newValue: number): void;
};

const OptionValue = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  margin: 0.5rem;
  border-radius: 50%;
  background-color: lightgrey;
  border: 1px solid gray;
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
      <svg
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </OptionValue>
  );
}

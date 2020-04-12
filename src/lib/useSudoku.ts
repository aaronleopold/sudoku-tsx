//1:39
import { useState, useEffect, useRef } from "react";
import { puzzle } from "./dummyBoard";
import Sudoku from "./Sudoku";
import { Tile } from "../types/types";

// TODO: add click handler
export default function useSudoku(): Sudoku {
  const gameRef = useRef<Sudoku>();

  if (!gameRef.current) {
    gameRef.current = new Sudoku(puzzle);
  }

  return gameRef.current;
}

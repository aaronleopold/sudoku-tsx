import { Cell, Tile } from "../types/types";
import {
  tileNeighbors,
  internalNeighbors,
  adjNeighbors,
  vertNeighbors,
} from "./relationships";

export default class Sudoku {
  private puzzleString = "";
  private tiles: Tile[] = [];
  private selectedCell: Cell | undefined = undefined;
  private selectedNeighbors: Map<[number, number], boolean> = new Map();

  /**
   * @param puzzleString string representing the sudoku puzzle
   */
  public constructor(puzzleString: string) {
    // created pub fn for reusability
    this.puzzleString = puzzleString;
    this.initBoard();
  }

  private getRow(num: number): number {
    if (num < 3) {
      return 0;
    } else if (num > 2 && num < 6) {
      return 1;
    } else {
      return 2;
    }
  }

  private getCol(num: number): number {
    if (num === 0 || num === 3 || num === 6) {
      return 0;
    } else if (num === 1 || num === 4 || num === 7) {
      return 1;
    } else {
      return 2;
    }
  }

  /**
   * @description Takes puzzle string and parses into tiles
   * @returns A psuedo Tile array, to be used creating real Tile type
   */
  private parseBoardString(puzzleString: string) {
    let tiles: number[][] = [];

    for (let i: number = 0; i < 61; i += 3) {
      if (i === 9) i = 27;
      else if (i === 36) i = 54;

      let tile = [
        // row 1
        parseInt(puzzleString[i], 10),
        parseInt(puzzleString[i + 1], 10),
        parseInt(puzzleString[i + 2], 10),

        // row 2
        parseInt(puzzleString[i + 9], 10),
        parseInt(puzzleString[i + 10], 10),
        parseInt(puzzleString[i + 11], 10),

        // row 3
        parseInt(puzzleString[i + 18], 10),
        parseInt(puzzleString[i + 19], 10),
        parseInt(puzzleString[i + 20], 10),
      ];

      tiles.push(tile);
    }

    return tiles;
  }

  public initBoard() {
    const raw_tiles = this.parseBoardString(this.puzzleString);
    const _tiles = raw_tiles.map((tile, index) => {
      const tileIndex = index;
      let tileCells: Cell[] = [];

      tile.forEach((value, index) => {
        let cell: Cell = {
          isFixed: value !== 0,
          value: value,
          pos: [tileIndex, index],
        };

        tileCells.push(cell);
      });

      const currentTile: Tile = {
        cells: tileCells,
      };

      return currentTile;
    });

    this.tiles = _tiles;
  }

  public solve(solvedStr: string) {
    let tileIndex = 0;
    for (let i: number = 0; i < 61; i += 3) {
      if (i === 9) i = 27;
      else if (i === 36) i = 54;

      // row 1
      // parseInt(puzzleString[i], 10),
      // parseInt(puzzleString[i + 1], 10),
      // parseInt(puzzleString[i + 2], 10),

      this.setCellValue([tileIndex, 0], parseInt(solvedStr[i], 10));
      this.setCellValue([tileIndex, 1], parseInt(solvedStr[i + 1], 10));
      this.setCellValue([tileIndex, 2], parseInt(solvedStr[i + 2], 10));

      // row 2
      // parseInt(puzzleString[i + 9], 10),
      // parseInt(puzzleString[i + 10], 10),
      // parseInt(puzzleString[i + 11], 10),

      this.setCellValue([tileIndex, 3], parseInt(solvedStr[i + 9], 10));
      this.setCellValue([tileIndex, 4], parseInt(solvedStr[i + 10], 10));
      this.setCellValue([tileIndex, 5], parseInt(solvedStr[i + 11], 10));

      // row 3
      // parseInt(puzzleString[i + 18], 10),
      // parseInt(puzzleString[i + 19], 10),
      // parseInt(puzzleString[i + 20], 10),

      this.setCellValue([tileIndex, 6], parseInt(solvedStr[i + 18], 10));
      this.setCellValue([tileIndex, 7], parseInt(solvedStr[i + 19], 10));
      this.setCellValue([tileIndex, 8], parseInt(solvedStr[i + 20], 10));

      tileIndex += 1;
    }
  }

  public getInitialState(): string {
    return this.puzzleString;
  }

  /**
   * @description Converts self.tiles to a string of numbers
   * @returns String
   */
  public toString(): string {
    let board_string = "";

    /**
     * this.tiles = [
     *    [
     *      cell,cell,cell
     *      cell,cell,cell
     *      cell,cell,cell
     *    ],
     *    etc...
     * ]
     *
     *
     */

    let sudokuRow = 0;
    let sectionRow = 0;
    let tileStartingIndex = 0;
    let currentTile = 0;

    while (sudokuRow < 9) {
      if (sudokuRow > 0 && sudokuRow % 3 === 0) {
        currentTile += 3;
        sectionRow = 0;
        tileStartingIndex = 0;
      }

      let tileLeft = this.tiles[currentTile];
      let tileMiddle = this.tiles[currentTile + 1];
      let tileRight = this.tiles[currentTile + 2];

      // collect left tile cells
      for (let i = tileStartingIndex; i < tileStartingIndex + 3; i++) {
        board_string += tileLeft.cells[i].value;
      }

      // collect middle tile cells
      for (let i = tileStartingIndex; i < tileStartingIndex + 3; i++) {
        board_string += tileMiddle.cells[i].value;
      }

      // collect right tile cells
      for (let i = tileStartingIndex; i < tileStartingIndex + 3; i++) {
        board_string += tileRight.cells[i].value;
      }

      sudokuRow += 1;
      sectionRow += 1;
      tileStartingIndex += 3;
    }

    // rust library requires . for empty slots
    return board_string.replace(/0/g, ".");
  }

  /**
   * @description helper with rendering
   * @returns the array of tiles to be used for rendering
   */
  public getTiles() {
    return this.tiles;
  }

  /**
   * @description get object's selected cell
   * @returns this' current selected cell
   */
  public getSelected() {
    return this.selectedCell;
  }

  /**
   * @description get object's current neighbors
   * @returns this' neighbors to selected cell
   */
  public getNeighbors(): Map<[number, number], boolean> {
    return this.selectedNeighbors;
  }

  /**
   * @description helper with rendering
   * @returns the array of tiles to be used for rendering
   */
  public selectCell(pos: [number, number]) {
    const selectedTile = pos[0];

    if (
      this.selectedCell &&
      this.selectedCell.pos === this.tiles[selectedTile].cells[pos[1]].pos
    ) {
      this.selectedCell = undefined;
      this.selectedNeighbors.clear();
    } else {
      this.selectedCell = this.tiles[selectedTile].cells[pos[1]];
      this.setNeighbors(pos);
    }
  }

  /**
   * @description will set the value of selected cell
   * @param pos the position of the selected cell
   * @param newValue the new value for the selected cell
   */
  public setCellValue(pos: [number, number], newValue: number) {
    let targetTile = this.tiles[pos[0]];

    let targetCell = targetTile.cells[pos[1]];
    targetCell.value = newValue;
    // console.log(targetCell.value);
  }

  /**
   * @description determines whether pos2 is next to pos1
   * @param pos1 the index of current tile
   * @param pos2 the index of comparing tile
   * @returns boolean
   */
  private tileIsAdjacent(pos1: number, pos2: number): boolean {
    if (pos1 <= 2 && pos2 <= 2) return true;
    if (pos1 >= 3 && pos1 < 6 && pos2 > 2 && pos2 <= 5) return true;
    if (pos1 >= 6 && pos2 > 5 && pos2 <= 8) return true;

    // switch (pos1) {
    //   case 0:
    //     if (pos2 < 3) return true;
    //   case 1:
    //     if (pos2 === 0 || pos2 === 2) return true;
    //   case 2:
    //     if (pos2 === 0 || pos2 === 1) return true;
    // }

    return false;
  }

  /**
   * @description determines whether pos2 is above/below to pos1
   * @param pos1 the index of current tile
   * @param pos2 the index of comparing tile
   * @returns boolean
   */
  private tileIsVert(pos1: number, pos2: number): boolean {
    return Math.abs(pos1 - pos2) % 3 === 0;
  }

  /**
   * @description sets adjacent and perpendicular cells to selected
   * @param pos refers to current selected cell
   */
  private setNeighbors(pos: [number, number]) {
    this.selectedNeighbors.clear();

    let currentTile = pos[0];
    let cellIndex = pos[1];
    let neighboringTiles = tileNeighbors[currentTile];

    neighboringTiles.forEach((tileIndex) => {
      if (tileIndex === currentTile) {
        internalNeighbors[cellIndex].forEach((cindex) => {
          this.selectedNeighbors.set(
            this.tiles[tileIndex].cells[cindex].pos,
            true
          );
        });
      } else if (this.tileIsAdjacent(currentTile, tileIndex)) {
        adjNeighbors[cellIndex].forEach((cindex) => {
          this.selectedNeighbors.set(
            this.tiles[tileIndex].cells[cindex].pos,
            true
          );
        });
      } else if (this.tileIsVert(currentTile, tileIndex)) {
        vertNeighbors[cellIndex].forEach((cindex) => {
          this.selectedNeighbors.set(
            this.tiles[tileIndex].cells[cindex].pos,
            true
          );
        });
      }
    });
  }

  public getOptions() {
    if (!this.selectedCell) return [];

    const all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const selectedTile = this.tiles[this.selectedCell.pos[0]];
    const tileAsArr: number[] = [];
    for (let key in selectedTile.cells) {
      tileAsArr.push(selectedTile.cells[key].value);
    }

    const options = all.filter((num) => {
      return tileAsArr.indexOf(num) === -1;
    });

    // console.log(options);

    return options;
  }
}

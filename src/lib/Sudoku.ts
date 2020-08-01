import { Cell, Tile } from "../types/types";

const tileNeighbors: number[][] = [
  [0, 1, 2, 3, 6],
  [0, 1, 2, 4, 7],
  [0, 1, 2, 5, 8],
  [0, 3, 4, 5, 6],
  [1, 3, 4, 5, 7],
  [2, 3, 4, 5, 8],
  [0, 3, 6, 7, 8],
  [1, 4, 7, 6, 8],
  [2, 5, 8, 6, 7],
];

export default class Sudoku {
  private puzzleString = "";
  private tiles: Tile[] = [];
  private selectedCell: Cell | undefined = undefined;

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
        const row: number = this.getRow(index);
        const col: number = this.getCol(index);
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

    // for (let currentRow = 0; currentRow < 9; currentRow++) {
    //   if (currentRow >= 0 && currentRow <= 2) {
    //     let tileOne = this.tiles[0];
    //     let tileTwo = this.tiles[1];
    //     let tileThree = this.tiles[2];

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileOne.cells[i].value;
    //     }

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileTwo.cells[i].value;
    //     }

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileThree.cells[i].value;
    //     }
    //   } else if (currentRow >= 3 && currentRow <= 5) {
    //     let tileFour = this.tiles[3];
    //     let tileFive = this.tiles[4];
    //     let tileSix = this.tiles[5];

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileFour.cells[i].value;
    //     }

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileFive.cells[i].value;
    //     }

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileSix.cells[i].value;
    //     }
    //   } else {
    //     let tileSeven = this.tiles[6];
    //     let tileEight = this.tiles[7];
    //     let tileNine = this.tiles[0];

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileSeven.cells[i].value;
    //     }

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileEight.cells[i].value;
    //     }

    //     for (let i = 0; i < 3; i++) {
    //       board_string += tileNine.cells[i].value;
    //     }
    //   }
    // }

    return board_string.replace(/0/g, ".");
  }

  /**
   * @description helper with rendering
   * @returns the array of tiles to be used for rendering
   */
  public getTiles() {
    return this.tiles;
  }

  public getSelected() {
    return this.selectedCell;
  }

  public selectCell(pos: [number, number]) {
    const selectedTile = pos[0];

    if (
      this.selectedCell &&
      this.selectedCell.pos === this.tiles[selectedTile].cells[pos[1]].pos
    ) {
      this.selectedCell = undefined;
    } else {
      this.selectedCell = this.tiles[selectedTile].cells[pos[1]];
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
   * @description gets adjacent and perpendicular cells to selected
   * @param pos refers to current selected cell
   * @returns array of positions for neighboring cells to selected
   */
  public getNeighbors(pos: [number, number, number]) {}

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

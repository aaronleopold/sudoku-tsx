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

  public initBoard() {
    const raw_tiles = this.parseBoardString(this.puzzleString);
    const _tiles = raw_tiles.map((tile, index) => {
      const tileIndex = index;
      // const tileCells: Cell[] = tile.map((value, _index) => {
      //   const row: number = this.getRow(_index);
      //   const col: number = this.getCol(_index);
      //   const cell: Cell = {
      //     isFixed: value !== 0,
      //     value: value,
      //     pos: [tileIndex, row, col],
      //   };

      //   return cell;
      // });
      const tileCells: Record<string, Cell> = {};

      tile.forEach((value, _index) => {
        const row: number = this.getRow(_index);
        const col: number = this.getCol(_index);
        let cell: Cell = {
          isFixed: value !== 0,
          value: value,
          pos: [tileIndex, row, col],
        };

        tileCells[`${cell.pos}`] = cell;
      });

      const currentTile: Tile = {
        cells: tileCells,
      };

      return currentTile;
    });

    this.tiles = _tiles;
  }

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

  public selectCell(pos: [number, number, number]) {
    const selectedTile = pos[0];
    // console.log(this.tiles);
    // this.tiles[selectedTile].cells[`${pos}`];
    this.selectedCell = this.tiles[selectedTile].cells[`${pos}`];
  }

  /**
   * @description will set the value of selected cell
   * @param pos the position of the selected cell
   * @param newValue the new value for the selected cell
   */
  public setCellValue(pos: [number, number, number], newValue: number) {
    let targetTile = this.tiles[pos[0]];

    let targetCell = targetTile.cells[`${pos}`];
    targetCell.value = newValue;
    console.log(targetCell.value);
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

    console.log(options);

    return options;
  }
}

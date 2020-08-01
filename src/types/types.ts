export type Cell = {
  isFixed: boolean;
  value: number;

  // pos : [tileIndex, index of cell in tile]
  pos: [number, number];
};

export type Tile = {
  cells: Cell[];
};

export type Board = {};

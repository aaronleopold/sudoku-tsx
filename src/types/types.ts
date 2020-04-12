export type Cell = {
  isFixed: boolean;
  value: number;
  pos: [number, number, number];
};

export type Tile = {
  // cells: Cell[];
  // available: number[]
  cells: Record<string, Cell>;
};

export type Board = {};

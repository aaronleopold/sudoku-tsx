# sudoku-tsx
This is an implementation of the game Sudoku in React. I plan to add an Electron client, as well as offloading some calculations (game state, board solver, etc) to WASM.

## Development
To get started, run the following commands at the project root:
```
yarn && yarn build:wasm-dev
yarn dev
```

`build:wasm-dev` will compile the rust code to `/src/wasm`.

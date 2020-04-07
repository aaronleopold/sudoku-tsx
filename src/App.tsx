import React, { useState, useEffect } from "react";
import Board from "./components/Board/Board";

type Puzzle = {
  board: string;
  solution: string;
};

function App() {
  const [puzzle, setPuzzle] = useState<Puzzle>();

  useEffect(() => {
    if (!puzzle) {
      // load dummy board
      const _puzzle = {
        board:
          "203108000800000742900720803098073060060000439031960070007805300000030607080097500",
        solution:
          "273148956816359742945726813498273165762581439531964278627815394159432687384697521",
      };

      setPuzzle(_puzzle);
    }
  }, [puzzle]);

  return puzzle ? (
    <Board board={puzzle?.board} solution={puzzle?.solution} />
  ) : (
    <div> "Loading..."</div>
  );
}

export default App;

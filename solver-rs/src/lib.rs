mod utils;
use wasm_bindgen::prelude::*;
use sudoku::Sudoku;


// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn solve(s: &str);
// }

#[wasm_bindgen]
pub fn solve(puzzle: &str) -> String {

    // Sudokus can be created from &str's in both block or line formats or directly from bytes.
    // here, an example in line format

    let sudoku = Sudoku::from_str_line(puzzle).unwrap();

    // Solve, print or convert the sudoku to another format
    if let Some(solution) = sudoku.solve_unique() {
        // print the solution in line format
        // println!("{}", solution);

        // or return it as a byte array
        // let cell_contents: [u8; 81] = solution.to_bytes();

        return solution.to_string();
    }

    return String::default();
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn it_works() {
        assert_ne!("", solve("2.31.8...8.....7429..72.8.3.98.73.6..6....439.3196..7...78.53......3.6.7.8..975.."))
    }
}

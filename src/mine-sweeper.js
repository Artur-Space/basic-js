const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Initialize the result matrix with zeros
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));

  // Directions for neighbors: up, down, left, right, and diagonals
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // up, down, left, right
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // diagonals
  ];

  // Iterate through each cell of the matrix
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // If the current cell is a mine, leave it as is
      if (matrix[i][j]) {
        result[i][j] = 1; // mark the mine cell
        continue;
      }

      // Count the number of mines in neighboring cells
      let mineCount = 0;
      for (let [dx, dy] of directions) {
        const newRow = i + dx;
        const newCol = j + dy;

        // Check if the neighbor is within bounds and is a mine
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          matrix[newRow][newCol]
        ) {
          mineCount++;
        }
      }

      // Set the mine count for the current cell
      result[i][j] = mineCount;
    }
  }

  return result;
}

module.exports = {
  minesweeper,
};

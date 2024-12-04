import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function part1() {
  const word = 'XMAS';
  const numRows = lines.length;
  const numCols = lines[0].length;
  let count = 0;

  const directions = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
  ];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      for (const dir of directions) {
        let found = true;
        for (let k = 0; k < word.length; k++) {
          const newRow = row + dir.dx * k;
          const newCol = col + dir.dy * k;

          if (
            newRow < 0 ||
            newRow >= numRows ||
            newCol < 0 ||
            newCol >= numCols ||
            lines[newRow][newCol] !== word[k]
          ) {
            found = false;
            break;
          }
        }
        if (found) {
          count++;
        }
      }
    }
  }

  return count;
}

function part2() {
  const numRows = lines.length;
  const numCols = lines[0].length;
  let count = 0;

  for (let i = 1; i < numRows - 1; i++) {
    for (let j = 1; j < numCols - 1; j++) {
      const positions = [
        [i - 1, j - 1],
        [i + 1, j + 1],
        [i + 1, j - 1],
        [i - 1, j + 1],
      ];

      if (
        positions.every(
          ([row, col]) => row >= 0 && row < numRows && col >= 0 && col < numCols
        )
      ) {
        const centerChar = lines[i][j];

        const diag1Letters =
          lines[i - 1][j - 1] + centerChar + lines[i + 1][j + 1];

        const diag2Letters =
          lines[i + 1][j - 1] + centerChar + lines[i - 1][j + 1];

        const validSequences = ['MAS', 'SAM'];

        if (
          validSequences.includes(diag1Letters) &&
          validSequences.includes(diag2Letters)
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

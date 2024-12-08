import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

let grid = lines.map((line) => line.split(''));
let rows = grid.length;
let cols = grid[0].length;

function part1() {
  let antinodes = new Set();
  let antennas = new Map();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] !== '.') {
        if (antennas.has(grid[i][j])) {
          antennas.set(grid[i][j], [
            ...antennas.get(grid[i][j]),
            { x: i, y: j },
          ]);
        } else {
          antennas.set(grid[i][j], [{ x: i, y: j }]);
        }
      }
    }
  }

  for (let [key, value] of antennas) {
    const n = value.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        // antinode on A
        let A_x = 2 * value[i].x - value[j].x;
        let A_y = 2 * value[i].y - value[j].y;
        if (A_x >= 0 && A_x < rows && A_y >= 0 && A_y < cols) {
          antinodes.add(`${A_x},${A_y}`);
        }
        // antinode on B
        let B_x = 2 * value[j].x - value[i].x;
        let B_y = 2 * value[j].y - value[i].y;
        if (B_x >= 0 && B_x < rows && B_y >= 0 && B_y < cols) {
          antinodes.add(`${B_x},${B_y}`);
        }
      }
    }
  }

  return antinodes.size;
}

function gcd(a, b) {
  if (b === 0) return Math.abs(a);
  return gcd(b, a % b);
}

function part2() {
  let antinodes = new Set();
  let antennas = new Map();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] !== '.') {
        if (antennas.has(grid[i][j])) {
          antennas.set(grid[i][j], [
            ...antennas.get(grid[i][j]),
            { x: i, y: j },
          ]);
        } else {
          antennas.set(grid[i][j], [{ x: i, y: j }]);
        }
      }
    }
  }

  for (let [key, values] of antennas) {
    const n = values.length;
    if (n < 2) {
      continue;
    }

    for (let val of values) {
      antinodes.add(`${val.x},${val.y}`);
    }

    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        let A = values[i];
        let B = values[j];
        let dx = B.x - A.x;
        let dy = B.y - A.y;
        let g = gcd(dx, dy);
        dx = dx / g;
        dy = dy / g;

        // Move forward from A
        let rr = A.x + dx;
        let cc = A.y + dy;
        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
          antinodes.add(`${rr},${cc}`);
          rr += dx;
          cc += dy;
        }

        // Move backward from A
        rr = A.x - dx;
        cc = A.y - dy;
        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols) {
          antinodes.add(`${rr},${cc}`);
          rr -= dx;
          cc -= dy;
        }
      }
    }
  }

  return antinodes.size;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

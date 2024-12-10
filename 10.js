import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

let grid = lines.map((l) => l.split('').map(Number));

function part1() {
  let starts = [];
  grid.map((row, x) =>
    row.map((cell, y) => {
      if (cell === 0) starts.push([x, y]);
    })
  );

  let trailheads = 0;

  for (let start of starts) {
    let a = { x: start[0], y: start[1], steps: 0 };
    let q = [a];
    let reachable = new Set();
    while (q.length > 0) {
      let { x, y, steps } = q.shift();
      if (steps === 9) {
        reachable.add(`${x},${y}`);
        continue;
      }
      for (let [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length)
          continue;
        let cell = grid[nx][ny];
        if (cell !== grid[x][y] + 1) continue;
        q.push({ x: nx, y: ny, steps: steps + 1 });
      }
    }

    trailheads += reachable.size;
  }

  return trailheads;
}

function part2() {
  let starts = [];
  grid.map((row, x) =>
    row.map((cell, y) => {
      if (cell === 0) starts.push([x, y]);
    })
  );

  let trailheads = 0;

  for (let start of starts) {
    let a = { x: start[0], y: start[1], steps: 0 };
    let q = [a];
    while (q.length > 0) {
      let { x, y, steps } = q.shift();
      if (steps === 9) {
        trailheads += 1;
      }
      for (let [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length)
          continue;
        let cell = grid[nx][ny];
        if (cell !== grid[x][y] + 1) continue;
        q.push({ x: nx, y: ny, steps: steps + 1 });
      }
    }
  }

  return trailheads;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

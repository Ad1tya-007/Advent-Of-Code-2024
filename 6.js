import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

const grid = lines.map((line) => line.split(''));

const findStart = () => {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '^') {
        grid[i][j] = '.';
        return { x: i, y: j, d: 'U' };
      }
    }
  }
};

const rows = grid.length;
const cols = grid[0].length;

const dir = {
  U: { x: -1, y: 0 },
  D: { x: 1, y: 0 },
  L: { x: 0, y: -1 },
  R: { x: 0, y: 1 },
};

const changeDir = (d) => {
  if (d === 'U') return 'R';
  if (d === 'D') return 'L';
  if (d === 'L') return 'U';
  if (d === 'R') return 'D';
};

let start = findStart();

function part1() {
  let curr = start;
  let visited = new Set();
  while (true) {
    let { x, y, d } = curr;
    visited.add(`${x},${y}`);
    const { x: dx, y: dy } = dir[d];
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) {
      break;
    }
    if (grid[nx][ny] === '#') {
      curr = { x, y, d: changeDir(d) };
    } else {
      curr = { x: nx, y: ny, d };
    }
  }

  return { visited };
}

function simulate() {
  let curr = start;
  let visited = new Set();
  while (true) {
    let { x, y, d } = curr;
    if (visited.has(`${x},${y},${d}`)) {
      return true;
    }
    visited.add(`${x},${y},${d}`);
    const { x: dx, y: dy } = dir[d];
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) {
      break;
    }
    if (grid[nx][ny] === '#') {
      curr = { x, y, d: changeDir(d) };
    } else {
      curr = { x: nx, y: ny, d };
    }
  }

  return false;
}

function part2() {
  const { visited } = part1();
  const points = Array.from(visited).map((point) => {
    const [x, y] = point.split(',').map(Number);
    return { x, y };
  });

  let ans = 0;
  for (let p of points) {
    const { x, y } = p;
    if (x === start.x && y === start.y) {
      continue;
    }

    grid[x][y] = '#';
    if (simulate()) {
      ans++;
    }
    grid[x][y] = '.';
  }

  return ans;
}

console.log('Part1:', part1().visited.size);
console.log('Part2:', part2());

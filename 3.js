import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function part1() {
  const content = fs.readFileSync('./input.txt', 'utf-8').trim();

  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let sum = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const x = parseInt(match[1], 10);
    const y = parseInt(match[2], 10);
    sum += x * y;
  }

  return sum;
}

function part2() {
  const content = fs.readFileSync('./input.txt', 'utf-8').trim();

  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

  let sum = 0;
  let mulEnabled = true;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const instruction = match[0];

    if (instruction === 'do()') {
      mulEnabled = true;
    } else if (instruction === "don't()") {
      mulEnabled = false;
    } else {
      if (mulEnabled) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        sum += x * y;
      }
    }
  }

  return sum;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

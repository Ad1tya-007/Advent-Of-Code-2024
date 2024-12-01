import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function part1() {
  let a = [];
  let b = [];

  for (let line of lines) {
    let [c, d] = line.split('   ').map(Number);
    a.push(c);
    b.push(d);
  }

  a = a.sort((a, b) => a - b);
  b = b.sort((a, b) => a - b);

  let ans = 0;

  for (let i = 0; i < a.length; i++) {
    ans += Math.abs(a[i] - b[i]);
  }

  return ans;
}

function part1_oneLiner() {
  return lines
    .map((l) => l.split('   ').map(Number))
    .reduce(
      ([a, b], [c, d]) => {
        a.push(c);
        b.push(d);
        return [a, b];
      },
      [[], []]
    )
    .map((arr) => arr.sort((x, y) => x - y))
    .reduce(
      (sum, arr, idx, arrays) =>
        idx ? arrays[0].reduce((s, x, i) => s + Math.abs(x - arr[i]), 0) : sum,
      0
    );
}

function part2() {
  let a = [];
  let b = [];

  for (let line of lines) {
    let [c, d] = line.split('   ').map(Number);
    a.push(c);
    b.push(d);
  }

  a = a.sort((a, b) => a - b);
  b = b.sort((a, b) => a - b);

  let frequencyMap = new Map();

  for (let num of b) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  let similarityScore = 0;

  for (let num of a) {
    if (frequencyMap.has(num)) {
      similarityScore += num * frequencyMap.get(num);
    }
  }

  return similarityScore;
}

function part2_oneLiner() {
  return lines
    .map((l) => l.split('   ').map(Number))
    .reduce(
      ([a, b], [c, d]) => {
        a.push(c);
        b.push(d);
        return [a, b];
      },
      [[], []]
    )
    .map((arr) => arr.sort((x, y) => x - y))
    .reduce((_, arr, idx, arrays) =>
      idx
        ? arrays[0].reduce(
            (sum, num) => sum + num * arr.filter((n) => n === num).length,
            0
          )
        : 0
    );
}

console.log('Part1:', part1());
console.log('Part2:', part2());
console.log('Part1 one liner:', part1_oneLiner());
console.log('Part2 one liner:', part2_oneLiner());

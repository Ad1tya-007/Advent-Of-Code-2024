import fs from 'fs';
let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function check(num, values) {
  let arr = [];
  function explore(index) {
    if (index === 0) {
      arr.push(values[index]);
      return explore(1);
    } else if (index < values.length) {
      const times = arr.length;
      for (let i = 0; i < times; i++) {
        const current = arr.shift();
        arr.push(current * values[index]);
        arr.push(current + values[index]);
      }
      return explore(index + 1);
    } else {
      for (let a of arr) {
        if (a === num) {
          return true;
        }
      }
      return false;
    }
  }
  return explore(0);
}

function part1() {
  let sum = 0;
  for (let line of lines) {
    let [number, values] = line.split(': ');
    number = parseInt(number);
    values = values.split(' ').map((v) => parseInt(v));
    if (check(number, values)) {
      sum += number;
    }
  }
  return sum;
}

function check2(num, values) {
  let arr = [];
  function explore(index) {
    if (index === 0) {
      arr.push(values[index]);
      return explore(1);
    } else if (index < values.length) {
      const times = arr.length;
      for (let i = 0; i < times; i++) {
        const current = arr.shift();
        arr.push(current * values[index]);
        arr.push(current + values[index]);
        arr.push(parseInt('' + current + values[index]));
      }
      return explore(index + 1);
    } else {
      for (let a of arr) {
        if (a === num) {
          return true;
        }
      }
      return false;
    }
  }
  return explore(0);
}

function part2() {
  let sum = 0;
  for (let line of lines) {
    let [number, values] = line.split(': ');
    number = parseInt(number);
    values = values.split(' ').map((v) => parseInt(v));
    if (check2(number, values)) {
      sum += number;
    }
  }
  return sum;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

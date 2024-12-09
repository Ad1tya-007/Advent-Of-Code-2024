import fs from 'fs';

let lines = fs.readFileSync('./input.txt', 'utf-8').match(/.{1,2}/g);

function part1() {
  let s = [];
  let id = 0;
  for (let l of lines) {
    if (l.length === 1) {
      let a = parseInt(l);
      for (let i = 0; i < a; i++) {
        s.push(id);
      }
      id++;
    } else {
      let [a, b] = l.split('');
      a = parseInt(a);
      b = parseInt(b);
      for (let i = 0; i < a; i++) {
        s.push(id);
      }
      id++;
      for (let i = 0; i < b; i++) {
        s.push('.');
      }
    }
  }

  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    if (s[l] !== '.') {
      l++;
      continue;
    }
    if (s[r] === '.') {
      r--;
      continue;
    }
    [s[l], s[r]] = [s[r], s[l]];
    l++;
    r--;
  }

  let cs = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '.') {
      cs += i * s[i];
    }
  }

  return cs;
}

function part2() {
  let s = [];
  let id = 0;
  for (let l of lines) {
    if (l.length === 1) {
      let a = parseInt(l);
      for (let i = 0; i < a; i++) {
        s.push(id);
      }
      id++;
    } else {
      let [a, b] = l.split('');
      a = parseInt(a);
      b = parseInt(b);
      for (let i = 0; i < a; i++) {
        s.push(id);
      }
      id++;
      for (let i = 0; i < b; i++) {
        s.push('.');
      }
    }
  }

  let totalFiles = id;
  for (let currID = totalFiles - 1; currID >= 0; currID--) {
    let start = -1;
    let end = -1;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === currID) {
        if (start === -1) start = i;
        end = i;
      } else if (start !== -1) {
        break;
      }
    }

    if (start === -1) continue;

    let len = end - start + 1;

    let bestStart = -1;
    for (let i = 0; i + len <= start; i++) {
      let good = true;
      for (let j = i; j < i + len; j++) {
        if (s[j] !== '.') {
          good = false;
          break;
        }
      }
      if (good) {
        bestStart = i;
        break;
      }
    }

    if (bestStart !== -1) {
      let blocks = s.slice(start, end + 1);
      for (let i = start; i <= end; i++) s[i] = '.';
      for (let i = 0; i < len; i++) s[bestStart + i] = blocks[i];
    }
  }

  let cs = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== '.') {
      cs += i * s[i];
    }
  }

  return cs;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

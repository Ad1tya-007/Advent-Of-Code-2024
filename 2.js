import fs from 'fs';

let lines = fs
  .readFileSync('./input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function isSafe(levels) {
  if (levels.length <= 1) {
    return true;
  }

  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    if (diff === 0) {
      return false;
    }

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    if (diff > 0) {
      isDecreasing = false;
    } else if (diff < 0) {
      isIncreasing = false;
    }
  }

  return isIncreasing || isDecreasing;
}

function part1() {
  let safeCount = 0;
  for (const line of lines) {
    const levels = line.trim().split(' ').map(Number);
    if (isSafe(levels)) {
      safeCount++;
    }
  }
  return safeCount;
}

function part2() {
  let safeCount = 0;
  for (const line of lines) {
    const levels = line.trim().split(' ').map(Number);

    if (isSafe(levels)) {
      safeCount++;
    } else {
      let isReportSafe = false;

      for (let i = 0; i < levels.length; i++) {
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));

        if (isSafe(modifiedLevels)) {
          safeCount++;
          isReportSafe = true;
          break;
        }
      }
    }
  }
  return safeCount;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

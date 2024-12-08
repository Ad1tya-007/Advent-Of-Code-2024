import fs from 'fs';
let lines = fs
  .readFileSync('./sample.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

let emptyLineIndex = lines.indexOf('');
let orderingRules = lines.slice(0, emptyLineIndex);
let updates = lines.slice(emptyLineIndex + 1);

let rules = orderingRules.map((line) => {
  let [X, Y] = line.split('|').map(Number);
  return [X, Y];
});

function part1() {
  let sum = 0;

  for (let update of updates) {
    let pages = update.split(',').map(Number);
    let pageIndex = new Map();
    for (let i = 0; i < pages.length; i++) {
      pageIndex.set(pages[i], i);
    }

    let valid = true;
    for (let [X, Y] of rules) {
      if (pageIndex.has(X) && pageIndex.has(Y)) {
        if (pageIndex.get(X) >= pageIndex.get(Y)) {
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      let middleIndex = Math.floor(pages.length / 2);
      let middlePage = pages[middleIndex];
      sum += middlePage;
    }
  }

  return sum;
}

function part2() {
  let sum = 0;

  for (let update of updates) {
    let pages = update.split(',').map(Number);
    let pageIndex = new Map();
    for (let i = 0; i < pages.length; i++) {
      pageIndex.set(pages[i], i);
    }

    let valid = true;
    for (let [X, Y] of rules) {
      if (pageIndex.has(X) && pageIndex.has(Y)) {
        if (pageIndex.get(X) >= pageIndex.get(Y)) {
          valid = false;
          break;
        }
      }
    }

    if (!valid) {
      let graph = new Map();
      let inDegree = new Map();

      for (let page of pages) {
        graph.set(page, []);
        inDegree.set(page, 0);
      }

      for (let [X, Y] of rules) {
        if (pageIndex.has(X) && pageIndex.has(Y)) {
          graph.get(X).push(Y);
          inDegree.set(Y, inDegree.get(Y) + 1);
        }
      }

      let queue = [];
      for (let [page, degree] of inDegree.entries()) {
        if (degree === 0) {
          queue.push(page);
        }
      }

      let sortedPages = [];
      while (queue.length > 0) {
        let current = queue.shift();
        sortedPages.push(current);

        for (let neighbor of graph.get(current)) {
          inDegree.set(neighbor, inDegree.get(neighbor) - 1);
          if (inDegree.get(neighbor) === 0) {
            queue.push(neighbor);
          }
        }
      }

      let middleIndex = Math.floor(sortedPages.length / 2);
      let middlePage = sortedPages[middleIndex];
      sum += middlePage;
    }
  }

  return sum;
}

console.log('Part1:', part1());
console.log('Part2:', part2());

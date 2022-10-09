const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, M] = input.shift();
const MAP = input;

function solution(N, M, MAP) {
  let chicken = [];
  let house = [];
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) {
      if (MAP[i][j] === 2) {
        chicken.push([i, j]);
        MAP[i][j] = 0;
      } else if (MAP[i][j] === 1) house.push([i, j]);
    }
  const bfs = ([x, y]) => {
    const dr = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];
    let visited = Array.from(Array(N), () => Array(N).fill(false));
    let dist = Array.from(Array(N), () => Array(N).fill(0));
    visited[x][y] = true;
    let dq = [[x, y]];
    while (dq.length !== 0) {
      let [X, Y] = dq[0];
      dq = dq.splice(1);
      for (let [i, j] of dr) {
        let [mx, my] = [X + i, Y + j];
        if (mx < 0 || mx >= N || my < 0 || my >= N) continue;
        if (visited[mx][my] === true) continue;
        dist[mx][my] = dist[X][Y] + 1;
        visited[mx][my] = true;
        if (MAP[mx][my] === 2) {
          return dist[mx][my];
        }
        dq.push([mx, my]);
      }
    }
  };

  let answer = Infinity;
  let combination = new Array(chicken.length).fill(false);
  const check = (idx, cnt) => {
    if (cnt === M) {
      let total = 0;
      house.map((v) => (total += bfs(v)));
      answer = Math.min(answer, total);
      return;
    }
    for (let i = idx; i < chicken.length; i++) {
      if (combination[i] === true) continue;
      combination[i] = true;
      MAP[chicken[i][0]][chicken[i][1]] = 2;
      check(i, cnt + 1);
      combination[i] = false;
      MAP[chicken[i][0]][chicken[i][1]] = 0;
    }
  };

  check(0, 0);
  return answer;
}

console.log(solution(N, M, MAP));

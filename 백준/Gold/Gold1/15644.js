const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [input_N, input_M] = input[0].split(" ").map(Number);
input.shift();
const [...input_board] = input.map((v) => v.trim().split(""));

function solution(N, M, board) {
  const bfs = (rx, ry, bx, by) => {
    dq = [[rx, ry, bx, by, 1, []]];
    while (dq.length !== 0) {
      const [rX, rY, bX, bY, C, dir] = dq[0];
      if (C > 10) break;
      dq = dq.splice(1);
      for (let i = 0; i < 4; i++) {
        let [mrx, mry, rc] = move(rX, rY, dr_x[i], dr_y[i]);
        let [mbx, mby, bc] = move(bX, bY, dr_x[i], dr_y[i]);
        if (board[mbx][mby] === "O") continue;
        if (board[mrx][mry] === "O") {
          dir.push(direction[i]);
          return [C, dir];
        }
        if (mrx === mbx && mry === mby) {
          if (rc > bc) {
            [mrx, mry] = mediate(mrx, mry, dr_x[i], dr_y[i]);
          } else if (rc < bc) {
            [mbx, mby] = mediate(mbx, mby, dr_x[i], dr_y[i]);
          }
        }

        let key = `${mrx}${mry}${mbx}${mby}`;
        if (visited[key] === undefined) {
          visited[key] = true;
          const newDir = [...dir, direction[i]];
          dq.push([mrx, mry, mbx, mby, C + 1, newDir]);
        }
      }
    }
    return [-1, []];
  };

  const move = (x, y, drX, drY) => {
    let cnt = 0;
    while (board[x + drX][y + drY] !== "#" && board[x][y] !== "O") {
      [x, y, cnt] = [x + drX, y + drY, cnt + 1];
    }
    return [x, y, cnt];
  };

  const mediate = (x, y, drX, drY) => {
    return [x - drX, y - drY];
  };

  const dr_x = [-1, 0, 1, 0];
  const dr_y = [0, 1, 0, -1];
  const direction = ["U", "R", "D", "L"];
  let redBall = [];
  let blueBall = [];
  board.forEach((line, i) => {
    line.forEach((v, j) => {
      if (v === "R") redBall = [i, j];
      if (v === "B") blueBall = [i, j];
    });
  });

  const visited = {};
  visited[`${redBall[0]}${redBall[1]}${blueBall[0]}${blueBall[1]}`] = true;

  const [C, dir] = bfs(...[...redBall, ...blueBall]);
  if (C === -1) console.log(-1);
  else {
    console.log(C);
    console.log(dir.join(""));
  }
}

solution(input_N, input_M, input_board);

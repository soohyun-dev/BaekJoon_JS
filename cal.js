const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, K, B] = input.shift();
const nums = input.map((v) => Number(v));

function solution(N, K, B, nums) {
  const dict = {};
  let answer = Infinity;
  nums.map((v) => (dict[v] = 0));
  nums.map((v) => {
    let cnt = 0;
    for (let i = v; i < v + K; i++) if (dict[i] === 0) cnt += 1;
    answer = Math.min(answer, cnt);
  });
  return answer;
}

console.log(solution(N, K, B, nums));

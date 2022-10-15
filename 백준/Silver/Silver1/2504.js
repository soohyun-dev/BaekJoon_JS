const { exit } = require("process");

const input = require("fs").readFileSync("/dev/stdin").toString().trim();

const bracket = input;

function solution(bracket) {
  let [cal, str, before, num] = [[], "", "", 0];
  bracket.split("").map((v) => {
    if (v === "(" || v === "[") {
      str += "+(";
      cal.push(v);
    } else {
      if (v === ")") [before, num] = ["(", 2];
      else if (v === "]") [before, num] = ["[", 3];
      if (cal[cal.length - 1] === before) cal.pop();
      else {
        console.log(0);
        exit(0);
      }
      if (str[Str.length - 1] === "(") str += `${num})`;
      else str += `)*${num}`;
    }
  });
  if (cal.length !== 0) return 0;
  return eval(str);
}

console.log(solution(bracket));

// [()[()[()]]]
// ( ( 2) +( ( 2) +( ( 2) )*3 )*3 )*3

import { readFileSync } from "fs";

const input = readFileSync("./Day2/input.txt", "utf-8");

const lines = input.split("\n");

const isPositive = (num: number) => num > 0;

let safeReports = 0;
for (const line of lines) {
  const report = line.split(" ").map(Number);

  let isSafe = true;

  let prev = report[0];
  let isAscending: undefined | boolean = undefined;
  let isFirst = true;
  for (const num of report) {
    if (isFirst) {
      isFirst = false;
      continue;
    }

    if (!isSafe) continue;
    const increaseOrDecreasedBy = num - prev;
    prev = num;
    if (
      !(
        Math.abs(increaseOrDecreasedBy) >= 1 &&
        Math.abs(increaseOrDecreasedBy) <= 3
      )
    ) {
      isSafe = false;
      continue;
    }

    if (isAscending === undefined) {
      if (isPositive(increaseOrDecreasedBy)) isAscending = true;
      else isAscending = false;
      continue;
    }

    if (increaseOrDecreasedBy === 0) {
      isSafe = false;
      continue;
    }
    if (
      (isAscending && !isPositive(increaseOrDecreasedBy)) ||
      (!isAscending && isPositive(increaseOrDecreasedBy))
    ) {
      isSafe = false;
      continue;
    }
  }
  if (!isSafe) continue;
  safeReports++;
}
console.log(safeReports);

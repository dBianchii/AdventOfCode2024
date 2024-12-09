import { readFileSync } from "fs";

const input = readFileSync("./Day2/input.txt", "utf-8");

const lines = input.split("\n");

const isPositive = (num: number) => num > 0;

let safeReports = 0;

function isSafe(report: number[]) {
  let prev = report[0];
  let isAscending: undefined | boolean = undefined;
  let isFirst = true;
  for (const num of report) {
    if (isFirst) {
      isFirst = false;
      continue;
    }

    if (!isSafe) return false;
    const increaseOrDecreasedBy = num - prev;
    prev = num;
    if (
      !(
        Math.abs(increaseOrDecreasedBy) >= 1 &&
        Math.abs(increaseOrDecreasedBy) <= 3
      )
    )
      return false;

    if (isAscending === undefined) {
      if (isPositive(increaseOrDecreasedBy)) isAscending = true;
      else isAscending = false;
      continue;
    }

    if (increaseOrDecreasedBy === 0) return false;
    if (
      (isAscending && !isPositive(increaseOrDecreasedBy)) ||
      (!isAscending && isPositive(increaseOrDecreasedBy))
    )
      return false;
  }

  return true;
}

for (const reportLine of lines) {
  const report = reportLine.split(" ").map(Number);

  const isReportSafe = isSafe(report);
  if (isReportSafe) {
    safeReports++;
    continue;
  }

  for (let i = 0; i < report.length; i++) {
    const mutatedReport = report.toSpliced(i, 1);
    if (isSafe(mutatedReport)) {
      safeReports++;
      break;
    }
  }
}
console.log(safeReports);

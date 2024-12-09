import { readFileSync } from "fs";

const input = readFileSync("./Day1/input.txt", "utf-8");

const lines = input.split("\n");

const SPLITTER = "   ";
const left = lines.map((line) => Number(line.split(SPLITTER)[0]));
const right = lines.map((line) => Number(line.split(SPLITTER)[1]));

let totalDistance = 0;
while (left.length > 0 || right.length > 0) {
  const minimumInLeft = Math.min(...left);
  const minimumInRight = Math.min(...right);
  const leftIdx = left.findIndex((l) => l === minimumInLeft);
  const rightIdx = right.findIndex((r) => r === minimumInRight);

  const distance = Math.abs(left[leftIdx] - right[rightIdx]);
  left.splice(leftIdx, 1);
  right.splice(rightIdx, 1);
  totalDistance += distance;
}

console.log(totalDistance);

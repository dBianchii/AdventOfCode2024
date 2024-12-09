import { readFileSync } from "fs";

const input = readFileSync("./Day1/input.txt", "utf-8");

const lines = input.split("\n");

const SPLITTER = "   ";
const left = lines.map((line) => Number(line.split(SPLITTER)[0]));
const right = lines.map((line) => Number(line.split(SPLITTER)[1]));

let similarityScore = 0;
for (const number of left) {
  const numberOfTimesInRightList = right.reduce((acc, curr) => {
    if (curr === number) acc += 1;
    return acc;
  }, 0);
  similarityScore += number * numberOfTimesInRightList;
}

console.log(similarityScore);

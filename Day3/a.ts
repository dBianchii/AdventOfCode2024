import { readFileSync } from "fs";

const input = readFileSync("./Day3/input.txt", "utf-8");

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;

const matched = input.matchAll(mulRegex);

let total = 0;
for (const [match] of matched) {
  const numbersInMatch = match.match(/\d{1,3}/g);
  if (!numbersInMatch || !numbersInMatch[0] || !numbersInMatch[1])
    throw new Error("Invalid input");

  const multiplied = Number(numbersInMatch[0]) * Number(numbersInMatch[1]);
  total += multiplied;
}
console.log(total);

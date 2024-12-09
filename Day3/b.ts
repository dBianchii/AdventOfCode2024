import { readFileSync } from "fs";

const input = readFileSync("./Day3/input.txt", "utf-8");

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
const doRegex = /do\(\)/g;
const dontRegex = /don't\(\)/g;

const matchedAnyOfTheAbove = input.matchAll(
  new RegExp(`(${mulRegex.source}|${doRegex.source}|${dontRegex.source})`, "g")
);

let total = 0;
let active = true;
for (const [match] of matchedAnyOfTheAbove) {
  const isDo = match.match(doRegex);
  const isDont = match.match(dontRegex);
  if (isDo) {
    active = true;
    continue;
  }
  if (isDont) {
    active = false;
    continue;
  }
  if (!active) continue;

  const numbersInMatch = match.match(/\d{1,3}/g);
  if (!numbersInMatch || !numbersInMatch[0] || !numbersInMatch[1])
    throw new Error("Invalid input");

  const multiplied = Number(numbersInMatch[0]) * Number(numbersInMatch[1]);
  total += multiplied;
}
console.log(total);

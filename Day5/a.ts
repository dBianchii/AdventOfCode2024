import { readFileSync } from "fs";

const input = readFileSync("./Day5/input.txt", "utf-8");
const lines = input.split("\n");

const dividerIdx = lines.findIndex((line) => line === "");

const rules = lines.slice(0, dividerIdx).map((line) => {
  const [page1, page2] = line.split("|");
  return { page1: Number(page1), page2: Number(page2) };
});
const updates = lines
  .slice(dividerIdx + 1, lines.length)
  .map((l) => l.split(",").map(Number));

function updateFollowsAllTheRules(update: number[]) {
  for (const rule of rules) {
    const updateHasBothRules =
      !!update.find((num) => num === rule.page1) &&
      !!update.find((num) => num === rule.page2);
    if (!updateHasBothRules) continue;

    const num1Idx = update.findIndex((num) => num === rule.page1);
    const num2Idx = update.findIndex((num) => num === rule.page2);

    if (num1Idx > num2Idx) return false;
  }
  return true;
}

const updatesThatFollowsAllRules = updates.filter(updateFollowsAllTheRules);
const thing = updatesThatFollowsAllRules.reduce((acc, curr) => {
  const middle = curr[Math.floor(curr.length / 2)];
  return acc + middle!;
}, 0);

console.log(thing);

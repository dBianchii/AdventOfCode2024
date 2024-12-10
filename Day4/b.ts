import { readFileSync } from "fs";

const input = readFileSync("./Day4/input.txt", "utf-8");
const lines = input.split("\n");

const A = "A";
const EDGES = ["M", "S"] as const;
const otherEdge = (edge: (typeof EDGES)[number]) => (edge === "M" ? "S" : "M");
const isAnEdge = (char: string | undefined): char is "M" | "S" =>
  EDGES.includes(char as any);

const map = lines.map((line) => line.split(""));

let numberOfXmasFound = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y]!.length; x++) {
    const currentCoord = { x, y };
    if (checkIsXMAS(currentCoord)) numberOfXmasFound++;
  }
}
console.log(numberOfXmasFound);

function checkIsXMAS(currentCoord: { x: number; y: number }) {
  if (map[currentCoord.y]?.[currentCoord.x] !== A) return false;

  const topLeft = map[currentCoord.y - 1]?.[currentCoord.x - 1];
  const bottomRight = map[currentCoord.y + 1]?.[currentCoord.x + 1];

  const topRight = map[currentCoord.y - 1]?.[currentCoord.x + 1];
  const bottomLeft = map[currentCoord.y + 1]?.[currentCoord.x - 1];
  if (
    !isAnEdge(topLeft) ||
    !isAnEdge(bottomRight) ||
    !isAnEdge(topRight) ||
    !isAnEdge(bottomLeft)
  )
    return false;

  if (
    topLeft === otherEdge(bottomRight as "M" | "S") &&
    topRight === otherEdge(bottomLeft as "M" | "S")
  )
    return true;
  return false;
}

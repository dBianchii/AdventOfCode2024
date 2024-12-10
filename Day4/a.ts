import { readFileSync } from "fs";

const input = readFileSync("./Day4/input.txt", "utf-8");
const lines = input.split("\n");
const XMAS = ["X", "M", "A", "S"];

const map = lines.map((line) => line.split(""));

let numberOfXmasFound = 0;
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y]!.length; x++) {
    const currentCoord = { x, y };
    checkInAllDirections(currentCoord);
  }
}
console.log(numberOfXmasFound);

function checkInAllDirections(currentCoord: { x: number; y: number }) {
  if (map[currentCoord.y]?.[currentCoord.x] !== XMAS[0]) return false;

  const directionsToCheck: { x: -1 | 0 | 1; y: -1 | 0 | 1 }[] = [
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 },
  ];
  for (const direction of directionsToCheck) {
    if (checkInDirection(currentCoord, direction)) {
      numberOfXmasFound++;
    }
  }
}

function checkInDirection(
  currentPosition: { x: number; y: number },
  direction: { x: -1 | 0 | 1; y: -1 | 0 | 1 },
  charIndex: number = 1 //We already checked for the first letter
) {
  const positionToCheck = {
    y: currentPosition.y + direction.y,
    x: currentPosition.x + direction.x,
  };
  const expectedChar = XMAS[charIndex];
  const actualValue = map[positionToCheck.y]?.[positionToCheck.x];
  if (actualValue === undefined) return false; //Out of bounds

  if (actualValue !== expectedChar) return false;
  if (expectedChar === XMAS.at(-1)) return true; //Last letter found

  return checkInDirection(positionToCheck, direction, charIndex + 1);
}

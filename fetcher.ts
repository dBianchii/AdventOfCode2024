import readline from "readline";
import fs from "fs";

const YEAR = 2024;

async function getInput(year: number, day: number) {
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await fetch(url, {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION_ID}`,
    },
  });
  return response.text();
}

async function getOrWriteInput(day: number) {
  const input = await getInput(YEAR, day);
  const dir = `Day${day}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`${dir}/input.txt`, input);
}

function getDay(): Promise<number> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("Enter the day: ", (answer) => {
      rl.close();
      resolve(parseInt(answer, 10));
    });
  });
}

async function main() {
  const day = await getDay();
  console.log(`Fetching input for day ${day}`);
  await getOrWriteInput(day);
}

main();

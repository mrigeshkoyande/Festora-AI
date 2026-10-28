import { spawnSync } from "node:child_process";

const testFiles = [
  "tests/currency.test.ts",
  "tests/budget.test.ts",
  "tests/timeline.test.ts",
  "tests/seating.test.ts",
  "tests/security.test.ts",
  "tests/validation.test.ts",
  "tests/ai-provider.test.ts",
  "tests/integration-flow.test.ts",
  "tests/edge-cases.test.ts",
  "tests/api-route.test.ts",
  "tests/component-render.test.tsx",
  "tests/axe.test.ts",
  "tests/focus-trap.test.tsx",
  "tests/efficiency.test.ts",
];

const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--experimental-test-coverage", "--test", ...testFiles],
  { encoding: "utf8" },
);

process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");

if (result.status !== 0) process.exit(result.status ?? 1);

const utilityRows = (result.stdout ?? "")
  .split(/\r?\n/)
  .map((line) =>
    line.match(
      /^# (src[\\/]lib[\\/]utils(?:[\\/][^ ]+)?\.ts)\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|/,
    ),
  )
  .filter((match) => match !== null);

const allFilesMatch = (result.stdout ?? "").match(
  /^# all files\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|\s+([\d.]+)\s+\|/m,
);
const belowUtilityThreshold = utilityRows.filter(
  ([, , lines, branches]) => Number(lines) < 70 || Number(branches) < 75,
);
const belowGlobalThreshold =
  !allFilesMatch ||
  Number(allFilesMatch[1]) < 70 ||
  Number(allFilesMatch[2]) < 80 ||
  Number(allFilesMatch[3]) < 70;

if (utilityRows.length === 0 || belowUtilityThreshold.length > 0 || belowGlobalThreshold) {
  console.error(
    "Coverage threshold failed (global: lines >= 70%, branches >= 80%, functions >= 70%; utility: lines >= 70%, branches >= 75%):",
  );
  for (const row of belowUtilityThreshold)
    console.error(`- ${row[1]}: lines ${row[2]}%, branches ${row[3]}%`);
  if (utilityRows.length === 0)
    console.error("- No utility coverage rows were found in the Node coverage report.");
  if (belowGlobalThreshold)
    console.error(
      `- all files: ${allFilesMatch?.[1] ?? "missing"}% lines, ${allFilesMatch?.[2] ?? "missing"}% branches, ${allFilesMatch?.[3] ?? "missing"}% functions`,
    );
  process.exit(1);
}

console.log(
  `Coverage threshold passed for ${utilityRows.length} utility files and the global report: utility lines >= 70%, utility branches >= 75%, global lines >= 70%, global branches >= 80%, global functions >= 70%.`,
);

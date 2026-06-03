#!/usr/bin/env node
import { createInterface } from "node:readline";
import { isValidOperation, runOperation } from "./lib/operations.js";
import { ParseError, parseArgs, stackFromValues } from "./lib/parse.js";
import { isSorted, stackInit, type Stack } from "./lib/stack.js";

async function readInstructions(): Promise<string[]> {
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  const lines: string[] = [];
  for await (const line of rl) {
    const trimmed = line.trim();
    if (trimmed) lines.push(trimmed);
  }
  return lines;
}

function cloneStack(stack: Stack): Stack {
  return { values: [...stack.values] };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0) process.exit(0);

  let values: number[];
  try {
    values = parseArgs(args);
  } catch (err) {
    if (err instanceof ParseError) {
      process.stderr.write("Error\n");
      process.exit(1);
    }
    throw err;
  }

  const a = stackFromValues(values);
  const instructions = await readInstructions();

  for (const op of instructions) {
    if (!isValidOperation(op)) {
      process.stderr.write("Error\n");
      process.exit(1);
    }
  }

  const b = stackInit();
  const workA = cloneStack(a);

  for (const op of instructions) {
    runOperation(op, workA, b, false);
  }

  process.stdout.write(isSorted(workA) && b.values.length === 0 ? "OK\n" : "KO\n");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

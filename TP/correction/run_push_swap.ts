#!/usr/bin/env node
import { runOperation } from "../src/lib/operations.js";
import { ParseError, parseArgs, stackFromValues } from "../src/lib/parse.js";
import { isSorted, stackInit, stackSize } from "../src/lib/stack.js";
import { sortStacks } from "./sort.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.length === 0) return;

  const values = parseArgs(argv);
  const a = stackFromValues(values);
  const b = stackInit();

  sortStacks(a, b);

  if (!isSorted(a) || stackSize(b) > 0) {
    process.stderr.write("Error\n");
    process.exit(1);
  }
}

main().catch((err: unknown) => {
  if (err instanceof ParseError) {
    process.stderr.write("Error\n");
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});

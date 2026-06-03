#!/usr/bin/env node
/**
 * Standalone push_swap checker — single file, no dependency on student code.
 * Usage: npx tsx checker.ts 3 1 2 < operations.txt
 *    or: ./push_swap 3 1 2 | npx tsx checker.ts 3 1 2
 *
 * Exit: prints OK or KO on stdout. Error on stderr + exit 1 for invalid input.
 */

import { createInterface } from "node:readline";

const STACK_MAX = 50;

interface Stack {
  values: number[];
}

class ParseError extends Error {}

const VALID_OPS = new Set([
  "sa", "sb", "ss", "pa", "pb", "ra", "rb", "rr", "rra", "rrb", "rrr",
]);

function stackInit(): Stack {
  return { values: [] };
}

function stackPush(stack: Stack, value: number): void {
  if (stack.values.length >= STACK_MAX) throw new Error("Stack overflow");
  stack.values.push(value);
}

function stackPop(stack: Stack): number | undefined {
  return stack.values.pop();
}

function stackSwap(stack: Stack): void {
  const n = stack.values.length;
  if (n < 2) return;
  [stack.values[n - 1], stack.values[n - 2]] = [stack.values[n - 2], stack.values[n - 1]];
}

function stackRotate(stack: Stack): void {
  const n = stack.values.length;
  if (n < 2) return;
  const top = stack.values.pop();
  if (top !== undefined) stack.values.unshift(top);
}

function stackRevRotate(stack: Stack): void {
  const n = stack.values.length;
  if (n < 2) return;
  const bottom = stack.values.shift();
  if (bottom !== undefined) stack.values.push(bottom);
}

function moveTop(from: Stack, to: Stack): void {
  const value = stackPop(from);
  if (value !== undefined) stackPush(to, value);
}

function isSorted(stack: Stack): boolean {
  for (let i = 0; i < stack.values.length - 1; i++) {
    if (stack.values[i + 1] > stack.values[i]) return false;
  }
  return stack.values.length > 0;
}

function parseArgs(argv: string[]): number[] {
  if (argv.length === 0) return [];

  const values: number[] = [];
  for (const arg of argv) {
    for (const token of arg.split(/\s+/).filter(Boolean)) {
      if (!/^\+?\d+$/.test(token)) throw new ParseError("invalid integer");
      const n = Number.parseInt(token, 10);
      if (n <= 0) throw new ParseError("non-positive");
      if (values.includes(n)) throw new ParseError("duplicate");
      values.push(n);
    }
  }

  if (values.length < 2 || values.length > STACK_MAX) {
    throw new ParseError("invalid count");
  }

  return values;
}

function stackFromValues(values: number[]): Stack {
  const stack = stackInit();
  for (const value of values) stackPush(stack, value);
  stack.values.reverse();
  return stack;
}

function runOperation(name: string, a: Stack, b: Stack): void {
  switch (name) {
    case "sa": stackSwap(a); break;
    case "sb": stackSwap(b); break;
    case "ss": stackSwap(a); stackSwap(b); break;
    case "pa": moveTop(b, a); break;
    case "pb": moveTop(a, b); break;
    case "ra": stackRotate(a); break;
    case "rb": stackRotate(b); break;
    case "rr": stackRotate(a); stackRotate(b); break;
    case "rra": stackRevRotate(a); break;
    case "rrb": stackRevRotate(b); break;
    case "rrr": stackRevRotate(a); stackRevRotate(b); break;
  }
}

async function readInstructions(): Promise<string[]> {
  const rl = createInterface({ input: process.stdin, crlfDelay: Infinity });
  const lines: string[] = [];
  for await (const line of rl) {
    const trimmed = line.trim();
    if (trimmed) lines.push(trimmed);
  }
  return lines;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0) return;

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

  const instructions = await readInstructions();
  for (const op of instructions) {
    if (!VALID_OPS.has(op)) {
      process.stderr.write("Error\n");
      process.exit(1);
    }
  }

  const a = stackFromValues(values);
  const b = stackInit();
  const workA: Stack = { values: [...a.values] };

  for (const op of instructions) runOperation(op, workA, b);

  process.stdout.write(isSorted(workA) && b.values.length === 0 ? "OK\n" : "KO\n");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

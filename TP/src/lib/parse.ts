import { STACK_MAX, stackInit, stackPush, type Stack } from "./stack.js";

export class ParseError extends Error {}

export function parseArgs(argv: string[]): number[] {
  if (argv.length === 0) return [];

  const values: number[] = [];

  for (const arg of argv) {
    for (const token of arg.split(/\s+/).filter(Boolean)) {
      if (!/^\+?\d+$/.test(token)) {
        throw new ParseError("invalid integer");
      }
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

export function stackFromValues(values: number[]): Stack {
  const stack = stackInit();
  for (const value of values) stackPush(stack, value);
  stack.values.reverse();
  return stack;
}

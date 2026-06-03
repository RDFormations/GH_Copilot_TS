import {
  stackPush,
  stackPop,
  stackRevRotate,
  stackRotate,
  stackSwap,
  type Stack,
} from "./stack.js";

export type OperationName =
  | "sa"
  | "sb"
  | "ss"
  | "pa"
  | "pb"
  | "ra"
  | "rb"
  | "rr"
  | "rra"
  | "rrb"
  | "rrr";

const VALID_OPS = new Set<string>([
  "sa",
  "sb",
  "ss",
  "pa",
  "pb",
  "ra",
  "rb",
  "rr",
  "rra",
  "rrb",
  "rrr",
]);

export function isValidOperation(name: string): name is OperationName {
  return VALID_OPS.has(name);
}

function moveTop(from: Stack, to: Stack): void {
  const value = stackPop(from);
  if (value !== undefined) stackPush(to, value);
}

export function runOperation(
  name: OperationName,
  a: Stack,
  b: Stack,
  print = false,
): void {
  switch (name) {
    case "sa":
      stackSwap(a);
      break;
    case "sb":
      stackSwap(b);
      break;
    case "ss":
      stackSwap(a);
      stackSwap(b);
      break;
    case "pa":
      moveTop(b, a);
      break;
    case "pb":
      moveTop(a, b);
      break;
    case "ra":
      stackRotate(a);
      break;
    case "rb":
      stackRotate(b);
      break;
    case "rr":
      stackRotate(a);
      stackRotate(b);
      break;
    case "rra":
      stackRevRotate(a);
      break;
    case "rrb":
      stackRevRotate(b);
      break;
    case "rrr":
      stackRevRotate(a);
      stackRevRotate(b);
      break;
  }
  if (print) console.log(name);
}

export function runOperations(
  ops: OperationName[],
  a: Stack,
  b: Stack,
  print = false,
): void {
  for (const op of ops) runOperation(op, a, b, print);
}

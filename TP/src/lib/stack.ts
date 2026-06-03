export const STACK_MAX = 50;

export interface Stack {
  /** index 0 = bottom, top = last index */
  values: number[];
}

export function stackInit(capacity = STACK_MAX): Stack {
  return { values: [] };
}

export function stackSize(stack: Stack): number {
  return stack.values.length;
}

export function stackPush(stack: Stack, value: number): void {
  if (stack.values.length >= STACK_MAX) {
    throw new Error("Stack overflow");
  }
  stack.values.push(value);
}

export function stackPop(stack: Stack): number | undefined {
  return stack.values.pop();
}

export function stackPeek(stack: Stack): number | undefined {
  return stack.values.at(-1);
}

export function stackSwap(stack: Stack): void {
  const n = stack.values.length;
  if (n < 2) return;
  const top = stack.values[n - 1];
  stack.values[n - 1] = stack.values[n - 2];
  stack.values[n - 2] = top;
}

export function stackRotate(stack: Stack): void {
  const n = stack.values.length;
  if (n < 2) return;
  const top = stack.values.pop();
  if (top !== undefined) stack.values.unshift(top);
}

export function stackRevRotate(stack: Stack): void {
  const n = stack.values.length;
  if (n < 2) return;
  const bottom = stack.values.shift();
  if (bottom !== undefined) stack.values.push(bottom);
}

/** C checker convention : array[i + 1] <= array[i] from bottom to top */
export function isSorted(stack: Stack): boolean {
  for (let i = 0; i < stack.values.length - 1; i++) {
    if (stack.values[i + 1] > stack.values[i]) return false;
  }
  return stack.values.length > 0;
}

export function stackFromArgs(args: string[]): Stack {
  const stack = stackInit();
  for (const arg of args) {
    for (const token of arg.split(/\s+/).filter(Boolean)) {
      stackPush(stack, Number.parseInt(token, 10));
    }
  }
  return stack;
}

import { runOperation } from "../src/lib/operations.js";
import { stackInit, stackSize, type Stack } from "../src/lib/stack.js";

function indexOfMin(stack: Stack): number {
  let minIdx = 0;
  for (let i = 1; i < stack.values.length; i++) {
    if (stack.values[i] < stack.values[minIdx]) minIdx = i;
  }
  return minIdx;
}

/** Correction — tri par sélection via pb/pa (simple, non optimal). */
export function sortStacks(a: Stack, b: Stack): void {
  while (stackSize(a) > 1) {
    const minIdx = indexOfMin(a);
    const n = stackSize(a);
    const distTop = n - 1 - minIdx;
    const distBottom = minIdx + 1;

    if (distTop <= distBottom) {
      for (let i = 0; i < distTop; i++) runOperation("ra", a, b, true);
    } else {
      for (let i = 0; i < distBottom; i++) runOperation("rra", a, b, true);
    }
    runOperation("pb", a, b, true);
  }

  while (stackSize(b) > 0) runOperation("pa", a, b, true);
}

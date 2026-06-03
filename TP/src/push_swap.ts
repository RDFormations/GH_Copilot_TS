#!/usr/bin/env node
import { runOperation } from "./lib/operations.js";
import { ParseError, parseArgs, stackFromValues } from "./lib/parse.js";
import { isSorted, stackInit, stackSize, type Stack } from "./lib/stack.js";

/**
 * Stratégie de tri — **à compléter** avec Copilot.
 * Objectif : pile `a` triée (bottom → top croissant), pile `b` vide.
 */
export function sortStacks(a: Stack, b: Stack): void {
  // TODO: Implement sortStacks
  //
  // Commentaire-prompt :
  //   Tant que a contient plus d'un élément :
  //     - repérer l'index du minimum
  //     - amener ce minimum au sommet avec ra/rra
  //     - pb
  //   Puis pa jusqu'à vider b
  void a;
  void b;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.length === 0) return;

  let values: number[];
  try {
    values = parseArgs(argv);
  } catch (err) {
    if (err instanceof ParseError) {
      process.stderr.write("Error\n");
      process.exit(1);
    }
    throw err;
  }

  const a = stackFromValues(values);
  const b = stackInit();

  sortStacks(a, b);

  if (!isSorted(a) || stackSize(b) > 0) {
    process.stderr.write("Error\n");
    process.exit(1);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

# Exercices — Inline completions and context

> **Context** — You implement utility functions in **TypeScript**. Vague comments produce generic code.

## Exercice — Algorithm comment-prompts

**Topics :** sections 2.5–2.6 (What/How/Constraints, iteration).

### Instructions

1. Create `src/utils/sort.ts`.
2. **Stub A** — copy the vague stub, trigger completion (`Alt + \\`), note why the suggestion is insufficient:

```ts
// trier un tableau
export function insertionSort(values: number[]): number[] {
```

3. Replace with structured What/How/Constraints (insertion sort, immutable copy):

```ts
/**
 * QUOI : Tri par insertion sur tableau de nombres
 * COMMENT : parcours O(n²), copie immuable
 * CONTRAINTES : retourne un nouveau tableau trié croissant
 */
export function insertionSort(values: number[]): number[] {
```

4. **Stub B** — same approach for binary search (sorted array, return index or -1):

```ts
// recherche dichotomique
export function binarySearch(values: number[], target: number): number {
```

5. For each stub, document iterations before an acceptable suggestion.

**Success criteria :** two functions with precise prompts; correct algorithm; iteration log documented.

**Documentation :** [Best practices](https://docs.github.com/copilot/get-started/best-practices-for-using-github-copilot)

> **Solution** : [Accéder à la correction](../correction/en/correction-02-completions-inline.md)

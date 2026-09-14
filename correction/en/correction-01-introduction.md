# Solution — Introduction to GitHub Copilot

> **Exercise** : [Revoir l'énoncé](../exercices/en/exercice-01-introduction.md)

## Context

Verify Copilot works before continuing to the next modules.

## Detailed solution

### Step 1 — Setup

**Expected :** Copilot + Chat extensions installed; icon active.

### Step 2 — Signature and comment

```ts
/** Format an ID: ID- prefix, 5-digit zero-padded number. */
export function formatId(id: number): string {
```

### Step 3 — Accept and test

**Verification :** `formatId(42) === "ID-00042"`

## Common pitfalls

| Symptom | Fix |
| -------- | ----- |
| No suggestion | Check Copilot license and GitHub sign-in |
| Wrong format (ID-42) | Specify zero-padding in comment |


## Documentation

| Topic | Link |
| ----- | ---- |
| Best practices | [Best practices](https://docs.github.com/copilot/get-started/best-practices-for-using-github-copilot) |

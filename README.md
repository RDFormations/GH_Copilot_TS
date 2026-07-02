# GitHub Repository

https://github.com/RDFormations/GH_Copilot_TS

# GH Copilot — TypeScript Lab

GitHub Copilot training adapted for **TypeScript**: course material, guided exercises, and a mini push_swap lab.

## Contents

| Folder                   | Description                          |
| ------------------------ | ------------------------------------ |
| `Cours.md` / `Cours.pdf` | Training material (6 modules)        |
| `exercices/`             | Files to complete with Copilot       |
| `correction/`            | Reference solutions                  |
| `TP/`                    | Mini push_swap — stacks and operations |

## Prerequisites

- Node.js 20+
- VS Code + GitHub Copilot + TypeScript extension
- `npm install` at the root and in `TP/`

## Exercises

```bash
npm install
npm run ex:01   # bubble sort
npm run ex:02   # Employee struct + serialization
npm run ex:03   # CSV parsing

npm run corr:01 # solution
```

## push_swap Lab

**Provided to students:** `TP/SUJET.md`, `TP/checker.ts` (standalone), `TP/scripts/`.

The `push_swap` implementation must be developed entirely in `TP/src/`.

```bash
cd TP
npm install

npx tsx src/push_swap.ts 3 1 2 | npm run checker -- 3 1 2
# expected: OK (once push_swap is implemented)

npm run test:50
```

See `TP/SUJET.md` for the full assignment.

---

## `test.ts` code explanation

The `test.ts` file contains a TypeScript function `calculateAverageSalary` that takes an array of `Employee` objects and returns the average salary. If the array is empty, it returns `0`.

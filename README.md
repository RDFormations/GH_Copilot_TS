# GitHub Repository

https://github.com/RDFormations/GH_Copilot_TS

# GH Copilot — TypeScript Lab

GitHub Copilot training adapted for **TypeScript**: course material (FR + EN), guided exercises, and a mini push_swap lab.

## Contents

| Folder | Description |
| ------ | ----------- |
| `Cours.md` / `Cours.pdf` | Course material FR (6 modules) |
| `CoursENG.md` / `CoursENG.pdf` | Course material EN (6 modules) |
| `exercices/fr/` | Exercise sheets FR + code stubs `.ts` |
| `exercices/en/` | Exercise sheets EN + same code stubs |
| `correction/fr/` | Solutions FR + corrected code |
| `correction/en/` | Solutions EN + corrected code |
| `TP/fr/SUJET.md` | push_swap lab assignment (French) |
| `TP/en/SUJET.md` | push_swap lab assignment (English) |

## Prerequisites

- Node.js 20+
- VS Code + GitHub Copilot + TypeScript extension
- `npm install` at the root and in `TP/`

## Exercises

```bash
npm install
npm run ex:01   # bubble sort (uses exercices/fr/)
npm run ex:02   # Employee struct + serialization
npm run ex:03   # CSV parsing

npm run corr:01 # solution
```

For English instructions, open `exercices/en/exercice-*.md`.

## push_swap Lab

**Provided:** `TP/fr/SUJET.md` or `TP/en/SUJET.md`, `TP/checker.ts`, `TP/scripts/`.

```bash
cd TP
npm install

npx tsx src/push_swap.ts 3 1 2 | npm run checker -- 3 1 2
# expected: OK (once push_swap is implemented)

npm run test:50
```

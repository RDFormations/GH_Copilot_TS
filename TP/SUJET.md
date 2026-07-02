# Lab — mini_push_swap (TypeScript)

## Context

**push_swap** is a classic data structure exercise: sort integers using only **two stacks** (`a` and `b`) and a small set of **operations** (`sa`, `pb`, `ra`, etc.). You do not sort an array directly — every move goes through the stacks.

This lab offers a **reduced version**, adapted for a **TypeScript** course and GitHub Copilot usage.

---

## Provided files

| File | Role |
| ---- | ---- |
| `SUJET.md` | Assignment (this document) |
| `checker.ts` | **Standalone** checker — reads operations from stdin |
| `scripts/` | Test scripts (`test_checker_50.sh`, `run_batch_50.sh`) |

**Everything else must be developed**: `push_swap`, stacks, operations, argument parsing.

---

## Objective

Write a **`push_swap`** program that:

1. Receives between **2 and 50** **strictly positive**, **distinct** integers as arguments.
2. Prints a **sequence of operations** on standard output (one per line).
3. Applies these operations on two stacks so that **`a` is sorted** (per the provided checker convention).

### Example

```bash
npx tsx src/push_swap.ts 3 1 2
```

Possible output:

```
ra
pb
pb
pa
pa
```

Verification with the provided checker:

```bash
npx tsx src/push_swap.ts 3 1 2 | npm run checker -- 3 1 2
# expected: OK
```

---

## Lab scope

| Classic "full" version | This lab |
| ---------------------- | -------- |
| Hundreds of values | **2 to 50** values |
| Operation count optimization | **Correct sort** required; op score is a **bonus** |
| Checker to write | **Checker provided** (`checker.ts`) |
| Advanced algorithms | Stacks, operations, and **sorting strategy to design** |

---

## Stack model

- **`a`**: holds all numbers at the start. The **first argument** is at the **bottom**, the **last** at the **top**.
- **`b`**: empty at the start.

```
npx tsx src/push_swap.ts 2 1 3

Stack a (bottom → top):  2  1  3     ← top = 3
Stack b                  : (empty)
```

Representation of your choice: **array**, **linked list**, or custom structure — as long as operations respect the semantics below.

---

## Operations to implement

Each operation modifies the stacks. If the operation is **valid**, `push_swap` **prints** it on `stdout` (one line per operation). Otherwise, it does nothing and **is not printed**.

| Op    | Effect |
| ----- | ------ |
| `sa`  | Swap the **top 2** elements of `a` |
| `sb`  | Swap the **top 2** elements of `b` |
| `ss`  | `sa` + `sb` (single `ss` line) |
| `pa`  | Pop the top of `b`, push onto `a` |
| `pb`  | Pop the top of `a`, push onto `b` |
| `ra`  | Move top of `a` to the **bottom** of `a` |
| `rb`  | Same on `b` |
| `rr`  | `ra` + `rb` (single `rr` line) |
| `rra` | Move **bottom** element of `a` to the top |
| `rrb` | Same on `b` |
| `rrr` | `rra` + `rrb` (single `rrr` line) |

## Parsing and error handling

| Input | Behavior |
| ----- | -------- |
| No arguments | No output, exit code `0` |
| Non-integer argument, `≤ 0`, duplicate, or **fewer than 2 / more than 50** values | `Error\n` on **stderr**, exit code `1` |

Examples:

```bash
npx tsx src/push_swap.ts          # nothing, exit 0
npx tsx src/push_swap.ts 1 1      # Error, exit 1
npx tsx src/push_swap.ts -3 2     # Error, exit 1
npx tsx src/push_swap.ts 1 2 abc  # Error, exit 1
npx tsx src/push_swap.ts 42       # Error (single integer), exit 1
```

---

## Code organization (recommended)

```
TP/
├── SUJET.md
├── checker.ts           # provided — do not modify
├── package.json
├── scripts/
│   ├── test_checker_50.sh
│   └── run_batch_50.sh
└── src/                 # to create
    ├── stack.ts         # stack: init, push, pop, isSorted?, etc.
    ├── operations.ts    # sa, sb, … rrr
    ├── parse.ts         # argument validation
    ├── sort.ts          # sorting strategy
    └── push_swap.ts     # entry point
```

---

## Verification

```bash
cd TP
npm install

# Manual unit test
npx tsx src/push_swap.ts 5 2 8 1 4 | npm run checker -- 5 2 8 1 4
# OK

# 50 random values (configure PUSH_SWAP if needed)
npm run test:50

# Operation count (bonus)
bash scripts/run_batch_50.sh 5
```

Useful variables for scripts:

```bash
export PUSH_SWAP="npx tsx src/push_swap.ts"
export CHECKER="npx tsx checker.ts"
./scripts/test_checker_50.sh 3
```

---

## GitHub Copilot — lab guidelines

1. **Comment-prompts** with JSDoc before each block (`/** pb: pop top of a, push onto b */`).
2. Keep **types** (`stack.ts`, interfaces) open while writing operations.
3. Use **Chat** to explain sorting with 3 elements — not to deliver an uncomprehended solution.
4. **Validate** with the checker and `tsc --noEmit`.

---

## Deliverable

- Repository or archive containing your `push_swap` runnable with `npx tsx src/push_swap.ts`.
- Short `README`: name, build and test commands.

---

## Diagram

```
     push_swap (student)              checker.ts (provided)
  ┌─────────────┐                  ┌─────────────┐
  │ argv → stack│  ops on stdout   │ argv → stack│
  │ sort → ops  │ ───────────────► │ read stdin  │
  └─────────────┘                  │ run ops     │
                                   │ check sort  │
                                   └─────────────┘
```

# TP — mini_push_swap (TypeScript)

## Contexte

Le **push_swap** est un exercice classique de manipulation de structures de données : trier des entiers en n'utilisant que **deux piles** (`a` et `b`) et un petit ensemble d'**opérations** (`sa`, `pb`, `ra`, etc.). On ne trie pas directement un tableau : chaque déplacement passe par les piles.

Ce TP en propose une **version réduite**, adaptée à un cours **TypeScript** et à l'usage de GitHub Copilot.

---

## Fichiers fournis

| Fichier | Rôle |
| ------- | ---- |
| `SUJET.md` | Énoncé (ce document) |
| `checker.ts` | Vérificateur **standalone** — lit les opérations sur stdin |
| `scripts/` | Scripts de test (`test_checker_50.sh`, `run_batch_50.sh`) |

**Tout le reste est à développer** : `push_swap`, piles, opérations, parsing des arguments.

---

## Objectif

Écrire un programme **`push_swap`** qui :

1. Reçoit entre **2 et 50** entiers **strictement positifs**, tous **distincts**, en arguments.
2. Affiche sur la sortie standard une **suite d'opérations** (une par ligne).
3. Applique ces opérations sur deux piles pour que **`a` soit triée** (convention du checker fourni).

### Exemple

```bash
npx tsx src/push_swap.ts 3 1 2
```

Sortie possible :

```
ra
pb
pb
pa
pa
```

Vérification avec le checker fourni :

```bash
npx tsx src/push_swap.ts 3 1 2 | npm run checker -- 3 1 2
# attendu : OK
```

---

## Périmètre du TP

| Version « complète » classique      | Ce TP                                                  |
| ----------------------------------- | ------------------------------------------------------ |
| Centaines de valeurs                | **2 à 50** valeurs                                     |
| Optimisation du nombre d'opérations | **Tri correct** obligatoire ; score d'ops en **bonus** |
| Checker à écrire                    | **Checker fourni** (`checker.ts`)                      |
| Algorithmes avancés                 | Piles, opérations et **stratégie de tri à concevoir**  |

---

## Modèle des piles

- **`a`** : contient tous les nombres au départ. Le **premier argument** est en **bas**, le **dernier** au **sommet**.
- **`b`** : vide au départ.

```
npx tsx src/push_swap.ts 2 1 3

Pile a (bas → haut) :  2  1  3     ← sommet = 3
Pile b                : (vide)
```

Représentation au choix : **tableau**, **liste chaînée**, ou structure custom — tant que les opérations respectent la sémantique ci-dessous.

---

## Opérations à implémenter

Chaque opération modifie les piles. Si l'opération est **valide**, `push_swap` l'**affiche** sur `stdout` (une ligne par opération). Sinon, elle ne fait rien et **n'est pas affichée**.

| Op    | Effet                                                        |
| ----- | ------------------------------------------------------------ |
| `sa`  | Échange les **2 premiers** éléments de `a` (les 2 au sommet) |
| `sb`  | Échange les **2 premiers** éléments de `b`                   |
| `ss`  | `sa` + `sb` (une seule ligne `ss`)                           |
| `pa`  | Retire le sommet de `b`, l'empile sur `a`                    |
| `pb`  | Retire le sommet de `a`, l'empile sur `b`                    |
| `ra`  | Sommet de `a` envoyé en **bas** de `a`                       |
| `rb`  | Idem sur `b`                                                 |
| `rr`  | `ra` + `rb` (une seule ligne `rr`)                           |
| `rra` | Élément du **bas** de `a` remonté au sommet                  |
| `rrb` | Idem sur `b`                                                 |
| `rrr` | `rra` + `rrb` (une seule ligne `rrr`)                        |

## Parsing et gestion d'erreurs

| Entrée                                                                      | Comportement                       |
| --------------------------------------------------------------------------- | ---------------------------------- |
| Aucun argument                                                              | Pas de sortie, code `0`            |
| Argument non entier, `≤ 0`, doublon, ou **moins de 2 / plus de 50** valeurs | `Error\n` sur **stderr**, code `1` |

Exemples :

```bash
npx tsx src/push_swap.ts          # rien, exit 0
npx tsx src/push_swap.ts 1 1      # Error, exit 1
npx tsx src/push_swap.ts -3 2     # Error, exit 1
npx tsx src/push_swap.ts 1 2 abc  # Error, exit 1
npx tsx src/push_swap.ts 42       # Error (un seul entier), exit 1
```

---

## Organisation du code (recommandée)

```
TP/
├── SUJET.md
├── checker.ts           # fourni — ne pas modifier
├── package.json
├── scripts/
│   ├── test_checker_50.sh
│   └── run_batch_50.sh
└── src/                 # à créer
    ├── stack.ts         # pile : init, push, pop, triée ?, etc.
    ├── operations.ts    # sa, sb, … rrr
    ├── parse.ts         # validation des arguments
    ├── sort.ts          # stratégie de tri
    └── push_swap.ts     # point d'entrée
```

---

## Vérification

```bash
cd TP
npm install

# Test unitaire manuel
npx tsx src/push_swap.ts 5 2 8 1 4 | npm run checker -- 5 2 8 1 4
# OK

# 50 valeurs aléatoires (configurez PUSH_SWAP si besoin)
npm run test:50

# Comptage d'opérations (bonus)
bash scripts/run_batch_50.sh 5
```

Variables utiles pour les scripts :

```bash
export PUSH_SWAP="npx tsx src/push_swap.ts"
export CHECKER="npx tsx checker.ts"
./scripts/test_checker_50.sh 3
```

---

## GitHub Copilot — consignes du TP

1. **Commentaires-prompts** JSDoc avant chaque bloc (`/** pb : dépile le sommet de a, empile sur b */`).
2. Garder les **types** (`stack.ts`, interfaces) ouverts pendant l'écriture des opérations.
3. Utiliser le **Chat** pour expliquer le tri à 3 éléments, pas pour livrer une solution non comprise.
4. **Valider** avec le checker et `tsc --noEmit`.

---

## Rendu

- Dépôt ou archive contenant votre `push_swap` exécutable avec `npx tsx src/push_swap.ts`.
- Court `README` : nom, commandes de compilation et de test.

---

## Schéma

```
     push_swap (étudiant)              checker.ts (fourni)
  ┌─────────────┐                  ┌─────────────┐
  │ argv → pile │  ops sur stdout  │ argv → pile │
  │ tri → ops   │ ───────────────► │ lit stdin   │
  └─────────────┘                  │ exécute ops │
                                   │ vérifie tri │
                                   └─────────────┘
```

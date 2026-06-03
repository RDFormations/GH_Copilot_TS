# TP — mini_push_swap (TypeScript)

## Contexte

Le **push_swap** est un exercice classique de manipulation de structures de données : trier des entiers en n'utilisant que **deux piles** (`a` et `b`) et un petit ensemble d'**opérations** (`sa`, `pb`, `ra`, etc.). On ne trie pas directement un tableau : chaque déplacement passe par les piles.

Ce TP en propose une **version réduite**, adaptée à un cours **TypeScript** et à l'usage de GitHub Copilot.

---

## Objectif

Écrire un programme **`push_swap`** qui :

1. Reçoit entre **2 et 50** entiers **strictement positifs**, tous **distincts**, en arguments.
2. Affiche sur la sortie standard une **suite d'opérations** (une par ligne).
3. Applique ces opérations sur deux piles pour que **`a` soit triée** (convention du checker fourni).

### Exemple

```bash
npm run push_swap -- 3 1 2
```

Sortie possible :

```
sa
pb
pb
pa
pa
```

Vérification avec le checker fourni :

```bash
npm run push_swap -- 3 1 2 | npm run checker -- 3 1 2
# attendu : OK
```

---

## Périmètre du TP

| Version « complète » classique      | Ce TP                                                  |
| ----------------------------------- | ------------------------------------------------------ |
| Centaines de valeurs                | **2 à 50** valeurs                                     |
| Optimisation du nombre d'opérations | **Tri correct** obligatoire ; score d'ops en **bonus** |
| Checker à écrire                    | **Checker fourni**                                     |
| Algorithmes avancés                 | Piles, opérations et **stratégie de tri à concevoir**  |

---

## Modèle des piles

- **`a`** : contient tous les nombres au départ (voir `src/lib/stack.ts` et `parse.ts`).
- **`b`** : vide au départ.

```
npm run push_swap -- 2 1 3

Pile a (bas → haut) :  2  1  3     ← sommet = 3
Pile b                : (vide)
```

Représentation : **tableau** (`Stack.values`) avec helpers typés — même sémantique que la version C du laboratoire.

---

## Opérations à implémenter

Fichier **`src/lib/operations.ts`** (fourni) — chaque opération accepte un flag `print` pour afficher sur stdout.

| Op    | Effet                                                        |
| ----- | ------------------------------------------------------------ |
| `sa`  | Échange les **2 premiers** éléments de `a` (au sommet)       |
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

Fichier **`src/lib/parse.ts`** (fourni).

| Entrée                                                                      | Comportement                       |
| --------------------------------------------------------------------------- | ---------------------------------- |
| Aucun argument                                                              | Pas de sortie, code `0`            |
| Argument non entier, `≤ 0`, doublon, ou **moins de 2 / plus de 50** valeurs | `Error\n` sur **stderr**, code `1` |

---

## Organisation du code

```
TP/
├── SUJET.md
├── package.json
├── src/
│   ├── lib/
│   │   ├── stack.ts         # pile typée
│   │   ├── operations.ts    # sa, sb, … (fourni)
│   │   └── parse.ts         # validation des arguments (fourni)
│   ├── push_swap.ts         # main + sortStacks — **à compléter**
│   └── checker.ts           # fourni : lit stdin, exécute les ops
└── correction/
    ├── sort.ts              # référence sortStacks
    └── run_push_swap.ts
```

Fonction à compléter dans **`src/push_swap.ts`** :

```typescript
export function sortStacks(a: Stack, b: Stack): void;
```

---

## Compilation et tests

```bash
cd TP
npm install

npm run push_swap -- 5 2 8 1 4 | npm run checker -- 5 2 8 1 4
# OK

npm run push_swap:corr -- 5 2 8 1 4 | npm run checker -- 5 2 8 1 4
# correction de référence

npm run test:50
```

---

## GitHub Copilot — consignes du TP

1. **Commentaires-prompts** JSDoc avant chaque bloc (`/** pb : dépile le sommet de a, empile sur b */`).
2. Garder **`stack.ts`** et **`operations.ts`** ouverts pendant l'écriture de `sortStacks`.
3. Utiliser le **Chat** pour expliquer le tri à 3 éléments, pas pour livrer une solution non comprise.
4. **Valider** avec le checker et `npm run typecheck`.

---

## Rendu

- Dépôt ou archive contenant `TP/` exécutable avec `npm install`.
- Court `README` : nom, commandes de test.

---

## Schéma

```
     push_swap                         checker
  ┌─────────────┐                  ┌─────────────┐
  │ argv → pile │  ops sur stdout  │ argv → pile │
  │ tri → ops   │ ───────────────► │ lit stdin   │
  └─────────────┘                  │ exécute ops │
                                   │ vérifie tri │
                                   └─────────────┘
```

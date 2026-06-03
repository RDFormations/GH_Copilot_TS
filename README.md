# GH Copilot — laboratoire TypeScript

Formation GitHub Copilot adaptée au **TypeScript** : cours, exercices guidés et TP mini push_swap.

## Contenu

| Dossier | Description |
| ------- | ----------- |
| `Cours.md` / `Cours.pdf` | Support de formation (6 modules) |
| `exercices/` | Fichiers à compléter avec Copilot |
| `correction/` | Solutions de référence |
| `TP/` | Mini push_swap — piles et opérations |

## Prérequis

- Node.js 20+
- VS Code + GitHub Copilot + extension TypeScript
- `npm install` à la racine et dans `TP/`

## Exercices

```bash
npm install
npm run ex:01   # tri à bulles
npm run ex:02   # structure Employee + sérialisation
npm run ex:03   # parsing CSV
npm run ex:04   # allocateur mémoire (pool)

npm run corr:01 # correction
```

## TP push_swap

```bash
cd TP
npm install
npm run build

npm run push_swap -- 3 1 2 | npm run checker -- 3 1 2
# attendu : OK

npm run test:50
```

Voir `TP/SUJET.md` pour l'énoncé complet.

# Exercices — Completions inline et contexte

> **Context** — Vous implémentez des fonctions utilitaires en **TypeScript**. Des commentaires trop vagues produisent du code générique.

## Exercice — Commentaires-prompts algorithmiques

**Topics :** sections 2.5–2.6 (Quoi/Comment/Contraintes, itération).

### Instructions

1. Créez `src/utils/algorithms.ts`.
2. **Stub A** — commentaire vague `// trier`, déclenchez une complétion (`Alt + \`), notez pourquoi la suggestion est insuffisante :

```typescript
// trier
function sortArray(arr: number[]): number[]
```

3. Remplacez par un commentaire structuré Quoi/Comment/Contraintes :

```typescript
/**
 * QUOI : Tri par insertion sur number[]
 * COMMENT : parcours O(n²), copie immuable
 * CONTRAINTES : retourne un nouveau tableau trié croissant
 */
function insertionSort(arr: number[]): number[]
```

4. **Stub B** — même démarche pour la recherche dichotomique :

```typescript
// chercher
function findIndex(arr: number[], target: number): number
```

5. Documentez le nombre d'itérations avant une suggestion acceptable pour chaque stub.

**Success criteria :** deux fonctions avec prompts précis ; algorithmes cohérents ; bilan d'itération documenté.

> **Solution** : [View solution](../correction/en/correction-02-completions-inline.md)

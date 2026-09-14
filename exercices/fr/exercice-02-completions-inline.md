# Exercices — Completions inline et contexte

> **Contexte** — Vous implémentez des fonctions utilitaires en **TypeScript**. Des commentaires trop vagues produisent du code générique.

## Exercice — Commentaires-prompts algorithmiques

**Notions mobilisées :** sections 2.5–2.6 (Quoi/Comment/Contraintes, itération).

### Énoncé

1. Créez `src/utils/sort.ts`.
2. **Stub A** — copiez le stub vague, déclenchez une complétion (`Alt + \`), notez pourquoi la suggestion est insuffisante :

```ts
// trier un tableau
export function insertionSort(values: number[]): number[] {
```

3. Remplacez par un commentaire structuré Quoi/Comment/Contraintes (tri par insertion, copie immuable) :

```ts
/**
 * QUOI : Tri par insertion sur tableau de nombres
 * COMMENT : parcours O(n²), copie immuable
 * CONTRAINTES : retourne un nouveau tableau trié croissant
 */
export function insertionSort(values: number[]): number[] {
```

4. **Stub B** — même démarche pour la recherche dichotomique (tableau trié, retourne index ou -1) :

```ts
// recherche dichotomique
export function binarySearch(values: number[], target: number): number {
```

5. Pour chaque stub, documentez le nombre d itérations avant une suggestion acceptable.

**Critère de réussite :** deux fonctions avec prompts précis ; algorithme correct ; bilan d itération documenté.

**Documentation :** [Best practices](https://docs.github.com/copilot/get-started/best-practices-for-using-github-copilot)

> **Correction** : [Accéder à la correction](../correction/fr/correction-02-completions-inline.md)

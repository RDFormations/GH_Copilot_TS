/** Tri à bulles sur un tableau de nombres en ordre croissant. Modifie le tableau en place. */
function bubbleSort(arr: number[]): void {
  // TODO: Implement bubble_sort avec Copilot
  // Commentaire-prompt : parcourir le tableau, comparer paires adjacentes, permuter si nécessaire
  void arr;
}

function printArray(arr: number[]): void {
  console.log(arr.join(" "));
}

const arr = [64, 34, 25, 12, 22, 11, 90];

console.log("Tableau avant tri :");
printArray(arr);

bubbleSort(arr);

console.log("Tableau apres tri :");
printArray(arr);

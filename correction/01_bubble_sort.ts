/** Tri à bulles sur un tableau de nombres en ordre croissant. Modifie le tableau en place. */
function bubbleSort(arr: number[]): void {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
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

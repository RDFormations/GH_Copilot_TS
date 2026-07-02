/** Bubble sort on an array of numbers in ascending order. Modifies the array in place. */
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

console.log("Array before sort:");
printArray(arr);

bubbleSort(arr);

console.log("Array after sort:");
printArray(arr);

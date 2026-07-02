/** Bubble sort on an array of numbers in ascending order. Modifies the array in place. */
function bubbleSort(arr: number[]): void {}

interface NumberCollection {
	values: number[];
	add(value: number): void;
	getAll(): number[];
}

class NumberArray implements NumberCollection {
	values: number[];

	constructor(values: number[] = []) {
		this.values = values;
	}

	add(value: number): void {
		this.values.push(value);
	}

	getAll(): number[] {
		return this.values;
	}
}

function printArray(arr: number[]): void {
	console.log(arr.join(" "));
}

const arrCollection = new NumberArray([64, 34, 25, 12, 22, 11, 90]);

console.log("Array before sort:");
printArray(arrCollection.getAll());

bubbleSort(arrCollection.getAll());

console.log("Array after sort:");
printArray(arrCollection.getAll());

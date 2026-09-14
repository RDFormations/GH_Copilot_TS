import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface Employee {
	name: string;
	age: number;
	salary: number;
}

export function employeeCreate(
	name: string,
	age: number,
	salary: number,
): Employee {
	return { name, age, salary };
}

export function employeePrint(emp: Employee): void {
	console.log(
		`Name: ${emp.name}, Age: ${emp.age}, Salary: ${emp.salary.toFixed(2)}`,
	);
}

export function employeeSerialize(emp: Employee): string {
	return `${emp.name};${emp.age};${emp.salary.toFixed(2)}`;
}

/** Parse a "name;age;salary" line and return an Employee, or null if invalid. */
export function employeeDeserialize(line: string): Employee | null {
	// Comment-prompt: split on ';', validate 3 fields, parse age (int) and salary (float)
}

const dataPath = join(tmpdir(), "gh-copilot-ts-employees.dat");

const employees = [
	employeeCreate("Alice Dupont", 32, 45000.0),
	employeeCreate("Bob Martin", 28, 38000.0),
	employeeCreate("Charlie Noir", 45, 62000.0),
];

console.log("=== Created employees ===");
employees.forEach(employeePrint);

console.log("\n=== Serialization to file ===");
mkdirSync(tmpdir(), { recursive: true });
writeFileSync(
	dataPath,
	employees.map(employeeSerialize).join("\n") + "\n",
	"utf-8",
);
console.log(`3 employees written to ${dataPath}`);

console.log("\n=== Deserialization from file ===");
const lines = readFileSync(dataPath, "utf-8").trim().split("\n");
for (const line of lines) {
	const loaded = employeeDeserialize(line);
	if (loaded) employeePrint(loaded);
}

unlinkSync(dataPath);

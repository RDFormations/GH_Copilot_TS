import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export interface Employee {
  name: string;
  age: number;
  salary: number;
}

export function employeeCreate(name: string, age: number, salary: number): Employee {
  return { name, age, salary };
}

export function employeePrint(emp: Employee): void {
  console.log(`Name: ${emp.name}, Age: ${emp.age}, Salary: ${emp.salary.toFixed(2)}`);
}

export function employeeSerialize(emp: Employee): string {
  return `${emp.name};${emp.age};${emp.salary.toFixed(2)}`;
}

export function employeeDeserialize(line: string): Employee | null {
  const parts = line.trim().split(";");
  if (parts.length !== 3) return null;

  const name = parts[0];
  const age = Number.parseInt(parts[1], 10);
  const salary = Number.parseFloat(parts[2]);

  if (!name || Number.isNaN(age) || Number.isNaN(salary)) return null;

  return { name, age, salary };
}

const dataPath = join(tmpdir(), "gh-copilot-ts-employees.dat");

const employees = [
  employeeCreate("Alice Dupont", 32, 45000.0),
  employeeCreate("Bob Martin", 28, 38000.0),
  employeeCreate("Charlie Noir", 45, 62000.0),
];

console.log("=== Employes crees ===");
employees.forEach(employeePrint);

console.log("\n=== Serialisation dans fichier ===");
mkdirSync(tmpdir(), { recursive: true });
writeFileSync(dataPath, employees.map(employeeSerialize).join("\n") + "\n", "utf-8");
console.log(`3 employes ecrits dans ${dataPath}`);

console.log("\n=== Deserialisation depuis fichier ===");
const lines = readFileSync(dataPath, "utf-8").trim().split("\n");
for (const line of lines) {
  const loaded = employeeDeserialize(line);
  if (loaded) employeePrint(loaded);
}

unlinkSync(dataPath);

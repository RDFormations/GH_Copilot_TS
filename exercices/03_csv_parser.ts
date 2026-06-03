import { readFileSync, unlinkSync, writeFileSync } from "node:fs";

export interface Employee {
  name: string;
  age: number;
  salary: number;
}

/** Parse une ligne CSV en tokens (split sur virgule). */
export function parseCsvLine(line: string): string[] {
  // TODO: Implement avec Copilot
  // Commentaire-prompt : split sur ',', trim chaque token, ignorer ligne vide
  void line;
  return [];
}

export function tokenToEmployee(tokens: string[]): Employee {
  return {
    name: tokens[0],
    age: Number.parseInt(tokens[1], 10),
    salary: Number.parseFloat(tokens[2]),
  };
}

export function insertEmployee(
  employees: Employee[],
  emp: Employee,
): Employee[] {
  return [...employees, emp];
}

const filename = "employees.csv";

writeFileSync(
  filename,
  [
    "Alice Dupont,32,45000.00",
    "Bob Martin,28,38000.50",
    "Charlie Noir,45,62000.75",
    "Diana Rose,37,51000.00",
  ].join("\n") + "\n",
  "utf-8",
);

const content = readFileSync(filename, "utf-8");
let employees: Employee[] = [];

for (const line of content.trim().split("\n")) {
  const tokens = parseCsvLine(line);
  if (tokens.length < 3) continue;
  employees = insertEmployee(employees, tokenToEmployee(tokens));
}

console.log(`=== ${employees.length} employes charges depuis ${filename} ===\n`);
employees.forEach((emp, i) => {
  console.log(
    `  [${i}] ${emp.name.padEnd(20)} | age: ${String(emp.age).padStart(2)} | salaire: ${emp.salary.toFixed(2)}`,
  );
});

unlinkSync(filename);

interface Employee {
	name: string;
	age: number;
	salary: number;
}

function calculateAverageSalary(employees: Employee[]): number {
	if (employees.length === 0) {
		return 0;
	}
	const totalSalary = employees.reduce(
		(sum, employee) => sum + employee.salary,
		0,
	);
	return totalSalary / employees.length;
}

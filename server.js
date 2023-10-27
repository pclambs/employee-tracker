import inquirer from 'inquirer'
import db from './db/connection.js'

db.connect(err => {
	if (err) throw err
	console.log('Database connected.')
	employee_tracker()
})

export const employee_tracker = () => {
	inquirer.prompt([{
		type: "list",
		name: "prompt",
		message: `What would you like to do?`,
		choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
	}]).then((answers) => {
		if (answers.prompt === 'View All Departments') {
				db.query(`SELECT * FROM department`, (err, result) => {
					if (err) throw err
					console.log("Viewing All Departments: ")
					console.table(result)
					employee_tracker()
				})
		} else if (answers.prompt === 'View All Roles') {
				db.query(`SELECT * FROM role`, (err, result) => {
					if (err) throw err
					console.log("Viewing All Roles: ")
					console.table(result)
					employee_tracker()
				})
		} else if (answers.prompt === 'View All Employees') {
				db.query(`SELECT * FROM employee`, (err, result) => {
					if (err) throw err
					console.log("Viewing All Employees: ")
					console.table(result)
					employee_tracker()
				})
		} else if (answers.prompt === 'Add A Department') {
				inquirer.prompt([{
					type: 'input',
					name: 'department',
					message: 'What is the name of the department?',
					validate: departmentInput => {
						if (departmentInput) {
							return true;
						} else {
							console.log('Please Add A Department!');
							return false;
						}
					}
				}]).then((answers) => {
					db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
						if (err) throw err
						console.log(`Added ${answers.department} to the database.`)
						employee_tracker()
					})
				})
		} else if (answers.prompt === 'Add A Role') {
			db.query(`SELECT * FROM department`, (err, result) => {
				if (err) throw err

				inquirer.prompt([
					{
						// add a role
						type: 'input',
						name: 'role',
						message: 'What is the name of the role?',
						validate: roleInput => {
							if (roleInput) {
								return true
							} else {
								console.log('Please Add A Role!')
								return false
							}
						}
					},
					{
						// add salary
						type: 'input',
						name: 'salary',
						message: 'What is the salary of the role?',
						validate: salaryInput => {
							if (salaryInput) {
								return true
							} else {
								console.log('Please Add A Salary!')
								return false
							}
						}
					},
					{
						// dept
						type: 'list',
						name: 'department',
						message: 'Which department does the role belong to?',
						choices: () => {
							var array = []
							for (var i = 0; i < result.length; i++) {
								array.push(result[i].name)
							}
							return array
						}
					}
				]).then((answers) => {
					// compare results
					for (var i = 0; i < result.length; i++) {
						if (result[i].name === answers.department) {
							var department = result[i]
						}
					}

					db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
						if (err) throw err
						console.log(`Added ${answers.role} to the database.`)
						employee_tracker()
					})
				})
			})
		} else if (answers.prompt === 'Add An Employee') {
			// get roles to present as choices
			db.query(`SELECT * FROM role`, (err, result) => {
				if (err) throw err

				db.query(`SELECT * FROM employee`, (err, employees) => {
					if (err) throw err;


					inquirer.prompt([
						{
							type: 'input',
							name: 'first_name',
							message: 'What is the employees first name?',
							validate: input => !!input || 'Please enter a first name.'
						},
						{
							type: 'input',
							name: 'last_name',
							message: 'What is the employees last name?',
							validate: input => !!input || 'Please enter a last name.'
						},
						{
							type: 'list',
							name: 'role_id',
							message: 'What is the employees role?',
							choices: result.map(role => ({
								name: role.title,
								value: role.id
							}))
						},
						{
							type: 'list',
							name: 'manager_id',
							message: 'Who is the employees manager?',
							choices: employees.map(employee => ({
								name: `${employee.first_name} ${employee.last_name}`,
								value: employee.id
							})).concat({ name: 'None', value: null })
						}
					]).then((answers) => {
						db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, 
							[answers.first_name, answers.last_name, answers.role_id, answers.manager_id], 
							(err, result) => {
								if (err) throw err
								console.log(`Added ${answers.first_name} ${answers.last_name} to the database.`)
								employee_tracker()
							}
						)
					})
				})
			})
		} else if (answers.prompt === 'Update An Employee Role') {
			db.query(`SELECT * FROM employee`, (err, employees) => {
				if (err) throw err

				db.query(`SELECT * FROM role`, (err, roles) => {
					if (err) throw err

					inquirer.prompt([
							{
								type: 'list',
								name: 'employee_id',
								message: 'Select an employee to update:',
								choices: employees.map(employee => ({
									name: `${employee.first_name} ${employee.last_name}`,
									value: employee.id
								}))
							},
							{
								type: 'list',
								name: 'role_id',
								message: 'Select the new role for the employee:',
								choices: roles.map(role => ({
									name: role.title,
									value: role.id
								}))
							}
					]).then(answers => {
						db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
							[answers.role_id, answers.employee_id], 
							(err, result) => {
								if (err) throw err
								console.log(`Employee's role has been updated.`)
								employee_tracker()
							}
						)
					})
				})
			})
		} else if (answers.prompt === 'Log Out') {
			db.end()
			console.log("Peace!")
		}
	})
}
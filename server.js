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

        } else if (answers.prompt === 'Add A Role') {

        } else if (answers.prompt === 'Add An Employee') {

        } else if (answers.prompt === 'Update An Employee Role') {

        } else if (answers.prompt === 'Log Out') {
            db.end()
            console.log("Peace!")
        }
    })
}


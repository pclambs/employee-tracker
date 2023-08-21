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

    })
}


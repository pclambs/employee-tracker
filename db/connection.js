import mysql from 'mysql2'

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'employee_tracker_db'
})

export default db
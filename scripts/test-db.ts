import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'

async function testConnection() {
  console.log('Testing MySQL connection...\n')

  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '9090',
    database: 'timer_ps'
  })

  try {
    // Test connection
    await connection.ping()
    console.log('✅ Connected to MySQL successfully!\n')

    // Generate password hash for '12345'
    const password = '12345'
    const hash = await bcrypt.hash(password, 10)
    console.log(`Password hash for '${password}':`)
    console.log(hash)
    console.log()

    // Update admin user
    await connection.execute(
      'UPDATE users SET password_hash = ? WHERE username = ?',
      [hash, 'admin']
    )
    console.log('✅ Admin password updated!\n')

    // Show users
    const [users] = await connection.query('SELECT id, username FROM users')
    console.log('Users in database:')
    console.table(users)

  } catch (error: any) {
    console.error('❌ Error:', error.message)
  } finally {
    await connection.end()
  }
}

testConnection()

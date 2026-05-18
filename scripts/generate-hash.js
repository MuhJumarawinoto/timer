import bcrypt from 'bcrypt'

const password = '12345'
const hash = await bcrypt.hash(password, 10)

console.log('Password:', password)
console.log('Hash:', hash)
console.log('')
console.log('Copy hash ini ke setup.sql:')
console.log(`'admin', '${hash}'`)

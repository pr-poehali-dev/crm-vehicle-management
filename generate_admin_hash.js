const bcrypt = require('bcryptjs');

const password = 'Admin2025!Secure';
const saltRounds = 12;

const hash = bcrypt.hashSync(password, saltRounds);
console.log('Password:', password);
console.log('Hash:', hash);

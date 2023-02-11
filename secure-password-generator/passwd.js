const crypto = require('crypto');

const selectedLength = process.argv[2];

function generatePassword(selectedLength) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
  let password = '';
  let bytes = crypto.randomBytes(selectedLength);
  for (let i = 0; i < bytes.length; i++) {
    let index = bytes[i] % charset.length;
    password += charset[index];
  }
  return password;
}

console.log(generatePassword(parseInt(selectedLength)));
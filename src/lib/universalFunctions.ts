const saltRounds = 10;
const bcrypt = require('bcrypt');

export const generate_otp = async () => {
  try {
    return Math.floor(100000 + Math.random() * 900000);
  } catch (err) {
    throw err;
  }
};

export const encryptData = async (password) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}


export const compareBcryptPassword = async (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword)
}
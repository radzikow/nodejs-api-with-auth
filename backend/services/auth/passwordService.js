const bcrypt = require('bcryptjs')

const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password)
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

module.exports = {
  comparePassword,
  hashPassword
}
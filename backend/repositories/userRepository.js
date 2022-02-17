const {
  hashPassword
} = require('../services/auth/passwordService')

const User = require('../models/userModel')

module.exports = {
  findByEmail: async (email) => await User.findOne({
    email
  }),
  findById: async (id) => await User.findById(id).select('-password'),
  insert: async (user) => {
    return await User.create({
      name: user.name,
      email: user.email,
      password: await hashPassword(user.password)
    })
  }
}
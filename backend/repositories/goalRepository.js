const {
  hashPassword
} = require('../services/auth/passwordService')

const Goal = require('../models/goalModel')

module.exports = {
  findById: async (id) => await Goal.findById(id),
  findByUserId: async (id) => await Goal.find({
    user: id
  }),
  insert: async (goal) => {
    return await Goal.create({
      text: goal.text,
      user: goal.user
    })
  },
  update: async (id, goal) => {
    return await Goal.findByIdAndUpdate(id, goal, {
      new: true
    })
  }
}
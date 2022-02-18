const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const { findById: findUserById } = require('../repositories/userRepository')

const { findById: findGoalById, findByUserId: getGoalsByUserId, insert: createGoal, update: editGoal } = require('../repositories/goalRepository')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await getGoalsByUserId(req.user.id)

  res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Text field is required.')
  }

  const goal = await createGoal({
    text: req.body.text,
    user: req.user.id
  })

  res.status(201).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await findGoalById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found.')
  }
  
  const user = await findUserById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }

  const updatedGoal = await editGoal(req.params.id, req.body)

  res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await findGoalById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found.')
  }

  const user = await findUserById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
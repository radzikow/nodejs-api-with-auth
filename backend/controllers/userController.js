const asyncHandler = require('express-async-handler')
const { comparePassword } = require('../services/auth/passwordService')

const { findByEmail: findUserByEmail, insert: createUser } = require('../repositories/userRepository')

const { generateToken } = require('../services/auth/tokenService')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill all the required fields.')
  }

  if (await findUserByEmail(email)) {
    res.status(400)
    throw new Error('User already exists.')
  }

  const user = await createUser({name, email, password})

  if (user) {
    res.status(201)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await findUserByEmail(email)

  if (user && await comparePassword(password, user)) {
    res.status(200)
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials.')
  }
})

const getUser = asyncHandler(async (req, res) => {
  res.status(200)
  res.json({
    message: 'Get me',
    user: req.user
  })
})

module.exports = {
  registerUser,
  loginUser,
  getUser
}
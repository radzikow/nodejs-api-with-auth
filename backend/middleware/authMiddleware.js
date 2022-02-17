const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const { findById: findUserById } = require('../repositories/userRepository')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = await findUserById(payload.id)
        next();
      })
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error('User not authorized.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token provided')
  }
})

module.exports = {
  protect
}
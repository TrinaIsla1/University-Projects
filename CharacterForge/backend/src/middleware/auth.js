import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt.js'

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export const errorHandler = (err, req, res, next) => {
  console.error(err)
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' })
}

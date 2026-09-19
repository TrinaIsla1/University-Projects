import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt.js'

const router = express.Router()

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' })
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      })
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    })
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already registered' })
    }

    // Password hashing happens automatically in User's pre('save') hook.
    const user = await User.create({ username, email, password })
    const token = signToken(user._id)

    res.status(201).json({
      token,
      userId: user._id,
      username: user.username,
      message: 'Registered successfully',
    })
  } catch (error) {
    console.error('Register error:', error)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email or username already registered' })
    }
    res.status(500).json({ message: 'Registration failed' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const passwordMatches = await user.comparePassword(password)
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = signToken(user._id)

    res.json({
      token,
      userId: user._id,
      username: user.username,
      message: 'Logged in successfully',
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Login failed' })
  }
})

export default router

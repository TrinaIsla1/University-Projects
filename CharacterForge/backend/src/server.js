import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.js'
import characterRoutes from './routes/characters.js'
import inventoryRoutes from './routes/inventory.js'
import shopRoutes from './routes/shop.js'
import battleRoutes from './routes/battles.js'
import leaderboardRoutes from './routes/leaderboard.js'
import classRoutes from './routes/classes.js'
import skillRoutes from './routes/skills.js'
import achievementRoutes from './routes/achievements.js'
import { connectDB } from './models/index.js'

dotenv.config()
const app = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Basic brute-force protection on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: 'Too many attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Connect to database
connectDB()

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Routes
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/characters', characterRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/shop', shopRoutes)
app.use('/api/battles', battleRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/achievements', achievementRoutes)

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`CharacterForge API running on port ${PORT}`)
})

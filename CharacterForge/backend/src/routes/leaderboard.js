import express from 'express'
import Character from '../models/Character.js'

const router = express.Router()

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Character.find()
      .sort({ level: -1, experience: -1 })
      .limit(50)

    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

import express from 'express'
import Achievement from '../models/Achievement.js'

const router = express.Router()

// Reference data — public, no auth required.
// Note: nothing currently awards these to a user automatically; this only
// exposes the catalog of achievements that exist so the frontend can show
// what's available. Awarding logic (checking `condition` against a user's
// progress and appending to User.achievements) is not implemented yet.
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find()
    res.json(achievements)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

import express from 'express'
import Skill from '../models/Skill.js'

const router = express.Router()

// Reference data — public, no auth required.
// Supports ?characterClass=warrior&maxLevel=5 to fetch only the skills
// a given character has actually unlocked.
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.characterClass) {
      filter.characterClass = req.query.characterClass
    }
    if (req.query.maxLevel) {
      const maxLevel = Number(req.query.maxLevel)
      if (!Number.isNaN(maxLevel)) {
        filter.unlockLevel = { $lte: maxLevel }
      }
    }

    const skills = await Skill.find(filter).sort({ unlockLevel: 1 })
    res.json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

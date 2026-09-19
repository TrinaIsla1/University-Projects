import express from 'express'
import Character from '../models/Character.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Get all characters for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.userId })
    res.json(characters)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get single character
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
    if (!character) {
      return res.status(404).json({ message: 'Character not found' })
    }
    if (character.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this character' })
    }
    res.json(character)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create character
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.body.stats || typeof req.body.stats.health !== 'number') {
      return res.status(400).json({ message: 'Character stats.health is required' })
    }

    const character = new Character({
      userId: req.userId,
      ...req.body,
      currentHealth: req.body.stats.health * 10,
    })
    await character.save()
    res.status(201).json(character)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update character
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
    if (!character) {
      return res.status(404).json({ message: 'Character not found' })
    }
    if (character.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this character' })
    }

    Object.assign(character, req.body, { updatedAt: new Date() })
    await character.save()
    res.json(character)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete character
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const character = await Character.findById(req.params.id)
    if (!character) {
      return res.status(404).json({ message: 'Character not found' })
    }
    if (character.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this character' })
    }

    await character.deleteOne()
    res.json({ message: 'Character deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

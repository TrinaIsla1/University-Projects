import express from 'express'
import Item from '../models/Item.js'
import Inventory from '../models/Inventory.js'
import Character from '../models/Character.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Get all shop items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find()
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Purchase item
router.post('/purchase', authMiddleware, async (req, res) => {
  try {
    const { itemId, characterId } = req.body

    const [character, item] = await Promise.all([
      Character.findById(characterId),
      Item.findById(itemId),
    ])

    if (!character) {
      return res.status(404).json({ message: 'Character not found' })
    }
    if (character.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to use this character' })
    }
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    if (character.gold < item.price) {
      return res.status(400).json({ message: 'Not enough gold' })
    }

    character.gold -= item.price
    await character.save()

    await Inventory.create({ characterId, itemId })

    res.json({ message: 'Item purchased', character })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

import express from 'express'
import Inventory from '../models/Inventory.js'
import Character from '../models/Character.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

async function assertOwnsCharacter(characterId, userId) {
  const character = await Character.findById(characterId)
  if (!character) {
    return { error: { status: 404, message: 'Character not found' } }
  }
  if (character.userId.toString() !== userId) {
    return { error: { status: 403, message: 'Not authorized to view this character' } }
  }
  return { character }
}

// Get inventory for a character
router.get('/:characterId', authMiddleware, async (req, res) => {
  try {
    const { error } = await assertOwnsCharacter(req.params.characterId, req.userId)
    if (error) return res.status(error.status).json({ message: error.message })

    const inventory = await Inventory.find({
      characterId: req.params.characterId,
    }).populate('itemId')
    res.json(inventory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add item to inventory
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { characterId, itemId, quantity } = req.body

    const { error } = await assertOwnsCharacter(characterId, req.userId)
    if (error) return res.status(error.status).json({ message: error.message })

    let inventoryItem = await Inventory.findOne({ characterId, itemId })

    if (inventoryItem) {
      inventoryItem.quantity += quantity || 1
      await inventoryItem.save()
    } else {
      inventoryItem = new Inventory({
        characterId,
        itemId,
        quantity: quantity || 1,
      })
      await inventoryItem.save()
    }

    res.status(201).json(inventoryItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Equip item
router.put('/:inventoryId/equip', authMiddleware, async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.inventoryId)
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' })
    }

    const { error } = await assertOwnsCharacter(inventoryItem.characterId, req.userId)
    if (error) return res.status(error.status).json({ message: error.message })

    inventoryItem.equipped = true
    await inventoryItem.save()
    res.json(inventoryItem)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

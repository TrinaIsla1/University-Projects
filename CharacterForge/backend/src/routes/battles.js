import express from 'express'
import Battle from '../models/Battle.js'
import Character from '../models/Character.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Generate random enemy
const generateEnemy = () => {
  const enemies = [
    { name: 'Goblin', health: 50, attack: 15 },
    { name: 'Orc', health: 80, attack: 25 },
    { name: 'Dragon', health: 150, attack: 40 },
    { name: 'Skeleton', health: 60, attack: 20 },
    { name: 'Troll', health: 120, attack: 30 },
  ]
  return enemies[Math.floor(Math.random() * enemies.length)]
}

// Shape the response the same way from both /start and /attack, so the
// frontend never has to handle two different battle payload formats.
function serializeBattle(battle, character) {
  return {
    _id: battle._id,
    status: battle.status,
    result: battle.result || null,
    experienceEarned: battle.experienceEarned || 0,
    goldEarned: battle.goldEarned || 0,
    character: {
      health: Math.max(battle.characterHealth, 0),
      maxHealth: character.stats.health * 10,
    },
    enemy: {
      name: battle.enemyName,
      health: Math.max(battle.enemyHealth, 0),
      maxHealth: battle.enemyMaxHealth,
    },
  }
}

// Start battle
router.post('/start', authMiddleware, async (req, res) => {
  try {
    const { characterId } = req.body
    if (!characterId) {
      return res.status(400).json({ message: 'characterId is required' })
    }

    const character = await Character.findById(characterId)
    if (!character) {
      return res.status(404).json({ message: 'Character not found' })
    }
    if (character.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to use this character' })
    }

    const enemy = generateEnemy()

    const battle = new Battle({
      characterId,
      enemyId: `enemy_${Date.now()}`,
      enemyName: enemy.name,
      characterHealth: character.currentHealth,
      enemyHealth: enemy.health,
      enemyMaxHealth: enemy.health,
      status: 'in_progress',
    })

    await battle.save()
    res.status(201).json({ battle: serializeBattle(battle, character) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Attack in battle
router.post('/attack', authMiddleware, async (req, res) => {
  try {
    const { battleId } = req.body

    const battle = await Battle.findById(battleId)
    if (!battle) {
      return res.status(404).json({ message: 'Battle not found' })
    }
    if (battle.status === 'completed') {
      return res.status(400).json({ message: 'This battle has already ended' })
    }

    const character = await Character.findById(battle.characterId)
    if (!character) {
      return res.status(404).json({ message: 'Character not found' })
    }
    if (character.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to act in this battle' })
    }

    const characterDamage =
      character.stats.attack + Math.floor(Math.random() * 10)
    const enemyDamage = Math.floor(Math.random() * 20)

    battle.enemyHealth -= characterDamage
    battle.characterHealth -= enemyDamage

    let log = `You dealt ${characterDamage} damage. Enemy dealt ${enemyDamage} damage.`

    if (battle.enemyHealth <= 0) {
      battle.status = 'completed'
      battle.result = 'win'
      battle.experienceEarned = Math.floor(Math.random() * 100) + 50
      battle.goldEarned = Math.floor(Math.random() * 50) + 20
      log += ` Victory! You earned ${battle.experienceEarned} EXP and ${battle.goldEarned} gold.`

      character.experience += battle.experienceEarned
      character.gold += battle.goldEarned
      if (character.experience >= character.level * 100) {
        character.level += 1
        character.experience = 0
      }
      await character.save()
    } else if (battle.characterHealth <= 0) {
      battle.status = 'completed'
      battle.result = 'loss'
      log += ` Defeat!`
    }

    await battle.save()
    res.json({ battle: serializeBattle(battle, character), log })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

// Seeds the database with starter reference data: shop items, classes,
// skills, and achievements. Run with `npm run seed`.
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Item from './models/Item.js'
import Class from './models/Class.js'
import Skill from './models/Skill.js'
import Achievement from './models/Achievement.js'

dotenv.config()

const items = [
  { name: 'Iron Sword', type: 'weapon', price: 50, description: 'A sturdy blade for new adventurers.', bonus: { stat: 'attack', value: 5 } },
  { name: 'Steel Sword', type: 'weapon', price: 150, description: 'Sharper and stronger than iron.', bonus: { stat: 'attack', value: 12 } },
  { name: 'Wooden Shield', type: 'armor', price: 40, description: 'Basic protection against enemy blows.', bonus: { stat: 'defense', value: 4 } },
  { name: 'Chainmail Armor', type: 'armor', price: 120, description: 'Flexible metal armor offering solid defense.', bonus: { stat: 'defense', value: 10 } },
  { name: "Mage's Robe", type: 'armor', price: 100, description: 'Enchanted robes that amplify magical power.', bonus: { stat: 'magic', value: 10 } },
  { name: 'Health Potion', type: 'consumable', price: 20, description: 'Restores health during battle.', bonus: { stat: 'health', value: 30 } },
  { name: "Assassin's Dagger", type: 'weapon', price: 90, description: 'A swift blade favoring critical strikes.', bonus: { stat: 'criticalChance', value: 8 } },
  { name: "Archer's Longbow", type: 'weapon', price: 110, description: 'Improves accuracy at range.', bonus: { stat: 'accuracy', value: 10 } },
]

// `name` intentionally matches the lowercase slug used by Character.class
// (and CharacterCreator's CLASSES list) so the frontend can join on it.
const classes = [
  { name: 'warrior', description: 'A frontline fighter built to take and deal heavy physical damage.', baseStats: { health: 12, attack: 9, defense: 10, magic: 2, speed: 5 }, uniqueAbility: 'Shield Bash', abilityDescription: 'Stuns the enemy for one turn and deals minor damage.' },
  { name: 'mage', description: 'A spellcaster who trades durability for devastating magic damage.', baseStats: { health: 6, attack: 3, defense: 3, magic: 12, speed: 6 }, uniqueAbility: 'Fireball', abilityDescription: 'Deals heavy magic damage to a single enemy.' },
  { name: 'archer', description: 'A precise ranged attacker with high accuracy and speed.', baseStats: { health: 7, attack: 8, defense: 4, magic: 2, speed: 11 }, uniqueAbility: 'Piercing Shot', abilityDescription: 'Ignores a portion of enemy defense.' },
  { name: 'assassin', description: 'A fast striker specializing in critical hits.', baseStats: { health: 6, attack: 10, defense: 3, magic: 2, speed: 12 }, uniqueAbility: 'Backstab', abilityDescription: 'Guarantees a critical hit on the next attack.' },
  { name: 'paladin', description: 'A defensive class that blends combat with healing.', baseStats: { health: 11, attack: 6, defense: 11, magic: 6, speed: 4 }, uniqueAbility: 'Divine Shield', abilityDescription: 'Reduces incoming damage for two turns.' },
  { name: 'healer', description: 'A support class focused on sustaining the party.', baseStats: { health: 7, attack: 3, defense: 5, magic: 10, speed: 6 }, uniqueAbility: 'Healing Light', abilityDescription: 'Restores a large amount of health.' },
]

const skills = [
  { name: 'Shield Bash', characterClass: 'warrior', damage: 15, manaCost: 10, cooldown: 2, description: 'Stuns the enemy and deals minor damage.', unlockLevel: 1 },
  { name: 'Berserker Rage', characterClass: 'warrior', damage: 30, manaCost: 25, cooldown: 4, description: 'A powerful attack that ignores some enemy defense.', unlockLevel: 5 },
  { name: 'Fireball', characterClass: 'mage', damage: 25, manaCost: 20, cooldown: 2, description: 'Deals heavy magic damage to a single enemy.', unlockLevel: 1 },
  { name: 'Frost Nova', characterClass: 'mage', damage: 35, manaCost: 30, cooldown: 4, description: 'Deals area magic damage and slows the enemy.', unlockLevel: 5 },
  { name: 'Piercing Shot', characterClass: 'archer', damage: 20, manaCost: 12, cooldown: 2, description: 'Ignores a portion of enemy defense.', unlockLevel: 1 },
  { name: 'Rain of Arrows', characterClass: 'archer', damage: 30, manaCost: 25, cooldown: 4, description: 'Fires multiple arrows for heavy damage.', unlockLevel: 5 },
  { name: 'Backstab', characterClass: 'assassin', damage: 28, manaCost: 15, cooldown: 2, description: 'Guarantees a critical hit on the next attack.', unlockLevel: 1 },
  { name: 'Shadow Strike', characterClass: 'assassin', damage: 38, manaCost: 28, cooldown: 4, description: 'A devastating surprise attack.', unlockLevel: 5 },
  { name: 'Divine Shield', characterClass: 'paladin', damage: 0, manaCost: 18, cooldown: 3, description: 'Reduces incoming damage for two turns.', unlockLevel: 1 },
  { name: 'Smite', characterClass: 'paladin', damage: 22, manaCost: 20, cooldown: 2, description: 'A holy strike that deals bonus damage.', unlockLevel: 5 },
  { name: 'Healing Light', characterClass: 'healer', damage: 0, manaCost: 20, cooldown: 2, description: 'Restores a large amount of health.', unlockLevel: 1 },
  { name: 'Purify', characterClass: 'healer', damage: 0, manaCost: 25, cooldown: 3, description: 'Removes negative effects and heals over time.', unlockLevel: 5 },
]

const achievements = [
  { name: 'First Blood', description: 'Win your first battle.', icon: '🩸', condition: 'win_1_battle', reward: 50 },
  { name: 'Veteran Fighter', description: 'Win 10 battles.', icon: '⚔️', condition: 'win_10_battles', reward: 200 },
  { name: 'Level Up', description: 'Reach character level 5.', icon: '📈', condition: 'reach_level_5', reward: 100 },
  { name: 'Well Equipped', description: 'Own 5 items in your inventory.', icon: '🎒', condition: 'own_5_items', reward: 75 },
  { name: 'Big Spender', description: 'Spend 500 gold in the shop.', icon: '💰', condition: 'spend_500_gold', reward: 150 },
]

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/characterforge',
    )
    console.log('✅ MongoDB connected')

    await Promise.all([
      Item.deleteMany({}),
      Class.deleteMany({}),
      Skill.deleteMany({}),
      Achievement.deleteMany({}),
    ])

    await Item.insertMany(items)
    await Class.insertMany(classes)
    await Skill.insertMany(skills)
    await Achievement.insertMany(achievements)

    console.log(
      `✅ Seeded ${items.length} items, ${classes.length} classes, ${skills.length} skills, ${achievements.length} achievements`,
    )
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seed()

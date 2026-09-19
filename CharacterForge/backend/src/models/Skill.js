import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  characterClass: {
    type: String,
    enum: ['warrior', 'mage', 'archer', 'assassin', 'paladin', 'healer'],
  },
  damage: Number,
  manaCost: Number,
  cooldown: Number,
  description: String,
  unlockLevel: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Skill', skillSchema)

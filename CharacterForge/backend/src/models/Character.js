import mongoose from 'mongoose'

const characterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  class: {
    type: String,
    enum: ['warrior', 'mage', 'archer', 'assassin', 'paladin', 'healer'],
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  gold: {
    type: Number,
    default: 0,
  },
  personality: String,
  backstory: String,
  appearance: {
    hairStyle: String,
    hairColor: String,
    skinTone: String,
    eyeColor: String,
    outfit: String,
    accessories: String,
  },
  stats: {
    health: Number,
    attack: Number,
    defense: Number,
    magic: Number,
    speed: Number,
    accuracy: Number,
    criticalChance: Number,
  },
  currentHealth: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Character', characterSchema)

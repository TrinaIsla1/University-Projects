import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  baseStats: {
    health: Number,
    attack: Number,
    defense: Number,
    magic: Number,
    speed: Number,
  },
  uniqueAbility: String,
  abilityDescription: String,
})

export default mongoose.model('Class', classSchema)

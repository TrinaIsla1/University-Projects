import mongoose from 'mongoose'

const battleSchema = new mongoose.Schema({
  characterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
  enemyId: {
    type: String,
    required: true,
  },
  enemyName: String,
  characterHealth: Number,
  enemyHealth: Number,
  enemyMaxHealth: Number,
  result: {
    type: String,
    enum: ['win', 'loss', 'draw'],
  },
  experienceEarned: Number,
  goldEarned: Number,
  itemsDropped: [mongoose.Schema.Types.ObjectId],
  status: {
    type: String,
    enum: ['in_progress', 'completed'],
    default: 'in_progress',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: Date,
})

export default mongoose.model('Battle', battleSchema)

import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  icon: String,
  condition: String,
  reward: Number,
})

export default mongoose.model('Achievement', achievementSchema)

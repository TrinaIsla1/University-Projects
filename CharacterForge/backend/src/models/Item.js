import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['weapon', 'armor', 'consumable'],
    required: true,
  },
  price: Number,
  description: String,
  bonus: {
    stat: String,
    value: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Item', itemSchema)

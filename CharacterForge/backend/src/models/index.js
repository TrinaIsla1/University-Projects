import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/characterforge',
    )
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    console.warn('⚠️ Server continuing without database connection')
    // Don't exit - allow server to run in demo/development mode
  }
}

export { default as User } from './User.js'
export { default as Character } from './Character.js'
export { default as Class } from './Class.js'
export { default as Item } from './Item.js'
export { default as Inventory } from './Inventory.js'
export { default as Skill } from './Skill.js'
export { default as Battle } from './Battle.js'
export { default as Achievement } from './Achievement.js'

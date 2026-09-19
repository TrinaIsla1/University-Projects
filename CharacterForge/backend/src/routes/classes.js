import express from 'express'
import Class from '../models/Class.js'

const router = express.Router()

// Reference data — public, no auth required
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find()
    res.json(classes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router

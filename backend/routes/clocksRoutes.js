import express from 'express'
const router = express.Router()
import { deleteClock } from '../controllers/ClockController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/:id').delete(protect, admin, deleteClock)

export default router

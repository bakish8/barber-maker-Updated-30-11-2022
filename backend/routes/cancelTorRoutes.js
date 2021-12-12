import express from 'express'
const router = express.Router()
import { CancelTor } from '../controllers/makeTorController.js'
import { protect } from '../middleware/authMiddleware.js'
router.route('/:id/:uid').put(protect, CancelTor)
export default router

import express from 'express'
const router = express.Router()
import { CancelTor } from '../controllers/makeTorController.js'
import { deleteAVILABLEclocksforthisday } from '../controllers/workingDayController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/:id/:uid').put(protect, CancelTor)

router
  .route('/deleteavilable/:id')
  .delete(protect, admin, deleteAVILABLEclocksforthisday)

export default router

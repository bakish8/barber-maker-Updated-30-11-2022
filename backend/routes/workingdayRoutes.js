import express from 'express'
const router = express.Router()
import {
  createWorkingDay,
  getWorkingDayById,
  getWorkingDays,
  deleteWorkingDay,
  addClock,
  getClocks,
  deleteClock,
} from '../controllers/workingDayController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/:id/:cid').delete(protect, admin, deleteClock)

router.route('/').post(createWorkingDay).get(protect, admin, getWorkingDays)

router.route('/:id/deets').get(protect, admin, getWorkingDayById)

router
  .route('/:id')
  .get(protect, admin, getClocks)
  .post(protect, admin, addClock)
  .delete(protect, admin, deleteWorkingDay)

export default router

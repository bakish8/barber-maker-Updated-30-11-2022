import express from 'express'
const router = express.Router()
import {
  CancelNotificationMaker,
  getNotifications,
  MakeAllWatch,
} from '../controllers/notificationsController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router
  .route('/:id')
  .post(CancelNotificationMaker)
  .get(getNotifications)
  .put(MakeAllWatch)

export default router

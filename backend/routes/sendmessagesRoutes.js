import express from 'express'
const router = express.Router()
import {
  SendSMS,
  SendCANCELSMS,
  SendSMSforReset,
} from '../controllers/makeTorController.js'
export default router
router.route('/:id/:uid').post(SendSMS).put(SendCANCELSMS)
router.route('/:phone').post(SendSMSforReset)

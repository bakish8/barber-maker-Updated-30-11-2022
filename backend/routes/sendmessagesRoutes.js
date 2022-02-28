import express from 'express'
const router = express.Router()
import {
  SendSMS,
  SendCANCELSMS,
  SendSMSforReset,
  Send_WHATSAPP_message,
} from '../controllers/makeTorController.js'
export default router
router.route('/:id/:uid').post(SendSMS).put(SendCANCELSMS)
router.route('/whatsapp').post(Send_WHATSAPP_message)

router.route('/:phone').post(SendSMSforReset)

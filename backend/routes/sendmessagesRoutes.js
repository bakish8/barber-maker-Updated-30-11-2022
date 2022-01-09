import express from 'express'
const router = express.Router()
import { SendSMS, SendCANCELSMS } from '../controllers/makeTorController.js'
//router.route('/').post(SendSMS)
export default router
router.route('/:id/:uid').post(SendSMS).put(SendCANCELSMS)

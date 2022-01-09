import express from 'express'
const router = express.Router()
import {
  AppointmentsMake,
  BookMEonGoogleCalenderControllerAction,
} from '../controllers/AppointmentsController.js'

router.route('/:id/:uid').post(AppointmentsMake)
router
  .route('/bookmeongooglecalender/:id/:uid')
  .post(BookMEonGoogleCalenderControllerAction)

export default router

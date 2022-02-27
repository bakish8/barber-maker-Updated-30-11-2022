import express from 'express'
const router = express.Router()
import {
  getSaparim,
  pickedDate,
  confirmTor,
  showAvilableTors,
  getMyTorim,
  PayTor,
  UNPayTor,
  GetSugeiTipulim,
  GetTipulDeets,
  showAvilableTorsForOneHour,
  showAvilableTorsForOneHALFHour,
  showAvilableTorsFor2Hours,
  showAvilableTorsFor2HoursHALF,
  showAvilableTorsFor3Hours,
} from '../controllers/makeTorController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/unpay/:id').put(protect, admin, UNPayTor)

router.route('/picktipul').get(protect, GetSugeiTipulim)
router.route('/picktipul/:id').get(protect, GetTipulDeets)

router
  .route('/getavilableforonehour/:id')
  .get(protect, showAvilableTorsForOneHour)

router
  .route('/getavilableforonehourandhalf/:id')
  .get(protect, showAvilableTorsForOneHALFHour)
// GET /api/tor/?date=id&duration=90
router
  .route('/getavilablefortwohours/:id')
  .get(protect, showAvilableTorsFor2Hours)
router
  .route('/getavilablefortwohoursandhalf/:id')
  .get(protect, showAvilableTorsFor2HoursHALF)

router
  .route('/getavilableforthreehours/:id')
  .get(protect, showAvilableTorsFor3Hours)

router.route('/mytorim').get(protect, getMyTorim)

router.route('/').get(getSaparim)
router.route('/:id/:uid').put(confirmTor)

router
  .route('/:id')
  .post(pickedDate)
  .get(showAvilableTors)
  .put(protect, admin, PayTor)

export default router

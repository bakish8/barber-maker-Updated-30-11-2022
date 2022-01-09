import express from 'express'
const router = express.Router()
import {
  getSapars,
  pickedDate,
  confirmTor,
  showAvilableTors,
  getMyTorim,
  PayTor,
  UNPayTor,
  GetSugeiTipulim,
  GetTipulDeets,
} from '../controllers/makeTorController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/unpay/:id').put(protect, admin, UNPayTor)

router.route('/picktipul').get(protect, GetSugeiTipulim)
router.route('/picktipul/:id').get(protect, GetTipulDeets)

router.route('/mytorim').get(protect, getMyTorim)

router.route('/').get(getSapars)
router.route('/:id/:uid').put(confirmTor)

router
  .route('/:id')
  .post(pickedDate)
  .get(showAvilableTors)
  .put(protect, admin, PayTor)

export default router

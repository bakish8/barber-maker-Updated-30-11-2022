import express from 'express'
import {
  getBusinessDetailsPage,
  getBusinessWorkers,
  registerNewTipulForBussines,
  getreatments,
} from '../controllers/BusinessController.js'

const router = express.Router()

router.route('/:id').get(getBusinessDetailsPage)
router.route('/:id/workers').get(getBusinessWorkers)
router.route('/:id/getreatments').get(getreatments)
router.route('/tipulim').post(registerNewTipulForBussines)

export default router

import express from 'express'
import {
  getBusinessDetailsPage,
  getBusinessDetailsForNavBar,
  getBusinessWorkers,
  registerNewTipulForBussines,
  getreatments,
  BussinesUserList,
  adminSideRegistaration,
  getBusinessSettings,
  UpdateBussinesSettingsController,
  getBusinessDesignSettings,
  UpdateBussinesDesigenSettings,
  getAdminNameForSocket,
} from '../controllers/BusinessController.js'

const router = express.Router()

router.route('/:id').get(getBusinessDetailsPage)
router.route('/adminame/:id').get(getAdminNameForSocket)
router.route('/:id/fornav').get(getBusinessDetailsForNavBar)
router
  .route('/:id/design')
  .get(getBusinessDesignSettings)
  .post(UpdateBussinesDesigenSettings)
router
  .route('/:id/settings')
  .get(getBusinessSettings)
  .post(UpdateBussinesSettingsController)
router.route('/:id/workers').get(getBusinessWorkers)
router.route('/:id/getreatments').get(getreatments)
router.route('/tipulim').post(registerNewTipulForBussines)
router.route('/:id/users').get(BussinesUserList).post(adminSideRegistaration)

export default router

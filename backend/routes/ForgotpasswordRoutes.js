import express from 'express'
const router = express.Router()
import {
  ctrateResetPage,
  resetPageReload,
  ResetPassword,
  ctrateResetPageForPhoneReset,
  InitialPassword,
} from '../controllers/ForgotpasswordControllers.js'

router.route('/').post(ctrateResetPage).put(ctrateResetPageForPhoneReset)
router.route('/:id/:token').get(resetPageReload).put(ResetPassword)
router.route('/:id').put(InitialPassword)

export default router

import express from 'express'
const router = express.Router()
import {
  ctrateResetPage,
  resetPageReload,
  ResetPassword,
  ctrateResetPageForPhoneReset,
} from '../controllers/ForgotpasswordControllers.js'

router.route('/').post(ctrateResetPage).put(ctrateResetPageForPhoneReset)
router.route('/:id/:token').get(resetPageReload).put(ResetPassword)

export default router

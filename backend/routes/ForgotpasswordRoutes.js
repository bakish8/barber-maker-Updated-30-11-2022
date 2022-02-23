import express from 'express'
const router = express.Router()
import {
  ctrateResetPage,
  resetPageReload,
  ResetPassword,
} from '../controllers/ForgotpasswordControllers.js'

router.route('/').post(ctrateResetPage)
router.route('/:id/:token').get(resetPageReload).put(ResetPassword)

export default router

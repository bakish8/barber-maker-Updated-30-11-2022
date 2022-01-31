import express from 'express'
const router = express.Router()
import {
  findUser,
  findPhone,
  findTipulim,
  FindClockByWorkIDandTime,
} from '../controllers/searchController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/clocks/:id/:time').get(FindClockByWorkIDandTime)
router.route('/users/:id').get(findUser) //****להוסיף הגנה באמצעות אדמין פרוטרדט לאחר בניית פעולה רדיוסר קונטסט וסטור וגם בק אנד */
router.route('/phones/:id').get(findPhone) //****להוסיף הגנה באמצעות אדמין פרוטרדט לאחר בניית פעולה רדיוסר קונטסט וסטור וגם בק אנד */
router.route('/tipulim').get(findTipulim) //****להוסיף הגנה באמצעות אדמין פרוטרדט לאחר בניית פעולה רדיוסר קונטסט וסטור וגם בק אנד */

export default router

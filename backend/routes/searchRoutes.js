import express from 'express'
const router = express.Router()
import { findUser, findPhone } from '../controllers/searchController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/users/:id').get(findUser) //****להוסיף הגנה באמצעות אדמין פרוטרדט לאחר בניית פעולה רדיוסר קונטסט וסטור וגם בק אנד */
router.route('/phones/:id').get(findPhone) //****להוסיף הגנה באמצעות אדמין פרוטרדט לאחר בניית פעולה רדיוסר קונטסט וסטור וגם בק אנד */

export default router

import express from 'express'
const router = express.Router()
import {
  createWorkingDay,
  getWorkingDayById,
  getWorkingDayById2,
  getWorkingDays,
  deleteWorkingDay,
  addClock,
  getClocks,
  deleteClock,
  getWorkingDayForToday,
  getWorkingDaysForThisWEEK,
  getCLOCKSForTodayRECIPT,
  getCLOCKSForThisWeekRECIPT,
  getCLOCKSForThisMonthRECIPT,
  getCLOCKSForTHISdayRECIPT,
  deleteallclocksforthisday,
  deleteSELECTEDclocksforthisday,
} from '../controllers/workingDayController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/:id/:cid').delete(protect, admin, deleteClock)

router
  .route('/deleteallclocks/:id/:cid')
  .delete(protect, admin, deleteallclocksforthisday)
router
  .route('/deleteselectedclocks/:id/:cid')
  .delete(protect, admin, deleteSELECTEDclocksforthisday)

router
  .route('/')
  .post(protect, admin, createWorkingDay)
  .get(protect, admin, getWorkingDays)
router.route('/thisday').get(protect, admin, getWorkingDayForToday)
router.route('/thisweek').get(protect, admin, getWorkingDaysForThisWEEK)

router.route('/recipt/:id').get(protect, admin, getCLOCKSForTHISdayRECIPT) //***** */
router.route('/reciptoneday').get(protect, admin, getCLOCKSForTodayRECIPT) //***** */
router.route('/recipt_week').get(protect, admin, getCLOCKSForThisWeekRECIPT) //***** */
router.route('/recipt_month').get(protect, admin, getCLOCKSForThisMonthRECIPT) //***** */

router.route('/:id/deets').get(getWorkingDayById2)
router.route('/:id/deetsworkdayinfo').get(getWorkingDayById)

router
  .route('/:id')
  .get(protect, admin, getClocks)
  .post(protect, admin, addClock)
  .delete(protect, admin, deleteWorkingDay)

export default router

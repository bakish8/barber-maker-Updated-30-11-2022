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
  getWorkingDayForTOMORROW,
  getWorkingDaysForNextSEVENworkingDAYS,
} from '../controllers/workingDayController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
//Delete's
router.route('/:id/:cid').delete(protect, admin, deleteClock)
router
  .route('/delete/:id/:cid')
  .delete(protect, admin, deleteallclocksforthisday)

//Create Or Get WORKDAY
router
  .route('/')
  .post(protect, admin, createWorkingDay)
  .get(protect, admin, getWorkingDays)
//Get Next Days
router.route('/thisday').get(protect, admin, getWorkingDayForToday)
router.route('/thisweek').get(protect, admin, getWorkingDaysForThisWEEK)
router
  .route('/next7days')
  .get(protect, admin, getWorkingDaysForNextSEVENworkingDAYS)
router.route('/tomorrow').get(protect, admin, getWorkingDayForTOMORROW)
//recipts
router.route('/recipt/:id').get(protect, admin, getCLOCKSForTHISdayRECIPT)
router.route('/reciptoneday').get(protect, admin, getCLOCKSForTodayRECIPT)
router.route('/recipt_week').get(protect, admin, getCLOCKSForThisWeekRECIPT)
router.route('/recipt_month').get(protect, admin, getCLOCKSForThisMonthRECIPT)

router.route('/:id/deets').get(getWorkingDayById2)
router.route('/:id/deetsworkdayinfo').get(getWorkingDayById)
//get Clocks +add Clock +Delete Work Day
router
  .route('/:id')
  .get(protect, admin, getClocks)
  .post(protect, admin, addClock)
  .delete(protect, admin, deleteWorkingDay)

export default router

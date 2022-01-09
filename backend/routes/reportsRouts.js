import express from 'express'
const router = express.Router()
import {
  createReport,
  createReportForWeek,
  createReportForMonth,
  getDailyReports,
  getWeeklyReports,
  getMonthlyReports,
  getReportDeetsByID,
} from '../controllers/ReportController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, createReport)
router.route('/weeks').post(protect, admin, createReportForWeek)
router.route('/months').post(protect, admin, createReportForMonth)

router.route('/single/:id').get(protect, admin, getReportDeetsByID)

router.route('/weeks/:id').get(protect, admin, getWeeklyReports)
router.route('/months/:id').get(protect, admin, getMonthlyReports)
router.route('/:id').get(protect, admin, getDailyReports)

export default router

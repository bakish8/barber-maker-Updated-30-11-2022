import asyncHandler from 'express-async-handler'
import Report from '../models/Reports.js'
import User from '../models/userModel.js'

const createReport = asyncHandler(async (req, res) => {
  const {
    id,
    type,
    date,
    afterdate,
    numAllTorim,
    numAvilableTorim,
    numNOTAvilableTorim,
    num_canceled_torim,
    moneyCount,
    dayClocks,
    createatDate,
    createdAtTime,
  } = req.body
  const user = await User.findOne({ _id: id })
  if (user) {
    console.log(`the report user is: ${user.name}`) //**user */
    console.log(`the day clocks is: ${dayClocks}`)
    console.log(`the report type is: ${type}`)
    console.log(`the report date is: ${date}`)
    console.log(`the Money COunt for this Day is date is: ${moneyCount}`)
    console.log(
      `the Status of after Date Pending for this report  is: ${afterdate}`
    )
    console.log(`the NUM OF TORIM for this date is: ${numAllTorim}`)
    console.log(
      `the NUM OF AVILABLE TORIM for this date is: ${numAvilableTorim}`
    )
    console.log(
      `the NUM OF NOT AVILABLE TORIM for this date is: ${numNOTAvilableTorim}`
    )
    console.log(
      `the NUM OF CANCELD  TORIM for this date is: ${num_canceled_torim}`
    )

    const ReportExists = await Report.findOne({ date: date })
    if (ReportExists) {
      res.status(400)
      throw new Error(
        'NEED TO RETURRNED MOSEL SWLA TO FRONEND WHEN AND ASK IF WANT TO ADD MORE INSTED THIS ERROR'
      )
    } else {
      const report = new Report({
        owner: user,
        type,
        date,
        afterdate,
        numAllTorim,
        numAvilableTorim,
        numNOTAvilableTorim,
        numCanceledTorim: num_canceled_torim,
        moneyCount: moneyCount,
        clocks: dayClocks,
        numOfWorkDays: 1,
        createatDate: createatDate,
        createdAtTime: createdAtTime,
      })

      await report.save()
      res.status(201).json(report)
    }
  }
})
const createReportForWeek = asyncHandler(async (req, res) => {
  const {
    id,
    type,
    date,
    afterdate,
    numOfWorkDays,
    numAllTorim,
    numAvilableTorim,
    numNOTAvilableTorim,
    num_canceled_torim,
    moneyCount,
    weekClocks,
    createatDate,
    createdAtTime,
  } = req.body
  const user = await User.findOne({ _id: id })
  if (user) {
    console.log(`the report user is: ${user.name}`) //**user */
    console.log(`the number of working dyas  is: ${numOfWorkDays}`) //**user */
    console.log(`the weekly report clocks is: ${weekClocks}`)
    console.log(`the report type is: ${type}`)
    console.log(`the weekly report date is: ${date}`)
    console.log(`the Money COunt for this weekly report  is: ${moneyCount}`)
    console.log(
      `the Status of after Date Pending for this weekly report  is: ${afterdate}`
    )
    console.log(`the NUM OF TORIM for this weekly report is: ${numAllTorim}`)
    console.log(
      `the NUM OF AVILABLE TORIM for this weekly report is: ${numAvilableTorim}`
    )
    console.log(
      `the NUM OF NOT AVILABLE TORIM for this weekly report is: ${numNOTAvilableTorim}`
    )
    console.log(
      `the NUM OF CANCELD  TORIM for this weekly report is: ${num_canceled_torim}`
    )

    const ReportExists = await Report.findOne({ date: date, type: type })
    if (ReportExists) {
      res.status(400)
      throw new Error(
        'NEED TO RETURRNED MOSEL SWLA TO FRONEND WHEN AND ASK IF WANT TO ADD MORE INSTED THIS ERROR'
      )
    } else {
      const report = new Report({
        owner: user,
        type,
        date,
        afterdate,
        numOfWorkDays,
        numAllTorim,
        numAvilableTorim,
        numNOTAvilableTorim,
        numCanceledTorim: num_canceled_torim,
        moneyCount: moneyCount,
        clocks: weekClocks,
        createatDate: createatDate,
        createdAtTime: createdAtTime,
      })

      await report.save()
      res.status(201).json(report)
    }
  }
})
const createReportForMonth = asyncHandler(async (req, res) => {
  const {
    id,
    type,
    date,
    afterdate,
    numOfWorkDays,
    numAllTorim,
    numAvilableTorim,
    numNOTAvilableTorim,
    num_canceled_torim,
    moneyCount,
    MonthClocks,
    createatDate,
    createdAtTime,
  } = req.body
  const user = await User.findOne({ _id: id })
  if (user) {
    console.log(`the report user is: ${user.name}`) //**user */
    console.log(
      `the number of working days for this month  is: ${numOfWorkDays}`
    ) //**user */
    console.log(`the monthly report clocks is: ${MonthClocks}`)
    console.log(`the report type is: ${type}`)
    console.log(`the monthly report date is: ${date}`)
    console.log(`the Money COunt for this monthly report  is: ${moneyCount}`)
    console.log(
      `the Status of after Date Pending for this monthly report  is: ${afterdate}`
    )
    console.log(`the NUM OF TORIM for this monthly report is: ${numAllTorim}`)
    console.log(
      `the NUM OF AVILABLE TORIM for this monthly report is: ${numAvilableTorim}`
    )
    console.log(
      `the NUM OF NOT AVILABLE TORIM for this monthly report is: ${numNOTAvilableTorim}`
    )
    console.log(
      `the NUM OF CANCELD  TORIM for this monthly report is: ${num_canceled_torim}`
    )

    const ReportExists = await Report.findOne({ date: date, type: type })
    if (ReportExists) {
      res.status(400)
      throw new Error(
        'NEED TO RETURRNED MOSEL SWLA TO FRONEND WHEN AND ASK IF WANT TO ADD MORE INSTED THIS ERROR'
      )
    } else {
      const report = new Report({
        owner: user,
        type,
        date,
        afterdate,
        numOfWorkDays,
        numAllTorim,
        numAvilableTorim,
        numNOTAvilableTorim,
        numCanceledTorim: num_canceled_torim,
        moneyCount: moneyCount,
        clocks: MonthClocks,
        createatDate: createatDate,
        createdAtTime: createdAtTime,
      })

      await report.save()
      res.status(201).json(report)
    }
  }
})

const getDailyReports = asyncHandler(async (req, res) => {
  const { id } = req.params
  const Dailyreports = await Report.find({ type: 'daily', owner: id })
  res.json(Dailyreports)
})
const getWeeklyReports = asyncHandler(async (req, res) => {
  const { id } = req.params
  const Weeklyreports = await Report.find({ type: 'weekly', owner: id })
  res.json(Weeklyreports)
})
const getMonthlyReports = asyncHandler(async (req, res) => {
  const { id } = req.params
  const Monthlyreports = await Report.find({
    type: 'monthly',
    owner: id,
  })
    .populate('owner')
    .populate('clocks ')
  res.json(Monthlyreports)
})
const getReportDeetsByID = asyncHandler(async (req, res) => {
  const { id } = req.params
  const SingleReport = await Report.findById(id)
    .populate('owner')
    .populate('clocks mistaper')
  if (SingleReport) {
    res.json(SingleReport)
  } else {
    console.log('single work day not found by the id given')
  }
})

export {
  createReport,
  createReportForWeek,
  createReportForMonth,
  getDailyReports,
  getWeeklyReports,
  getMonthlyReports,
  getReportDeetsByID,
}

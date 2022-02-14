import asyncHandler from 'express-async-handler'
import Clock from '../models/Clock.js'
import User from '../models/userModel.js'
import CancelNotification from '../models/CancelNotification.js'
import moment from 'moment-timezone'

const CancelNotificationMaker = asyncHandler(async (req, res) => {
  const { id, date, time, dayInWeek, adminid, userid } = req.body
  const clock = await Clock.findById(id)
  const user = await User.findById(userid)
  const admin = await User.findOne({ name: adminid })
  if (clock && user && admin) {
    console.log('created!!!')
    const cancelNotification = await CancelNotification.create({
      content: `התור בשעה  ${time} ביום ${dayInWeek} בתאריך ${date} בוטל על ימי המשתמש ${user.name} קח בחשבון שהתור פנוי כעת`,
      clock,
      date,
      dayinweek: dayInWeek,
      time,
      watch: false,
      admin,
      user,
    })

    res.status(201).json(createdcancelNotification)
  }
})

const getNotifications = asyncHandler(async (req, res) => {
  console.log('finding cancel notifications!!!')

  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const year = FormatedSearchDate.substring(0, 4)
  const CancelNotifications = await CancelNotification.find({})
  res.json(CancelNotifications)
})

const MakeAllWatch = asyncHandler(async (req, res) => {
  console.log('finding cancel notifications!!!')
  const CancelNotificationUnWatch = await CancelNotification.updateMany(
    {
      watch: false,
    },
    { $set: { watch: true } }
  )

  res.json(CancelNotificationUnWatch)
})

export { CancelNotificationMaker, getNotifications, MakeAllWatch }

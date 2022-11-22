import asyncHandler from 'express-async-handler'
import Clock from '../models/Clock.js'
import User from '../models/userModel.js'
import CancelNotification from '../models/CancelNotification.js'
import moment from 'moment-timezone'

//make  notifications for a spesific admin

const CancelNotificationMaker = asyncHandler(async (req, res) => {
  const { id, date, time, dayInWeek, adminid, userid, type, now } = req.body //admin id is meant name here

  const Admin_ID = req.params.id
  const clock = await Clock.findById(id)
  const user = await User.findById(userid)
  const admin = await User.findById(Admin_ID)
  //const admin = await User.findOne({ name: adminid })
  if (clock && user && admin) {
    if (type == 1) {
      const cancelNotification = await CancelNotification.create({
        content: `${user.name} ביטל את התור שלו/ה בשעה ${time} ביום ${dayInWeek} בתאריך ${date}`,
        clock,
        date,
        dayinweek: dayInWeek,
        time,
        watch: false,
        admin,
        user,
        type: 'cancel',
        UTimeStamp: now,
      })
      res.status(201).json(cancelNotification)
    } else if (type == 2) {
      const makeNotification = await CancelNotification.create({
        content: `${user.name} קבע תור בשעה ${time} ביום ${dayInWeek} בתאריך ${date}`,
        clock,
        date,
        dayinweek: dayInWeek,
        time,
        watch: false,
        admin,
        user,
        type: 'make',
        UTimeStamp: now /*/*/,
      })
      res.status(201).json(makeNotification)
    }
  } else if (user && admin && type == 3) {
    const makeNotification = await CancelNotification.create({
      content: null,
      clock,
      date,
      dayinweek: null,
      time,
      watch: false,
      admin,
      user,
      type: 'register',
      UTimeStamp: now /*/*/,
    })
    res.status(201).json(makeNotification)
  }
})

//Get all notifications for a spesific admin
const getNotifications = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const year = FormatedSearchDate.substring(0, 4)
  const Admin_ID = req.params.id
  const CancelNotifications = await CancelNotification.find({
    admin: Admin_ID,
  }).populate('user')
  res.json(CancelNotifications)
})

//make all notifications WATCH for a spesific admin
const MakeAllWatch = asyncHandler(async (req, res) => {
  const Admin_ID = req.params.id
  const CancelNotificationUnWatch = await CancelNotification.updateMany(
    {
      watch: false,
      admin: Admin_ID,
    },
    { $set: { watch: true } }
  )
  res.json(CancelNotificationUnWatch)
})

export { CancelNotificationMaker, getNotifications, MakeAllWatch }

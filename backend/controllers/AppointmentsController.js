import asyncHandler from 'express-async-handler'
import moment from 'moment-timezone'
import User from '../models/userModel.js'
import Clock from '../models/Clock.js'
import Appointment from '../models/Appointment.js'
import { BookmeOnGoogleCalender } from './googleauth.js'

const AppointmentsMake = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate(
    'owner',
    'Dateday Datemonth Dateyear dayInWeek'
  )
  const user = await User.findById(req.params.uid)
  console.log(clock.time)
  const hour = clock.time.substring(0, 2)
  const minute = clock.time.slice(-2)
  const year = clock.owner.Dateyear
  const month = clock.owner.Datemonth - 1
  const day = clock.owner.Dateday
  console.log(`hour:${hour}`)
  console.log(`minute:${minute}`)
  console.log(`hour:${hour}`)
  console.log(`minute:${minute}`)
  console.log(`hour:${hour}`)
  console.log(`minute:${minute}`)
  console.log(`hour:${hour}`)
  console.log(`minute:${minute}`)
  const m3 = moment({
    year: `${year}`,
    month: `${month}`,
    day: `${day}`,
    hour: `${hour}`,
    //hour: parseInt(hour) + 1,

    minute: `${minute}`,
    second: 0,
    millisecond: 0,
  })
  const name = user.name
  const phoneNumber = user.phone
  const notification = 60
  const clocksmsDate = clock.date
  const clocksmssapar = clock.sapar
  const clocksmstime = clock.time
  const clocksmsdayInWeek = clock.dayInWeek
  const appointment = new Appointment({
    name: name,
    phoneNumber: phoneNumber,
    notification: notification,
    //time: m3.tz('Asia/Jerusalem'),
    time: m3,
    sapar: clocksmssapar,
    smsTime: clocksmstime,
    smsDate: clocksmsDate,
    smsDay: clocksmsdayInWeek,
  })
  appointment.save()
})

const BookMEonGoogleCalenderControllerAction = asyncHandler(
  async (req, res) => {
    const clock = await Clock.findById(req.params.id).populate(
      'owner',
      'Dateday Datemonth Dateyear dayInWeek'
    )
    const user = await User.findById(req.params.uid)
    console.log(clock.time)
    const hour = clock.time.substring(0, 2)
    const minute = clock.time.slice(-2)
    const year = clock.owner.Dateyear
    const month = clock.owner.Datemonth - 1
    const day = clock.owner.Dateday

    const m1 = moment({
      year: `${year}`,
      month: `${month}`,
      day: `${day}`,
      hour: `${hour}`,
      minute: `${minute}`,
      second: 0,
      millisecond: 0,
    }).tz('Asia/Jerusalem')

    BookmeOnGoogleCalender(m1, user.email)
  }
)

export { AppointmentsMake, BookMEonGoogleCalenderControllerAction }

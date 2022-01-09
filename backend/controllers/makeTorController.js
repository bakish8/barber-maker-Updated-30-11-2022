import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import WorkingDay from '../models/WorkingDay.js'
import Clock from '../models/Clock.js'
import Appointment from '../models/Appointment.js'
import Tipul from '../models/Tipul.js'
import express from 'express'
import dotenv from 'dotenv'
const accountSid = 'AC17b672eb86d7fd2088ffd30cc1cbc0c2'
const authToken = '90eccfedbc5d9e5d5c3e1edc25bedc5b'
import twilio from 'twilio'
import { BookmeOnGoogleCalender } from './googleauth.js'
const client = new twilio(accountSid, authToken)

dotenv.config()

const GetSugeiTipulim = asyncHandler(async (req, res) => {
  const tipulim = await Tipul.find({})
  res.json(tipulim)
})

const GetTipulDeets = asyncHandler(async (req, res) => {
  const tipul = await Tipul.findById(req.params.id)
  if (tipul) {
    res.json(tipul)
  }
})

const getSapars = asyncHandler(async (req, res) => {
  const sapars = await User.find({ isAdmin: true })
  res.json(sapars)
})

const pickedDate = asyncHandler(async (req, res) => {
  const { dateData, id } = req.body
  const owner = await User.findById(id).populate('workingdays')
  const existingWorkingDay = await WorkingDay.findOne({
    date: dateData,
    owner: id,
  })
  if (existingWorkingDay) {
    console.log('this working day is already exirs')
    res.status(201).json(existingWorkingDay)
  } else {
    console.log('אין תורים פנויים ביום זה ')
    res.status(403)
    throw new Error('אין תורים פנויים ביום זה')
  }
})
const PayTor = asyncHandler(async (req, res) => {
  const { paymentMethod, creditLastDigits, ReciptNumber } = req.body
  const clock = await Clock.findById(req.params.id)
    .populate('owner')
    .populate('tipul')

  if (clock) {
    const WORKDAY = await WorkingDay.findById(clock.owner._id)
      .populate('owner')
      .populate('tipul')

    if (paymentMethod === 'credit') {
      WORKDAY.CREDITmoneyCount += clock.tipul.cost
    } else if (paymentMethod === 'cash') {
      WORKDAY.CASHmoneyCount += clock.tipul.cost
    } else if (paymentMethod === 'bit') {
      WORKDAY.BITmoneyCount += clock.tipul.cost
    }

    WORKDAY.moneyCount += clock.tipul.cost
    WORKDAY.CupaOpend += 1
    await WORKDAY.save()

    const tipul = await Tipul.findById(clock.tipul._id)

    clock.TotalAmmountPaid = tipul.cost
    clock.isPaid = true
    clock.paymentMethod = paymentMethod //** */
    clock.paidAt = Date.now()
    clock.creditLastDigits = creditLastDigits //** */
    clock.ReciptNumber = ReciptNumber //** */
    const updatedClock = await clock.save()
    res.json({
      _id: updatedClock._id,
      time: updatedClock.time,
      avilable: updatedClock.avilable,
      owner: updatedClock.owner,
      date: updatedClock.date,
      mistaper: updatedClock.mistaper,
      isPaid: updatedClock.isPaid,
      paymentMethod: updatedClock.paymentMethod,
      paidAt: updatedClock.paidAt,
      creditLastDigits: updatedClock.creditLastDigits,
      ReciptNumber: updatedClock.ReciptNumber,

      timestamps: updatedClock.timestamps,
    })
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})
const UNPayTor = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id)
    .populate('owner')
    .populate('tipul')
  if (clock) {
    const WORKDAY = await WorkingDay.findById(clock.owner._id)
      .populate('owner')
      .populate('tipul')
    WORKDAY.moneyCount -= clock.tipul.cost
    WORKDAY.CupaOpend -= 1
    await WORKDAY.save()

    clock.isPaid = false
    clock.paymentMethod = null
    clock.paidAt = null
    clock.creditLastDigits = null
    clock.ReciptNumber = null
    const updatedClock = await clock.save()
    res.json({
      _id: updatedClock._id,
      time: updatedClock.time,
      avilable: updatedClock.avilable,
      owner: updatedClock.owner,
      date: updatedClock.date,
      mistaper: updatedClock.mistaper,
      isPaid: updatedClock.isPaid,
      paymentMethod: updatedClock.paymentMethod,
      paidAt: updatedClock.paidAt,
      creditLastDigits: updatedClock.creditLastDigits,
      ReciptNumber: updatedClock.ReciptNumber,

      timestamps: updatedClock.timestamps,
    })
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})

const confirmTor = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)
  const { Tipulid } = req.body
  const tipul = await Tipul.findById(Tipulid)

  user.torim.push(clock)
  await user.save()
  const workingday = await WorkingDay.findById(clock.owner._id)
  workingday.numAvilableTorim = workingday.numAvilableTorim - 1

  await workingday.save()

  if (clock && user && tipul) {
    clock.tipul = tipul
    clock.mistaper = user
    clock.avilable = false
    const updatedClock = await clock.save()
    res.json({
      _id: updatedClock._id,
      time: updatedClock.time,
      avilable: updatedClock.avilable,
      owner: updatedClock.owner,
      date: updatedClock.date,
      mistaper: updatedClock.mistaper,
      isPaid: updatedClock.isPaid,
      timestamps: updatedClock.timestamps,
    })
    BookmeOnGoogleCalender()
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})

const CancelTor = asyncHandler(async (req, res) => {
  var populateQuery = [{ path: 'owner' }, { path: 'mistaper', select: 'name' }]
  const clock = await Clock.findById(req.params.id).populate(populateQuery)
  console.log(clock)
  const user = await User.findById(req.params.uid)
  const workingday = await WorkingDay.findById(clock.owner._id)

  if (clock && user) {
    await Appointment.findOneAndRemove({
      smsTime: clock.time,
      smsDate: clock.owner.date,
      name: clock.mistaper.name,
    })
    clock.mistaper = null
    clock.avilable = true
    clock.owner.numAvilableTorim = clock.owner.numAvilableTorim + 1
    clock.isPaid = false
    clock.paymentMethod = null
    clock.paidAt = null
    clock.tipul = null
    clock.creditLastDigits = null
    clock.ReciptNumber = null
    const updatedClock = await clock.save()
    workingday.numAvilableTorim = workingday.numAvilableTorim + 1
    await workingday.save()
    var index = user.torim.indexOf(updatedClock._id)
    user.torim.splice(index, 1)

    await user.save()

    res.json({
      _id: updatedClock._id,
      time: updatedClock.time,
      avilable: updatedClock.avilable,
      owner: updatedClock.owner,
      date: updatedClock.date,
      mistaper: updatedClock.mistaper,
      isPaid: updatedClock.isPaid,
      paymentMethod: updatedClock.paymentMethod,
      paidAt: updatedClock.paidAt,
      creditLastDigits: updatedClock.creditLastDigits,
      ReciptNumber: updatedClock.ReciptNumber,
      timestamps: updatedClock.timestamps,
    })
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})

const showAvilableTors = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    avilable: true,
    isPending: true,
  })
  console.log(clocks)
  if (clocks) {
    res.json(clocks)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})

const getMyTorim = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    mistaper: req.user._id,
    isPending: true,
  }).populate('owner', 'dayInWeek owner')
  res.json(clocks)
})

const SendSMS = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)
  client.messages
    .create({
      body: `שלום ${user.name} ,התור שלך נקבע בהצלחה לתאריך ${clock.owner.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar}, מצפים לראותך צוות ברבר מייקר `,
      messagingServiceSid: 'MG9ba56c1fdaa9b554e7c28fa0c27e0c73',
      to: `+972${user.phone}`,
    })
    .then((message) => console.log(message.sid))
    .done()
})

const SendCANCELSMS = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)
  client.messages
    .create({
      body: `שלום ${user.name} ,התור שלך לתאריך ${clock.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar}, בוטל בהצלחה!, אין צורך להגיע שיהיה המשך יום נעים,צוות ברבר מייקר  `,
      messagingServiceSid: 'MG9ba56c1fdaa9b554e7c28fa0c27e0c73',
      to: `+972${user.phone}`,
    })
    .then((message) => console.log(message.sid))
    .done()
})

export {
  SendSMS,
  SendCANCELSMS,
  getSapars,
  pickedDate,
  confirmTor,
  showAvilableTors,
  getMyTorim,
  CancelTor,
  PayTor,
  UNPayTor,
  GetSugeiTipulim,
  GetTipulDeets,
}

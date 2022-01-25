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
import { findOne } from 'domutils'
import e from 'express'
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

  if (tipul.time === 30) {
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
    }
  } else if (tipul.time === 60) {
    const minutes = clock.time.split(':')[1]
    console.log(minutes)
    const hour = parseInt(clock.time.split(':')[0])
    console.log(hour)
    const hourPLUSone = hour + 1
    console.log(hourPLUSone)

    if (minutes === '00') {
      const ClockToExtend = `${hourPLUSone}:00`
      const ClockToDelete = `${hour}:30`

      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClock = await Clock.findOne({
        time: ClockToDelete,
        owner: clock.owner,
      })
      if (existingClock && workingDay) {
        console.log(`Existing Clock:${existingClock}`)
        console.log(`Existing workingDay:${workingDay}`)
        if (existingClock.avilable) {
          clock.time = `${clock.time}-${ClockToExtend}`
          await clock.save()
          console.log(`Existing Clock id:${existingClock._id}`)
          console.log(`Existing Clock avilabelty:${existingClock.avilable}`)
          console.log(`Existing Clock date:${existingClock.date}`)
          console.log(`Existing Clock time:${existingClock.time}`)
          const owner = await WorkingDay.findByIdAndUpdate(workingDay._id, {
            $pull: { torim: existingClock._id },
          })

          await existingClock.remove()
          owner.numAvilableTorim = owner.numAvilableTorim - 2
          owner.numTorim = owner.numTorim - 1
          await owner.save()

          clock.avilable = false
          clock.mistaper = user
          clock.tipul = tipul
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
          console.log(
            'השעה הזאת לא זמינה היא תפוס אי אפשר לקבוע תור לשעה שלמה שחצי  שעה תפוס בלאט '
          )
          console.log(
            'logic for canceling the insertion of confirm because the next one nthe clock for delete is staker'
          )
        }
      } else {
        console.log(
          'not found exisiting clock or not found exisiting working day  for 00 clock'
        )
      }

      console.log('00! 00! 00 !')
    } else if (minutes === '30') {
      const ClockToExtend = `${hourPLUSone}:30`
      const ClockToDelete = `${hourPLUSone}:00`

      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClock = await Clock.findOne({
        time: ClockToDelete,
        owner: clock.owner,
      })
      if (existingClock && workingDay) {
        console.log(`Existing Clock:${existingClock}`)
        console.log(`Existing workingDay:${workingDay}`)
        if (existingClock.avilable) {
          clock.time = `${clock.time}-${ClockToExtend}`
          await clock.save()
          console.log(`Existing Clock id:${existingClock._id}`)
          console.log(`Existing Clock avilabelty:${existingClock.avilable}`)
          console.log(`Existing Clock date:${existingClock.date}`)
          console.log(`Existing Clock time:${existingClock.time}`)
          const owner = await WorkingDay.findByIdAndUpdate(workingDay._id, {
            $pull: { torim: existingClock._id },
          })

          await existingClock.remove()
          owner.numAvilableTorim = owner.numAvilableTorim - 2
          owner.numTorim = owner.numTorim - 1
          await owner.save()

          clock.avilable = false
          clock.mistaper = user
          clock.tipul = tipul
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
          console.log(
            'השעה הזאת לא זמינה היא תפוס אי אפשר לקבוע תור לשעה שלמה שחצי  שעה תפוס בלאט '
          )
          console.log(
            'logic for canceling the insertion of confirm because the next one nthe clock for delete is staker'
          )
        }
      } else {
        console.log(
          'not found exisiting clock or not found exisiting working day  for 00 clock'
        )
      }

      console.log('30! 30! 30 !')
    }
  } else if (tipul.time === 90) {
    const minutes = clock.time.split(':')[1]
    const hour = parseInt(clock.time.split(':')[0])
    const hourPLUSone = hour + 1
    const hourPLUSTwo = hour + 2
    if (minutes === '00') {
      const ClockToDelete1 = `${hour}:30`
      const ClockToDelete2 = `${hourPLUSone}:00`
      const ClockToExtend = `${hourPLUSone}:30`

      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: { $in: [ClockToDelete1, ClockToDelete2] },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (existingClocks[0].avilable && existingClocks[1].avilable) {
          clock.time = `${clock.time}-${ClockToExtend}`
          await clock.save()
          for (let Existedclock of existingClocks) {
            const owner = await WorkingDay.findByIdAndUpdate(workingDay._id, {
              $pull: { torim: clock._id },
            })
            await Existedclock.remove()
            const arr = await Clock.find({
              owner: workingDay._id,
              avilable: true,
            })

            owner.numAvilableTorim = arr.length - 1
            owner.numTorim = owner.numTorim - 1
            await owner.save()
          }
          clock.avilable = false
          clock.mistaper = user
          clock.tipul = tipul
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
          console.log('logic for one of the 2 next toes is not avilable')
        }
      }
    } else if (minutes === '30') {
      const ClockToDelete1 = `${hourPLUSone}:00`
      const ClockToDelete2 = `${hourPLUSone}:30`
      const ClockToExtend = `${hourPLUSTwo}:00`

      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: { $in: [ClockToDelete1, ClockToDelete2] },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (existingClocks[0].avilable && existingClocks[1].avilable) {
          clock.time = `${clock.time}-${ClockToExtend}`
          await clock.save()
          for (let Existedclock of existingClocks) {
            const owner = await WorkingDay.findByIdAndUpdate(workingDay._id, {
              $pull: { torim: clock._id },
            })
            await Existedclock.remove()
            const arr = await Clock.find({
              owner: workingDay._id,
              avilable: true,
            })

            owner.numAvilableTorim = arr.length - 1
            owner.numTorim = owner.numTorim - 1
            await owner.save()
          }
          clock.avilable = false
          clock.mistaper = user
          clock.tipul = tipul
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
          console.log('logic for one of the 2 next toes is not avilable')
        }
      }
    }
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

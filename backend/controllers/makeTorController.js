import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import WorkingDay from '../models/WorkingDay.js'
import Clock from '../models/Clock.js'
import Appointment from '../models/Appointment.js'
import Tipul from '../models/Tipul.js'
import dotenv from 'dotenv'
import twilio from 'twilio'
import Business from '../models/Business.js'

dotenv.config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = new twilio(accountSid, authToken)
const serviseSID = process.env.TWILIO_MESSAGE_SERVICE_SID
const TwilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

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

const getSaparim = asyncHandler(async (req, res) => {
  console.log(`Getting saparim`)
  console.log(`Getting saparim`)
  console.log(`Getting saparim`)
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
  const { Tipulid, BussinesID } = req.body
  //**make user without a barbershop a client after First TIME */
  if (user && user.ClientOfBusiness === 0) {
    user.ClientOfBusiness === BussinesID
    await user.save()
  }
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
      //////BookmeOnGoogleCalender()
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
          clock.isMultipleClock = true

          clock.MultipleClocksArray.push(existingClock.time)

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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעה צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות שעה צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
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
          clock.isMultipleClock = true
          clock.MultipleClocksArray.push(existingClock.time)

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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעה צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות שעה צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
      }

      console.log('30! 30! 30 !')
    }
  } else if (tipul.time === 90) {
    const minutes = clock.time.split(':')[1]
    const hour = parseInt(clock.time.split(':')[0])
    const hourPLUSone = hour + 1
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
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }

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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעה וחצי צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
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
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעה וחצי צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      }
    }
  } else if (tipul.time === 120) {
    const minutes = clock.time.split(':')[1]
    const hour = parseInt(clock.time.split(':')[0])
    const hourPLUSone = hour + 1
    const hourPLUSTwo = hour + 2
    const hourPLUSTree = hour + 3
    if (minutes === '00') {
      const ClockToDelete1 = `${hour}:30`
      const ClockToDelete2 = `${hourPLUSone}:00`
      const ClockToDelete3 = `${hourPLUSone}:30`
      const ClockToExtend = `${hourPLUSTwo}:00`
      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: { $in: [ClockToDelete1, ClockToDelete2, ClockToDelete3] },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (
          existingClocks[0].avilable &&
          existingClocks[1].avilable &&
          existingClocks[2].avilable
        ) {
          clock.time = `${clock.time}-${ClockToExtend}`
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעתיים צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות שעתיים צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
      }
    } else if (minutes === '30') {
      const ClockToDelete1 = `${hourPLUSone}:00`
      const ClockToDelete2 = `${hourPLUSone}:30`
      const ClockToDelete3 = `${hourPLUSTwo}:00`
      const ClockToExtend = `${hourPLUSTwo}:30`
      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: { $in: [ClockToDelete1, ClockToDelete2, ClockToDelete3] },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (
          existingClocks[0].avilable &&
          existingClocks[1].avilable &&
          existingClocks[2].avilable
        ) {
          clock.time = `${clock.time}-${ClockToExtend}`
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעתיים צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות שעתיים צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
      }
    }
  } else if (tipul.time === 150) {
    const minutes = clock.time.split(':')[1]
    const hour = parseInt(clock.time.split(':')[0])
    const hourPLUSone = hour + 1
    const hourPLUSTwo = hour + 2
    const hourPLUSTree = hour + 3
    if (minutes === '00') {
      const ClockToDelete1 = `${hour}:30`
      const ClockToDelete2 = `${hourPLUSone}:00`
      const ClockToDelete3 = `${hourPLUSone}:30`
      const ClockToDelete4 = `${hourPLUSTwo}:00`
      const ClockToExtend = `${hourPLUSTwo}:30`
      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: {
          $in: [ClockToDelete1, ClockToDelete2, ClockToDelete3, ClockToDelete4],
        },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (
          existingClocks[0].avilable &&
          existingClocks[1].avilable &&
          existingClocks[2].avilable &&
          existingClocks[3].avilable
        ) {
          clock.time = `${clock.time}-${ClockToExtend}`
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעתיים וחצי צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות שעתיים וחצי צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
      }
    } else if (minutes === '30') {
      const ClockToDelete1 = `${hourPLUSone}:00`
      const ClockToDelete2 = `${hourPLUSone}:30`
      const ClockToDelete3 = `${hourPLUSTwo}:00`
      const ClockToDelete4 = `${hourPLUSTwo}:30`
      const ClockToExtend = `${hourPLUSTree}:00`
      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: {
          $in: [ClockToDelete1, ClockToDelete2, ClockToDelete3, ClockToDelete4],
        },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (
          existingClocks[0].avilable &&
          existingClocks[1].avilable &&
          existingClocks[2].avilable &&
          existingClocks[3].avilable
        ) {
          clock.time = `${clock.time}-${ClockToExtend}`
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות שעתיים וחצי צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות שעתיים וחצי צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
      }
    }
  } else if (tipul.time === 180) {
    const minutes = clock.time.split(':')[1]
    const hour = parseInt(clock.time.split(':')[0])
    const hourPLUSone = hour + 1
    const hourPLUSTwo = hour + 2
    const hourPLUSTree = hour + 3

    if (minutes === '00') {
      const ClockToDelete1 = `${hour}:30`
      const ClockToDelete2 = `${hourPLUSone}:00`
      const ClockToDelete3 = `${hourPLUSone}:30`
      const ClockToDelete4 = `${hourPLUSTwo}:00`
      const ClockToDelete5 = `${hourPLUSTwo}:30`
      const ClockToExtend = `${hourPLUSTree}:00`

      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: {
          $in: [
            ClockToDelete1,
            ClockToDelete2,
            ClockToDelete3,
            ClockToDelete4,
            ClockToDelete5,
          ],
        },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (
          existingClocks[0].avilable &&
          existingClocks[1].avilable &&
          existingClocks[2].avilable &&
          existingClocks[3].avilable &&
          existingClocks[4].avilable
        ) {
          clock.time = `${clock.time}-${ClockToExtend}`
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות 3 שעות צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות 3 שעות צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
      }
    } else if (minutes === '30') {
      const ClockToDelete1 = `${hourPLUSone}:00`
      const ClockToDelete2 = `${hourPLUSone}:30`
      const ClockToDelete3 = `${hourPLUSTwo}:00`
      const ClockToDelete4 = `${hourPLUSTwo}:30`
      const ClockToDelete5 = `${hourPLUSTree}:00`
      const ClockToExtend = `${hourPLUSTree}:30`
      const workingDay = await WorkingDay.findById(clock.owner)
      const existingClocks = await Clock.find({
        time: {
          $in: [
            ClockToDelete1,
            ClockToDelete2,
            ClockToDelete3,
            ClockToDelete4,
            ClockToDelete5,
          ],
        },
        owner: clock.owner,
      })
      if (existingClocks && workingDay) {
        if (
          existingClocks[0].avilable &&
          existingClocks[1].avilable &&
          existingClocks[2].avilable &&
          existingClocks[3].avilable &&
          existingClocks[4].avilable
        ) {
          clock.time = `${clock.time}-${ClockToExtend}`
          clock.isMultipleClock = true
          for (let clocki of existingClocks) {
            clock.MultipleClocksArray.push(clocki.time)
          }
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
          ////BookmeOnGoogleCalender()
        } else {
          res.status(403)
          throw new Error(
            'סוג התור שבחרת דורש לפחות 3 שעות צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
          )
        }
      } else {
        res.status(403)
        throw new Error(
          'סוג התור שבחרת דורש לפחות 3 שעות צור שעות עבודה פנויות לאחר השעה שבחרת על מנת להכניס את תור זה למערכת'
        )
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
    console.log(clock.time)
    console.log(clock.isMultipleClock)
    const time1 = clock.time.split('-')[0]
    console.log(time1)

    if (clock.isMultipleClock) {
      for (let clockToBuiledBack of clock.MultipleClocksArray) {
        const clockBuild = await new Clock({
          time: clockToBuiledBack,
          sapar: clock.sapar,
          date: clock.date,
          avilable: true,
          owner: workingday,
          isPaid: false,
          isPending: true,
        })
        workingday.numTorim = workingday.numTorim + 1
        workingday.numAvilableTorim = workingday.numAvilableTorim + 1
        workingday.torim.push(clockBuild)
        await workingday.save()
        await clockBuild.save()
      }
      clock.MultipleClocksArray = []
      clock.isMultipleClock = false
      await clock.save()
    }

    await Appointment.findOneAndRemove({
      smsTime: clock.time,
      smsDate: clock.owner.date,
      name: clock.mistaper.name,
    })
    clock.time = time1
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
  }).populate('owner')
  console.log(clocks)
  if (clocks) {
    res.json(clocks)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})

const showAvilableTorsForOneHour = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    avilable: true,
    isPending: true,
  })
  console.log(clocks)
  if (clocks) {
    let counter1 = 0
    let counter2 = 1
    let arr = []
    for (let clock of clocks) {
      if (counter2 < clocks.length) {
        let time1 = clocks[counter1].time
        const minutes = time1.split(':')[1]
        const hour = time1.split(':')[0]
        const hourPLUSone = parseInt(hour) + 1

        console.log(time1)
        console.log(hour)
        console.log(hourPLUSone)
        console.log(minutes)

        let time2 = clocks[counter2].time
        const minutes2 = time2.split(':')[1]
        const hour2 = time2.split(':')[0]
        console.log(time2)
        console.log(hour2)
        console.log(minutes2)

        if (
          (hour === hour2 && minutes === '00' && minutes2 === '30') ||
          (hourPLUSone == hour2 && minutes === '30' && minutes2 === '00')
        ) {
          arr.push(clock)
        }
        counter1++
        counter2++
      }
    }
    console.log(arr)
    res.json(arr)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})
const showAvilableTorsForOneHALFHour = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    avilable: true,
    isPending: true,
  })
  console.log(clocks)
  if (clocks) {
    let counter1 = 0
    let counter2 = 1
    let counter3 = 2
    let arr = []
    for (let clock of clocks) {
      if (counter3 < clocks.length) {
        let time1 = clocks[counter1].time
        const minutes = time1.split(':')[1]
        const hour = time1.split(':')[0]
        const hourPLUSone = parseInt(hour) + 1
        let time2 = clocks[counter2].time
        const minutes2 = time2.split(':')[1]
        const hour2 = time2.split(':')[0]
        let time3 = clocks[counter3].time
        const minutes3 = time3.split(':')[1]
        const hour3 = time3.split(':')[0]

        console.log(`time 1 :${time1} hour1:${hour} min1:${minutes}`)
        console.log(`time 2 :${time2} hour2:${hour2} min2:${minutes2}`)
        console.log(`time 3 :${time3} hour3:${hour3} min3:${minutes3}`)
        if (
          (hourPLUSone == hour3 &&
            hourPLUSone == hour2 &&
            minutes == '30' &&
            minutes2 == '00' &&
            minutes3 == '30') ||
          (hourPLUSone == hour3 &&
            hourPLUSone != hour2 &&
            minutes == '00' &&
            minutes2 == '30' &&
            minutes3 == '00')
        ) {
          arr.push(clock)
        }
        counter1++
        counter2++
        counter3++
      }
    }
    console.log(arr)
    res.json(arr)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})
const showAvilableTorsFor2Hours = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    avilable: true,
    isPending: true,
  })
  console.log(clocks)
  if (clocks) {
    let counter1 = 0
    let counter2 = 1
    let counter3 = 2
    let counter4 = 3
    let arr = []
    for (let clock of clocks) {
      if (counter4 < clocks.length) {
        let time1 = clocks[counter1].time
        const minutes = time1.split(':')[1]
        const hour = time1.split(':')[0]
        const hourPLUSone = parseInt(hour) + 1
        const hourPLUSTwo = parseInt(hour) + 2
        let time2 = clocks[counter2].time
        const minutes2 = time2.split(':')[1]
        const hour2 = time2.split(':')[0]
        let time3 = clocks[counter3].time
        const minutes3 = time3.split(':')[1]
        const hour3 = time3.split(':')[0]
        let time4 = clocks[counter4].time
        const minutes4 = time4.split(':')[1]
        const hour4 = time4.split(':')[0]

        console.log(
          ` hour plus one is :${hourPLUSone} hour plus one is :${hourPLUSTwo}`
        )
        console.log(`time 1 :${time1} hour1:${hour} min1:${minutes}`)
        console.log(`time 2 :${time2} hour2:${hour2} min2:${minutes2}`)
        console.log(`time 3 :${time3} hour3:${hour3} min3:${minutes3}`)
        console.log(`time 4 :${time4} hour4:${hour4} min4:${minutes4}`)

        if (
          (hourPLUSone == hour2 &&
            hourPLUSone == hour3 &&
            hourPLUSTwo == hour4 &&
            minutes == '30' &&
            minutes2 == '00' &&
            minutes3 == '30' &&
            minutes4 == '00') ||
          (hour == hour2 &&
            hourPLUSone == hour3 &&
            hourPLUSone == hour4 &&
            minutes == '00' &&
            minutes2 == '30' &&
            minutes3 == '00' &&
            minutes4 == '30')
        ) {
          arr.push(clock)
        }
        counter1++
        counter2++
        counter3++
        counter4++
      }
    }
    console.log(arr)
    res.json(arr)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})
const showAvilableTorsFor2HoursHALF = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    avilable: true,
    isPending: true,
  })
  console.log(clocks)
  if (clocks) {
    let counter1 = 0
    let counter2 = 1
    let counter3 = 2
    let counter4 = 3
    let counter5 = 4
    let arr = []
    for (let clock of clocks) {
      if (counter5 < clocks.length) {
        let time1 = clocks[counter1].time
        const minutes = time1.split(':')[1]
        const hour = time1.split(':')[0]
        const hourPLUSone = parseInt(hour) + 1
        const hourPLUSTwo = parseInt(hour) + 2
        const hourPLUSTree = parseInt(hour) + 3
        let time2 = clocks[counter2].time
        const minutes2 = time2.split(':')[1]
        const hour2 = time2.split(':')[0]
        let time3 = clocks[counter3].time
        const minutes3 = time3.split(':')[1]
        const hour3 = time3.split(':')[0]
        let time4 = clocks[counter4].time
        const minutes4 = time4.split(':')[1]
        const hour4 = time4.split(':')[0]
        let time5 = clocks[counter5].time
        const minutes5 = time5.split(':')[1]
        const hour5 = time5.split(':')[0]

        console.log(
          ` hour plus one is :${hourPLUSone} hour plus one is :${hourPLUSTwo}hour plus one is :${hourPLUSTree}`
        )
        console.log(`time 1 :${time1} hour1:${hour} min1:${minutes}`)
        console.log(`time 2 :${time2} hour2:${hour2} min2:${minutes2}`)
        console.log(`time 3 :${time3} hour3:${hour3} min3:${minutes3}`)
        console.log(`time 4 :${time4} hour4:${hour4} min4:${minutes4}`)
        console.log(`time 5 :${time5} hour5:${hour5} min5:${minutes5}`)

        if (
          (hourPLUSone == hour2 &&
            hourPLUSone == hour3 &&
            hourPLUSTwo == hour4 &&
            hourPLUSTwo == hour5 &&
            minutes == '30' &&
            minutes2 == '00' &&
            minutes3 == '30' &&
            minutes4 == '00' &&
            minutes5 == '30') ||
          (hour == hour2 &&
            hourPLUSone == hour3 &&
            hourPLUSone == hour4 &&
            hourPLUSTwo == hour5 &&
            minutes == '00' &&
            minutes2 == '30' &&
            minutes3 == '00' &&
            minutes4 == '30' &&
            minutes5 == '00')
        ) {
          arr.push(clock)
        }
        counter1++
        counter2++
        counter3++
        counter4++
        counter5++
      }
    }
    console.log(arr)
    res.json(arr)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})
const showAvilableTorsFor3Hours = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    avilable: true,
    isPending: true,
  })
  console.log(clocks)
  if (clocks) {
    let counter1 = 0
    let counter2 = 1
    let counter3 = 2
    let counter4 = 3
    let counter5 = 4
    let counter6 = 5
    let arr = []
    for (let clock of clocks) {
      //*****יש לתקן בכולם שאם הרשימה המתקבלת של התורים הזמינים היא פחות מהאחרון במקרה הזה 5 אז גם להיכנס ללולאה */
      if (counter6 < clocks.length) {
        let time1 = clocks[counter1].time
        const minutes = time1.split(':')[1]
        const hour = time1.split(':')[0]
        const hourPLUSone = parseInt(hour) + 1
        const hourPLUSTwo = parseInt(hour) + 2
        const hourPLUSTree = parseInt(hour) + 3
        let time2 = clocks[counter2].time
        const minutes2 = time2.split(':')[1]
        const hour2 = time2.split(':')[0]
        let time3 = clocks[counter3].time
        const minutes3 = time3.split(':')[1]
        const hour3 = time3.split(':')[0]
        let time4 = clocks[counter4].time
        const minutes4 = time4.split(':')[1]
        const hour4 = time4.split(':')[0]
        let time5 = clocks[counter5].time
        const minutes5 = time5.split(':')[1]
        const hour5 = time5.split(':')[0]
        let time6 = clocks[counter6].time
        const minutes6 = time6.split(':')[1]
        const hour6 = time6.split(':')[0]

        console.log(
          ` hour plus one is :${hourPLUSone} hour plus one is :${hourPLUSTwo}hour plus one is :${hourPLUSTree}`
        )
        console.log(`time 1 :${time1} hour1:${hour} min1:${minutes}`)
        console.log(`time 2 :${time2} hour2:${hour2} min2:${minutes2}`)
        console.log(`time 3 :${time3} hour3:${hour3} min3:${minutes3}`)
        console.log(`time 4 :${time4} hour4:${hour4} min4:${minutes4}`)
        console.log(`time 5 :${time5} hour5:${hour5} min5:${minutes5}`)
        console.log(`time 6 :${time6} hour6:${hour6} min6:${minutes6}`)

        if (
          (hourPLUSone == hour2 &&
            hourPLUSone == hour3 &&
            hourPLUSTwo == hour4 &&
            hourPLUSTwo == hour5 &&
            hourPLUSTree == hour6 &&
            minutes == '30' &&
            minutes2 == '00' &&
            minutes3 == '30' &&
            minutes4 == '00' &&
            minutes5 == '30' &&
            minutes6 == '00') ||
          (hour == hour2 &&
            hourPLUSone == hour3 &&
            hourPLUSone == hour4 &&
            hourPLUSTwo == hour5 &&
            hourPLUSTwo == hour6 &&
            minutes == '00' &&
            minutes2 == '30' &&
            minutes3 == '00' &&
            minutes4 == '30' &&
            minutes5 == '00' &&
            minutes6 == '30')
        ) {
          arr.push(clock)
        }
        counter1++
        counter2++
        counter3++
        counter4++
        counter5++
        counter6++
      }
    }
    console.log(arr)
    res.json(arr)
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
  const { BusinessId } = req.body
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)
  if (!BusinessId) {
    if (user && clock && serviseSID) {
      try {
        client.messages
          .create({
            body: `שלום ${user.name} ,התור שלך נקבע בהצלחה לתאריך ${clock.owner.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar}, מצפים לראותך צוות ברבר מייקר `,
            messagingServiceSid: 'MG9ba56c1fdaa9b554e7c28fa0c27e0c73',
            to: `+972${user.phone}`,
          })
          .then((message) => console.log(message.sid))
          .done()
      } catch (e) {
        console.log(e.code)
        console.log(e.message)
      }
    }
  } else {
    const BusinessFound = await Business.findById(BusinessId)
    if (BusinessFound) {
      if (user && clock && serviseSID) {
        try {
          client.messages
            .create({
              body: `שלום ${user.name} ,התור שלך נקבע בהצלחה לתאריך ${clock.owner.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar}, מצפים לראותך צוות ${BusinessFound.businessName}`,
              messagingServiceSid: 'MG9ba56c1fdaa9b554e7c28fa0c27e0c73',
              to: `+972${user.phone}`,
            })
            .then((message) => console.log(message.sid))
            .done()
        } catch (e) {
          console.log(e.code)
          console.log(e.message)
        }
      }
    }
  }
})

const Send_WHATSAPP_message = asyncHandler(async (req, res) => {
  console.log(req.body)
  //  const { id, uid } = req.body
  const { id, uid, BusinessId } = req.body
  console.log(`______________________________________________`)
  console.log(`id:${id}`)
  console.log(`______________________________________________`)
  console.log(` user id:${uid}`)
  console.log(`______________________________________________`)
  console.log(` Business id:${BusinessId}`)
  const clock = await Clock.findById(id).populate('owner')
  const user = await User.findById(uid)
  const BusinessFound = await Business.findById(BusinessId) //****new */
  // if (clock && user) {
  if (clock && user && BusinessFound) {
    console.log(`______________________________________________`)
    console.log(`user:${uid}`)
    console.log(`______________________________________________`)
    console.log(`clock:${clock}`)
    try {
      client.messages
        .create({
          //**USE FOR DEMO// body: `שלום ${user.name} , התור שלך נקבע בהצלחה לתאריך ${clock.owner.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar} , מצפים לראותך צוות ברבר מייקר`,
          body: `שלום ${user.name} , התור שלך נקבע בהצלחה לתאריך ${clock.owner.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar} , מצפים לראותך צוות ${BusinessFound.businessName}`,
          to: `whatsapp:+972${user.phone}`,
          from: `whatsapp:+972526971902`,
        })
        .then((message) => console.log(message.sid))
        .done()
    } catch (e) {
      console.log(e.code)
      console.log(e.message)
    }
  }
})

const SendCANCELSMS = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)
  client.messages
    .create({
      body: `שלום ${user.name} ,התור שלך לתאריך ${clock.date} ביום ${clock.owner.dayInWeek} בשעה ${clock.time} לספר ${clock.sapar}, בוטל בהצלחה!, אין צורך להגיע שיהיה המשך יום נעים,צוות ברבר מייקר  `,
      messagingServiceSid: serviseSID,
      to: `+972${user.phone}`,
    })
    .then((message) => console.log(message.sid))
    .done()
})

const SendSMSforReset = asyncHandler(async (req, res) => {
  var theRandomNumber = (Math.floor(Math.random() * 10000) + 10000)
    .toString()
    .substring(1) //geneate 4 digit number for confirmation
  console.log(theRandomNumber)
  const phone = req.params.phone
  const user = await User.findOne({ phone: phone })
  client.messages
    .create({
      body: `הזן את הססמא הבאה לשחזור ססמתך באתר ברבר-מייקר: ${theRandomNumber}`,
      messagingServiceSid: serviseSID,
      to: `+972${user.phone}`,
    })
    .then((message) => console.log(message.sid))
    .done()
  res.json(theRandomNumber)
})

export {
  SendSMS,
  SendCANCELSMS,
  getSaparim,
  pickedDate,
  confirmTor,
  showAvilableTors,
  getMyTorim,
  CancelTor,
  PayTor,
  UNPayTor,
  GetSugeiTipulim,
  GetTipulDeets,
  showAvilableTorsForOneHour,
  showAvilableTorsForOneHALFHour,
  showAvilableTorsFor2Hours,
  showAvilableTorsFor2HoursHALF,
  showAvilableTorsFor3Hours,
  SendSMSforReset,
  Send_WHATSAPP_message,
}

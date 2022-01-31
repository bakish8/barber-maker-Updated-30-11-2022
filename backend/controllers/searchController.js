import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Tipul from '../models/Tipul.js'
import WorkingDay from '../models/WorkingDay.js'
import Clock from '../models/Clock.js'

const FindClockByWorkIDandTime = asyncHandler(async (req, res) => {
  const workdatId = req.params.id
  const Time = req.params.time
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)
  console.log(`the time is :${Time} and the work Id is:${workdatId}`)

  const WorkingDayFound = await WorkingDay.findById(workdatId)
  if (WorkingDayFound) {
    console.log(WorkingDayFound.date)
    console.log(WorkingDayFound._id)
    console.log('יום העבודה נמצא   ')
    const clockFound = await Clock.findOne({
      owner: WorkingDayFound._id,
      time: Time,
    })
    if (clockFound) {
      res.status(209).json(clockFound)
    } else {
      throw new Error('השעה  לא נמצא לא נמצא ')
    }
  } else {
    console.log('יום העבודה לא נמצא  לא  נמצא ')
    res.status(403)
    throw new Error('יום העבודה לא נמצא לא נמצא ')
  }
})

const findUser = asyncHandler(async (req, res) => {
  const userFound = await User.findOne({ name: req.params.id }).populate(
    'torim'
  )
  if (userFound) {
    console.log(userFound.name)
    console.log(userFound.phone)
    console.log('המשתמש  נמצא ')
    res.status(209).json(userFound)
  } else {
    console.log('המשתמש לא  נמצא ')
    res.status(403)
    throw new Error('המשתמש לא נמצא ')
  }
})

const findPhone = asyncHandler(async (req, res) => {
  const userFound = await User.findOne({ phone: req.params.id }).populate(
    'torim'
  )
  if (userFound) {
    console.log('המשתמש  נמצא ')
    res.status(209).json(userFound)
  } else {
    console.log('המשתמש לא  נמצא ')
    res.status(403)
    throw new Error('המשתמש לא נמצא ')
  }
})

//al tipulim
//api/search/tipulim
const findTipulim = asyncHandler(async (req, res) => {
  const tipulim = await Tipul.find({})
  if (tipulim) {
    res.status(200).json(tipulim)
  } else {
    res.status(403)
    throw new Error('no tipulim in data base ')
  }
})

export { findUser, findPhone, findTipulim, FindClockByWorkIDandTime }

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Tipul from '../models/Tipul.js'
import WorkingDay from '../models/WorkingDay.js'
import Clock from '../models/Clock.js'

const FindClockByWorkIDandTime = asyncHandler(async (req, res) => {
  const workdatId = req.params.id
  const Time1 = req.params.time
  const WorkingDayFound = await WorkingDay.findById(workdatId)
  if (WorkingDayFound) {
    const clockFound = await Clock.findOne({
      owner: WorkingDayFound._id,
      time: Time1,
    })
    if (clockFound) {
      if (clockFound.avilable) {
        res.status(209).json(clockFound)
      } else {
        throw new Error('Hour Not Avilavle')
      }
    } else {
      throw new Error('Hour Not Found')
    }
  } else {
    res.status(403)
    throw new Error('יום העבודה לא נמצא לא נמצא ')
  }
})

//*****מוצא את עומרי ב וזזה יהיה הניסיון השני לנקות את כל האותיות משהשםם ממשפחה מחוץ מהראשונה  */
const findUser = asyncHandler(async (req, res) => {
  const userFound = await User.findOne({
    name: { $regex: req.params.id, $options: 'i' },
  }).populate('torim')
  if (userFound) {
    res.status(209).json(userFound)
  } else {
    const first = req.params.id.split(' ')[0]
    const last = req.params.id.split(' ')[1]
    const userFound_try4 = await User.findOne({
      firstname: first,
      lastname: last,
    }).populate('torim')
    if (userFound_try4) {
      res.status(209).json(userFound_try4)
    } else {
      // במידה והמשתמש הזה גם לא נמצא אז
      res.status(403)
      throw new Error('המשתמש לא נמצא ')
    }
  }
})
//*****מוצא את עומרי ב וזזה יהיה הניסיון השני לנקות את כל האותיות משהשםם ממשפחה מחוץ מהראשונה  */
const findUserByfirst = asyncHandler(async (req, res) => {
  const first = req.params.id.split(' ')[0]
  const last = req.params.id.split(' ')[1]

  const usersFound = await User.find({ firstname: first }).populate('torim')
  if (usersFound && usersFound.length) {
    res.status(209).json(usersFound)
  } else {
    const usersFound2 = await User.find({ lastname: last }).populate('torim')
    if (usersFound2 && usersFound2.length) {
      res.status(209).json(usersFound2)
    } else {
      throw new Error('המשתמשים לא נמצאו   ')
    }
  }
})

const findPhone = asyncHandler(async (req, res) => {
  const userFound = await User.findOne({ phone: req.params.id }).populate(
    'torim'
  )
  if (userFound) {
    res.status(209).json(userFound)
  } else {
    res.status(403)
    throw new Error('המשתמש לא נמצא ')
  }
})

const findByEmail = asyncHandler(async (req, res) => {
  const userFound = await User.findOne({ email: req.params.email }).populate(
    'torim'
  )
  if (userFound) {
    res.status(209).json(userFound)
  } else {
    res.status(403)
    throw new Error('המשתמש לא !!נמצא ')
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

export {
  findUser,
  findPhone,
  findByEmail,
  findTipulim,
  FindClockByWorkIDandTime,
  findUserByfirst,
}

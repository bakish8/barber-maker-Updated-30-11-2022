import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import WorkingDay from '../models/WorkingDay.js'
import Clock from '../models/Clock.js'

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

export { findUser, findPhone }

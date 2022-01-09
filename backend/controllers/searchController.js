import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Tipul from '../models/Tipul.js'

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

export { findUser, findPhone, findTipulim }

import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

//loading details + check if token is Verfied after email send + send email user to load in temp page
const resetPageReload = asyncHandler(async (req, res) => {
  console.log('reset Page load!!!')
  const { id, token } = req.params
  const userFound = await User.findOne({ _id: id })
  if (userFound) {
    const NewSecret = JWT_SECRET + userFound.password
    try {
      const payload = jwt.verify(token, NewSecret)
      if (payload) {
        res.status(200).json(userFound)
      } else {
        res.status(404).json('errory soosrry!')
      }
    } catch (err) {
      res.status(405).json(err)
    }
  }
})

//create Reset Page For Email Reset
const ctrateResetPage = asyncHandler(async (req, res) => {
  console.log('create Reset Page!!!')
  const { email } = req.body
  const userFound = await User.findOne({ email })
  if (userFound) {
    const NewSecret = JWT_SECRET + userFound.password
    const payload = { email: email, id: userFound._id }
    const token = jwt.sign(payload, NewSecret, { expiresIn: '15m' })
    //const link = `http://localhost:3000/forgot-password/${userFound._id}/${token}` //development
    const link = `https://www.barber-maker.com/forgot-password/${userFound._id}/${token}` //production
    res.status(201).json(link)
  }
})

//create Reset Page For Email Reset
const ctrateResetPageForPhoneReset = asyncHandler(async (req, res) => {
  console.log('create Reset Page for phone reset!!!')
  const { phone } = req.body
  const userFound = await User.findOne({ phone })
  if (userFound) {
    const NewSecret = JWT_SECRET + userFound.password
    const payload = { phone: phone, id: userFound._id }
    const token = jwt.sign(payload, NewSecret, { expiresIn: '2m' })
    /////////const link = `forgot-password/${userFound._id}/${token}` //development
    const link = `forgot-password/${userFound._id}/${token}` //production
    res.status(201).json(link)
  }
})

//the reset action
const ResetPassword = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const { password } = req.body
  if (user) {
    if (password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      updatedUser,
    })
  } else {
    res.status(404)
    throw new Error('המשתמש אינו נמצא')
  }
})
const InitialPassword = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const { password } = req.body
  if (user) {
    if (password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      succses: true,
    })
  } else {
    res.status(404)
    throw new Error('המשתמש אינו נמצא')
  }
})

export {
  resetPageReload,
  ctrateResetPage,
  ResetPassword,
  ctrateResetPageForPhoneReset,
  InitialPassword,
}

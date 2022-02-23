import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
const resetPageReload = asyncHandler(async (req, res) => {
  console.log('reset Page load!!!')
  const { id, token } = req.params
  console.log(`id:${id}`)
  console.log(`token:${token}`)
  const userFound = await User.findOne({ _id: id })
  if (userFound) {
    const NewSecret = JWT_SECRET + userFound.password
    try {
      const payload = jwt.verify(token, NewSecret)
      if (payload) {
        console.log(`payload:${payload}`)
        res.status(200).json(userFound.email)
      } else {
        res.status(404).json('errory soosrry!')
      }
    } catch (err) {
      console.log(err)
      res.status(405).json(err)
    }
  }
})

//make all notifications WATCH for a spesific admin
const ctrateResetPage = asyncHandler(async (req, res) => {
  console.log('create Reset Page!!!')
  const { email } = req.body
  console.log(`email ${email}`)
  console.log(`JWT_SECRET ${JWT_SECRET}`)
  const userFound = await User.findOne({ email })
  if (userFound) {
    const NewSecret = JWT_SECRET + userFound.password
    const payload = { email: email, id: userFound._id }
    const token = jwt.sign(payload, NewSecret, { expiresIn: '15m' })
    //const link = `http://localhost:3000/forgot-password/${userFound._id}/${token}` //development
    const link = `https://wwww.barber-maker.com/forgot-password/${userFound._id}/${token}` //production
    console.log(link)
    res.status(201).json(link)
  }
})

// @desc    RESET PASSWORD
// @route   PUT /api/users
// @access  ALL USERS
const ResetPassword = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  const { password } = req.body
  console.log(`pass:${password}`)
  if (user) {
    if (password) {
      console.log(`pass:${password}`)
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

export { resetPageReload, ctrateResetPage, ResetPassword }

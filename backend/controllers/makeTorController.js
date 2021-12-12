import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import WorkingDay from '../models/WorkingDay.js'
import Clock from '../models/Clock.js'

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
  const clock = await Clock.findById(req.params.id).populate('owner')
  if (clock) {
    clock.isPaid = true
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
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})
const UNPayTor = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  if (clock) {
    clock.isPaid = false
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
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})

const confirmTor = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)

  user.torim.push(clock)
  await user.save()
  console.log(user)
  const workingday = await WorkingDay.findById(clock.owner._id)
  console.log(workingday.numAvilableTorim)
  workingday.numAvilableTorim = workingday.numAvilableTorim - 1
  console.log(workingday.numAvilableTorim)

  await workingday.save()

  if (clock && user) {
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
  } else {
    res.status(404)
    throw new Error('Clock not found')
  }
})

const CancelTor = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.id).populate('owner')
  const user = await User.findById(req.params.uid)
  const workingday = await WorkingDay.findById(clock.owner._id)

  console.log(user)

  if (clock && user) {
    clock.mistaper = null
    clock.avilable = true
    clock.owner.numAvilableTorim = clock.owner.numAvilableTorim + 1
    clock.isPaid = false

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
  const clocks = await Clock.find({ mistaper: req.user._id }).populate(
    'owner',
    'dayInWeek owner'
  )
  res.json(clocks)
})

export {
  getSapars,
  pickedDate,
  confirmTor,
  showAvilableTors,
  getMyTorim,
  CancelTor,
  PayTor,
  UNPayTor,
}

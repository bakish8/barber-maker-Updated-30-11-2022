import asyncHandler from 'express-async-handler'
import WorkingDay from '../models/WorkingDay.js'
import User from '../models/userModel.js'
import Clock from '../models/Clock.js'
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createWorkingDay = asyncHandler(async (req, res) => {
  const { dateData, day, id } = req.body
  const owner = await User.findById(id).populate('workingdays')
  const existingWorkingDay = await WorkingDay.findOne({
    date: dateData,
    owner: id,
  })
  if (existingWorkingDay) {
    console.log('this working day is already exirs')
    res.status(201).json(existingWorkingDay)
  } else {
    const workingday = await WorkingDay.create({
      date: dateData,
      dayInWeek: day,
      owner: owner,
      torim: [],
      avilable: true,
      numTorim: 0,
      numTorim: 0,
      numAvilableTorim: 0,
      moneyCount: 0,
    })
    if (workingday) {
      res.status(201).json({
        _id: workingday._id,
        date: workingday.date,
        dayInWeek: workingday.day,
        owner: workingday.owner,
        torim: workingday.torim,
        avilable: workingday.avilable,
        numTorim: workingday.numTorim,
        numAvilableTorim: workingday.numAvilableTorim,
        moneyCount: workingday.moneyCount,
      })
    } else {
      res.status(400)
      throw new Error('Invalid date data')
    }

    const createdWorkingday = await workingday.save()
    owner.workingdays.push(workingday)
    await owner.save()
  }
})

const getWorkingDays = asyncHandler(async (req, res) => {
  ///*****יש לתקן שימצא רק את הימים של הספר הספציפי */
  const workingdays = await WorkingDay.find({ owner: req.user._id })
  res.json(workingdays)
})

/*יש לנוסיף לוג'יק קיים מספר קונטרוךלר בברבר1 שמודיע לכל האנשים שקבעו באותו יום שצריך להתקשר אליהם לחפני הביטול יבא בתוספפת לשגיאור ארור מתאים  */
const deleteWorkingDay = asyncHandler(async (req, res) => {
  const workingday = await WorkingDay.findById(req.params.id)

  const CancelClocksArray = workingday.torim //** */
  console.log(CancelClocksArray)

  for (let Clock_id of CancelClocksArray) {
    const clock = await Clock.findById(Clock_id)
    if (clock) {
      await clock.remove()
    }
  }

  const id = req.user._id
  const owner = await User.findByIdAndUpdate(id, {
    $pull: { workingdays: workingday._id },
  })
  if (workingday) {
    await workingday.remove()
    await owner.save()

    res.json({ message: 'workingday removed' })
  } else {
    res.status(404)
    throw new Error('workingday not found')
  }
})

const getWorkingDayById = asyncHandler(async (req, res) => {
  const workingday = await WorkingDay.findById(req.params.id).populate('torim')
  if (workingday) {
    res.json(workingday)
  } else {
    res.status(404)
    throw new Error('workingday not found')
  }
})

const addClock = asyncHandler(async (req, res) => {
  const { time, id } = req.body
  console.log(time)
  console.log(id)
  const mistaper = null
  const owner = await WorkingDay.findById(id).populate('torim')
  const existingClock = await Clock.findOne({ time: time, owner: id })
  if (!existingClock) {
    const clock = await new Clock({
      time,
      date: owner.date,
      avilable: true,
      owner,
      mistaper,
      isPaid: false,
    })
    owner.numTorim = owner.numTorim + 1
    owner.numAvilableTorim = owner.numAvilableTorim + 1

    owner.torim.push(clock)
    await owner.save()

    const createdClock = await clock.save()
    res.status(201).json(createdClock)
  } else {
    console.log('קיים עבר תור בשעה זו')
  }
})

const getClocks = asyncHandler(async (req, res) => {
  const owner = req.params.id
  const clocks = await Clock.find({ owner: owner }).populate('owner')
  res.json(clocks)
})

const deleteClock = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.cid)
  const id = req.params.id
  const owner = await WorkingDay.findByIdAndUpdate(id, {
    $pull: { torim: req.params.cid },
  })
  if (clock) {
    await clock.remove()
    owner.numTorim = owner.numTorim - 1
    owner.numAvilableTorim = owner.numAvilableTorim - 1

    await owner.save()
    res.json({ message: 'clock removed' })
  } else {
    res.status(404)
    throw new Error('clock not found')
  }
})

export {
  createWorkingDay,
  getWorkingDays,
  deleteWorkingDay,
  getWorkingDayById,
  addClock,
  getClocks,
  deleteClock,
}

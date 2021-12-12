import asyncHandler from 'express-async-handler'
import WorkingDay from '../models/WorkingDay.js'
import User from '../models/userModel.js'
import Clock from '../models/Clock.js'
import moment from 'moment'

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createWorkingDay = asyncHandler(async (req, res) => {
  const { dateData, day, id, sapar } = req.body
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
      sapar: sapar,
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
        sapar: workingday.sapar,
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
    const clock = await Clock.findById(Clock_id).populate('mistaper')
    if (clock) {
      if (clock.avilable === false) {
        console.log(clock.mistaper)
        const mistaper = await User.findById(clock.mistaper._id)
        console.log(mistaper.torim)
        var index = mistaper.torim.indexOf(clock._id)
        mistaper.torim.splice(index, 1)
        await mistaper.save()
      }
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
  const workingday = await WorkingDay.findById(req.params.id)
    .populate('torim', 'isPaid')
    .populate('mistaper')
  if (workingday) {
    res.json(workingday)
  } else {
    res.status(404)
    throw new Error('workingday not found')
  }
})

const getWorkingDayById2 = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
  })
    .populate('mistaper', 'name phone')
    .populate('owner name')
  console.log(clocks)
  if (clocks) {
    res.json(clocks)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})

const addClock = asyncHandler(async (req, res) => {
  const { time, time2, id, sapar } = req.body
  const owner = await WorkingDay.findById(id).populate('torim')
  if (!time2) {
    const existingClock = await Clock.findOne({ time: time, owner: id })
    if (!existingClock) {
      const clock = await new Clock({
        time,
        sapar: sapar,
        date: owner.date,
        avilable: true,
        owner,
        isPaid: false,
      })
      owner.numTorim = owner.numTorim + 1
      owner.numAvilableTorim = owner.numAvilableTorim + 1

      owner.torim.push(clock)
      await owner.save()

      const createdClock = await clock.save()
      return res.status(201).json(createdClock)
    } else {
      console.log('קיים עבר תור בשעה זו')
    }
  } else {
    console.log(time)
    console.log(time2)
    console.log(sapar)
    if (time > time2) {
      console.log('u did a mistake end time should be after end time')
    } else {
      const hour1 = time.slice(0, -3)
      const hour2 = time2.slice(0, -3)
      const hours = []
      for (let hour = hour1; hour < hour2; hour++) {
        hours.push(moment({ hour }).format('HH:mm'))
        hours.push(
          moment({
            hour,
            minute: 30,
          }).format('HH:mm')
        )
      }
      console.log(hours)
      let torim = [{}]

      for (const hour of hours) {
        const existingClock = await Clock.findOne({ time: hour, owner: id })
        if (!existingClock) {
          const clock = {
            time: hour,
            date: owner.date,
            avilable: true,
            owner,
            mistaper: null,
            isPaid: false,
            sapar: sapar,
          }
          let newClocka = new Clock(clock)
          const newClock = await newClocka.save()
          owner.numTorim = owner.numTorim + 1
          owner.numAvilableTorim = owner.numAvilableTorim + 1
          owner.torim.push(newClock)
          torim.push({ newClock })
        } else {
          console.log('תור זה קיים במערכת חבוב')
        }
      }

      await owner.save()

      return res.status(202).json(torim)
    }
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
    if (clock.avilable === false) {
      const mistaper = await User.findById(clock.mistaper._id)
      var index = mistaper.torim.indexOf(clock._id)
      mistaper.torim.splice(index, 1)
      await mistaper.save()
    }
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
  getWorkingDayById2,
}

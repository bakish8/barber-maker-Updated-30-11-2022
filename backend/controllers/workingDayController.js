import asyncHandler from 'express-async-handler'
import WorkingDay from '../models/WorkingDay.js'
import User from '../models/userModel.js'
import Clock from '../models/Clock.js'
import moment from 'moment'

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const CheckIfTimePassed = (time) => {
  let searchDate = new Date()
  let FormatedSearchDate = moment(searchDate).format()
  let hourToCheck = time.substring(0, 2)
  let minuteToCheck = time.slice(3)
  let CalculateminuteNow = FormatedSearchDate.slice(14)
  let MinuteNow = CalculateminuteNow.substring(0, 2)
  //let MinuteNow = '01'
  let CalculateHourNow = FormatedSearchDate.slice(11)
  let HourNow = CalculateHourNow.substring(0, 2)
  //let HourNow = '09'
  if (
    HourNow > hourToCheck ||
    (HourNow === hourToCheck && MinuteNow > minuteToCheck)
  ) {
    return true
  } else {
    return false
  }
}
const CheckIfDatePassed = (Dateyear, Datemonth, Dateday) => {
  let searchDate = new Date()
  let FormatedSearchDate = moment(searchDate).format()
  //Date Now
  let CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  let month = CalculateMonthmonth.slice(-2) * 1
  let CalculateDay = FormatedSearchDate.substring(0, 10)
  let day = CalculateDay.slice(8) * 1
  let year = FormatedSearchDate.substring(0, 4) * 1
  if (
    (year === Dateyear && month === Datemonth && day > Dateday) ||
    year > Dateyear ||
    (year === Dateyear && month > Datemonth)
  ) {
    return true
  } else {
    return false
  }
}

const createWorkingDay = asyncHandler(async (req, res) => {
  const { dateData, day, id, sapar, Dateday, Datemonth, Dateyear } = req.body
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
      Dateday,
      Datemonth,
      Dateyear,
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
//***???????? ???????? ????????  ?????????????? ???? ?????? ????????????  ???????? ???????? ????  */
const getWorkingDays = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)

  const year = FormatedSearchDate.substring(0, 4)
  const workingdays = await WorkingDay.find({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
  }) //***?????????????? ?????????? ???????? ?????????? ?????????? ?????????? ?????????? ???????? ?????? ???????????? ???? ?????? ???????????? ?????? ???????? ???????? ???????????? ???? ???????? */
  res.json(workingdays)
})
//*???????? ???????? ????????  ?????????????? ???? ?????? ????????????  ???????? -??????-  ????  *
//?????????? ???? ???????? ???????? ?????????? ,???????? ?????????????? ?????????????? ?????? ?????? ?????????????? ???????? ????'??????????
const getWorkingDayForToday = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  //???????? ???? ???????? ???? ???????????? ?????? ???? ?????? ???????????? ???? ???????? ???? ???????? ?????????? ??????
  const workingday = await WorkingDay.findOne({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
  })
  if (workingday) {
    const workingdays = await WorkingDay.find({
      //  dayInWeek: { $nin: ['??????'] },
      owner: req.user._id,
      Datemonth: month,
      Dateyear: year,
      Dateday: day,
    })
      .populate('torim')
      .populate('mistaper')
      .populate('tipul')

    res.json(workingdays)
  } else {
    //???? ???? ???? ???????? ?????? ?????????? ???? ?????????? ???? ???????? ??????????--???????? ???? ?????? ?????? ?????????? ?????????? ?????? ???? ???????? ???? ?????? ???????? ???????? ???? ???????? ???????? ??????????
    const workingdays = await WorkingDay.find({
      owner: req.user._id,
      dayInWeek: { $nin: ['??????'] },
      Datemonth: month,
      Dateyear: year,
      Dateday: {
        $in: [day - 1],
      },
    })
    res.json(workingdays)
  }
})
const getWorkingDayForTOMORROW = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const monthPlusOne = parseInt(month) + 1
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const dayPlusOne = parseInt(day) + 1
  const year = FormatedSearchDate.substring(0, 4)
  //???????? ???? ???????? ???? ???????????? ?????? ???? ?????? ???????????? ???? ???????? ???? ???????? ?????????? ??????
  const workingday = await WorkingDay.findOne({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
  })
  if (workingday) {
    const workingdays = await WorkingDay.findOne({
      owner: req.user._id,
      Datemonth: month,
      Dateyear: year,
      Dateday: dayPlusOne,
    })
      .populate('torim')
      .populate('mistaper')
      .populate('tipul')
    if (workingdays) {
      res.json(workingdays)
    } else {
      const workingdays2 = await WorkingDay.findOne({
        owner: req.user._id,
        Datemonth: monthPlusOne,
        Dateyear: year,
        Dateday: 1,
      })
        .populate('torim')
        .populate('mistaper')
        .populate('tipul')
      if (workingdays2) {
        res.json(workingdays2)
      } else {
        console.log(
          'error after dat or firstday of the nrxt month is not found!'
        )
      }
    }
  } else {
    console.log('workday not found')
  }
})

//***???????? ???????? ????????  ?????????????? ???? ?????? ????????????  ???????? ???????? ?????????? ?????????? ????  */
const getWorkingDaysForNextSEVENworkingDAYS = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  //???????? ???? ???????? ???? ???????????? ?????? ???? ?????? ???????????? ???? ???????? ???? ???????? ?????????? ??????
  const workingday = await WorkingDay.findOne({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
  })
  const dayPlus1 = workingday.Dateday + 1
  const dayPlus2 = workingday.Dateday + 2
  const dayPlus3 = workingday.Dateday + 3
  const dayPlus4 = workingday.Dateday + 4
  const dayPlus5 = workingday.Dateday + 5
  const dayPlus6 = workingday.Dateday + 6
  const dayPlus7 = workingday.Dateday + 7
  if (workingday) {
    const workingdays = await WorkingDay.find({
      dayInWeek: { $nin: ['??????'] },
      owner: req.user._id,
      Datemonth: month,
      Dateyear: year,
      Dateday: {
        $in: [
          day,
          dayPlus1,
          dayPlus2,
          dayPlus3,
          dayPlus4,
          dayPlus5,
          dayPlus6,
          dayPlus7,
        ],
      },
    })
    res.json(workingdays)
  }
})

//***???????? ???????? ????????  ?????????????? ???? ?????? ????????????  ???????? -????????-  ????  */
const getWorkingDaysForThisMonth = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  //???????? ???? ???????? ???? ???????????? ?????? ???? ?????? ???????????? ???? ???????? ???? ???????? ?????????? ??????

  const workingdays = await WorkingDay.find({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
  })
  if (workingdays) {
    res.json(workingdays)
  } else {
    console.log('???? ?????????? ?????? ?????????? ???????? ???????? ????')
  }
})

const getWorkingDaysForThisWEEK = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()

  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2) * 1
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8) * 1
  const year = FormatedSearchDate.substring(0, 4)

  //???????? ???? ???????? ???? ???????????? ?????? ???? ?????? ???????????? ???? ???????? ???? ???????? ?????????? ??????

  const workingday = await WorkingDay.findOne({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
  })

  if (workingday) {
    const dayInWeek = workingday.dayInWeek
    const dayPlus1 = workingday.Dateday + 1
    const dayPlus2 = workingday.Dateday + 2
    const dayPlus3 = workingday.Dateday + 3
    const dayPlus4 = workingday.Dateday + 4
    const dayPlus5 = workingday.Dateday + 5
    const dayPlus6 = workingday.Dateday + 6
    const dayMinus1 = workingday.Dateday - 1
    const dayMinus2 = workingday.Dateday - 2
    const dayMinus3 = workingday.Dateday - 3
    const dayMinus4 = workingday.Dateday - 4
    const dayMinus5 = workingday.Dateday - 5
    const dayMinus6 = workingday.Dateday - 6
    if (dayInWeek === '??????????') {
      //?????????? ???? ?????????? ???????? ??????????
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayPlus4,
            dayPlus5,
            dayPlus6,
          ],
        },
      }) //***?????????? ???????? ?????????? ?????????? */
      res.json(workingdays)
    } else if (dayInWeek === '??????') {
      //?????????? ???? ?????????? ???????? ?????????? ???????? ?????? ??????????
      const workingdays = await WorkingDay.find({
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            dayMinus1,
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayPlus4,
            dayPlus5,
          ],
        },
      })
      res.json(
        workingdays.sort(
          (a, b) =>
            Date.parse(new Date(a.date.split('/').reverse().join('-'))) -
            Date.parse(new Date(b.date.split('/').reverse().join('-')))
        )
      )
    } else if (dayInWeek === '??????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayPlus4,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      res.json(workingdays)
    } else if (dayInWeek === '??????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      res.json(workingdays)
    } else if (dayInWeek === '??????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayMinus4,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      res.json(workingdays)
    } else if (dayInWeek === '????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayMinus5,
            dayMinus4,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      res.json(workingdays)
    } else if (dayInWeek === '??????') {
      const workingdays = await WorkingDay.find({
        // dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayMinus6,
            dayMinus5,
            dayMinus4,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      res.json(workingdays)
    }
    //???? ???? ?????? ?????? ?????????? ???? ?????????? ????????
  } else {
    const workingday = await WorkingDay.find({
      owner: req.user._id,
      // dayInWeek: { $nin: ['??????'] },
      Datemonth: month,
      Dateyear: year,
      Dateday: {
        $in: [day - 1],
      },
    })
    if (workingday) {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [day, day - 1, day - 2, day - 3, day - 4, day - 5],
        },
      })

      res.json(workingdays)
    }
  }
})

//**???????? ???? -????- ?????? ???????????? ?????????????? ???????? ?????? ???? */
const getAllWorkingDays = asyncHandler(async (req, res) => {
  const workingdays = await WorkingDay.find({ owner: req.user._id })
  res.json(workingdays)
})

/*???? ???????????? ??????'???? ???????? ???????? ?????????????????? ??????????1 ???????????? ?????? ???????????? ?????????? ?????????? ?????? ?????????? ???????????? ?????????? ?????????? ???????????? ?????? ?????????????? ?????????????? ???????? ??????????  */
const deleteWorkingDay = asyncHandler(async (req, res) => {
  const workingday = await WorkingDay.findById(req.params.id)

  const CancelClocksArray = workingday.torim //** */

  for (let Clock_id of CancelClocksArray) {
    const clock = await Clock.findById(Clock_id).populate('mistaper')
    if (clock) {
      if (clock.avilable === false) {
        const mistaper = await User.findById(clock.mistaper._id)
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
    .populate('tipul')

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
    .populate('mistaper', 'name phone image commentsForTipul')
    .populate('tipul')

    .populate('owner name')

  if (clocks) {
    res.json(clocks)
  } else {
    res.status(404)
    throw new Error('workingday not found')
  }
})
const getCLOCKSForTHISdayRECIPT = asyncHandler(async (req, res) => {
  const clocks = await Clock.find({
    owner: req.params.id,
    isPaid: true,
  })
    .populate('mistaper')
    .populate('tipul')

  if (clocks) {
    res.json(clocks)
  } else {
    console.log('???? ?????????? ???????? ???????????? ???????? ?????????????? ??????')
  }

  if (clocks) {
    res.json(clocks)
  } else {
    res.status(404)
    throw new Error('workingday not found')
  }
})

const getCLOCKSForTodayRECIPT = asyncHandler(async (req, res) => {
  // ????????  ?????????? ?????? ?????????? ???? ???????????? ???????????????? ???????? ??????'
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  const workingday = await WorkingDay.findOne({
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
    owner: req.user.id,
  })
  if (workingday) {
    const clocks = await Clock.find({
      date: workingday.date,
      owner: workingday.id,
      isPaid: true,
    })
      .populate('mistaper')
      .populate('tipul')
    res.json(clocks)
  } else {
    //???????? (???? ?????? ?????????? ???? ???????? ???? ???? ???????? ?????????? ?????? ?????? ???????? )
    const workingday = await WorkingDay.findOne({
      Datemonth: month,
      Dateyear: year,
      Dateday: day - 1, //***???? ???? ???????? ?????? ?????????? ???? ???????????????? ?????? ???????? ???? ?????????? ???? ??????  */
      owner: req.user.id,
    })
    if (workingday) {
      const clocks = await Clock.find({
        date: workingday.date,
        owner: workingday.id,
        isPaid: true,
      })
        .populate('mistaper')
        .populate('tipul')

      res.json(clocks)
    }
  }
})

const getCLOCKSForThisWeekRECIPT = asyncHandler(async (req, res) => {
  // ????????  ?????????? ?????? ?????????? ???? ???????????? ???????????????? ???????? ??????'
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  const workingday = await WorkingDay.findOne({
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
    owner: req.user.id,
  })

  if (workingday) {
    const dayInWeek = workingday.dayInWeek
    const dayPlus1 = workingday.Dateday + 1
    const dayPlus2 = workingday.Dateday + 2
    const dayPlus3 = workingday.Dateday + 3
    const dayPlus4 = workingday.Dateday + 4
    const dayPlus5 = workingday.Dateday + 5
    const dayPlus6 = workingday.Dateday + 6
    const dayMinus1 = workingday.Dateday - 1
    const dayMinus2 = workingday.Dateday - 2
    const dayMinus3 = workingday.Dateday - 3
    const dayMinus4 = workingday.Dateday - 4
    const dayMinus5 = workingday.Dateday - 5
    const dayMinus6 = workingday.Dateday - 6

    if (dayInWeek === '??????????') {
      //?????????? ???? ?????????? ???????? ??????????
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayPlus4,
            dayPlus5,
            dayPlus6,
          ],
        },
      })

      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }

      res.json(arr.flat())
    } else if (dayInWeek === '??????') {
      //?????????? ???? ?????????? ???????? ?????????? ???????? ?????? ??????????
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayPlus4,
            dayPlus5,
            dayMinus1,
          ],
        },
      })

      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }
      res.json(arr.flat())
    } else if (dayInWeek === '??????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayPlus4,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }
      res.json(arr.flat())
    } else if (dayInWeek === '??????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayPlus3,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }
      res.json(arr.flat())
    } else if (dayInWeek === '??????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayPlus2,
            dayMinus4,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }
      res.json(arr.flat())
    } else if (dayInWeek === '????????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayPlus1,
            dayMinus5,
            dayMinus4,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ],
        },
      })
      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }
      res.json(arr.flat())
    } else if (dayInWeek === '??????') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['??????'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [
            day,
            dayMinus6,
            dayMinus5,
            dayMinus4,
            dayMinus3,
            dayMinus2,
            dayMinus1,
          ], //mabt day - 1 day -2 and so onn in suterdays
        },
      })
      let arr = []
      for (let workingday of workingdays) {
        let clocks = await Clock.find({
          date: workingday.date,
          owner: workingday.id,
          isPaid: true,
        })
          .populate('mistaper')
          .populate('tipul')

        arr.push(clocks)
      }
      res.json(arr.flat())
    }
  } else {
    res.status(404)
    throw new Error('Error working day recipt for week not found') //New
  }
})

const getCLOCKSForThisMonthRECIPT = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  const workingday = await WorkingDay.findOne({
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
    owner: req.user.id,
  })
  if (workingday) {
    const workingdays = await WorkingDay.find({
      dayInWeek: { $nin: ['??????'] },
      owner: req.user._id,
      Datemonth: month,
      Dateyear: year,
    })
    let arr = []
    for (let workingday of workingdays) {
      let clocks = await Clock.find({
        date: workingday.date,
        owner: workingday.id,
        isPaid: true,
      })
        .populate('mistaper')
        .populate('tipul')

      arr.push(clocks)
    }
    res.json(arr.flat())
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
        isPending: true,
      })
      owner.numTorim = owner.numTorim + 1
      owner.numAvilableTorim = owner.numAvilableTorim + 1

      owner.torim.push(clock)
      await owner.save()

      const createdClock = await clock.save()
      return res.status(201).json(createdClock)
    } else {
      console.log('???????? ?????? ?????? ???????? ????')
    }
  } else {
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
            isPending: true,
            sapar: sapar,
          }
          let newClocka = new Clock(clock)
          const newClock = await newClocka.save()
          owner.numTorim = owner.numTorim + 1
          owner.numAvilableTorim = owner.numAvilableTorim + 1
          owner.torim.push(newClock)
          torim.push({ newClock })
        } else {
          console.log('?????? ???? ???????? ???????????? ????????')
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
    owner.numTorim = owner.torim.length - 1

    const arr = await Clock.find({ owner: req.params.id, avilable: true })

    owner.numAvilableTorim = arr.length
    await owner.save()
    res.json({ message: 'clock removed' })
  } else {
    res.status(404)
    throw new Error('clock not found')
  }
})
const deleteallclocksforthisday = asyncHandler(async (req, res) => {
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
      owner.numTorim = owner.torim.length - 1
      await owner.save()
    } else {
      owner.numTorim = owner.torim.length - 1
      owner.numAvilableTorim = owner.torim.length - 1
      await owner.save()
    }
    await clock.remove()
    res.json({ message: 'clock removed' })
  } else {
    res.status(404)
    throw new Error('clock not found')
  }
})
const deleteAVILABLEclocksforthisday = asyncHandler(async (req, res) => {
  const id = req.params.id
  const owner = await WorkingDay.findById(id).populate('torim')
  const Clocks = owner.torim //** */
  if (!CheckIfDatePassed(owner.Dateyear, owner.Datemonth, owner.Dateday)) {
    for (let Clock of Clocks) {
      if (Clock.avilable) {
        console.log(`clock ${Clock.time} is avilable`)
        await Clock.remove()
        owner.numTorim = owner.torim.length - 1
        owner.numAvilableTorim = 0
        await owner.save()
      }
    }
    res.json({ message: 'avilable clocks removed' })
  } else {
    for (let Clock of Clocks) {
      if (Clock.avilable && !CheckIfTimePassed(Clock.time)) {
        console.log(`clock ${Clock.time} is avilable`)
        await Clock.remove()
        owner.numTorim = owner.torim.length - 1
        owner.numAvilableTorim = 0
        await owner.save()
      }
    }
    res.json({ message: 'avilable clocks removed' })
  }
})

export {
  createWorkingDay,
  getWorkingDays, //?????? ???????????? -??????????- ???????? ????????
  getWorkingDaysForThisMonth, //?????? ???????????? -??????????- ???????? ????????
  getWorkingDaysForThisWEEK, //?????? ???????????? -??????????- ???????? ????????
  getWorkingDayForToday, //?????? ???????????? ???? -????????- ???????? ????????
  getAllWorkingDays, //????- ?????? ???????????? ???????? ????????-
  getWorkingDaysForNextSEVENworkingDAYS, //???????? ?????? ???????????? ?????????? ???????? ?????? ????
  deleteWorkingDay,
  getWorkingDayById,
  addClock,
  getClocks,
  deleteClock,
  getWorkingDayById2,
  getCLOCKSForTodayRECIPT, //***?????????? ???? ?????????? ???????? ?????? ?????? ???????? ???????????? ?????? ???????? */
  getCLOCKSForThisWeekRECIPT /* ?????????? ???? ?????????? ???????? ???????? ?????? ??????????*/,
  getCLOCKSForThisMonthRECIPT, //*******?????????? ???? ???? ?????????? ???????? ?????????? ?????? */
  getCLOCKSForTHISdayRECIPT /*****?????????? ???? ???????? ?????????? ???????? ?????????????? */,
  deleteallclocksforthisday,
  deleteAVILABLEclocksforthisday,
  getWorkingDayForTOMORROW,
}

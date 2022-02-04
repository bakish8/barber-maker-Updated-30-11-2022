import asyncHandler from 'express-async-handler'
import WorkingDay from '../models/WorkingDay.js'
import User from '../models/userModel.js'
import Clock from '../models/Clock.js'
import moment from 'moment'

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
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
//***מציג עבור הספר  הספציפי את ימי העבודה  עבור חודש זה  */
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
  }) //***שההחודש והשנה יהיו שווים לחודש ולשנה בדאטה בייס וגם הבעלים של ימי העבודה הזה יהיה שווה לאיידי של הספר */
  res.json(workingdays)
})
//*מציג עבור הספר  הספציפי את ימי העבודה  עבור -יום-  זה  *
//עדיין לא עובד בגלל הסורט ,המאפ ושמוחזר וורקינג דיי ולא וורקינג דייס בג'ייסון
const getWorkingDayForToday = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  //מוצא את היום עם התאריך הזה על מנת להחזיר את הערך של היום בשבוע שלו
  const workingday = await WorkingDay.findOne({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
    Dateday: day,
  })
  if (workingday) {
    const workingdays = await WorkingDay.find({
      dayInWeek: { $nin: ['שבת'] },
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
    //אם זה לא נמצא יום עבודה זה תחזיר את היום הקודם--למשל אם יום שבת נמשיך ונעשה שאם לא נמצא גם יום קודם יציג את השבע ימים הבאים
    const workingdays = await WorkingDay.find({
      owner: req.user._id,
      dayInWeek: { $nin: ['שבת'] },
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
  console.log('tomorrow')
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const monthPlusOne = parseInt(month) + 1
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const dayPlusOne = parseInt(day) + 1
  const year = FormatedSearchDate.substring(0, 4)
  //מוצא את היום עם התאריך הזה על מנת להחזיר את הערך של היום בשבוע שלו
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
      console.log(`workingday found~!`)
      res.json(workingdays)
    } else {
      console.log(`workingday NOT found~!`)
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
        console.log(`workingday found~!`)
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

//***מציג עבור הספר  הספציפי את ימי העבודה  עבור שבעת הימים הבאים זה  */
const getWorkingDaysForNextSEVENworkingDAYS = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  //מוצא את היום עם התאריך הזה על מנת להחזיר את הערך של היום בשבוע שלו
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
      dayInWeek: { $nin: ['שבת'] },
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

//***מציג עבור הספר  הספציפי את ימי העבודה  עבור -שבוע-  זה  */
const getWorkingDaysForThisMonth = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  //מוצא את היום עם התאריך הזה על מנת להחזיר את הערך של היום בשבוע שלו

  const workingdays = await WorkingDay.find({
    owner: req.user._id,
    Datemonth: month,
    Dateyear: year,
  })
  if (workingdays) {
    res.json(workingdays)
  } else {
    console.log('לא נמצאו ימי עבודה עבוא חודש זה')
  }
})

const getWorkingDaysForThisWEEK = asyncHandler(async (req, res) => {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()

  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2) * 1
  console.log(month)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8) * 1
  console.log(day)
  const year = FormatedSearchDate.substring(0, 4)
  console.log(year)

  //מוצא את היום עם התאריך הזה על מנת להחזיר את הערך של היום בשבוע שלו

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
    console.log(dayMinus1)
    console.log(dayMinus1)
    console.log(dayMinus1)
    console.log(dayMinus1)
    console.log(dayMinus1)
    console.log(dayMinus1)
    if (dayInWeek === 'ראשון') {
      //יחזיר את השישה ימים הבאים
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
      }) //***החודש השנה והיום שווים */
      res.json(workingdays)
    } else if (dayInWeek === 'שני') {
      //יחזיר את חמישה ימים הבאים ויום אחד אחורה
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
    } else if (dayInWeek === 'שלישי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'רביעי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'חמישי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'שישי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'שבת') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    //אם זה יום שבת תצציג את השבוע שהיה
  } else {
    const workingday = await WorkingDay.find({
      owner: req.user._id,
      dayInWeek: { $nin: ['שבת'] },
      Datemonth: month,
      Dateyear: year,
      Dateday: {
        $in: [day - 1],
      },
    })
    if (workingday) {
      console.log(workingday)
      console.log(workingday)
      console.log(workingday)
      console.log(workingday)

      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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

//**מציג את -כל- ימי העבודה שקיימים עבור ספר זה */
const getAllWorkingDays = asyncHandler(async (req, res) => {
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

  console.log(clocks)
  if (clocks) {
    res.json(clocks)
  } else {
    console.log('sadsad')
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
    console.log('לא נמצאו שעות ששולמו ליום הספציפי הזה')
  }

  console.log(clocks)
  if (clocks) {
    res.json(clocks)
  } else {
    console.log('sadsad')
    res.status(404)
    throw new Error('workingday not found')
  }
})

const getCLOCKSForTodayRECIPT = asyncHandler(async (req, res) => {
  // ליום  הנוכי הזה יחזיר את התורים המשולמים ליום אחד'
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
    //אחרת (אם שבת תחזיר את שישי או את היום הקודם למה שלא נמצא )
    const workingday = await WorkingDay.findOne({
      Datemonth: month,
      Dateyear: year,
      Dateday: day - 1, //***אם לא נמצא יום עבודה זה תחזיריום אחד לפני זה במקרה של שבת  */
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
  // ליום  הנוכי הזה יחזיר את התורים המשולמים ליום אחד'
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

    if (dayInWeek === 'ראשון') {
      //יחזיר את השישה ימים הבאים
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'שני') {
      //יחזיר את חמישה ימים הבאים ויום אחד אחורה
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'שלישי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'רביעי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'חמישי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'שישי') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    } else if (dayInWeek === 'שבת') {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
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
    //אם זה יום שבת תצציג את השבוע שהיה
  } else {
    const workingday = await WorkingDay.find({
      owner: req.user._id,
      dayInWeek: { $nin: ['שבת'] },
      Datemonth: month,
      Dateyear: year,
      Dateday: {
        $in: [day - 1, day - 2],
      },
    })
    if (workingday) {
      const workingdays = await WorkingDay.find({
        dayInWeek: { $nin: ['שבת'] },
        owner: req.user._id,
        Datemonth: month,
        Dateyear: year,
        Dateday: {
          $in: [day, day - 1, day - 2, day - 3, day - 4, day - 5],
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
      res.json(arr)
    }
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
      dayInWeek: { $nin: ['שבת'] },
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
  const clock = await Clock.findById(req.params.uid)
  const id = req.params.id
  if (clock) {
    const owner = await WorkingDay.findByIdAndUpdate(id, {
      $pull: { torim: req.params.uid },
    })
    owner.numTorim = owner.torim.length - 1
    owner.numAvilableTorim = 0
    await owner.save()
    await clock.remove()
    res.json({ message: 'clock removed' })
  } else {
    res.status(404)
    throw new Error(`clock not found: ${req.params.cid}`)
  }
})
const deleteSELECTEDclocksforthisday = asyncHandler(async (req, res) => {
  const clock = await Clock.findById(req.params.cid)
  const id = req.params.id
  if (clock) {
    const owner = await WorkingDay.findByIdAndUpdate(id, {
      $pull: { torim: clock._id },
    })
    await owner.save()

    if (clock.avilable === false) {
      const mistaper = await User.findById(clock.mistaper._id)
      var index = mistaper.torim.indexOf(clock._id)
      mistaper.torim.splice(index, 1)
      await mistaper.save()
      owner.numTorim = owner.torim.length - 1
      owner.numAvilableTorim = owner.numAvilableTorim
      await owner.save()
      await clock.remove()
    } else {
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      console.log(owner.numAvilableTorim - 1)
      owner.numTorim = owner.torim.length - 1
      owner.numAvilableTorim = owner.numAvilableTorim - 1
      await clock.remove()
      console.log('111111111111111111111111111111111111111111')
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      console.log(owner.numAvilableTorim)
      await owner.save()
    }
    res.json({ message: 'clock removed' })
  } else {
    res.status(404)
    throw new Error(`clock not found: ${req.params.cid}`)
  }
})

export {
  createWorkingDay,
  getWorkingDays, //ימי העבודה -החודש- עבור הספר
  getWorkingDaysForThisMonth, //ימי העבודה -החודש- עבור הספר
  getWorkingDaysForThisWEEK, //ימי העבודה -השבוע- עבור הספר
  getWorkingDayForToday, //יום העבודה של -היום- עבור הספר
  getAllWorkingDays, //כל- ימי העבודה עבור הספר-
  getWorkingDaysForNextSEVENworkingDAYS, //שבעת ימי העבודה הבאים עבור ספר זה
  deleteWorkingDay,
  getWorkingDayById,
  addClock,
  getClocks,
  deleteClock,
  getWorkingDayById2,
  getCLOCKSForTodayRECIPT, //***מחזיר את השעות עבור יום אחד היום הנוחכי הזה קבלה */
  getCLOCKSForThisWeekRECIPT /* מחזיר את השעות עבור שבוע אחד לקבלה*/,
  getCLOCKSForThisMonthRECIPT, //*******מחזיר את כל השעות עבור החודש הזה */
  getCLOCKSForTHISdayRECIPT /*****מחזיר את שעות הקבלה ליום הספציפי */,
  deleteallclocksforthisday,
  deleteAVILABLEclocksforthisday,
  deleteSELECTEDclocksforthisday,
  getWorkingDayForTOMORROW,
}

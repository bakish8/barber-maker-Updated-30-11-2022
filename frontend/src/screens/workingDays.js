import Swal from 'sweetalert2'
import moment from 'moment'
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listWorkingDays,
  makeWorkingDay,
  deleteWorkingday,
  listOneWorkingDay,
  listWorkingDaysFORthisWEEK,
  getCLOCKSForTodayReciptAction,
  getCLOCKSForThisWeekReciptAction,
  getCLOCKSForThisMonthReciptAction,
  createReport,
  createReportForWeek,
  createReportForMonth,
} from '../actions/userActions'
import { Link } from 'react-router-dom'
import { Calendar, DateObject } from 'react-multi-date-picker'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import gregorian_ar from 'react-date-object/locales/gregorian_ar'
import { addDays } from 'date-fns'
import '../components/SpeedDial.css'
import { Box, Modal } from '@material-ui/core'
import ReactToPrint from 'react-to-print' //הדפסה
import ReactToPdf from 'react-to-pdf' //pdf
import emailjs from 'emailjs-com'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

const WorkingDaysScreen = ({ history }) => {
  const dispatch = useDispatch()
  // ┬─┐┌─┐┌─┐ !┌─┐
  // ├┬┘├┤ ├┤   └─┐
  // ┴└─└─┘└    └─┘
  /////*****send email Form value */
  const form = useRef()
  const form2 = useRef()
  const form3 = useRef()
  //*****printing value Ref*/
  const componentRef = useRef()

  // ┌┬┐┌─┐┌┬┐┌─┐   ┬   ┌┬┐┬┌┬┐┌─┐    ┌┐┌┌─┐┬ ┬
  //  ││├─┤ │ ├┤   ┌┼─   │ ││││├┤     ││││ ││││
  // ─┴┘┴ ┴ ┴ └─┘  └┘    ┴ ┴┴ ┴└─┘    ┘└┘└─┘└┴┘
  /****date for today for recipet Functionality-make Proper view Date */
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2) * 1
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8) * 1
  const year = FormatedSearchDate.substring(0, 4) * 1
  const Calculateminute = FormatedSearchDate.slice(14)
  const minute = Calculateminute.substring(0, 2)
  const CalculateHour = FormatedSearchDate.slice(11)
  const hour = CalculateHour.substring(0, 2)
  const time = `${hour}:${minute}`
  const date = `${day}/${month}/${year}`

  // ██████╗ ███████╗██████╗ ██╗   ██╗██╗  ██╗    ███████╗████████╗ █████╗ ████████╗███████╗███████╗
  // ██╔══██╗██╔════╝██╔══██╗██║   ██║╚██╗██╔╝    ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
  // ██████╔╝█████╗  ██║  ██║██║   ██║ ╚███╔╝     ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
  // ██╔══██╗██╔══╝  ██║  ██║██║   ██║ ██╔██╗     ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
  // ██║  ██║███████╗██████╔╝╚██████╔╝██╔╝ ██╗    ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
  // ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

  const ClocksReciptOneDay = useSelector((state) => state.ClocksReciptOneDay)
  const { result1day } = ClocksReciptOneDay

  const ClocksReciptWEEK = useSelector((state) => state.ClocksReciptWEEK)
  const { resultWEEK } = ClocksReciptWEEK

  const ClocksReciptMonth = useSelector((state) => state.ClocksReciptMonth)
  const { resultMonth } = ClocksReciptMonth

  const ONE_WORKING_DAY = useSelector((state) => state.ONE_WORKING_DAY)
  const { onesuccess, oneworkingdays } = ONE_WORKING_DAY

  const LIST_WORK_DAYS_WEEK = useSelector((state) => state.LIST_WORK_DAYS_WEEK)
  const { weekworkingdays } = LIST_WORK_DAYS_WEEK

  const workingDayList = useSelector((state) => state.workingDayList)
  const { loading, error, workingdays } = workingDayList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const DeleteworkingDay = useSelector((state) => state.DeleteworkingDay)
  const { success: Deletesuccess } = DeleteworkingDay

  const MakeWorkDay = useSelector((state) => state.MakeWorkDay)
  const {
    success: CreateSuccses,
    NewWorkDayloading,
    NewWorkDayerror,
    workingDayInfo,
  } = MakeWorkDay

  // ███████╗████████╗ █████╗ ████████╗███████╗███████╗
  // ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
  // ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
  // ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
  // ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
  // ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

  /***states date picker */
  const [message, setMessage] = useState(null)

  const [SHOW_SINUN, setSHOW_SINUN] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const weekDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת']
  const months = [
    'ינואר',
    'פבואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ]
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const [state, setState] = useState({ format: 'DD/MM/YYYY' })
  //****state+ function that shos the sicum for this Month */
  const [showSicum, setshowSicum] = useState(false)
  const showSicumNow = () => {
    const searchDate = new Date()
    const FormatedSearchDate = moment(searchDate).format()
    const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
    const month = CalculateMonthmonth.slice(-2) * 1
    const CalculateDay = FormatedSearchDate.substring(0, 10)
    const day = CalculateDay.slice(8) * 1
    const year = FormatedSearchDate.substring(0, 4)
    const Calculateminute = FormatedSearchDate.slice(14)
    const minute = Calculateminute.substring(0, 2)
    const CalculateHour = FormatedSearchDate.slice(11)
    const hour = CalculateHour.substring(0, 2)
    const time = `${hour}:${minute}`
    const date = `${day}/${month}/${year}`
    setshowSicum(true)
    if (showTable30Days) {
      Swal.fire({
        title: '?האם תרצה להפיק דו"ח עבור חודש זה',
        text: `חשוב שתדע,הסיכום יופק בהתאם לנתוני המערכת בזמן זה, בתאריך ${date}, בשעה ${time}`,
        imageUrl: 'https://i.ibb.co/jMNthkF/output-onlinegiftools-5.gif',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ביטול',
        confirmButtonText: 'הפק דו"ח',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: 'מפיק עבורך דו"ח עבור חודש זה אנא המתן',
            imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            timer: 500,
            background: '#68b4ff00',
            backdrop: 'rgba(0, 0, 0,0.8)',
            color: 'rgba(255, 255, 255)',
            showConfirmButton: false,
          }).then(setopenMonth(true))
        } else {
          console.log('your workingday is safe')
        }
      })
    } else if (showTableThisWeek) {
      Swal.fire({
        title: '?האם תרצה להפיק דו"ח עבור שבוע זה',
        text: `חשוב שתדע,הסיכום יופק בהתאם לנתוני המערכת בזמן זה, בתאריך ${date}, בשעה ${time}`,
        imageUrl: 'https://i.ibb.co/jMNthkF/output-onlinegiftools-5.gif',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ביטול',
        confirmButtonText: 'הפק דו"ח',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: 'מפיק עבורך דו"ח עבור שבוע זה אנא המתן',
            imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            timer: 500,
            background: '#68b4ff00',
            backdrop: 'rgba(0, 0, 0,0.8)',
            color: 'rgba(255, 255, 255)',
            showConfirmButton: false,
          }).then(setOpenweek(true))
        } else {
          console.log('your workingday is safe')
        }
      })
    } else if (showTable1Day) {
      Swal.fire({
        title: '?האם תרצה להפיק דו"ח עבור יום זה',
        text: `חשוב שתדע,הסיכום יופק בהתאם לנתוני המערכת בזמן זה, בתאריך ${date}, בשעה ${time}`,
        imageUrl: 'https://i.ibb.co/jMNthkF/output-onlinegiftools-5.gif',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ביטול',
        confirmButtonText: 'הפק דו"ח',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            text: 'מפיק עבורך דו"ח עבור חודש זה אנא המתן',
            imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            timer: 500,
            background: '#68b4ff00',
            backdrop: 'rgba(0, 0, 0,0.8)',
            color: 'rgba(255, 255, 255)',
            showConfirmButton: false,
          }).then(setOpen1day(true))
        } else {
          console.log('your workingday is safe')
        }
      })
    }
  }
  ///speedDIal APPREANCE state
  const [showOptions, setshowOptions] = useState(false)
  const showOptionsNow = () => {
    setshowOptions(!showOptions)
  }
  //***states for Email Adress sending Sicum */
  const [emailToSendTo, SetemailToSendTo] = useState(userInfo.email)

  //***states For Sicum session*/
  const [showTable1Day, setshowTable1Day] = useState(false)
  const showTable1DayNOW = () => {
    Settype('daily')
    setshowTable1Day(true)
    if (showTable30Days || showTableThisWeek || showSicum) {
      setshowTable30Days(false)
      setshowTableThisWeek(false)
      setshowSicum(false)
    }
  }
  const [showTableThisWeek, setshowTableThisWeek] = useState(false)
  const showTableThisWeekNOW = () => {
    Settype('weekly')

    setshowTableThisWeek(true)
    if (showTable30Days || showTable1Day || showSicum) {
      setshowTable30Days(false)
      setshowTable1Day(false)
      setshowSicum(false)
    }
  }
  const [showTable30Days, setshowTable30Days] = useState(true)
  const showTable30DaysNOW = () => {
    Settype('monthly')

    setshowTable30Days(true)
    if (showTable1Day || showTableThisWeek || showSicum) {
      setshowTable1Day(false)
      setshowTableThisWeek(false)
      setshowSicum(false)
    }
  }
  //staets for tabels?
  const [open1day, setOpen1day] = React.useState(false)
  const handleOpen1day = () => setOpen1day(true)
  const handleClose1day = () => setOpen1day(false)
  const [openweek, setOpenweek] = React.useState(false)
  const handleOpenweek = () => setOpenweek(true)
  const handleCloseweek = () => setOpenweek(false)
  const [openMonth, setopenMonth] = React.useState(false)
  const handleOpenMonth = () => setopenMonth(true)
  const handleCloseMonth = () => setopenMonth(false)

  const [type, Settype] = React.useState('monthly') //** type state for recipet*/

  const [afterdate, Setfterdate] = React.useState(false) //**caclculate if passed date for day state */
  const [afterdateForWEEK, SetafterdateForWEEK] = React.useState(false) //**caclculate if passed date for week  state*/
  const [afterdateForMONTH, SetafterdateForMONTH] = React.useState(false) //**caclculate if passed date for month  state*/

  // ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
  // ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
  // █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
  // ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
  // ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
  // ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

  //העברה לעמוד יום העבודה הספציפי
  const sendMEtoWorkPageFunction = (id) => {
    console.log(id)
    history.push(`/admin/workingday/${id}`)
  }

  //**COVERNET DATEPICKER FUNCTION המרת דייט פיקר לפורמט קריא*/
  const convert = (date, format = state.format) => {
    let object = { date, format }
    setState({
      gregorian: new DateObject(object).format(),
      jsDate: date.toDate(),
      ...object,
    })
    let day = `${date.weekDay.number}`
    if (day == 1) {
      day = 'ראשון'
    } else if (day == 2) {
      day = 'שני'
    } else if (day == 3) {
      day = 'שלישי'
    } else if (day == 4) {
      day = 'רביעי'
    } else if (day == 5) {
      day = 'חמישי'
    } else if (day == 6) {
      day = 'שישי'
    } else if (day == 7) {
      day = 'שבת'
    }
    let dateData = `${date.day}/${date.month.number}/${date.year}`
    let Dateday = `${date.day}`
    let Datemonth = `${date.month.number}`
    let Dateyear = `${date.year}`
    let id = userInfo._id
    WorkingDaySubmitHandler(dateData, day, id, Dateday, Datemonth, Dateyear)
  }
  //****function that Makes WORKING DAYS /OR ENTER THEM (BY BACKEND) ******/
  const WorkingDaySubmitHandler = (
    dateData,
    day,
    id,
    Dateday,
    Datemonth,
    Dateyear
  ) => {
    if (!dateData) {
      setMessage('יום זה לא קיים')
    } else {
      dispatch(makeWorkingDay(dateData, day, id, Dateday, Datemonth, Dateyear))
    }
  }

  const deleteHandler = (id) => {
    Swal.fire({
      title: '?אתה בטוח',
      text: 'ברגע שתמחק את יום זה כל התורים בתוכו יעלמו ולא יהיה ניתן להשיבם',
      icon: 'warning',
      buttons: ['ביטול', 'מחק יום עבודה'],

      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'כן אני בטוח',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWorkingday(id)).then(
          Swal.fire({
            text: ' מוחק את יום העבודה שביקשת אנא המתן',

            imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            timer: 8000,
            background: '#68b4ff00',
            backdrop: 'rgba(0, 0, 0,0.8)',
            color: 'rgba(255, 255, 255)',
            showConfirmButton: false,
          })
        )
      } else {
        console.log('your workingday is safe')
      }
    })
  }
  const weekworkingdaysFunctionCountTorimForThisMonth = () => {
    if (workingdays) {
      let count = 0
      for (let Workday of workingdays) {
        count = count + Workday.numTorim
      }
      return count
    }
  }
  const weekworkingdaysFunctionCountAvilableTorimForThisMonth = () => {
    if (workingdays) {
      let count = 0
      for (let Workday of workingdays) {
        count = count + Workday.numAvilableTorim
      }
      return count
    }
  }
  const weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisMonth = () => {
    if (workingdays) {
      let count = 0
      for (let Workday of workingdays) {
        count = count + Workday.CupaOpend
      }
      return count
    }
  }
  const MoneycountForThisMonth = () => {
    if (workingdays) {
      let count = 0
      for (let Workday of workingdays) {
        count = count + Workday.moneyCount
      }
      return count
    }
  }
  const weekworkingdaysFunctionCountTorimForThisWeek = () => {
    if (weekworkingdays) {
      let count = 0
      for (let Workday of weekworkingdays) {
        count = count + Workday.numTorim
      }
      return count
    }
  }

  const weekworkingdaysFunctionCountAvilableTorimForThisWeek = () => {
    if (weekworkingdays) {
      let count = 0
      for (let Workday of weekworkingdays) {
        count = count + Workday.numAvilableTorim
      }
      return count
    }
  }
  const weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisWeek = () => {
    if (weekworkingdays) {
      let count = 0
      for (let Workday of weekworkingdays) {
        count = count + Workday.CupaOpend
      }
      return count
    }
  }
  const MoneycountForThisWEEK = () => {
    if (weekworkingdays) {
      let count = 0
      for (let Workday of weekworkingdays) {
        count = count + Workday.moneyCount
      }
      return count
    }
  }

  const openSwalForExplain = () => {
    if (userInfo) {
      Swal.fire({
        title: `צור יום עבודה`,
        text: `לחץ על היום שברצונך לעבוד ביומן העבודה על מנת ליצור יום עבודה`,
        confirmButtonText: 'אוקי',
        showLoaderOnConfirm: true,
        confirmButtonColor: '#114422',
        imageUrl: 'https://i.ibb.co/F7ytm19/animation-300-kym86n2q.gif',
        imageWidth: 150,
        imageHeight: 150,
      })
    }
  }
  // ██╗   ██╗███████╗███████╗    ███████╗███████╗███████╗███████╗ ██████╗████████╗
  // ██║   ██║██╔════╝██╔════╝    ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
  // ██║   ██║███████╗█████╗      █████╗  █████╗  █████╗  █████╗  ██║        ██║
  // ██║   ██║╚════██║██╔══╝      ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
  // ╚██████╔╝███████║███████╗    ███████╗██║     ██║     ███████╗╚██████╗   ██║'s
  //  ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝
  //General USE EFFECT
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listWorkingDays())
      dispatch(listOneWorkingDay())
      dispatch(listWorkingDaysFORthisWEEK())
      dispatch(getCLOCKSForTodayReciptAction())
      dispatch(getCLOCKSForThisWeekReciptAction())
      dispatch(getCLOCKSForThisMonthReciptAction())

      if (workingDayInfo && CreateSuccses) {
        history.push(`/admin/workingday/${workingDayInfo._id}`)
      }
      if (Deletesuccess === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `הפעולה בוצעה בהצלחה`,
          text: `יום עבודה זה נמחק בהצלחה מהמערכת`,
          showConfirmButton: false,
          timer: 8000,
        })
      }
    } else {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
    Deletesuccess,
    CreateSuccses,
    workingDayInfo,
  ])
  //USE EFFECT  FOR RECIPT CREATING-IF PAST? - STATUS
  useEffect(() => {
    if (oneworkingdays && oneworkingdays[0]) {
      const month_Absulute = oneworkingdays[0].Datemonth
      const Year_Absulute = oneworkingdays[0].Dateyear
      const Day_Absulute = oneworkingdays[0].Dateday

      if (
        year === Year_Absulute &&
        month === month_Absulute &&
        day >= Day_Absulute
      ) {
        Setfterdate(true)
      }
    }
  }, [oneworkingdays])

  //USE EFFECT  FOR - WEEK +MONTH IF DATE PASSED BEFORE SEND A REPORT STATUS- RECIPT CREATING -IF PAST? - STATUS
  useEffect(() => {
    if (weekworkingdays && weekworkingdays.length != 0) {
      const lastDayOfWeek =
        weekworkingdays && weekworkingdays[weekworkingdays.length - 1].date
      console.log(`weekworkingdays last day:${lastDayOfWeek}`)
      if (lastDayOfWeek.length === 8) {
        console.log('8888888888888888888888888888888888888888')
        const Calculate_Month = lastDayOfWeek.substring(0, 3)
        const month_Absulute = Calculate_Month.slice(-1) * 1
        console.log(month_Absulute)
        console.log(month)

        const Day_Absulute = lastDayOfWeek.substring(0, 1) * 1
        console.log(Day_Absulute)
        console.log(day)

        const Year_Absulute = lastDayOfWeek.slice(-4) * 1
        console.log(Year_Absulute)
        console.log(year)
        if (
          year >= Year_Absulute &&
          month >= month_Absulute &&
          day >= Day_Absulute
        ) {
          SetafterdateForWEEK(true)
        }
      } else {
        const Calculate_Month = lastDayOfWeek.substring(0, 5)
        const month_Absulute = Calculate_Month.slice(-2) * 1
        const Year_Absulute = lastDayOfWeek.slice(-4) * 1
        const Day_Absulute = lastDayOfWeek.substring(0, 2) * 1
        console.log(Day_Absulute)
        console.log(month_Absulute)
        console.log(Year_Absulute)
        console.log(day)
        console.log(month)
        console.log(year)

        if (
          year >= Year_Absulute &&
          month >= month_Absulute &&
          day >= Day_Absulute
        ) {
          SetafterdateForWEEK(true)
        }
      }
    }
  }, [weekworkingdays])

  //USE EFFECT  FOR - MONTH - RECIPT CREATING -IF PAST? - STATUS
  useEffect(() => {
    if (workingdays && workingdays.length != 0) {
      const lastDayOfWeek =
        workingdays && workingdays[workingdays.length - 1].date
      console.log(`workingdays last day:${lastDayOfWeek}`)
      const Calculate_Month = lastDayOfWeek.substring(0, 5)
      const month_Absulute = Calculate_Month.slice(-2)
      const Year_Absulute = lastDayOfWeek.slice(-4)
      const Day_Absulute = lastDayOfWeek.substring(0, 2)
      console.log(Day_Absulute)
      console.log(month_Absulute)
      console.log(Year_Absulute)

      console.log(day)
      console.log(month)
      console.log(year)

      if (
        year >= Year_Absulute &&
        month >= month_Absulute &&
        day >= Day_Absulute
      ) {
        SetafterdateForMONTH(true)
      }
    }
  }, [workingdays])

  //****Email Js Send Config */
  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm(
      'service_39dykwd',
      'template_2g58hdb',
      form.current,
      'user_MeCZIT7caY2EMmsA27uFt'
    )
  }
  const sendEmail2 = (e) => {
    e.preventDefault()
    emailjs.sendForm(
      'service_39dykwd',
      'template_b8fjgeg',
      form2.current,
      'user_MeCZIT7caY2EMmsA27uFt'
    )
  }
  const sendEmail3 = (e) => {
    e.preventDefault()
    emailjs.sendForm(
      'service_39dykwd',
      'template_7r7y4ts',
      form3.current,
      'user_MeCZIT7caY2EMmsA27uFt'
    )
  }
  //****Swals models before sending emails */

  const openSwalHandlerFor1DAYpdfToEMAIL = (e) => {
    setOpen1day(false)
    Swal.fire({
      icon: 'question',
      title: `האם תרצה לשלח את הדו"ח לאימייל ${userInfo.email}?`,
      text: `במידה ותתן אישור הדו"ח ליום זה ישלח לאימיל שהגדרת`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שלח לאימייל זה',
      showDenyButton: true,
      denyButtonColor: 'rgb(255, 165, 0)',
      denyButtonText: `שלח לאימייל אחר`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'שולח עבורך את הד"וח שביקשת אנא המתן',
          imageUrl: 'https://i.ibb.co/ykdtnvz/icons8-secured-letter.gif',
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: 'Custom image',
          timer: 500,
          background: '#68b4ff00',
          backdrop: 'rgba(0, 0, 0,0.8)',
          color: 'rgba(255, 255, 255)',
          showConfirmButton: false,
        })
          .then(sendEmail(e))
          .then(
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
          )
      } else if (result.isDenied) {
        Swal.fire({
          title: 'מה האימייל שאליו תרצה לשלח את הד"וח היומי לתאריך ______',
          text: `הזן את כתובת האימייל שאליה תרצה לשלוח את הד"וח`,
          imageUrl: 'https://i.ibb.co/ykdtnvz/icons8-secured-letter.gif',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שלח ד"וח לאימייל זה',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          preConfirm: (email) => {
            SetemailToSendTo(email)
          },
        }).then((result) => {
          if (result.isConfirmed) {
            sendEmail(e).then(
              Swal.fire({
                imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
                title: `האימייל נשלח בהצלחה`,
                showConfirmButton: false,
                timer: 5000,
              })
            )
          }
        })
      }
    })
  }
  const openSwalHandlerForWeekpdfToEMAIL = (e) => {
    setOpenweek(false)
    Swal.fire({
      icon: 'question',
      title: `האם תרצה לשלח את הדו"ח השבועי לאימייל ${userInfo.email}?`,
      text: `במידה ותתן אישור הדו"ח ליום זה ישלח לאימיל שהגדרת`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שלח לאימייל זה',
      showDenyButton: true,
      denyButtonColor: 'rgb(255, 165, 0)',
      denyButtonText: `שלח לאימייל אחר`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'שולח עבורך את הד"וח שביקשת אנא המתן',
          imageUrl: 'https://i.ibb.co/ykdtnvz/icons8-secured-letter.gif',
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: 'Custom image',
          timer: 500,
          background: '#68b4ff00',
          backdrop: 'rgba(0, 0, 0,0.8)',
          color: 'rgba(255, 255, 255)',
          showConfirmButton: false,
        })
          .then(sendEmail2(e))
          .then(
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
          )
      } else if (result.isDenied) {
        Swal.fire({
          title: `מה האימייל שאליו תרצה לשלח את הד"וח השבועי לתאריכים ${
            weekworkingdays && weekworkingdays[0].date
          } -${
            weekworkingdays && weekworkingdays[weekworkingdays.length - 1].date
          }`,
          text: `הזן את כתובת האימייל שאליה תרצה לשלוח את הד"וח`,
          imageUrl: 'https://i.ibb.co/ykdtnvz/icons8-secured-letter.gif',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שלח ד"וח לאימייל זה',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          preConfirm: (email) => {
            SetemailToSendTo(email)
          },
        }).then((result) => {
          if (result.isConfirmed) {
            sendEmail2(e)
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
          }
        })
      }
    })
  }
  const openSwalHandlerForMonthpdfToEMAIL = (e) => {
    setopenMonth(false)
    Swal.fire({
      icon: 'question',
      title: `האם תרצה לשלח את הדו"ח החודשי שלך לאימייל ${userInfo.email}?`,
      text: `במידה ותתן אישור הדו"ח ליום זה ישלח לאימיל שהגדרת`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שלח לאימייל זה',
      showDenyButton: true,
      denyButtonColor: 'rgb(255, 165, 0)',
      denyButtonText: `שלח לאימייל אחר`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'שולח עבורך את הד"וח שביקשת אנא המתן',
          imageUrl: 'https://i.ibb.co/ykdtnvz/icons8-secured-letter.gif',
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: 'Custom image',
          timer: 500,
          background: '#68b4ff00',
          backdrop: 'rgba(0, 0, 0,0.8)',
          color: 'rgba(255, 255, 255)',
          showConfirmButton: false,
        })
          .then(sendEmail3(e))
          .then(
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
          )
      } else if (result.isDenied) {
        Swal.fire({
          title: `מה האימייל שאליו תרצה לשלח את הד"וח השבועי לתאריכים ${
            weekworkingdays && workingdays[0].date
          } -${weekworkingdays && workingdays[workingdays.length - 1].date}`,
          text: `הזן את כתובת האימייל שאליה תרצה לשלוח את הד"וח`,
          imageUrl: 'https://i.ibb.co/ykdtnvz/icons8-secured-letter.gif',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שלח ד"וח לאימייל זה',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          preConfirm: (email) => {
            SetemailToSendTo(email)
          },
        }).then((result) => {
          if (result.isConfirmed) {
            sendEmail3(e)
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
          }
        })
      }
    })
  }
  const dispatchCrtateReport = () => {
    setOpen1day(false)
    Swal.fire({
      title: `?תרצה לשמור את דו"ח זה במערכת`,
      text: `האם אתה בטוח שתרצה לשמור דו"ח היומי לתאריך${oneworkingdays[0].date} במערכת`,
      imageUrl: 'https://i.ibb.co/7KZpmDV/icons8-save.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שמור במערכת',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createReport(
            userInfo._id,
            type,
            oneworkingdays[0].date,
            afterdate,
            oneworkingdays[0].numTorim,
            oneworkingdays[0].numAvilableTorim,
            oneworkingdays[0].numTorim - oneworkingdays[0].numAvilableTorim,
            oneworkingdays &&
              oneworkingdays[0].numTorim -
                oneworkingdays[0].numAvilableTorim -
                oneworkingdays[0].CupaOpend,
            oneworkingdays[0].moneyCount,
            result1day,
            date,
            time
          )
        )
        Swal.fire({
          imageUrl: 'https://i.ibb.co/vjnbhYB/icons8-save-close.gif',
          title: `הדו"ח נשמר בהצלחה`,
          showConfirmButton: false,
          timer: 5000,
        })
      }
    })
  }

  const dispatchCrtateReportForWeek = () => {
    setOpenweek(false)
    Swal.fire({
      title: `?תרצה לשמור את דו"ח זה במערכת`,
      text: `האם אתה בטוח שתרצה לשמור את הדו"ח השבועי לתאריכים ${
        weekworkingdays[0].date
      }-${
        weekworkingdays[weekworkingdays.length - 1].date
      } במערכת? אנא וודא שאתה מסיים אתה השבוע לפני שאתה עושה זאת`,
      imageUrl: 'https://i.ibb.co/7KZpmDV/icons8-save.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שמור במערכת',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createReportForWeek(
            userInfo._id,
            type,
            `${weekworkingdays[0].date}-${
              weekworkingdays[weekworkingdays.length - 1].date
            }`,
            afterdateForWEEK,
            weekworkingdays.length,
            weekworkingdaysFunctionCountTorimForThisWeek(),
            weekworkingdaysFunctionCountAvilableTorimForThisWeek(),
            weekworkingdaysFunctionCountTorimForThisWeek() -
              weekworkingdaysFunctionCountAvilableTorimForThisWeek(),
            weekworkingdaysFunctionCountTorimForThisWeek() -
              weekworkingdaysFunctionCountAvilableTorimForThisWeek() -
              weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisWeek(),
            MoneycountForThisWEEK(),
            resultWEEK,
            date,
            time
          )
        )
        Swal.fire({
          imageUrl: 'https://i.ibb.co/vjnbhYB/icons8-save-close.gif',
          title: `הדו"ח נשמר בהצלחה`,
          showConfirmButton: false,
          timer: 5000,
        })
      }
    })
  }
  const dispatchCrtateReportForMonth = () => {
    setopenMonth(false)
    Settype('monthly')

    Swal.fire({
      title: `?תרצה לשמור את דו"ח זה במערכת`,
      text: `האם אתה בטוח שתרצה לשמור את הדו"ח החודשי לתאריכים ${
        workingdays[0].date
      }-${workingdays[workingdays.length - 1].date} במערכת?`,
      imageUrl: 'https://i.ibb.co/7KZpmDV/icons8-save.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שמור במערכת',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          createReportForMonth(
            userInfo._id,
            type,
            `${workingdays[0].date}-${
              workingdays[workingdays.length - 1].date
            }`,
            afterdateForMONTH,
            workingdays.length,
            weekworkingdaysFunctionCountTorimForThisMonth(),
            weekworkingdaysFunctionCountAvilableTorimForThisMonth(),

            weekworkingdaysFunctionCountTorimForThisMonth() -
              weekworkingdaysFunctionCountAvilableTorimForThisMonth(),
            weekworkingdaysFunctionCountTorimForThisMonth() -
              weekworkingdaysFunctionCountAvilableTorimForThisMonth() -
              weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisMonth(),
            MoneycountForThisMonth(),
            resultMonth,
            date,
            time
          )
        )
        Swal.fire({
          imageUrl: 'https://i.ibb.co/vjnbhYB/icons8-save-close.gif',
          title: `הדו"ח נשמר בהצלחה`,
          showConfirmButton: false,
          timer: 5000,
        })
      }
    })
  }

  // ██████╗ ███████╗████████╗██╗   ██╗██████╗ ███╗   ██╗
  // ██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗████╗  ██║
  // ██████╔╝█████╗     ██║   ██║   ██║██████╔╝██╔██╗ ██║
  // ██╔══██╗██╔══╝     ██║   ██║   ██║██╔══██╗██║╚██╗██║
  // ██║  ██║███████╗   ██║   ╚██████╔╝██║  ██║██║ ╚████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

  return (
    <>
      {oneworkingdays && oneworkingdays.length != 0 && (
        <form id='disableView' method='post' ref={form} onSubmit={sendEmail}>
          <input type='email' name='user_email' value={emailToSendTo} />

          <input
            type='text'
            name='when_created'
            value={` דו"ח זה הופק בתאריך ${date}, בשעה ${time} ע"י ${userInfo.name}`}
          />
          <input
            type='text'
            name='num_all_torim'
            value={
              oneworkingdays === null
                ? ''
                : oneworkingdays && oneworkingdays[0].numTorim
            }
          />
          <input
            type='text'
            name='num_not_avilable_torim'
            value={
              oneworkingdays &&
              oneworkingdays[0].numTorim - oneworkingdays[0].numAvilableTorim
            }
          />
          <input
            type='text'
            name='num_avilable_torim'
            value={oneworkingdays && oneworkingdays[0].numAvilableTorim}
          />
          <input
            type='text'
            name='num_canceled_torim'
            value={
              oneworkingdays &&
              oneworkingdays[0].numTorim -
                oneworkingdays[0].numAvilableTorim -
                oneworkingdays[0].CupaOpend
            }
          />
          <input
            type='text'
            name='money_count'
            value={oneworkingdays && oneworkingdays[0].moneyCount}
          />

          <input
            type='text'
            name='workday_date'
            value={
              oneworkingdays &&
              `${oneworkingdays[0].Dateday}.${oneworkingdays[0].Datemonth}.${oneworkingdays[0].Dateyear}`
            }
          />
        </form>
      )}
      {weekworkingdays && weekworkingdays.length != 0 && (
        <form id='disableView' method='post' ref={form2} onSubmit={sendEmail2}>
          <input type='email' name='user_email' value={emailToSendTo} />

          <input
            type='text'
            name='when_created'
            value={` דו"ח זה הופק בתאריך ${date}, בשעה ${time} ע"י ${userInfo.name}`}
          />
          <input
            type='text'
            name='num_of_workdays'
            value={weekworkingdays && weekworkingdays.length}
          />
          <input
            type='text'
            name='num_all_torim'
            value={weekworkingdaysFunctionCountTorimForThisWeek()}
          />
          <input
            type='text'
            name='num_not_avilable_torim'
            value={
              weekworkingdaysFunctionCountTorimForThisWeek() -
              weekworkingdaysFunctionCountAvilableTorimForThisWeek()
            }
          />
          <input
            type='text'
            name='num_avilable_torim'
            value={weekworkingdaysFunctionCountAvilableTorimForThisWeek()}
          />
          <input
            type='text'
            name='num_canceled_torim'
            value={
              weekworkingdaysFunctionCountTorimForThisWeek() -
              weekworkingdaysFunctionCountAvilableTorimForThisWeek() -
              weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisWeek()
            }
          />
          <input
            type='text'
            name='money_count'
            value={MoneycountForThisWEEK()}
          />

          <input
            type='text'
            name='workday_date'
            value={`${weekworkingdays && weekworkingdays[0].date}-${
              weekworkingdays &&
              weekworkingdays[weekworkingdays.length - 1].date
            }`}
          />
        </form>
      )}
      {workingdays && workingdays.length != 0 && (
        <form id='disableView' method='post' ref={form3} onSubmit={sendEmail3}>
          <input type='email' name='user_email' value={emailToSendTo} />

          <input
            type='text'
            name='when_created'
            value={` דו"ח זה הופק בתאריך ${date}, בשעה ${time} ע"י ${userInfo.name}`}
          />
          <input
            type='text'
            name='num_of_workdays'
            value={workingdays && workingdays.length}
          />
          <input
            type='text'
            name='num_all_torim'
            value={weekworkingdaysFunctionCountTorimForThisMonth()}
          />
          <input
            type='text'
            name='num_not_avilable_torim'
            value={
              weekworkingdaysFunctionCountTorimForThisMonth() -
              weekworkingdaysFunctionCountAvilableTorimForThisMonth()
            }
          />
          <input
            type='text'
            name='num_avilable_torim'
            value={weekworkingdaysFunctionCountAvilableTorimForThisMonth()}
          />
          <input
            type='text'
            name='num_canceled_torim'
            value={
              weekworkingdaysFunctionCountTorimForThisMonth() -
              weekworkingdaysFunctionCountAvilableTorimForThisMonth() -
              weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisMonth()
            }
          />
          <input
            type='text'
            name='money_count'
            value={MoneycountForThisMonth()}
          />

          <input
            type='text'
            name='workday_date'
            value={`${weekworkingdays && workingdays[0].date} -
                  ${
                    weekworkingdays && workingdays[workingdays.length - 1].date
                  }`}
          />
          <input
            type='text'
            name='month_number'
            value={weekworkingdays && workingdays[0].Datemonth}
          />
        </form>
      )}
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <h1 id='headlineme'>יומן עבודה</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <div id='centerme1'>
            <Calendar
              value={state.date}
              onChange={convert}
              className='bg-dark'
              format='DD/MM/YYYY'
              weekDays={weekDays}
              months={months}
              minDate={startDate}
              maxDate={addDays(new Date(), 30)}
              locale={gregorian_ar}
              digits={digits}
              mapDays={({ date, today }) => {
                let isWeekend = [6].includes(date.weekDay.index)
                let props = {}
                let result = date.toDays() - today.toDays()

                if (isWeekend)
                  return {
                    disabled: true,
                    style: { color: '#6c757d' },
                  }
                if (result === -1) props.title = 'אתמול'
                if (result === 0) props.title = 'היום'
                if (result === 1) props.title = 'מחר'

                return props
              }}
            />
          </div>
          <Col id={'margintop20px'} md={12}>
            <div id='BoxOF_Options_WorkingDays_Screen'>
              <Col md={12}>
                <Button
                  onClick={showSicumNow}
                  className='bigSicumBTNForSmallScreenForWorkingDaysScreen'
                >
                  סיכום
                </Button>{' '}
                <button
                  onClick={showTable1DayNOW}
                  className='SINUN-BTN_ForWorkingDays_Screen'
                >
                  <i id='idid' class='fas fa-calendar-day'></i>
                  היום
                </button>
                <button
                  onClick={showTableThisWeekNOW}
                  className='SINUN-BTN_ForWorkingDays_Screen'
                >
                  <i id='idid' class='fas fa-calendar-week'></i>
                  השבוע
                </button>
                <button
                  onClick={showTable30DaysNOW}
                  className={`${
                    showTable30Days
                      ? 'BARBERMENUBTNmonth2'
                      : 'SINUN-BTN_ForWorkingDays_Screen'
                  }`}
                >
                  <i id='idid' class='fas fa-calendar-alt'></i>
                  החודש
                </button>
                <Button
                  onClick={openSwalForExplain}
                  className='OPTIONS-BTN-HOSEF-WORKINGDAYS_SCREEN'
                >
                  <i id='plusplus' class='fas fa-plus'></i>
                </Button>{' '}
              </Col>
            </div>
          </Col>

          {showTable30Days && (
            <Col id='show30days' md={12}>
              <Table
                bordered
                hover
                responsive
                className='whiteme'
                id='tablewhite'
              >
                <thead id='centertext'>
                  <tr id='tableheadlines'>
                    <th>הכנסות</th>
                    <th>סה"כ תורים</th>
                    <th>תורים פנויים</th>
                    <th>יום</th>
                    <th>תאריך</th>
                  </tr>
                </thead>
                <tbody id='centertext'>
                  {workingdays.length === 0 ? (
                    <Message>
                      {' '}
                      אין תורים במערכת לחץ על התאריך המבוקש ביומן העבודה על מנת
                      ליצור יום עבודה
                    </Message>
                  ) : (
                    workingdays
                      .sort(
                        (a, b) =>
                          Date.parse(
                            new Date(a.date.split('/').reverse().join('-'))
                          ) -
                          Date.parse(
                            new Date(b.date.split('/').reverse().join('-'))
                          )
                      )
                      .map((workingday) => (
                        <tr
                          key={workingday._id}
                          id='hoverandblue'
                          className={`${
                            workingday.date === date ? 'bgwhite' : ''
                          }`}
                        >
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.moneyCount}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.numTorim}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.numAvilableTorim}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.dayInWeek}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.Dateday}/{workingday.Datemonth}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
              {NewWorkDayloading ? (
                <Loader />
              ) : NewWorkDayerror ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <div></div>
              )}
            </Col>
          )}
          {showTable1Day && (
            <Col id='show1day' md={12}>
              <Table
                bordered
                hover
                responsive
                className='whiteme'
                id='tablewhite'
              >
                <thead id='centertext'>
                  <tr id='tableheadlines'>
                    <th>הכנסות</th>
                    <th>סה"כ תורים</th>
                    <th>תורים פנויים</th>
                    <th>יום</th>
                    <th>תאריך</th>
                  </tr>
                </thead>
                <tbody id='centertext'>
                  {!oneworkingdays || oneworkingdays.length === 0 ? (
                    <Message>
                      {' '}
                      אין תורים במערכת לחץ על התאריך המבוקש ביומן העבודה על מנת
                      ליצור יום עבודה
                    </Message>
                  ) : (
                    oneworkingdays
                      .sort(
                        (a, b) =>
                          Date.parse(
                            new Date(a.date.split('/').reverse().join('-'))
                          ) -
                          Date.parse(
                            new Date(b.date.split('/').reverse().join('-'))
                          )
                      )
                      .map((workingday) => (
                        <tr
                          key={workingday._id}
                          id='hoverandblue'
                          className={`${
                            workingday.date === date ? 'bgwhite' : ''
                          }`}
                        >
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.moneyCount}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.numTorim}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.numAvilableTorim}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.dayInWeek}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.Dateday}/{workingday.Datemonth}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
              {NewWorkDayloading ? (
                <Loader />
              ) : NewWorkDayerror ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <div></div>
              )}
            </Col>
          )}
          {showTableThisWeek && (
            <Col id='show1day' md={12}>
              <Table
                bordered
                hover
                responsive
                className='whiteme'
                id='tablewhite'
              >
                <thead id='centertext'>
                  <tr id='tableheadlines'>
                    <th>הכנסות</th>
                    <th>סה"כ תורים</th>
                    <th>תורים פנויים</th>
                    <th>יום</th>
                    <th>תאריך</th>
                  </tr>
                </thead>
                <tbody id='centertext'>
                  {weekworkingdays.length === 0 ? (
                    <Message>
                      {' '}
                      אין תורים במערכת לחץ על התאריך המבוקש ביומן העבודה על מנת
                      ליצור יום עבודה
                    </Message>
                  ) : (
                    weekworkingdays
                      .sort(
                        (a, b) =>
                          Date.parse(
                            new Date(a.date.split('/').reverse().join('-'))
                          ) -
                          Date.parse(
                            new Date(b.date.split('/').reverse().join('-'))
                          )
                      )
                      .map((workingday) => (
                        <tr
                          key={workingday._id}
                          id='hoverandblue'
                          className={`${
                            workingday.date === date ? 'bgwhite' : ''
                          }`}
                        >
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.moneyCount}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.numTorim}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.numAvilableTorim}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.dayInWeek}
                          </td>
                          <td
                            onClick={() =>
                              sendMEtoWorkPageFunction(workingday._id)
                            }
                          >
                            {workingday.Dateday}/{workingday.Datemonth}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
              {NewWorkDayloading ? (
                <Loader />
              ) : NewWorkDayerror ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <div></div>
              )}
            </Col>
          )}
        </Row>
      )}
      <div id='ModalDiv'>
        <Modal id='ModalStyle' open={open1day} onClose={handleClose1day}>
          <Box id='BOXlStyle'>
            <div id='reciptcloseNav'>
              <button onClick={handleClose1day} id='reciptcloseNavX'>
                X
              </button>
              <Col md={2}>
                <div id='theAllPackage'>
                  <div onClick={showOptionsNow} id='speedDialMENU'>
                    <i class='fas fa-plus'></i>
                  </div>

                  {showOptions && (
                    <div id='posibiletis'>
                      <button onClick={dispatchCrtateReport} id='speedDialSAVE'>
                        <i id='Ismall' class='fas fa-save'></i>
                      </button>

                      <button
                        onClick={openSwalHandlerFor1DAYpdfToEMAIL}
                        id='speedDialShare'
                      >
                        <i id='Ismall' class='fas fa-paper-plane'></i>
                      </button>

                      <ReactToPdf
                        targetRef={componentRef}
                        filename='Barber_Reoprt_daily.pdf'
                        options={{
                          format: [200, oneworkingdays[0].numTorim * 35],
                        }}
                      >
                        {({ toPdf }) => (
                          <div id='speedDialDownload' onClick={toPdf}>
                            <i id='Ismall' class='fas fa-file-download'></i>
                          </div>
                        )}
                      </ReactToPdf>

                      <div>
                        <ReactToPrint
                          trigger={() => (
                            <div id='speedDialPrint'>
                              <i id='Ismall' class='fas fa-print'></i>
                            </div>
                          )}
                          content={() => componentRef.current}
                        />
                      </div>
                    </div>
                  )}
                </div>{' '}
              </Col>
            </div>
            {oneworkingdays && oneworkingdays.length != 0 && (
              <div ref={componentRef} id='RECIPT_ABSULUTE_TABLE'>
                <h1 id='centerme'>
                  <b>{oneworkingdays && oneworkingdays[0].date}</b>
                  דו"ח יומי לתאריך{' '}
                </h1>
                <h7 id='centerme'>
                  ד"וח זה הוא דו"ח {oneworkingdays && ' יומי '} ל{' '}
                  {oneworkingdays && ' תאריך'}
                  {oneworkingdays && oneworkingdays[0].date}
                  <br />
                  ,ד"וח זה הופק בתאריך {date} בשעה {time} ע"י {userInfo.name}
                </h7>
                <div id='divFontsizebigger'>
                  <br />
                  <h7>
                    <b>שם המספרה:</b>ברבר_מייקר
                  </h7>
                  <br />
                  <h7>
                    שם הספר: <b>{userInfo.name}</b>
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>{oneworkingdays && '1'}</b> :מספר ימי עבודה
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>{oneworkingdays && oneworkingdays[0].numTorim}</b> :תורים
                    בסה"כ
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>
                      {oneworkingdays &&
                        oneworkingdays[0].numTorim -
                          oneworkingdays[0].numAvilableTorim}
                    </b>
                    :תורים שאליהם נקבע תור{' '}
                  </h7>
                  <br />

                  <h7>
                    <b>
                      {oneworkingdays && oneworkingdays[0].numAvilableTorim}
                    </b>
                    :תורים פנויים
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>
                      {oneworkingdays &&
                        oneworkingdays[0].numTorim -
                          oneworkingdays[0].numAvilableTorim -
                          oneworkingdays[0].CupaOpend}
                    </b>
                    :תורים שנקבעו אך הלקוח לא הגיע
                  </h7>
                  <br />
                </div>

                <h2 id='centerme'>
                  הכנסות <br></br>*************
                </h2>
                <Table bordered hover responsive id=''>
                  <thead id='centertext'>
                    <tr>
                      <th id='recipttable1'>paybox</th>
                      <th id='recipttable1'>bit</th>
                      <th id='recipttable1'>אשראי</th>
                      <th id='recipttable1'>מזומן</th>
                      <th id='recipttable1'>סה"כ</th>
                    </tr>
                  </thead>

                  <tbody id='centertext'>
                    {' '}
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{oneworkingdays && oneworkingdays[0].moneyCount}</td>
                  </tbody>
                </Table>
                <br />
                <h2 id='centerme'>
                  פירוט וקבלות <br></br>*************
                </h2>
                <div id='reciptTable'>
                  <Table bordered hover responsive id=''>
                    <thead id='centertext'>
                      <tr>
                        <th id='recipttable1'>דרך תשלום</th>
                        <th id='recipttable1'>מחיר</th>
                        <th id='recipttable1'>טיפול</th>
                        <th id='recipttable1'>שעה</th>
                        <th id='recipttable1'>לקוח/ה</th>
                      </tr>
                    </thead>

                    <tbody id='centertext'>
                      {!result1day ? (
                        <Message> לא נמצאו קבלות או תשלומים ליום זה</Message>
                      ) : (
                        result1day
                          .sort(
                            (a, b) =>
                              Date.parse(
                                new Date(a.date.split('/').reverse().join('-'))
                              ) -
                              Date.parse(
                                new Date(b.date.split('/').reverse().join('-'))
                              )
                          )
                          .map((result1dayDay) => (
                            <tr key={result1dayDay._id}>
                              <td>מזומן</td>
                              <td>{result1dayDay.tipul.cost}</td>
                              <td>{result1dayDay.tipul.name}</td>
                              <td>{result1dayDay.time}</td>
                              <td>
                                {result1dayDay.mistaper.name},
                                {result1dayDay.mistaper.phone}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                  <h7 id='centerme'>
                    <br />
                    ד"וח זה הוא דו"ח {oneworkingdays && ' יומי '} ל{' '}
                    {oneworkingdays && ' תאריך'}
                    {oneworkingdays && oneworkingdays[0].date}
                    <br />
                    ,ד"וח זה הופק בתאריך {date} בשעה {time} ע"י {userInfo.name}
                  </h7>
                  <br />
                  <h7 id='centerme'>Copyright © BARBER MAKER</h7>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>

      <div id='ModalDiv'>
        <Modal id='ModalStyle' open={openweek} onClose={handleCloseweek}>
          <Box id='BOXlStyle'>
            <div id='reciptcloseNav'>
              <button onClick={handleCloseweek} id='reciptcloseNavX'>
                X
              </button>
              <Col md={2}>
                <div id='theAllPackage'>
                  <div onClick={showOptionsNow} id='speedDialMENU'>
                    <i class='fas fa-plus'></i>
                  </div>

                  {showOptions && (
                    <div id='posibiletis'>
                      <button
                        onClick={dispatchCrtateReportForWeek}
                        id='speedDialSAVE'
                      >
                        <i id='Ismall' class='fas fa-save'></i>
                      </button>

                      <button
                        onClick={openSwalHandlerForWeekpdfToEMAIL}
                        id='speedDialShare'
                      >
                        <i id='Ismall' class='fas fa-share-alt'></i>
                      </button>

                      <ReactToPdf
                        targetRef={componentRef}
                        filename='Barber_Reoprt_weekly.pdf'
                        options={{
                          format: [
                            200,
                            weekworkingdaysFunctionCountTorimForThisWeek() * 20,
                          ],
                        }}
                      >
                        {({ toPdf }) => (
                          <div id='speedDialDownload' onClick={toPdf}>
                            <i id='Ismall' class='fas fa-file-download'></i>
                          </div>
                        )}
                      </ReactToPdf>

                      <div>
                        <ReactToPrint
                          trigger={() => (
                            <div id='speedDialPrint'>
                              <i id='Ismall' class='fas fa-print'></i>
                            </div>
                          )}
                          content={() => componentRef.current}
                        />
                      </div>
                    </div>
                  )}
                </div>{' '}
              </Col>
            </div>
            {weekworkingdays && weekworkingdays.length != 0 && (
              <div ref={componentRef} id='RECIPT_ABSULUTE_TABLE'>
                <h1 id='centerme'>
                  דוח שבועי לתאריכים
                  <br />
                  {weekworkingdays && weekworkingdays[0].date} -
                  {weekworkingdays &&
                    weekworkingdays[weekworkingdays.length - 1].date}
                </h1>
                <br />
                <h7 id='centerme'>
                  דו"ח זה הוא דו"ח שבועי לתאריכים
                  {weekworkingdays && weekworkingdays[0].date}-
                  {weekworkingdays &&
                    weekworkingdays[weekworkingdays.length - 1].date}
                  <br />
                  ,ד"וח זה הופק בתאריך {date} בשעה {time} ע"י {userInfo.name}
                </h7>
                <div id='divFontsizebigger'>
                  <br />

                  <br />
                  <h7>
                    שם המספרה:<b>ברבר_מייקר</b>
                  </h7>
                  <br />
                  <h7>
                    שם הספר: <b>{userInfo.name}</b>{' '}
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>{weekworkingdays && weekworkingdays.length}</b> :מספר ימי
                    עבודה
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>{weekworkingdaysFunctionCountTorimForThisWeek()}</b>{' '}
                    :תורים בסה"כ
                  </h7>
                  <br />
                  <h7>
                    <b>
                      {' '}
                      {weekworkingdaysFunctionCountTorimForThisWeek() -
                        weekworkingdaysFunctionCountAvilableTorimForThisWeek()}
                    </b>
                    :תורים שאליהם נקבע תור
                  </h7>
                  <br />
                  <h7>
                    <b>
                      {weekworkingdaysFunctionCountAvilableTorimForThisWeek()}
                    </b>
                    :תורים פנויים
                  </h7>
                  <br />
                  <h7>
                    {' '}
                    <b>
                      {weekworkingdaysFunctionCountTorimForThisWeek() -
                        weekworkingdaysFunctionCountAvilableTorimForThisWeek() -
                        weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisWeek()}
                    </b>
                    :תורים שנקבעו אך הלקוח לא הגיע
                  </h7>
                  <br />
                </div>

                <h2 id='centerme'>
                  הכנסות <br />
                  *********
                </h2>
                <Table bordered hover responsive id=''>
                  <thead id='centertext'>
                    <tr>
                      <th id='recipttable1'>paybox</th>
                      <th id='recipttable1'>bit</th>
                      <th id='recipttable1'>אשראי</th>
                      <th id='recipttable1'>מזומן</th>
                      <th id='recipttable1'>סה"כ</th>
                    </tr>
                  </thead>

                  <tbody id='centertext'>
                    {' '}
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td> {MoneycountForThisWEEK()}</td>
                  </tbody>
                </Table>

                <h2 id='centerme'>
                  פירוט וקבלות <br />
                  ***************
                </h2>
                <div id='reciptTable'>
                  <Table bordered hover responsive id=''>
                    <thead id='centertext'>
                      <tr>
                        <th id='recipttable1'>דרך תשלום</th>
                        <th id='recipttable1'>מחיר</th>
                        <th id='recipttable1'>טיפול</th>
                        <th id='recipttable1'>שעה</th>
                        <th id='recipttable1'>תאריך</th>
                        <th id='recipttable1'>לקוח/ה</th>
                      </tr>
                    </thead>

                    <tbody id='centertext'>
                      {!resultWEEK ? (
                        <Message>
                          לא נמצאו קבלות או תשלומים עבור שבוע זה
                        </Message>
                      ) : (
                        resultWEEK
                          .sort(
                            (a, b) =>
                              Date.parse(
                                new Date(a.date.split('/').reverse().join('-'))
                              ) -
                              Date.parse(
                                new Date(b.date.split('/').reverse().join('-'))
                              )
                          )
                          .map((resultWEEKDAY) => (
                            <tr key={resultWEEKDAY._id}>
                              <td>מזומן</td>
                              <td>{resultWEEKDAY.tipul.cost}</td>
                              <td>{resultWEEKDAY.tipul.name}</td>
                              <td>{resultWEEKDAY.time}</td>
                              <td>{resultWEEKDAY.date}</td>
                              {resultWEEKDAY.mistaper ? (
                                <td>
                                  {resultWEEKDAY.mistaper.name},
                                  {resultWEEKDAY.mistaper.phone}
                                </td>
                              ) : (
                                <td>
                                  {resultWEEKDAY.mistaper},
                                  {resultWEEKDAY.mistaper}
                                </td>
                              )}
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                  <br />
                  <h7 id='centerme'>
                    דו"ח זה הוא דו"ח שבועי לתאריכים
                    {weekworkingdays && weekworkingdays[0].date}-
                    {weekworkingdays &&
                      weekworkingdays[weekworkingdays.length - 1].date}
                    <br />
                    ,ד"וח זה הופק בתאריך {date} בשעה {time} ע"י {userInfo.name}
                  </h7>
                  <br />
                  <h7 id='centerme'>Copyright © BARBER MAKER</h7>
                </div>
              </div>
            )}
          </Box>
        </Modal>
      </div>
      {workingdays && workingdays.length != 0 && (
        <div id='ModalDiv'>
          <Modal id='ModalStyle' open={openMonth} onClose={handleCloseMonth}>
            <Box id='BOXlStyle'>
              <div id='reciptcloseNav'>
                <button onClick={handleCloseMonth} id='reciptcloseNavX'>
                  X
                </button>
                <Col md={2}>
                  <div id='theAllPackage'>
                    <div onClick={showOptionsNow} id='speedDialMENU'>
                      <i class='fas fa-plus'></i>
                    </div>

                    {showOptions && (
                      <div id='posibiletis'>
                        <button
                          onClick={dispatchCrtateReportForMonth}
                          id='speedDialSAVE'
                        >
                          <i id='Ismall' class='fas fa-save'></i>
                        </button>
                        <button
                          onClick={openSwalHandlerForMonthpdfToEMAIL}
                          id='speedDialShare'
                        >
                          <i id='Ismall' class='fas fa-share-alt'></i>
                        </button>

                        <ReactToPdf
                          targetRef={componentRef}
                          filename='Barber_Reoprt_month.pdf'
                          options={{
                            format: [
                              200,
                              weekworkingdaysFunctionCountTorimForThisMonth() *
                                20,
                            ],
                          }}
                        >
                          {({ toPdf }) => (
                            <div id='speedDialDownload' onClick={toPdf}>
                              <i id='Ismall' class='fas fa-file-download'></i>
                            </div>
                          )}
                        </ReactToPdf>

                        <div>
                          <ReactToPrint
                            trigger={() => (
                              <div id='speedDialPrint'>
                                <i id='Ismall' class='fas fa-print'></i>
                              </div>
                            )}
                            content={() => componentRef.current}
                          />
                        </div>
                      </div>
                    )}
                  </div>{' '}
                </Col>
              </div>
              <div ref={componentRef} id='RECIPT_ABSULUTE_TABLE'>
                <h1 id='centerme'>
                  דוח חודשי עבור חודש{' '}
                  {weekworkingdays && workingdays[0].Datemonth}
                </h1>
                <br />
                <h2 id='centerme'>
                  לתאריכים {weekworkingdays && workingdays[0].date} -{' '}
                  {weekworkingdays && workingdays[workingdays.length - 1].date}
                </h2>
                <br />
                <h7 id='centerme'>
                  דו"ח זה הוא דו"ח חודשי עבור חודש{' '}
                  {weekworkingdays && workingdays[0].Datemonth} לתאריכים
                  {weekworkingdays && workingdays[0].date} -{' '}
                  {weekworkingdays && workingdays[workingdays.length - 1].date}
                  <br />
                  ,ד"וח זה הופק בתאריך {date} בשעה {time} ע"י {userInfo.name}
                </h7>
                <br />
                <div id='divFontsizebigger'>
                  <h7>שם המספרה:ברבר_מייקר</h7>
                  <br />

                  <h7>שם הספר: {userInfo.name} </h7>
                  <br />

                  <h7>
                    {' '}
                    {weekworkingdays && workingdays.length} :מספר ימי עבודה
                  </h7>
                  <br />

                  <h7>
                    {' '}
                    {weekworkingdaysFunctionCountTorimForThisMonth()} :תורים
                    בסה"כ
                  </h7>
                  <br />

                  <h7>
                    {weekworkingdaysFunctionCountTorimForThisMonth() -
                      weekworkingdaysFunctionCountAvilableTorimForThisMonth()}
                    :תורים שאליהם נקבע תור
                  </h7>
                  <br />

                  <h7>
                    {weekworkingdaysFunctionCountAvilableTorimForThisMonth()}
                    :תורים פנויים
                  </h7>
                  <br />

                  <h7>
                    {' '}
                    {weekworkingdaysFunctionCountTorimForThisMonth() -
                      weekworkingdaysFunctionCountAvilableTorimForThisMonth() -
                      weekworkingdaysFunctionCountNUM_CUPA_OPEND_ThisMonth()}
                    :תורים שנקבעו אך הלקוח לא הגיע
                  </h7>
                  <br />
                </div>
                <h2 id='centerme'>
                  הכנסות <br />
                  *********
                </h2>
                <Table bordered hover responsive id=''>
                  <thead id='centertext'>
                    <tr>
                      <th id='recipttable1'>paybox</th>
                      <th id='recipttable1'>bit</th>
                      <th id='recipttable1'>אשראי</th>
                      <th id='recipttable1'>מזומן</th>
                      <th id='recipttable1'>סה"כ</th>
                    </tr>
                  </thead>

                  <tbody id='centertext'>
                    {' '}
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td> {MoneycountForThisMonth()}</td>
                  </tbody>
                </Table>
                <h2 id='centerme'>
                  פירוט וקבלות <br />
                  ***************
                </h2>{' '}
                <div id='reciptTable'>
                  <Table bordered hover responsive id=''>
                    <thead id='centertext'>
                      <tr>
                        <th id='recipttable1'>דרך תשלום</th>
                        <th id='recipttable1'>מחיר</th>
                        <th id='recipttable1'>טיפול</th>
                        <th id='recipttable1'>שעה</th>
                        <th id='recipttable1'>תאריך</th>
                        <th id='recipttable1'>לקוח/ה</th>
                      </tr>
                    </thead>

                    <tbody id='centertext'>
                      {!resultMonth ? (
                        <Message>
                          {' '}
                          לא נמצאו קבלות או תשלומים עבור חודש זה
                        </Message>
                      ) : (
                        resultMonth
                          .sort(
                            (a, b) =>
                              Date.parse(
                                new Date(a.date.split('/').reverse().join('-'))
                              ) -
                              Date.parse(
                                new Date(b.date.split('/').reverse().join('-'))
                              )
                          )
                          .map((resultMonthDAY) => (
                            <tr key={resultMonthDAY._id} id='blink'>
                              <td>מזומן</td>
                              <td>{resultMonthDAY.tipul.cost}</td>
                              <td>{resultMonthDAY.tipul.name}</td>
                              <td>{resultMonthDAY.time}</td>
                              <td>{resultMonthDAY.date}</td>
                              <td>
                                {resultMonthDAY.mistaper.name},
                                {resultMonthDAY.mistaper.phone}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </Table>
                  <br />
                  <h7 id='centerme'>
                    דו"ח זה הוא דו"ח חודשי עבור חודש{' '}
                    {weekworkingdays && workingdays[0].Datemonth} לתאריכים
                    {weekworkingdays && workingdays[0].date} -{' '}
                    {weekworkingdays &&
                      workingdays[workingdays.length - 1].date}
                    <br />
                    ,ד"וח זה הופק בתאריך {date} בשעה {time} ע"י {userInfo.name}
                  </h7>
                  <br />
                  <h7 id='centerme'>Copyright © BARBER MAKER</h7>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
    </>
  )
}

export default WorkingDaysScreen

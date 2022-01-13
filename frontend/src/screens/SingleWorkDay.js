import swal from 'sweetalert'
import moment from 'moment'
import UserFilter from '../components/Filters/UserFilter'
import { Box, Modal } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print'
import Swal from 'sweetalert2'
import {
  CancelMyTor,
  registerByADMIN,
  createReport,
} from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */
import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Loader2 from '../components/Loader2'
import {
  deleteClock,
  createClocks,
  createClock,
  WorkingDayTors,
  PayMyTor,
  UNPayMyTor,
  confirmTor,
  workingDayDetails,
  ReciptForThisWorkingDay,
  SugeiTipulimAction,
} from '../actions/userActions'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import ReactToPdf from 'react-to-pdf' //pdf
import emailjs from 'emailjs-com'
import CreditCard from '../components/CreditCard/CreditCard'
import Cards from 'react-credit-cards'
//?
var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const SingleWorkDayScreen = ({ history, match }) => {
  // ┬─┐┌─┐┌─┐ !┌─┐
  // ├┬┘├┤ ├┤   └─┐
  // ┴└─└─┘└    └─┘
  /////*****send email Form value */
  const form = useRef()
  const componentRef = useRef()
  /***tipul type ref */
  const TipulRef = useRef()
  const CreditCardref = useRef(null)

  // ┌┬┐┌─┐┌┬┐┌─┐   ┬   ┌┬┐┬┌┬┐┌─┐    ┌┐┌┌─┐┬ ┬
  //  ││├─┤ │ ├┤   ┌┼─   │ ││││├┤     ││││ ││││
  // ─┴┘┴ ┴ ┴ └─┘  └┘    ┴ ┴┴ ┴└─┘    ┘└┘└─┘└┴┘
  /****date for todaky for recipet Functionality */
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
  const timeNow = `${hour}:${minute}`
  const dateNow = `${day}/${month}/${year}`

  // ███████╗████████╗ █████╗ ████████╗███████╗███████╗
  // ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝
  // ███████╗   ██║   ███████║   ██║   █████╗  ███████╗
  // ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝  ╚════██║
  // ███████║   ██║   ██║  ██║   ██║   ███████╗███████║
  // ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝

  const dispatch = useDispatch()

  const [word, setWord] = useState('') /****סטייט שמתקבל מקומפוננט שהוא ילד* */
  const [wordname, setWordName] = useState('') /***** */
  const [wordphone, setWordphone] = useState('') /***** */
  const [wordImage, setWordImage] = useState('') /***** */

  const [ChoosenClock, setChoosenClock] = useState('') /***** */
  const [ChoosenClockTIME, setChoosenClockTIME] = useState('') /***** */
  const [ChoosenClockDATE, setChoosenClockDATE] = useState('') /***** */
  //credit card states
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')

  const TipulimList = useSelector((state) => state.TipulimList)
  const { tipulimList } = TipulimList

  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [SHOWcreditForm, setSHOWcreditForm] = useState(false)
  const [SHOWchooseTipul, setSHOWchooseTipul] = useState(false)

  const handleCloseCreditForm = () => {
    setSHOWcreditForm(false)
  }

  const handleCloseShowChooseTipul = () => {
    setSHOWchooseTipul(false)
  }

  const handleCloseShowUserFilter = () => {
    setShowUserFilter(false)
  }
  const SearchOneUser = useSelector((state) => state.SearchOneUser)
  const { loadinguserfound, userfound, successuserfound, erroruserfound } =
    SearchOneUser

  const ClocksReciptOneDay = useSelector((state) => state.ClocksReciptOneDay)
  const { result1day } = ClocksReciptOneDay

  const [afterdate, Setfterdate] = React.useState(false) //**caclculate if passed date for day state */

  const ONE_WORKING_DAY = useSelector((state) => state.ONE_WORKING_DAY)
  const { onesuccess, oneworkingdays } = ONE_WORKING_DAY

  ///speedDIal APPREANCE state +function
  const [showOptions, setshowOptions] = useState(false)
  const showOptionsNow = () => {
    setshowOptions(!showOptions)
  }
  const [time, setTime] = useState('')
  const [time2, setTime2] = useState('')
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      cancelButton: 'btn btn-outline-primary btn-md btn-block',
      confirmButton: 'btn btn-outline-primary btn-md btn-block',
      denyButton: 'btn btn-outline-primary btn-md btn-block',
    },
  })
  const CLOCK_LIST_FOR_THIS_WORK_DAY = useSelector(
    (state) => state.CLOCK_LIST_FOR_THIS_WORK_DAY
  )
  const { resultForThisWorkDay } = CLOCK_LIST_FOR_THIS_WORK_DAY

  const [TipulPickes, setTipulPickes] = useState('')
  const [open1day, setOpen1day] = React.useState(false)
  const handleOpen1day = () => setOpen1day(true)
  const handleClose1day = () => setOpen1day(false)
  const AdminRegister = useSelector((state) => state.AdminRegister)
  const { success: RegisterUserBySaparsuccess } = AdminRegister
  const DeleteClock = useSelector((state) => state.DeleteClock)
  const { success: Deletesuccess } = DeleteClock
  const Tors = useSelector((state) => state.Tors)
  const { loading, error, clockList } = Tors
  const WorkDayid = match.params.id
  const CancelTor = useSelector((state) => state.CancelTor)
  const { cancel } = CancelTor
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [showForm, setShowForm] = useState(false)
  const showFormNow = () => {
    setShowForm(!showForm)
    if (showForm2) {
      setShowForm2(!showForm2)
    }
  }
  const [showForm2, setShowForm2] = useState(false)
  const showFormNow2 = () => {
    setShowForm2(!showForm2)
    if (showForm) {
      setShowForm(!showForm)
    }
  }
  const Payment = useSelector((state) => state.Payment)
  const { success: Paymentsuccess } = Payment
  const workingDaySingle = useSelector((state) => state.workingDaySingle)
  const { workingDay, loadingSingle, errorSingle } = workingDaySingle
  const UNPayment = useSelector((state) => state.UNPayment)
  const { success: UNPaymentsuccess } = UNPayment
  const MakeClock = useSelector((state) => state.MakeClock)
  const {
    success: ClockMADEsuccess,
    NewClockloading,
    NewClockerror,
  } = MakeClock

  const MakeClocks = useSelector((state) => state.MakeClocks)
  const {
    success: clockssuccess,
    NewClocksloading,
    NewClockserror,
  } = MakeClocks

  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const {
    success: confirmsuccess,
    confirm,
    loadingConfirm,
    errorConfirm,
  } = confirmMyTor
  const sapar = userInfo.name

  const [TipulId, setTipulId] = useState('') /***** */

  //***states for Email Adress sending Sicum */
  const [emailToSendTo, SetemailToSendTo] = useState(userInfo.email)
  // ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
  // ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
  // █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
  // ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
  // ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
  // ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
  const PredictedIncome = () => {
    let sum = 0
    for (let clock of clockList) {
      if (clock.tipul) {
        sum = sum + clock.tipul.cost
      }
    }

    return sum
  }

  const handlePayCreditCard = () => {
    dispatch(
      PayMyTor(
        ChoosenClock,
        'credit',
        number.slice(12),
        Math.floor(1000 + Math.random() * 9000)
      )
    )
    handleCloseCreditForm()
    Swal.fire(`הלקוח שילם ב: באשראי`)
  }

  const CHOOSE = () => {
    let select = document.getElementById('tipulimCooseOptions')
    select.addEventListener('change', function () {
      setTipulId(select.value)
    })

    let SelectValue = select.value
    setTipulId(SelectValue)
    console.log(`thetipul id is:${TipulId}`)
    console.log(`thet coosen clock id is:${ChoosenClock}`)
    handleCloseShowChooseTipul()

    swalWithBootstrapButtons
      .fire({
        title: 'בחר דרך חיפוש',
        text: `תוכל לחפש משתמשים קיימים לפי מספר נייד או שם,תוכל גם ליצור משתמש חדש שיקבל את תור זה`,
        imageUrl: 'https://i.ibb.co/5jDpS2J/icons8-search-100.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'חיפוש',
        color: 'black',
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: `חפש לפי נייד`,
        denyButtonColor: 'rgb(0, 132, 255)',

        cancelButtonText: 'הוסף משתמש חדש לתור זה',
        cancelButtonColor: 'rgb(3, 148, 39)',
        confirmButtonColor: 'rgb(0, 132, 255)',
        confirmButtonText: 'חפש לפי שם',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setShowUserFilter(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          const { value: formValues } = await Swal.fire({
            imageUrl: 'https://i.ibb.co/NC57M5v/blackkkk.png',
            imageWidth: 100,
            imageHeight: 100,
            title: 'הוסף משתמש חדש לתור זה',
            footer: `הססמא שהונפקה ללקוח זה מספר הנייד שהזנת`,

            html:
              '<input id="swal-input1" class="swal2-input">' +
              '<label for="swal-input1">שם</label>' +
              '<input id="swal-input2" class="swal2-input">' +
              '<label for="swal-input2">אימייל</label>' +
              '<input id="swal-input3" class="swal2-input">' +
              '<label for="swal-input3">נייד</label>',

            focusConfirm: false,
            preConfirm: async () => {
              return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
              ]
            },
          })

          if (formValues) {
            const name = formValues[0]
            const email = formValues[1]
            const phone = formValues[2]
            const password = formValues[2]
            const image = formValues[2]
            await dispatch(registerByADMIN(name, email, phone, password, image))
            await confirmNewUser(phone, name, time, ChoosenClock)
          }
        } else if (result.isDenied) {
          setShowUserFilter(true)
        }
      })
  }

  const dispatchCrtateReport = () => {
    setOpen1day(false)
    Swal.fire({
      title: `?תרצה לשמור את דו"ח זה במערכת`,
      text: `האם אתה בטוח שתרצה לשמור דו"ח היומי לתאריך${workingDay.date} במערכת`,
      imageUrl: 'https://i.ibb.co/7KZpmDV/icons8-save.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'שמור במערכת',
    }).then((result) => {
      if (result.isConfirmed && workingDay) {
        dispatch(
          createReport(
            userInfo._id,
            'daily',
            workingDay.date,
            afterdate,
            workingDay.numTorim,
            workingDay.numAvilableTorim,
            workingDay.numTorim - workingDay.numAvilableTorim,
            workingDay.numTorim -
              workingDay.numAvilableTorim -
              workingDay.CupaOpend,
            workingDay.moneyCount,
            result1day,
            dateNow,
            timeNow
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

  //make report For This Day Function
  const showSicumNow = () => {
    const searchDate = new Date()
    const FormatedSearchDate = moment(searchDate).format()
    const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
    const month = CalculateMonthmonth.slice(-2)
    const CalculateDay = FormatedSearchDate.substring(0, 10)
    const day = CalculateDay.slice(8)
    const year = FormatedSearchDate.substring(0, 4)
    const Calculateminute = FormatedSearchDate.slice(14)
    const minute = Calculateminute.substring(0, 2)
    const CalculateHour = FormatedSearchDate.slice(11)
    const hour = CalculateHour.substring(0, 2)
    const time = `${hour}:${minute}`
    const date = `${day}/${month}/${year}`
    Swal.fire({
      title: '?האם תרצה להפיק דו"ח עבור יום זה',
      text: `חשוב שתדע,הסיכום יופק בהתאם לנתוני המערכת בזמן זה, בתאריך ${date}, בשעה ${time}`,
      imageUrl: 'https://i.ibb.co/p18YJS2/icons8-combo-chart.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'הפק דו"ח',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'מפיק עבורך דו"ח עבור יום זה אנא המתן',
          imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
          imageWidth: 400,
          imageHeight: 400,
          imageAlt: 'Custom image',
          timer: 500,
          background: '#68b4ff00',
          backdrop: 'rgba(0, 0, 0,0.8)',
          color: 'rgba(255, 255, 255)',
          showConfirmButton: false,
        }).then(handleOpen1day())
      } else {
        console.log('u choose not create a report  ')
      }
    })
  }

  /*send one hour function */
  const submitHandler = (e) => {
    e.preventDefault()

    Swal.fire({
      text: 'מוסיף תור למערכת אנא המתן',
      imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      timer: 2000,
      background: '#68b4ff00',
      showConfirmButton: false,
      backdrop: 'rgba(0, 0, 0,0.8)',

      color: 'rgba(255, 255, 255)',
    })
    dispatch(createClock(WorkDayid, time, sapar))
  }
  //***sende rande of hours function */
  const submitHandler2 = (e) => {
    e.preventDefault()
    console.log(WorkDayid)
    console.log(time)
    console.log(time2)
    dispatch(createClocks(WorkDayid, time, time2, sapar)).then(
      Swal.fire({
        text: 'מוסיף תורים למערכת אנא המתן',

        imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
        timer: 5000,
        background: '#68b4ff00',
        showConfirmButton: false,
        backdrop: 'rgba(0, 0, 0,0.8)',

        color: 'rgba(255, 255, 255)',
      })
    )
  }
  //send all torim function
  const submitHandler3 = (e) => {
    e.preventDefault()
    Swal.fire({
      text: 'מוסיף תורים למערכת אנא המתן',

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
    dispatch(createClocks(WorkDayid, '10:00', '19:00', sapar))
  }
  /*delete tors Function*/
  const deleteHandler = (id) => {
    Swal.fire({
      title: '?אתה בטוח',
      text: `האם אתה בטוח שברצונך למחוק את השעה  ${time}  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'כן אני בטוח',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteClock(WorkDayid, id)).then(
          Swal.fire({
            text: ' מוחק את התור שביקשת אנא המתן',

            imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            timer: 3000,
            background: '#68b4ff00',
            backdrop: 'rgba(0, 0, 0,0.8)',
            color: 'rgba(255, 255, 255)',
            showConfirmButton: false,
          })
        )
      }
    })
  }
  // make this Hour Un-Payd Function
  const makeClockUnpaidHandler = (id, time, date) => {
    if (id && time && date) {
      swal({
        title: '?אתה בטוח',
        text: `תור זה מוגדר כמשולם במערכת,שינוי סטאטוס התשלום ישונה ל-לא שולם, עבור לקוח זה בתור בשעה ${time} בתאריך ${date}`,
        icon: 'warning',
        buttons: ['ביטול', 'שנה סטאטוס ל-לא שולם'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('תור זה הוגדר כלא שולם בהצלחה', {
            icon: 'success',
          }).then(dispatch(UNPayMyTor(id))) //** */
        } else {
          console.log('your payment is safe')
        }
      })
    }
  }
  ///make this Hour Payd Function
  const makeClockPAIDHandler = async (id, time, date, avilable) => {
    if (!avilable) {
      if (id && time && date) {
        const { value: payment } = await Swal.fire({
          title: 'בחר דרך תשלום',
          input: 'select',
          inputOptions: {
            אשראי: 'אשראי',
            מזומן: 'מזומן',
            ביט: 'ביט',
          },
          inputPlaceholder: 'מהי הדרך שבה הלקוח שילם',
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          confirmButtonText: 'אישור תשלום',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === 'אשראי') {
                setSHOWcreditForm(true)
                resolve()
              } else if (value === 'מזומן') {
                Swal.fire(`הלקוח שילם ב: ${value}`).then(
                  dispatch(
                    PayMyTor(
                      id,
                      'cash',
                      Math.floor(1000 + Math.random() * 9000),
                      Math.floor(1000 + Math.random() * 9000)
                    )
                  )
                )
              } else if (value === 'ביט') {
                Swal.fire(`הלקוח שילם ב: ${value}`).then(
                  dispatch(
                    PayMyTor(
                      id,
                      'bit',
                      Math.floor(1000 + Math.random() * 9000),
                      Math.floor(1000 + Math.random() * 9000)
                    )
                  )
                )
              } else {
                resolve(' אתה צריך לבחור אחת מאפשרויות התשלום)')
              }
            })
          },
        })
      }
    }
  }
  //make new User by Sapar Function
  const confirmNewUser = async (phone, name, time, id) => {
    Swal.fire({
      icon: 'success',
      title: `${name} נרשם בהצלחה `,
      text: ` בלחיצה על כפתור האישור תכניס את המשתמש  ${name} לשעה ${time} `,
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      confirmButtonText: 'אישור',
      preConfirm: () => {
        return fetch(`/api/search/phones/${phone}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`)
          })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(confirmTor(id, result.value._id, TipulId)).then(
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `שובץ בהצלחה`,
            text: ` התור לשעה ${time} שובץ בהצלחה`,
            showConfirmButton: false,
            timer: 8000,
          })
        )
      }
    })
  }

  const preshowTorHandler = (
    time,
    date,
    avilable,
    mistaper,
    id,
    WorkDayid,
    tipulimList,
    isPaid,
    TotalAmmountPaid,
    paymentMethod,
    creditLastDigits,
    ReciptNumber
  ) => {
    setChoosenClock(id)
    setChoosenClockTIME(time)
    setChoosenClockDATE(date)
    console.log(`THE COOSEN CLOCK IS:${ChoosenClock}!!!!`)
    showTorHandler(
      time,
      date,
      avilable,
      mistaper,
      id,
      WorkDayid,
      tipulimList,
      isPaid,
      TotalAmmountPaid,
      paymentMethod,
      creditLastDigits,
      ReciptNumber
    )
  }

  //BIG FUNCTION - WHEN CLICK ON TOR PANUI / TOR not Panui Handler
  const showTorHandler = (
    time,
    date,
    avilable,
    mistaper,
    id,
    WorkDayid,
    tipulimList,
    isPaid,
    TotalAmmountPaid,
    paymentMethod,
    creditLastDigits,
    ReciptNumber
  ) => {
    const uid = userInfo._id

    if (avilable === false && !isPaid) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: `${mistaper.name}--${time}`,
          html: `התור בשעה <b>${time}</b> בתאריך  <b>${date}</b> <br/> תפוס על ידי <b>${mistaper.name}</b>`,
          imageUrl: 'https://i.ibb.co/M9HkNWs/greenuser.jpg',
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'לקוח',
          color: 'green',
          showDenyButton: true,
          denyButtonColor: 'rgb(194, 0, 0)',
          denyButtonText: `פנה תור`,

          showCancelButton: true,
          cancelButtonText: 'צא',
          cancelButtonColor: 'rgb(0, 0, 0)',

          confirmButtonColor: 'rgb(3, 148, 39)',
          confirmButtonText: 'תשלום',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            makeClockPAIDHandler(id, time, date)
          } else if (result.isDenied) {
            Swal.fire({
              title: '?אתה בטוח',
              text: `ברגע שתהפוך את התור בשעה ${time} זה לזמין לא תהיה לך את האפשרות להחזיר את פרטי המשתמש שסגר את התור בשעה זו`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'ביטול',
              confirmButtonText: 'כן אני בטוח',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(CancelMyTor(id, uid)).then(
                  Swal.fire({
                    position: 'top-end',
                    cancelButtonColor: 'rgb(194, 0, 0)',
                    confirmButtonColor: 'rgb(3, 148, 39)',
                    icon: 'success',
                    title: `התור בשעה ${time} פנוי כעת`,
                    text: `שינוי סטאטוס התור בוצע בהצלחה`,
                    showConfirmButton: false,
                    timer: 8000,
                  })
                )
              }
            })
          }
        })
    } else if (avilable === false && isPaid === true) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: `${mistaper.name}--${time}<br/><i class="fas fa-check-circle"></i> התור שולם`,

          html: `התור בשעה <b>${time}</b> בתאריך   <b>${date}</b> <br/> שולם על ידי <h4 style=display:inline>${
            mistaper.name
          }</h4><br/>
         ,${
           paymentMethod === 'cash'
             ? ' באמצעות <h4 style=display:inline>מזומן</h4><br/>'
             : ''
         } 
         ${
           paymentMethod === 'bit'
             ? ' באמצעות העברה <h4 style=display:inline>בביט</h4><br/>'
             : ''
         }
         ${
           paymentMethod === 'credit'
             ? ' באמצעות <h4 style=display:inline>כרטיס אשראי</h4><br/>'
             : ''
         }
         ${
           paymentMethod === 'credit'
             ? `  הנגמר בספרות <h4 style='display:inline'>${creditLastDigits}</h4><br/> `
             : ''
         }
הסכום ששולם  : <h4 style='display:inline'>${TotalAmmountPaid}₪</h4> <br/>  מספר חשבונית : <h4 style='display:inline'>${ReciptNumber}</h4>`,

          imageUrl: 'https://i.ibb.co/M9HkNWs/greenuser.jpg',
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'לקוח',
          color: 'green',

          showCancelButton: true,
          cancelButtonText: 'צא',
          cancelButtonColor: 'rgb(0, 0, 0)',

          confirmButtonColor: 'rgb(194, 0, 0)',
          confirmButtonText: 'ביטול תשלום',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            makeClockUnpaidHandler(id, time, date)
          }
        })
    } else if (avilable === true) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: 'תור פנוי',
          text: `התור בשעה ${time} בתאריך  ${date}  פנוי כרגע`,
          imageUrl: 'https://i.ibb.co/wNZnS8m/reduser.jpg',
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'לקוח',
          color: 'red',
          showDenyButton: true,
          denyButtonColor: 'rgb(194, 0, 0)',
          denyButtonText: `מחק תור זה`,
          showCancelButton: true,
          cancelButtonText: ' צא',
          cancelButtonColor: 'rgb(0, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          confirmButtonText: 'שבץ תור',
        })
        .then((result) => {
          if (result.isConfirmed) {
            setSHOWchooseTipul(true)
            console.log(`THE COOSEN CLOCK IS:${ChoosenClock}!!!!`)
          } else if (result.isDenied) {
            Swal.fire({
              title: '?אתה בטוח',
              text: `האם אתה בטוח שברצונך למחוק את השעה  ${time}  `,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'ביטול',
              confirmButtonText: 'כן אני בטוח',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteClock(WorkDayid, id)).then(
                  Swal.fire({
                    text: ' מוחק את התור שביקשת אנא המתן',

                    imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
                    imageWidth: 400,
                    imageHeight: 400,
                    imageAlt: 'Custom image',
                    timer: 3000,
                    background: '#68b4ff00',
                    backdrop: 'rgba(0, 0, 0,0.8)',
                    color: 'rgba(255, 255, 255)',
                    showConfirmButton: false,
                  })
                )
              }
            })
          }
        })
    }
  }

  const FunctionBlingThisTime = (time) => {
    const H = time.substring(0, 2)
    const M = time.substring(3)
    if (H == hour && M === '30' && minute === '30') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '31') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '32') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '33') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '34') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '35') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '36') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '37') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '38') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '39') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '40') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '41') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '42') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '43') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '44') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '45') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '46') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '47') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '48') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '49') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '50') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '51') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '52') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '53') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '54') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '55') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '56') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '57') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '58') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '59') {
      return 'bgwhite'
    }
    if (H == hour && M === '30' && minute === '0') {
      return ''
    }

    if (H == hour && M === '00' && minute === '00') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '01') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '02') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '03') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '04') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '05') {
      return 'bgwhite'
    }

    if (H == hour && M === '00' && minute === '06') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '07') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '08') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '09') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '10') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '11') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '12') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '13') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '14') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '15') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '16') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '17') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '18') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '19') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '20') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '21') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '22') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '23') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '24') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '25') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '26') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '27') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '28') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '29') {
      return 'bgwhite'
    }
    if (H == hour && M === '00' && minute === '30') {
      return ''
    }
  }
  // ██╗   ██╗███████╗███████╗    ███████╗███████╗███████╗███████╗ ██████╗████████╗
  // ██║   ██║██╔════╝██╔════╝    ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
  // ██║   ██║███████╗█████╗      █████╗  █████╗  █████╗  █████╗  ██║        ██║
  // ██║   ██║╚════██║██╔══╝      ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
  // ╚██████╔╝███████║███████╗    ███████╗██║     ██║     ███████╗╚██████╗   ██║
  //  ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(WorkingDayTors(WorkDayid))
      dispatch(ReciptForThisWorkingDay(WorkDayid))
      dispatch(SugeiTipulimAction())

      if (word != '') {
        setShowUserFilter(false)
        setWord('')

        Swal.fire({
          imageUrl: `${wordImage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${wordname} לשעה ${ChoosenClockTIME}  `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<a href="">התקשר לנייד של  בנייד 0$</a>`,
          footer: `<a href="">התקשר לנייד של ${wordname} בנייד 0${wordphone}</a>`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(confirmTor(ChoosenClock, word, TipulId))
          }
        })
      }
      if (ClockMADEsuccess === true || clockssuccess === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'הפעולה התבצעה בהצלחה',
          text: '  התור/ים שביקשת להוסיף נכנסו למערכת בהצלחה!',
          showConfirmButton: false,
          timer: 2500,
        })
      }
      if (Deletesuccess) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `התור בשעה ${time} נמחק בהצלחה`,
          text: `התור נמחק בהצלחה מהמערכת`,
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
    ClockMADEsuccess,
    clockssuccess,
    cancel,
    Paymentsuccess,
    UNPaymentsuccess,
    confirmsuccess,
    confirm,
    word,
  ])

  //USE EFFECT  FOR RECIPT CREATING-IF PAST? - STATUS
  useEffect(() => {
    if (workingDay) {
      if (
        year === workingDay.Dateyear &&
        month === workingDay.Datemonth &&
        day >= workingDay.Dateday
      ) {
        Setfterdate(true)
      }
    }
  }, [workingDay])

  //USEEFFECT CREFIT CARD VALIDATION
  // useEffect(() => {
  //   CreditCardref.current.focus()
  // }, [])

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
          title: `מה האימייל שאליו תרצה לשלח את הד"וח היומי לתאריך ${workingDay.date}`,
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
            sendEmail(e) //* */
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

  // ██████╗ ███████╗████████╗██╗   ██╗██████╗ ███╗   ██╗
  // ██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗████╗  ██║
  // ██████╔╝█████╗     ██║   ██║   ██║██████╔╝██╔██╗ ██║
  // ██╔══██╗██╔══╝     ██║   ██║   ██║██╔══██╗██║╚██╗██║
  // ██║  ██║███████╗   ██║   ╚██████╔╝██║  ██║██║ ╚████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
  return (
    <Row>
      <Col md={12}>
        <Link id='goback' to='/admin/torim'>
          <i className='fas fa-angle-double-right'></i>
        </Link>
      </Col>

      {loadingSingle ? (
        <Loader />
      ) : errorSingle ? (
        <Message variant='danger'>{errorSingle}</Message>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {ShowUserFilter && (
            <UserFilter
              ChoosenClock={ChoosenClock}
              ChoosenClockTIME={ChoosenClockTIME}
              ChoosenClockDATE={ChoosenClockDATE}
              selectV={TipulId}
              changeWord={(word) => setWord(word)}
              changeWordname={(wordname) => setWordName(wordname)}
              changeWordphone={(wordphone) => setWordphone(wordphone)}
              changeWordImage={(wordImage) => setWordImage(wordImage)}
            />
          )}

          {SHOWchooseTipul && (
            <Modal
              id='ModalStyle'
              open={setSHOWchooseTipul}
              close={handleCloseShowChooseTipul}
            >
              <Box id='BOXlStyleForChooseTipul'>
                <div id='reciptcloseNav'>
                  <button
                    onClick={handleCloseShowChooseTipul}
                    id='reciptcloseNavX'
                  >
                    X
                  </button>
                  <div>
                    <Col md={12}>
                      <h1 id='h1SugTipul'>בחר סוג טיפול</h1>
                    </Col>
                    <Col md={12}>
                      <form ref={TipulRef} id='centeForm'>
                        <select name='tipul' id='tipulimCooseOptions'>
                          {tipulimList[0] && (
                            <option
                              value={tipulimList[0] ? tipulimList[0]._id : ''}
                            >
                              {tipulimList[0] ? tipulimList[0].name : ''}
                            </option>
                          )}
                          {tipulimList[1] && (
                            <option
                              value={tipulimList[1] ? tipulimList[1]._id : ''}
                            >
                              {tipulimList[1] ? tipulimList[1].name : ''}
                            </option>
                          )}
                          {tipulimList[2] && (
                            <option
                              value={tipulimList[2] ? tipulimList[2]._id : ''}
                            >
                              {tipulimList[2] ? tipulimList[2].name : ''}
                            </option>
                          )}
                          {tipulimList[3] && (
                            <option
                              value={tipulimList[3] ? tipulimList[3]._id : ''}
                            >
                              {tipulimList[3] ? tipulimList[3].name : ''}
                            </option>
                          )}
                          {tipulimList[4] && (
                            <option
                              value={tipulimList[4] ? tipulimList[4]._id : ''}
                            >
                              {tipulimList[4] ? tipulimList[4].name : ''}
                            </option>
                          )}
                          {tipulimList[5] && (
                            <option
                              value={tipulimList[5] ? tipulimList[5]._id : ''}
                            >
                              {tipulimList[5] ? tipulimList[5].name : ''}
                            </option>
                          )}
                        </select>
                        <Button
                          id='marginTOPme'
                          onClick={() => {
                            CHOOSE()
                          }}
                        >
                          בחר
                        </Button>
                      </form>
                    </Col>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {SHOWcreditForm && (
            <Modal
              id='ModalStyle'
              open={SHOWcreditForm}
              close={handleCloseCreditForm}
            >
              <Box id='BOXlStyleForCreditCard'>
                <div id='reciptcloseNav'>
                  <button onClick={handleCloseCreditForm} id='reciptcloseNavX'>
                    X
                  </button>
                  <Col md={12}>
                    <div>
                      {' '}
                      <div id='AllForm'>
                        <div id='CreditImage'>
                          <Row>
                            <Col id='margintopMe'>
                              <Cards
                                className='centerCard'
                                number={number}
                                name={name}
                                expiry={expiry}
                                cvc={cvc}
                                focused={focus}
                              />
                            </Col>
                            <Col>
                              <h3 id='puutCreditDeets_headLine'>
                                הזן פרטי אשראי
                              </h3>

                              <form className='centerCard'>
                                <input
                                  id='Input'
                                  type='tel'
                                  name='number'
                                  placeholder='מספר הכרטיס'
                                  value={number}
                                  onChange={(e) => setNumber(e.target.value)}
                                  onFocus={(e) => setFocus(e.target.name)}
                                  ref={CreditCardref}
                                />
                                <input
                                  id='Input'
                                  type='text'
                                  name='name'
                                  placeholder='שם בעל/ת הכרטיס'
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  onFocus={(e) => setFocus(e.target.name)}
                                />
                                <input
                                  id='Input'
                                  type='text'
                                  name='expiry'
                                  placeholder='חודש/שנה'
                                  value={expiry}
                                  onChange={(e) => setExpiry(e.target.value)}
                                  onFocus={(e) => setFocus(e.target.name)}
                                />
                                <input
                                  id='Input'
                                  type='tel'
                                  name='cvc'
                                  placeholder='cvv'
                                  value={cvc}
                                  onChange={(e) => setCvc(e.target.value)}
                                  onFocus={(e) => setFocus(e.target.name)}
                                />
                              </form>
                            </Col>
                          </Row>
                          <Row>
                            <button onClick={handlePayCreditCard} id='pay'>
                              שלם
                            </button>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </Box>
            </Modal>
          )}

          <form id='disableView' method='post' ref={form} onSubmit={sendEmail}>
            <input type='email' name='user_email' value={emailToSendTo} />

            <input
              type='text'
              name='when_created'
              value={` דו"ח זה הופק בתאריך ${dateNow}, בשעה ${timeNow} ע"י ${userInfo.name}`}
            />
            <input
              type='text'
              name='num_all_torim'
              value={workingDay && workingDay.numTorim}
            />
            <input
              type='text'
              name='num_not_avilable_torim'
              value={
                workingDay && workingDay.numTorim - workingDay.numAvilableTorim
              }
            />
            <input
              type='text'
              name='num_avilable_torim'
              value={workingDay && workingDay.numAvilableTorim}
            />
            <input
              type='text'
              name='num_canceled_torim'
              value={
                workingDay &&
                workingDay.numTorim -
                  workingDay.numAvilableTorim -
                  workingDay.CupaOpend
              }
            />
            <input
              type='text'
              name='money_count'
              value={workingDay && workingDay.moneyCount}
            />

            <input type='text' name='workday_date' value={workingDay.date} />
          </form>

          <Col md={12}>
            <h2 id='headlineme'>יום {workingDay.dayInWeek}</h2>
            <h2 id='dayinWeek'> {workingDay.date}</h2>
          </Col>

          <Col md={3} id='singlewirkingdayoptionsbgwhite'>
            <div>
              <h4 id='centerme'>
                <span id='torimAndHahnasot'>פעולות</span>
              </h4>
              <div id='centerme'>
                <Row>
                  <Col md={12}>
                    <Button
                      className='link buzz-out-on-hover'
                      onClick={submitHandler3}
                      id='HOSAFAmehiraBtn'
                    >
                      <i class='fas fa-bolt'></i> הוספה מהירה
                    </Button>
                  </Col>

                  <Col md={12}>
                    <Button
                      onClick={showFormNow2}
                      id='centermebtnActions'
                      className='my-1'
                    >
                      <i className='fas fa-plus'></i> הוסף תורים
                    </Button>
                  </Col>
                  <Col md={12}>
                    <Button
                      onClick={showFormNow}
                      id='centermebtnActions'
                      className='my-1'
                    >
                      <i className='fas fa-plus'></i> הוסף תור
                    </Button>{' '}
                  </Col>

                  <Col md={12}>
                    <div id='BarberMENU'>
                      <button
                        onClick={showSicumNow}
                        className='BARBERMENUBTNSICUM'
                      >
                        <i id='idid' class='fas fa-file-invoice-dollar'></i>
                        סיכום
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>

              {showForm && (
                <div id='sizeme'>
                  <div id='blueme'>
                    <Form onSubmit={submitHandler}>
                      <Form.Group
                        controlId='time'
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <Form.Control as='select' id='formSelect'>
                          <option id='custom-select1'>בחר שעה</option>
                          <option id='custom-select'>10:00</option>
                          <option id='custom-select'>10:30</option>
                          <option id='custom-select'>11:00</option>
                          <option id='custom-select'>11:30</option>
                          <option id='custom-select'>12:00</option>
                          <option id='custom-select'>12:30</option>
                          <option id='custom-select'>13:00</option>
                          <option id='custom-select'>13:30</option>
                          <option id='custom-select'>14:00</option>
                          <option id='custom-select'>14:30</option>
                          <option id='custom-select'>15:00</option>
                          <option id='custom-select'>15:30</option>
                          <option id='custom-select'>16:00</option>
                          <option id='custom-select'>16:30</option>
                          <option id='custom-select'>17:00</option>
                          <option id='custom-select'>17:30</option>
                          <option id='custom-select'>18:00</option>
                          <option id='custom-select'>18:30</option>
                          <option id='custom-select'>19:00</option>
                          <option id='custom-select'>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Button
                        className='link buzz-out-on-hover'
                        id='centermebtnHOsef'
                        type='submit'
                      >
                        <i className='fas fa-plus'></i> הוסף
                        {NewClockloading ? (
                          <Loader2 />
                        ) : NewClockerror ? (
                          <Message variant='danger'>{error}</Message>
                        ) : (
                          <div></div>
                        )}
                      </Button>
                    </Form>
                  </div>
                </div>
              )}

              {showForm2 && (
                <div id='sizeme'>
                  <div id='blueme'>
                    <Form onSubmit={submitHandler2}>
                      <Form.Group
                        controlId='time'
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <Form.Control as='select' id='formSelect'>
                          <option id='custom-select1'>משעה</option>
                          <option id='custom-select'>10:00</option>
                          <option id='custom-select'>10:30</option>
                          <option id='custom-select'>11:00</option>
                          <option id='custom-select'>11:30</option>
                          <option id='custom-select'>12:00</option>
                          <option id='custom-select'>12:30</option>
                          <option id='custom-select'>13:00</option>
                          <option id='custom-select'>13:30</option>
                          <option id='custom-select'>14:00</option>
                          <option id='custom-select'>14:30</option>
                          <option id='custom-select'>15:00</option>
                          <option id='custom-select'>15:30</option>
                          <option id='custom-select'>16:00</option>
                          <option id='custom-select'>16:30</option>
                          <option id='custom-select'>17:00</option>
                          <option id='custom-select'>17:30</option>
                          <option id='custom-select'>18:00</option>
                          <option id='custom-select'>18:30</option>
                          <option id='custom-select'>19:00</option>
                          <option id='custom-select'>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        controlId='time2'
                        type='time2'
                        value={time2}
                        onChange={(e) => setTime2(e.target.value)}
                      >
                        <Form.Control as='select' id='formSelect'>
                          <option id='custom-select1'>עד שעה</option>
                          <option id='custom-select'>10:30</option>
                          <option id='custom-select'>11:00</option>
                          <option id='custom-select'>11:30</option>
                          <option id='custom-select'>12:00</option>
                          <option id='custom-select'>12:30</option>
                          <option id='custom-select'>13:00</option>
                          <option id='custom-select'>13:30</option>
                          <option id='custom-select'>14:00</option>
                          <option id='custom-select'>14:30</option>
                          <option id='custom-select'>15:00</option>
                          <option id='custom-select'>15:30</option>
                          <option id='custom-select'>16:00</option>
                          <option id='custom-select'>16:30</option>
                          <option id='custom-select'>17:00</option>
                          <option id='custom-select'>17:30</option>
                          <option id='custom-select'>18:00</option>
                          <option id='custom-select'>18:30</option>
                          <option id='custom-select'>19:00</option>
                          <option id='custom-select'>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Button
                        className='link buzz-out-on-hover'
                        id='centermebtnHOsef'
                        type='submit'
                      >
                        <i className='fas fa-plus'></i> הוסף
                        {NewClocksloading ? (
                          <Loader2 />
                        ) : NewClockserror ? (
                          <Message variant='danger'>{error}</Message>
                        ) : (
                          <div></div>
                        )}
                      </Button>
                    </Form>
                  </div>
                </div>
              )}

              <div id='centerme'>
                <div id='block'>
                  <h4 id='centerme'>
                    <span id='torimAndHahnasot'>סיכום תורים</span>
                  </h4>
                  <h5 id='block' className='whitemeandrightaligen'>
                    {' '}
                    סה"כ <span id='boldme'>{clockList.length}</span>
                    תורים
                  </h5>

                  <h5 id='block' className='whitemeandrightaligen'>
                    {' '}
                    מתוכם{' '}
                    <span id='boldmered'>
                      {
                        clockList.filter((clock) => clock.avilable === true)
                          .length
                      }
                    </span>{' '}
                    תורים פנויים
                  </h5>
                  <h4 id='centerme'>
                    <span id='torimAndHahnasot'>סיכום הכנסות</span>
                  </h4>
                  <h5 id='block' className='whitemeandrightaligen'>
                    הכנסה יומית צפויה{' '}
                    <span id='boldme'> {PredictedIncome()}₪</span>{' '}
                  </h5>
                  <h5 id='block' className='whitemeandrightaligen'>
                    הכנסה בפועל{' '}
                    <span id='boldme'>{workingDay.moneyCount}₪</span>{' '}
                  </h5>
                </div>
              </div>
            </div>
          </Col>

          <Col md={9}>
            <div>
              <Table bordered hover responsive id='tablewhiteSingle'>
                <thead id='centertext'>
                  <tr>
                    <th id='tableheadlines'>שולם</th>
                    <th id='tableheadlines'>מחיר</th>
                    <th id='tableheadlines'>טיפול</th>
                    <th id='tableheadlines'>לקוח/ה</th>
                    <th id='tableheadlines'>שעה</th>
                    <th id='tableheadlines'></th>
                  </tr>
                </thead>

                <tbody id='centertext'>
                  {clockList

                    .sort((a, b) => {
                      const TimeA = ` ${a.time}`.valueOf()
                      const TimeB = ` ${b.time}`.valueOf()
                      if (TimeA > TimeB) {
                        return 1 // return -1 here for DESC order
                      }
                      return -1 // return 1 here for DESC Order
                    })

                    .map((clock) => (
                      <tr
                        key={clock._id}
                        className={clock.avilable ? 'red' : 'green'}
                        id={FunctionBlingThisTime(clock.time)}
                      >
                        <td style={{ wordBreak: 'break-word' }}>
                          {clock.isPaid && clock.paymentMethod === 'cash' ? (
                            <img
                              id='miniICON2'
                              src='https://i.ibb.co/tZ081v3/CASH.png'
                              onClick={() =>
                                makeClockUnpaidHandler(
                                  clock._id,
                                  clock.time,
                                  clock.date,
                                  clock.avilable
                                )
                              }
                            ></img>
                          ) : clock.isPaid &&
                            clock.paymentMethod === 'credit' ? (
                            <img
                              id='miniICON2'
                              src='https://i.ibb.co/GV1sk89/CREDITCARDS.png'
                              onClick={() =>
                                makeClockUnpaidHandler(
                                  clock._id,
                                  clock.time,
                                  clock.date,
                                  clock.avilable
                                )
                              }
                            ></img>
                          ) : clock.isPaid && clock.paymentMethod === 'bit' ? (
                            <img
                              id='miniICON2'
                              src='https://i.ibb.co/88DGRYk/BITTTT.png'
                              onClick={() =>
                                makeClockUnpaidHandler(
                                  clock._id,
                                  clock.time,
                                  clock.date,
                                  clock.avilable
                                )
                              }
                            ></img>
                          ) : (
                            !clock.isPaid &&
                            !clock.avilable && (
                              <button
                                id='Xunshowme'
                                onClick={() => {
                                  setChoosenClock(clock._id)
                                  makeClockPAIDHandler(
                                    clock._id,
                                    clock.time,
                                    clock.date
                                  )
                                }}
                              >
                                <p style={{ fontSize: '25px', color: 'red' }}>
                                  x
                                </p>
                              </button>
                            )
                          )}
                        </td>
                        <td>{clock.tipul ? clock.tipul.cost : ''}</td>
                        <td>{clock.tipul ? clock.tipul.name : ''}</td>

                        <td>
                          {clock.mistaper && clock.mistaper.name}
                          <br />
                          <div id='phonetable'>
                            {' '}
                            {clock.mistaper && '0' + clock.mistaper.phone}
                          </div>
                        </td>
                        <td>{clock.time}</td>
                        <td id='optionsBlack'>
                          <Button
                            id='sizemefortable'
                            variant='light'
                            className='btn-sm'
                            onClick={() => {
                              setChoosenClock(clock._id)

                              preshowTorHandler(
                                clock.time,
                                clock.date,
                                clock.avilable,
                                clock.mistaper,
                                clock._id,
                                WorkDayid,
                                tipulimList,
                                clock.isPaid,
                                clock.TotalAmmountPaid,
                                clock.paymentMethod,
                                clock.creditLastDigits,
                                clock.ReciptNumber
                              )
                            }}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                          <Button
                            id='sizemefortable'
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(clock._id)}
                          >
                            <i id='trashicon' className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Col>
          {open1day && (
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
                            <button
                              onClick={dispatchCrtateReport}
                              id='speedDialSAVE'
                            >
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
                                format: [200, 800],
                              }}
                            >
                              {({ toPdf }) => (
                                <div id='speedDialDownload' onClick={toPdf}>
                                  <i
                                    id='Ismall'
                                    class='fas fa-file-download'
                                  ></i>
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
                    <h1 id='centerme'> דו"ח יומי לתאריך {workingDay.date}</h1>
                    <h7 id='centerme'>
                      זהו דו"ח יומי עבור תאריך {workingDay.date}
                      <br />, ד"וח זה הופק בתאריך {dateNow} בשעה {timeNow}{' '}
                      <br /> ע"י {userInfo.name}
                    </h7>
                    <br />
                    <div id='divFontsizebigger'>
                      <h7>
                        שם המספרה:<b> ברבר_מייקר</b>{' '}
                      </h7>
                      <br />
                      <h7>
                        שם הספר: <b>{userInfo.name}</b>{' '}
                      </h7>
                      <br />
                      <h7> 1 :מספר ימי עבודה</h7>
                      <br />
                      <h7>
                        {' '}
                        <b>{workingDay.numTorim}</b> :תורים בסה"כ
                      </h7>
                      <br />
                      <h7>
                        {' '}
                        <b>
                          {workingDay.numTorim - workingDay.numAvilableTorim}
                        </b>{' '}
                        :תורים שאליהם נקבע תור{' '}
                      </h7>
                      <br />
                      <h7>
                        <b>{workingDay.numAvilableTorim}</b> :תורים פנויים
                      </h7>
                      <br />
                      <h7>
                        {' '}
                        <b>
                          {workingDay.numTorim -
                            workingDay.numAvilableTorim -
                            workingDay.CupaOpend}
                        </b>{' '}
                        :תורים שנקבעו אך הלקוח לא הגיע
                      </h7>
                    </div>
                    <br />
                    <h2 id='centerme'>
                      הכנסות
                      <br></br>*************
                    </h2>
                    <Table>
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
                        <td>{workingDay.BITmoneyCount}</td>
                        <td>{workingDay.CREDITmoneyCount}</td>
                        <td>{workingDay.CASHmoneyCount}</td>
                        <td>{workingDay.moneyCount}</td>
                      </tbody>
                    </Table>
                    <br />
                    <h2 id='centerme'>
                      פירוט וקבלות
                      <br></br>**************
                    </h2>
                    <div id='reciptTable'>
                      <Table bordered hover responsive>
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
                          {!resultForThisWorkDay ? (
                            <Message>
                              {' '}
                              לא נמצאו קבלות או תשלומים עבור חודש זה
                            </Message>
                          ) : (
                            resultForThisWorkDay
                              .sort(
                                (a, b) =>
                                  Date.parse(
                                    new Date(
                                      a.date.split('/').reverse().join('-')
                                    )
                                  ) -
                                  Date.parse(
                                    new Date(
                                      b.date.split('/').reverse().join('-')
                                    )
                                  )
                              )

                              .map((resultForThisWorkDayClock) => (
                                <tr key={resultForThisWorkDayClock._id}>
                                  <td>
                                    {' '}
                                    {resultForThisWorkDayClock.paymentMethod ===
                                      'cash' && 'מזומן'}
                                    {resultForThisWorkDayClock.paymentMethod ===
                                      'credit' && 'אשראי'}
                                    {resultForThisWorkDayClock.paymentMethod ===
                                      'bit' && 'ביט'}
                                  </td>
                                  <td>
                                    {resultForThisWorkDayClock.tipul.cost}
                                  </td>
                                  <td>
                                    {resultForThisWorkDayClock.tipul.name}
                                  </td>
                                  <td>{resultForThisWorkDayClock.time}</td>
                                  <td>{resultForThisWorkDayClock.date}</td>
                                  <td>
                                    {resultForThisWorkDayClock.mistaper.name},
                                    {resultForThisWorkDayClock.mistaper.phone}
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </Table>
                      <h7 id='centerme'>
                        זהו דו"ח יומי עבור תאריך {workingDay.date}
                        <br />, ד"וח זה הופק בתאריך {dateNow} בשעה {timeNow}{' '}
                        <br /> ע"י {userInfo.name}
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
      )}
    </Row>
  )
}

export default SingleWorkDayScreen

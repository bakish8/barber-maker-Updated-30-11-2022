import moment from 'moment'
import UserFilter from '../../../components/Filters/UserFilter'
import { Box, Modal } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print'
import Swal from 'sweetalert2'
import {
  CancelMyTor,
  registerByADMIN,
  createReport,
  deleteAllClocks,
  deleteWorkingday,
} from '../../../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */
import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import Loader2 from '../../../components/Loader2'
import Speech from '../../../components/VoiceListener/VoiceListner'
import { Route } from 'react-router'
import AdminMessages from '../../../components/AdminMessages/AdminMessages'
import {
  deleteAvilableClocks,
  deleteClock,
  createClocks,
  createClock,
  WorkingDayTors,
  PayMyTor,
  UNPayMyTor,
  confirmTor,
  workingDayDetails,
  ReciptForThisWorkingDay,
} from '../../../actions/userActions'
import { Link } from 'react-router-dom'
import ReactToPrint from 'react-to-print'
import ReactToPdf from 'react-to-pdf' //pdf
import emailjs from 'emailjs-com'
import CreditCard from '../../../components/CreditCard/CreditCard'
import Cards from 'react-credit-cards'
import NewsTicker from 'react-advanced-news-ticker'
import { CONFIRM_TOR_RESET } from '../../../constants/userConstants'
import { TREATMENTSListAction } from '../../../actions/BuissnesActions/Buissnes_User_Actions'

//?
var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const AdminSingleWorkDay = ({ history, match }) => {
  let BusinessId = match.params.bid

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

  const DeleteAllClocks = useSelector((state) => state.DeleteAllClocks)
  const { success: DeleteAllClockssuccess } = DeleteAllClocks

  const DeleteworkingDay = useSelector((state) => state.DeleteworkingDay)
  const { success: DeletesuccessWorkday } = DeleteworkingDay

  const [ValueScroll, setValueScroll] = useState('test1234')
  const [ValueForArrowUP, setValueForArrowUP] = useState('test12345')

  const [Somthing, setSomthing] = useState(false)

  //**STATES FOR CLOCK CHOOSE TIPUL KIND DISPLAY*/
  const [display3, setdisplay3] = useState(false)
  const [display2andhalf, setdisplay2andhalf] = useState(false)
  const [display2, setdisplay2] = useState(false)
  const [display1andhalf, setdisplay1andhalf] = useState(false)
  const [display1, setdisplay1] = useState(false)
  const [displayhalf, setdisplayhalf] = useState(false)
  const [Arr, setArr] = useState()
  const [Arrforhour, setArrforhour] = useState()
  const [Arrarrforhourandhalf, setArrarrforhourandhalf] = useState()
  const [Arrarrfor2hours, setArrarrfor2hours] = useState()
  const [Arrarrfor2hoursandhalf, setArrarrfor2hoursandhalf] = useState()
  const [Arrarrfor3hours, setArrarrfor3hours] = useState()

  const [StateForPinuiBTN, setStateForPinuiBTN] = useState(false)
  const [stateChecked, setstateChecked] = useState(false)
  const [select_OneTor, setselect_OneTor] = useState(false)
  const [ArrayOfSelectedTors, setArrayOfSelectedTors] = useState([])

  const [SHOW_TH_CHHOSE, setSHOW_TH_CHHOSE] = useState(false)

  const [word, setWord] = useState('') /****סטייט שמתקבל מקומפוננט שהוא ילד* */
  const [wordname, setWordName] = useState('') /***** */
  const [wordphone, setWordphone] = useState('') /***** */
  const [wordImage, setWordImage] = useState('') /***** */
  const [SameDay, setSameDay] = useState(false) /***** */

  const [
    StateForSwalDeleteingAllAVILABLEtorim,
    setStateForSwalDeleteingAllAVILABLEtorim,
  ] = useState(false)

  const [ChoosenClock, setChoosenClock] = useState('') /***** */
  const [ChoosenClockTIME, setChoosenClockTIME] = useState('') /***** */
  const [ChoosenClockDATE, setChoosenClockDATE] = useState('') /***** */
  //credit card states
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')

  const BusinessTreatmentsList = useSelector(
    (state) => state.BusinessTreatmentsList
  )
  const {
    tipulim: tipulimList,
    tipulimloading,
    tipulimerror,
  } = BusinessTreatmentsList

  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [SHOWcreditForm, setSHOWcreditForm] = useState(false)
  const [SHOWchooseTipul, setSHOWchooseTipul] = useState(false)
  const [
    SHOWsmallSCreenPick2HoursForCREATEION,
    setSHOWsmallSCreenPick2HoursForCREATEION,
  ] = useState(false)
  const [
    SHOWsmallSCreenPick1HoursForCREATEION,
    setSHOWsmallSCreenPick1HoursForCREATEION,
  ] = useState(false)

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

  const [afterdate, SetAfterdate] = useState(false) //**caclculate if passed date for day state */

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
  const [TipulTime, setTipulTime] = useState('') /***** */

  //***states for Email Adress sending Sicum */
  const [emailToSendTo, SetemailToSendTo] = useState(userInfo.email)

  /**states for sinun */
  const [showFilterForSmallScreen, setshowFilterForSmallScreen] =
    useState(false) //for small screen

  const [SHOWAllToirmForToday, setSHOWAllToirmForToday] = useState(true)
  const [SHOWonlyAvilable, setSHOWonlyAvilable] = useState(false)
  const [SHOWonlyNotAvilable, setSHOWonlyNotAvilable] = useState(false)
  const [SHOWonlyPayd, setSHOWonlyPayd] = useState(false)

  const setSHOWAllToirmForTodayFUNCTION = () => {
    setSHOWAllToirmForToday(true)
    setSHOWonlyAvilable(false)
    setSHOWonlyNotAvilable(false)
    setSHOWonlyPayd(false)
  }

  const setSHOWonlyAvilableFUNCTION = () => {
    setSHOWonlyAvilable(true)
    setSHOWAllToirmForToday(false)
    setSHOWonlyNotAvilable(false)
    setSHOWonlyPayd(false)
  }
  const setSHOWonlyNotAvilableFUNCTION = () => {
    setSHOWonlyNotAvilable(true)
    setSHOWonlyAvilable(false)
    setSHOWAllToirmForToday(false)
    setSHOWonlyPayd(false)
  }
  const setSHOWonlyPaydFUNCTION = () => {
    setSHOWonlyPayd(true)
    setSHOWonlyNotAvilable(false)
    setSHOWonlyAvilable(false)
    setSHOWAllToirmForToday(false)
  }

  // ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
  // ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
  // █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
  // ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
  // ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
  // ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  let checkboxes = document.querySelectorAll('.checkboxxx')

  const FixUP = () => {
    const Headline = document.getElementById('dayinWeek')
    window.scrollTo({
      top: Headline.offsetTop + 150,
      behavior: 'smooth',
    })
  }

  const FuncTionDeleteAllAvilableTors = () => {
    for (let clock of clockList) {
      if (clock.avilable && !CheckIfTimePassed(clock.time)) {
        dispatch(deleteAvilableClocks(WorkDayid, clock._id)).then(
          Swal.fire({
            text: ' מוחק את התורים הזמינים מהמערכת אנא המתן',

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
    }
  }

  const swalsucsses1 = () => {
    Swal.fire({
      position: 'top-end',
      cancelButtonColor: 'rgb(194, 0, 0)',
      confirmButtonColor: 'rgb(3, 148, 39)',
      icon: 'success',
      title: `בוצע בהצלחה`,
      text: `כל התורים הזמינים להיום נמחקו בהצלחה`,
      showConfirmButton: false,
      timer: 8000,
    })
  }

  const SwalFuncTionDeleteAllAvilableTors = () => {
    Swal.fire({
      title: 'האם אתה בטוח שברצונך למחוק את התורים הזמינים מיום עבודה זה',
      text: `חשוב לזכור שברגע שתמחק את תורים אלו מיום עבודה זה הם לא יהיו זמינים ללקוחות שלך`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'מחק',
    }).then((result) => {
      if (result.isConfirmed) {
        FuncTionDeleteAllAvilableTors()
      }
    })
  }

  const showFilterForSmallScreenFunction = () => {
    setshowFilterForSmallScreen(!showFilterForSmallScreen)
  }

  const swalADDfunction = () => {
    swalWithBootstrapButtons
      .fire({
        title: 'בחר פעולה',
        text: ` באפשרותך האפשרויות הבאות `,
        color: 'black',
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: `  + הוסף תורים`,
        denyButtonColor: 'rgb(21, 21, 21)',
        cancelButtonText: `+ הוסף תור`,
        cancelButtonColor: 'rgb(21, 21, 21)',
        confirmButtonColor: 'rgb(21, 21, 21)',
        confirmButtonText: ` <i class='fas fa-bolt'></i> הוספה מהירה`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          submitHandler3()
        } else if (result.isDenied) {
          setSHOWsmallSCreenPick2HoursForCREATEION(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setSHOWsmallSCreenPick1HoursForCREATEION(true)
        }
      })
  }
  const ARE_U_sure_PINUI_selected = () => {
    Swal.fire({
      title: '?אתה בטוח',
      text: `?האם אתה בטוח שברצונך לפנות את השעות המסומנות`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'כן אני בטוח',
    }).then((result) => {
      if (result.isConfirmed) {
        if (!ArrayOfSelectedTors.length) {
          console.log('array is emty please choose')
        } else {
          for (let i of ArrayOfSelectedTors) {
            if (!i.uid) {
            } else {
              let id = i.id
              let uid = i.uid
              dispatch(CancelMyTor(id, uid))
            }
          }

          Swal.fire({
            position: 'top-end',
            cancelButtonColor: 'rgb(194, 0, 0)',
            confirmButtonColor: 'rgb(3, 148, 39)',
            icon: 'success',
            title: `בוצע בהצלחה`,
            text: `התורים שביקשת לפנות פונו בהצלחה מהמערכת וכעת זמינים ללקוחות אחרים`,
            showConfirmButton: false,
            timer: 8000,
          })
          setSHOW_TH_CHHOSE(false)
          setstateChecked(false)
          setselect_OneTor(false)
        }
      }
    })
  }

  const ARE_U_sure_delete_selected = () => {
    console.log(ArrayOfSelectedTors)
    Swal.fire({
      title: '?אתה בטוח',
      text: `?האם אתה בטוח שברצונך למחוק את השעות המסומנות`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'כן אני בטוח',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('dispatcching action')
        if (!ArrayOfSelectedTors.length) {
          console.log('array is emty please choose')
        } else {
          for (let i of ArrayOfSelectedTors) {
            let id = i.id
            dispatch(deleteClock(WorkDayid, id))
          }
          setSHOW_TH_CHHOSE(false)
          setstateChecked(false)
          setselect_OneTor(false)
        }
      }
    })
  }

  const FunctionForFilteringTheCheched = (id) => {
    let Index = ArrayOfSelectedTors.findIndex((x) => x.id === id)
    ArrayOfSelectedTors.splice(Index, 1)
  }

  const selectAllTors = () => {
    let ClocksNotAvilable = []

    //  setStateForPinuiBTN(true)
    if (stateChecked === false) {
      setstateChecked(true)
      for (let checkbox of checkboxes) {
        checkbox.checked = true
        var valuetwo = checkbox.getAttribute('data-valuetwo')
        var value33 = checkbox.getAttribute('data-value33')
        const object = {
          id: checkbox.value,
          uid: valuetwo,
          avilablety: value33,
        }

        let magenicVendor = ArrayOfSelectedTors.find(
          (vendor) => vendor['id'] === object.id
        )
        if (!magenicVendor) {
          ArrayOfSelectedTors.push(object)
        } else {
          console.log('לא מוסיף קיים כבר')
        }
      }

      for (let clocki of ArrayOfSelectedTors) {
        if (clocki.avilablety == 'false') {
          ClocksNotAvilable.push(clocki)
        }
      }

      if (ClocksNotAvilable.length) {
        setStateForPinuiBTN(true)
      } else {
        setStateForPinuiBTN(false)
      }
    } else {
      setstateChecked(false)
      for (let checkbox of checkboxes) {
        checkbox.checked = false
        ArrayOfSelectedTors.splice(checkbox.value)
      }
    }
  }

  const selectOneTor = (id, avilable, mistaper) => {
    setSomthing(!Somthing)

    let magenicVendor = ArrayOfSelectedTors.find(
      (vendor) => vendor['id'] === id
    )

    if (magenicVendor) {
      console.log('includes')
      FunctionForFilteringTheCheched(id)
      if (ArrayOfSelectedTors.length === 0) {
        setselect_OneTor(false)
      } else {
        setselect_OneTor(true)
      }
    } else {
      console.log(' not includes')
      if (!avilable) {
        const uid = mistaper._id

        ArrayOfSelectedTors.push({ id: id, uid: uid })
        if (ArrayOfSelectedTors.length === 0) {
          setselect_OneTor(false)
        } else {
          setselect_OneTor(true)
        }
      } else {
        ArrayOfSelectedTors.push({ id: id })
        if (ArrayOfSelectedTors.length === 0) {
          setselect_OneTor(false)
        } else {
          setselect_OneTor(true)
        }
      }
    }
    let magicVendor2 = ArrayOfSelectedTors.find((vendor) => vendor['uid'])
    if (magicVendor2) {
      setStateForPinuiBTN(true)
    } else {
      setStateForPinuiBTN(false)
    }
  }

  const setSHOW_TH_CHHOSE_FUNCTION = () => {
    setSHOW_TH_CHHOSE(!SHOW_TH_CHHOSE)
    setStateForPinuiBTN(false) //**משנה את ההצהרה למה שהיא לא הייתה ומאפס את  כל הדברים הבאים */
    setstateChecked(false)
    setselect_OneTor(false)
    setArrayOfSelectedTors([])
    for (let checkbox of checkboxes) {
      checkbox.checked = false
    }
  }

  const deleteHandler23 = (id) => {
    let resultV = CanIdeleteToday_Function()
    if (!resultV) {
      Swal.fire({
        title: '?אתה בטוח',
        text: 'ברגע שתמחק את יום זה כל התורים בתוכו יעלמו ולא יהיה ניתן להשיבם',
        icon: 'warning',
        buttons: ['ביטול', 'מחק יום עבודה'],

        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
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
        }
      })
    } else {
      Toast.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן למחוק יום עבודה שקבועים בו תורים',
      })
    }
  }

  const swalDeleteChoose = () => {
    swalWithBootstrapButtons
      .fire({
        title: 'בחר סוג פעולה',
        text: `   בחר את סוג הפעולה שברצונך לבצע`,
        icon: 'warning',
        color: 'black',
        html: `<button 
         id='deleteworkingDayBTN'>מחק את יום העבודה</button>
`,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: `מחק את התורים הפנויים`,
        denyButtonColor: 'rgb(222, 0, 0)',

        cancelButtonText: 'מחק את יום העבודה',
        cancelButtonColor: 'rgb(222, 0, 0)',
        confirmButtonColor: 'rgb(222, 0, 0)',
        confirmButtonText: 'מחיקה ופינוי תורים לפי בחירה',
      })

      .then((result) => {
        if (result.isConfirmed) {
          setSHOW_TH_CHHOSE_FUNCTION()
        } else if (result.isDenied) {
          SwalFuncTionDeleteAllAvilableTors()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          deleteHandler23(workingDay._id)
        }
      })
  }
  const OpenSmallScreenOptions_Swal = () => {
    swalWithBootstrapButtons
      .fire({
        title: 'בחר סוג פעולה',
        text: `   בחר את סוג הפעולה שברצונך לבצע`,
        icon: 'question',
        color: 'black',
        showCancelButton: afterdate ? false : true,
        showConfirmButton: afterdate ? false : true,
        showDenyButton: true,
        denyButtonText: `סכם יום עבודה`,
        denyButtonColor: 'rgb(21, 21, 21)',

        cancelButtonText: 'מחק',
        cancelButtonColor: 'rgb(222, 0, 0)',
        confirmButtonColor: 'rgb(21, 21, 21)',
        confirmButtonText: ' + הוסף תורים',
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalADDfunction()
        } else if (result.isDenied) {
          showSicumNow()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalDeleteChoose()
        }
      })
  }

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

  const CHOOSEB = () => {
    const value1 = tipulimList[0]._id
    const value2 = tipulimList[0].time
    setTipulTime(value2)
    setTipulId(value1)
  }

  const CHOOSEA = () => {
    let select2 = document.getElementById('tipulimCooseOptions')
    let value1 = select2.value.split(',')[0]
    let value2 = select2.value.split(',')[1]
    setTipulTime(value2)
    setTipulId(value1)
  }

  const CHOOSE = () => {
    resetSelctorForTipulnextHoursavilable()

    let select = document.getElementById('tipulimCooseOptions')
    select.addEventListener('change', function () {
      const value1 = select.value.split(',')[0]
      const value2 = select.value.split(',')[1]
      setTipulTime(value2)
      setTipulId(value1)
    })

    let SelectTime = select.value.split(',')[1]
    setTipulTime(SelectTime)

    let SelectValue = select.value.split(',')[0]
    setTipulId(SelectValue)
    handleCloseShowChooseTipul()

    swalWithBootstrapButtons
      .fire({
        title: `חפש משתמש`,
        text: `חפש את המשתמש שתרצה להכניס לתור בשעה ${ChoosenClockTIME}`,
        imageUrl: 'https://i.ibb.co/hYWCLW3/output-onlinegiftools-1.gif',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'חיפוש',
        color: 'black',
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: `חפש לפי נייד`,
        denyButtonColor: 'rgb(0, 132, 255)',
        footer: '.באפשותך גם ליצור משתמש חדש',

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
            imageUrl: 'https://i.ibb.co/k5YCM8z/animation-200-kyobojkk.gif',
            imageWidth: 100,
            imageHeight: 100,
            title: 'הוסף משתמש חדש לתור זה',
            footer: `הסיסמה שהונפקה ללקוח זה מספר הנייד שהזנת`,
            confirmButtonText: 'רשום משתמש חדש',

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
            const image = 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif'
            await dispatch(
              registerByADMIN(name, email, phone, password, image, BusinessId)
            )
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
      imageUrl: 'https://i.ibb.co/jGJk9gz/32132.png',
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
          imageUrl: 'https://i.ibb.co/r64Pz53/output-onlinegiftools-8.gif',
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
      imageUrl: 'https://i.ibb.co/jMNthkF/output-onlinegiftools-5.gif',
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
      }
    })
  }

  /*send one hour function */
  const submitHandler = (e) => {
    setSHOWsmallSCreenPick1_CLOSE()
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
    setSHOWsmallSCreenPick2_CLOSE()
    e.preventDefault()
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
    if (e) {
      e.preventDefault()
    }
    dispatch(createClocks(WorkDayid, '10:00', '19:00', sapar)).then(
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
    )
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
    let CheckIfTimePassedForUnpay = CheckIfTimePassed(time)

    if (afterdate) {
      console.log('isafter date cant change nothing sorry.....')
    } else if (CheckIfTimePassedForUnpay) {
      console.log('isafter Time cant change nothing sorry.....')
    } else {
      if (id && time && date) {
        Swal.fire({
          title: '?אתה בטוח',
          text: `תור זה מוגדר כמשולם במערכת,שינוי סטאטוס התשלום ישונה ל-לא שולם, עבור לקוח זה בתור בשעה ${time} בתאריך ${date}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#B83122',

          cancelButtonText: 'ביטול',
          confirmButtonText: 'כן אני בטוח',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('תור זה הוגדר כלא שולם בהצלחה', {
              icon: 'success',
            }).then(dispatch(UNPayMyTor(id))) //** */
          } else {
            console.log('your payment is safe')
          }
        })
      }
    }
  }
  ///make this Hour Payd Function
  const makeClockPAIDHandler = async (id, time, date, avilable) => {
    if (afterdate) {
      console.log('isafter date cant change nothing sorry.....')
    } else {
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

  const CheckIfTimePassed = (time) => {
    const hourToCheck = time.substring(0, 2)
    const minuteToCheck = time.slice(3)

    let searchDate2 = new Date()
    let FormatedSearchDate2 = moment(searchDate2).format()
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
    ReciptNumber,
    clock
  ) => {
    setChoosenClock(id)
    setChoosenClockTIME(time)
    setChoosenClockDATE(date)

    let CheckIfTimePassed_VAR = CheckIfTimePassed(time)
    if (afterdate) {
      if (avilable) {
        Toast.fire({
          icon: 'error',
          title: 'שגיאה',
          text: 'לא ניתן לקבוע תור ליום שעבר',
        })
      } else if (!avilable && !isPaid && CheckIfTimePassed_VAR) {
        swalWithBootstrapButtons
          .fire({
            scrollbarPadding: true,
            title: `<b><span id='span43125'>${time}</span></b><br/><span id='Tafusss'>
              תפוס
            </span>`,
            html: `<div id='IdForTafusContent'> על ידי <b> <a id='nameLinkForProFile' href="/admin/user/${
              mistaper._id
            }/edit">${mistaper.name}</a>
 ל:${clock.tipul.name}</b><br/>    
               <span id='span4312'>${
                 mistaper.commentsForTipul ? mistaper.commentsForTipul : ''
               }</span>  


          </div>`,
            footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${mistaper.phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${mistaper.phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
            imageUrl: mistaper.image,
            imageWidth: 200,
            imageHeight: 200,
            // /0הוסף הברזה ///לא לשכח שהשעות הם 9:01
            showDenyButton: CheckIfTimePassed(time) === true ? false : true,
            denyButtonText: 'הברזה',
            denyButtonColor: 'rgb(194, 0, 0)',
            showCancelButton: true,
            cancelButtonText: 'צא',
            cancelButtonColor: 'rgb(0, 0, 0)',
            showConfirmButton: isPaid ? false : true,
            confirmButtonColor: 'rgb(3, 148, 39)',
            confirmButtonText: 'תשלום',
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              makeClockPAIDHandler(id, time, date)
            } else if (result.isDenied) {
              console.log(`THis User wasent arrive !!`)
            }
          })
      } else if (!avilable && isPaid) {
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
          ReciptNumber,
          clock
        )
      } else if (avilable && SameDay) {
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
          ReciptNumber,
          clock
        )
      }
    } else if (avilable && SameDay && CheckIfTimePassed_VAR) {
      console.log(`!!!!!!!!!!!!!!!!!!!!!!!`)

      Toast.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'לא ניתן לקבוע תור לשעה שעברה',
      })
    } else {
      console.log(`time  NOT passed !!`)
      console.log(`THE COOSEN CLOCK IS:${ChoosenClock}!!!!`)
      var elementPos = clockList
        .map(function (x) {
          return x._id
        })
        .indexOf(id)

      var objectFound = clockList[elementPos]
      var ClockPlusHalfHour = clockList[elementPos + 1]
      var ClockPlusHour = clockList[elementPos + 2]
      var ClockPlusHourandHalf = clockList[elementPos + 3]
      var ClockPlus2Hours = clockList[elementPos + 4]
      var ClockPlus2HoursandHalf = clockList[elementPos + 5]
      var ClockPlus3Hours = clockList[elementPos + 6]
      console.log(elementPos + 1)
      if (objectFound && objectFound.avilable) {
        setdisplayhalf(true)
        console.log(objectFound.time)
        console.log(objectFound.time)
        console.log(objectFound.time)
        const minutes = objectFound.time.split(':')[1]
        const hour = objectFound.time.split(':')[0]
        console.log(minutes)
        console.log(hour)

        if (
          ClockPlusHalfHour &&
          ClockPlusHalfHour.avilable &&
          ClockPlusHour &&
          ClockPlusHour.avilable &&
          ClockPlusHourandHalf &&
          ClockPlusHourandHalf.avilable &&
          ClockPlus2Hours &&
          ClockPlus2Hours.avilable &&
          ClockPlus2HoursandHalf &&
          ClockPlus2HoursandHalf.avilable
        ) {
          setdisplay3(true)
          setdisplay2andhalf(true)
          setdisplay2(true)
          setdisplay1andhalf(true)
          setdisplay1(true)

          console.log('the next 3 hours   is avilable settinf state...')
        } else if (
          ClockPlusHalfHour &&
          ClockPlusHalfHour.avilable &&
          ClockPlusHour &&
          ClockPlusHour.avilable &&
          ClockPlusHourandHalf &&
          ClockPlusHourandHalf.avilable &&
          ClockPlus2Hours &&
          ClockPlus2Hours.avilable
        ) {
          setdisplay3(false)
          setdisplay2andhalf(true)
          setdisplay2(true)
          setdisplay1andhalf(true)
          setdisplay1(true)

          console.log('the next 2 hours anf half  is avilable settinf state...')
        } else if (
          ClockPlusHalfHour &&
          ClockPlusHalfHour.avilable &&
          ClockPlusHour &&
          ClockPlusHour.avilable &&
          ClockPlusHourandHalf &&
          ClockPlusHourandHalf.avilable
        ) {
          setdisplay3(false)
          setdisplay2andhalf(false)
          setdisplay2(true)
          setdisplay1andhalf(true)
          setdisplay1(true)

          console.log('the next 2 hours  is avilable settinf state...')
        } else if (
          ClockPlusHalfHour &&
          ClockPlusHalfHour.avilable &&
          ClockPlusHour &&
          ClockPlusHour.avilable
        ) {
          setdisplay3(false)
          setdisplay2andhalf(false)
          setdisplay2(false)
          setdisplay1andhalf(true)
          setdisplay1(true)
          console.log('the  hour  and half is avilable settinf state...')
        } else if (ClockPlusHalfHour && ClockPlusHalfHour.avilable) {
          setdisplay3(false)
          setdisplay2andhalf(false)
          setdisplay2(false)
          setdisplay1andhalf(false)
          setdisplay1(true)
          console.log('the next  hour is avilablw settinf state...')
        } else if (ClockPlusHalfHour && !ClockPlusHalfHour.avilable) {
          console.log('the next  hour is NOT  avilablw settinGS state...')
          setdisplay1(false)
          setdisplay3(false)
          setdisplay2andhalf(false)
          setdisplay2(false)
          setdisplay1andhalf(false)
        }
      }
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
        ReciptNumber,
        clock
      )
    }
  }
  const CanIdeleteToday_Function = () => {
    let arr = []
    for (let clock of clockList) {
      if (!clock.avilable) {
        arr.push(clock.time)
      }
    }
    if (!arr.length) {
      return false
    } else {
      return true
    }
  }
  const TehreIsSomeClocksNotPassedTime_Function = () => {
    let ArrOfClocksNotPassedTime = []
    for (let clock of clockList) {
      if (!CheckIfTimePassed(clock.time)) {
        ArrOfClocksNotPassedTime.push(clock.time)
      }
    }
    console.log(`Array Of Clocks NotPassed Time:${ArrOfClocksNotPassedTime}`)
    if (!ArrOfClocksNotPassedTime.length) {
      return false
    } else {
      return true
    }
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
    ReciptNumber,
    clock
  ) => {
    let CheckIfClockPassed = CheckIfTimePassed(time)
    if (!avilable && !isPaid) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: `<b><span id='span43125'>${time}</span></b><br/><span id='Tafusss'>תפוס</span>`,
          html: `<div id='IdForTafusContent'> על ידי <b> <a id='nameLinkForProFile' href="/admin/user/${
            mistaper._id
          }/edit">${mistaper.name}</a>
 ל:${clock.tipul.name}</b><br/>    
               <span id='span4312'>${
                 mistaper.commentsForTipul ? mistaper.commentsForTipul : ''
               }</span>  


          </div>`,
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${mistaper.phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${mistaper.phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
          imageUrl: mistaper.image,
          imageWidth: 200,
          imageHeight: 200,

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
            if (mistaper) {
              const uid = mistaper._id
              console.log(mistaper._id)
              console.log(mistaper._id)
              console.log(mistaper._id)
              Swal.fire({
                title: '?אתה בטוח',
                text: `ברגע שתהפוך את התור בשעה ${time} זה לזמין לא תהיה לך את האפשרות להחזיר את פרטי המשתמש שסגר את התור בשעה זו`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
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
          }
        })
    } else if (!avilable && isPaid) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: `${time}<br/></i> <span id='Tafusss'>שולם</span>`,

          html: `<div id='IdForPaydContent'> שולם על ידי <h4 id='Tafusss' style=display:inline>${
            mistaper.name
          }</h4><br/>
         ${
           paymentMethod === 'cash'
             ? ' באמצעות <h4 id="Tafusss" style=display:inline>מזומן</h4><br/>'
             : ''
         } 
         ${
           paymentMethod === 'bit'
             ? ' באמצעות העברה <h4 id="Tafusss" style=display:inline>בביט</h4><br/>'
             : ''
         }
         ${
           paymentMethod === 'credit'
             ? ' באמצעות <h4 id="Tafusss" style=display:inline>כרטיס אשראי</h4><br/>'
             : ''
         }
         ${
           paymentMethod === 'credit'
             ? `  הנגמר בספרות <h4 id="Tafusss" style='display:inline'>${creditLastDigits}</h4><br/> `
             : ''
         }
הסכום ששולם  : <h4 id="Tafusss" style='display:inline'>${TotalAmmountPaid}₪</h4> <br/>  מספר חשבונית : <h4 id="Tafusss" style='display:inline'>${ReciptNumber}</h4> <div id='IdForTafusContent'>  
          </div></div>`,

          imageUrl: clock.mistaper.image,
          imageWidth: 180,
          imageHeight: 180,
          imageAlt: 'לקוח',
          color: 'green',

          showCancelButton: true,
          cancelButtonText: 'צא',
          cancelButtonColor: 'rgb(0, 0, 0)',
          showConfirmButton: afterdate || CheckIfClockPassed ? false : true,
          confirmButtonColor: 'rgb(194, 0, 0)',
          confirmButtonText: 'ביטול תשלום',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            makeClockUnpaidHandler(id, time, date)
          }
        })
    } else if (avilable === true && !afterdate) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: `<b><span id='span431256'>${time}</span></b><br/><span id='panuyyyy'>פנוי</span>`,
          text: `התור בשעה ${time} בתאריך  ${date}  פנוי כרגע`,
          imageUrl: 'https://i.ibb.co/YyNg2CQ/user-no-avilable.gif',
          imageWidth: 130,
          imageHeight: 115,
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
            dispatch(TREATMENTSListAction(BusinessId))
            setChoosenClockTIME(time)
            setSHOWchooseTipul(true)
            CHOOSEB()
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

  //****מחזיר את הזמן עכשיו ומוסיף קלאס מתאים כחול מהבהב */
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

  let returnClassNameForCheckedTR = (avilable) => {
    if (!avilable) {
      return 'green'
    } else {
      return 'red'
    }
  }

  const returnClassNameForCheckedTRFUNCTION = (id, avilable) => {
    let magenicVendor = ArrayOfSelectedTors.find(
      (vendor) => vendor['id'] === id
    )
    if (!magenicVendor) {
      const result = ''
      console.log(result)
      if (avilable) {
        return 'red'
      } else {
        return 'green'
      }
    } else {
      if (avilable) {
        const result = 'checkboxcheckcolorblueandRed'
        return `red` + ' ' + result
      } else {
        return `green` + ' ' + 'checkboxcheckcolorblueandGreen'
      }
    }
  }

  const fixOptionsDiv = () => {
    const OptionsDiv = document.getElementById('test1234')

    if (window.scrollY > 260) {
      setValueScroll('activeScrollForOptionsDiv')
      setValueForArrowUP('arrowUp')
    } else {
      setValueScroll('whitemeForActionsBig')
      setValueForArrowUP('arrowUPdontDisplay')
    }
  }

  const resetSelctorForTipulnextHoursavilable = () => {
    setdisplay3(false)
    setdisplay2andhalf(false)
    setdisplay2(false)
    setdisplay1andhalf(false)
    setdisplay1(false)
    setdisplayhalf(false)
    setArr([])
    setArrforhour([])
    setArrarrforhourandhalf([])
    setArrarrfor2hours([])
    setArrarrfor2hoursandhalf([])
    setArrarrfor3hours([])
  }

  // ██╗   ██╗███████╗███████╗    ███████╗███████╗███████╗███████╗ ██████╗████████╗
  // ██║   ██║██╔════╝██╔════╝    ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
  // ██║   ██║███████╗█████╗      █████╗  █████╗  █████╗  █████╗  ██║        ██║
  // ██║   ██║╚════██║██╔══╝      ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
  // ╚██████╔╝███████║███████╗    ███████╗██║     ██║     ███████╗╚██████╗   ██║
  //  ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝

  //USE EFFECT  for scrolling options on side
  useEffect(() => {
    window.addEventListener('scroll', fixOptionsDiv)
  }, [])

  useEffect(() => {
    if (errorConfirm) {
      dispatch({ type: CONFIRM_TOR_RESET })

      Swal.fire({
        cancelButtonColor: 'rgb(194, 0, 0)',
        confirmButtonColor: 'rgb(3, 148, 39)',
        icon: 'error',
        title: `שגיאה`,
        text: `סוג טיפול זה דורש ${
          TipulTime == 60
            ? 'שעה'
            : TipulTime == 90
            ? 'שעה וחצי'
            : TipulTime == 120
            ? 'שעתיים'
            : TipulTime == 150
            ? 'שעתיים וחצי'
            : TipulTime == 180
            ? 'שלוש שעות'
            : 'יותר מחצי שעה'
        }  אנא וודא שאתה מוסיף תורים פנויים למערכת על מנת לבצע  שיבוץ של תור זה `,
        confirmButtonColor: '#d33',
        confirmButtonText: 'הוסף תורים',
      }).then((result) => {
        if (result.isConfirmed) {
          swalADDfunction()
        }
      })
    }
  }, [errorConfirm])

  useEffect(() => {
    if (TipulTime != '') console.log(`tipul time is change to :${TipulTime}`)
  }, [TipulTime])

  useEffect(() => {
    if (display3) {
      console.log(`the next 3hpurs is avilable`)
    } else if (display2andhalf) {
      console.log(`the next 2 and half is avilable`)
    } else if (display2) {
      console.log(`the next 2  is avilable`)
    } else if (display1andhalf) {
      console.log(`the next 1 and half  is avilable`)
    } else if (display1) {
      console.log(`the next 1   is avilable`)
    } else if (displayhalf) {
      console.log(`the next half    is avilable`)
    }
  }, [
    display3,
    display2andhalf,
    display2,
    display1andhalf,
    display1,
    displayhalf,
  ])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(WorkingDayTors(WorkDayid))
      dispatch(ReciptForThisWorkingDay(WorkDayid))
      dispatch(TREATMENTSListAction(BusinessId))

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
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${wordphone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${wordphone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then((result) => {
          if (result.isConfirmed) {
            setdisplay3(false)
            setdisplay2andhalf(false)
            setdisplay2(false)
            setdisplay1andhalf(false)
            setdisplay1(false)
            setdisplayhalf(false)
            dispatch(confirmTor(ChoosenClock, word, TipulId))
          }
        })
      }
      if (ClockMADEsuccess === true || clockssuccess === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'הפעולה התבצעה בהצלחה',
          text: '!התור/ים שביקשת להוסיף נכנסו למערכת בהצלחה',
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

    if (DeletesuccessWorkday) {
      history.push('/admin/torim')
    }
    if (StateForSwalDeleteingAllAVILABLEtorim) {
      swalsucsses1()
      setStateForSwalDeleteingAllAVILABLEtorim(false)
    }

    if (DeleteAllClockssuccess) {
      dispatch(WorkingDayTors(WorkDayid))
      dispatch(ReciptForThisWorkingDay(WorkDayid))
      dispatch(TREATMENTSListAction(BusinessId))
      dispatch(workingDayDetails(WorkDayid))
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
    DeletesuccessWorkday,
    DeleteAllClockssuccess,
  ])

  //USE EFFECT  FOR RECIPT CREATING-IF PAST? - STATUS
  useEffect(() => {
    if (workingDay) {
      if (
        (year === workingDay.Dateyear &&
          month === workingDay.Datemonth &&
          day > workingDay.Dateday) ||
        year > workingDay.Dateyear ||
        (year === workingDay.Dateyear && month > workingDay.Datemonth)
      ) {
        console.log(`SetAfterdate TRUE`)
        SetAfterdate(true)
      } else {
        console.log(`SetAfterdate FALSE`)
        SetAfterdate(false)
      }
      if (
        year === workingDay.Dateyear &&
        month === workingDay.Datemonth &&
        day === workingDay.Dateday
      ) {
        setSameDay(true)
      } else {
        setSameDay(false)
      }
    }
  }, [workingDay])

  //USE EFFECT  tipulim list display
  useEffect(() => {
    if (tipulimList) {
      let arr = []
      let arrforhour = []
      let arrforhourandhalf = []
      let arrfor2hours = []
      let arrfor2hoursandhalf = []
      let arrfor3hours = []

      for (let tipul of tipulimList) {
        if (tipul.time == 30) {
          arr.push(tipul)
        } else if (tipul.time == 30 || tipul.time == 60) {
          arrforhour.push(tipul)
        } else if (tipul.time == 30 || tipul.time == 60 || tipul.time == 90) {
          arrforhourandhalf.push(tipul)
        } else if (
          tipul.time == 30 ||
          tipul.time == 60 ||
          tipul.time == 90 ||
          tipul.time == 120
        ) {
          arrfor2hours.push(tipul)
        } else if (
          tipul.time == 30 ||
          tipul.time == 60 ||
          tipul.time == 90 ||
          tipul.time == 120 ||
          tipul.time == 150
        ) {
          arrfor2hoursandhalf.push(tipul)
        } else if (
          tipul.time == 30 ||
          tipul.time == 60 ||
          tipul.time == 90 ||
          tipul.time == 120 ||
          tipul.time == 150 ||
          tipul.time == 180
        ) {
          arrfor3hours.push(tipul)
        }
      }
      console.log(arr)
      setArr(arr)
      console.log(Arr)

      setArrforhour(arrforhour)
      setArrarrforhourandhalf(arrforhourandhalf)
      setArrarrfor2hours(arrfor2hours)
      setArrarrfor2hoursandhalf(arrfor2hoursandhalf)
      setArrarrfor3hours(arrfor3hours)
    }
  }, [tipulimList])

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
          imageUrl: 'https://i.ibb.co/vsqqsZ7/output-onlinegiftools-9.gif',
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
              imageUrl: 'https://i.ibb.co/b17PkwC/output-onlinegiftools-10.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
          )
      } else if (result.isDenied) {
        Swal.fire({
          title: `הזן כתובת אימייל`,
          text: `מה האימייל שאליו תרצה לשלח את הד"וח היומי לתאריך ${workingDay.date}`,
          imageUrl: 'https://i.ibb.co/808cMrj/animation-500-kykfz3p2.gif',
          imageWidth: 200,
          imageHeight: 200,
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
              imageUrl: 'https://i.ibb.co/b17PkwC/output-onlinegiftools-10.gif',
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

  const setSHOWsmallSCreenPick2_OPEN = () => {
    setSHOWsmallSCreenPick2HoursForCREATEION(true)
  }
  const setSHOWsmallSCreenPick2_CLOSE = () => {
    setSHOWsmallSCreenPick2HoursForCREATEION(false)
  }

  const setSHOWsmallSCreenPick1_OPEN = () => {
    setSHOWsmallSCreenPick1HoursForCREATEION(true)
  }
  const setSHOWsmallSCreenPick1_CLOSE = () => {
    setSHOWsmallSCreenPick1HoursForCREATEION(false)
  }

  // ██████╗ ███████╗████████╗██╗   ██╗██████╗ ███╗   ██╗
  // ██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔══██╗████╗  ██║
  // ██████╔╝█████╗     ██║   ██║   ██║██████╔╝██╔██╗ ██║
  // ██╔══██╗██╔══╝     ██║   ██║   ██║██╔══██╗██║╚██╗██║
  // ██║  ██║███████╗   ██║   ╚██████╔╝██║  ██║██║ ╚████║
  // ╚═╝  ╚═╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝

  //Voice Listner
  // <Col md={12}>
  //   <Route
  //     render={({ history }) => (
  //       <Speech history={history} match={match} tipulimList={tipulimList} />
  //     )}
  //   />
  // </Col>
  // <Col md={12}>
  //   <Link id='goback' onClick={() => history.goBack()}>
  //     <i className='fas fa-angle-double-right'></i>
  //   </Link>
  // </Col>
  return (
    <Row>
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
          {(SHOW_TH_CHHOSE &&
            stateChecked &&
            TehreIsSomeClocksNotPassedTime_Function()) ||
          (SHOW_TH_CHHOSE &&
            select_OneTor &&
            TehreIsSomeClocksNotPassedTime_Function()) ? (
            <div onClick={ARE_U_sure_delete_selected} id='DELETE_cirecle'>
              <span id='trash_iconXXX'>
                <i class='fas fa-trash'></i>
              </span>
            </div>
          ) : (
            <div id='displaynonePlease'></div>
          )}
          {SHOW_TH_CHHOSE &&
          StateForPinuiBTN &&
          ArrayOfSelectedTors.length != 0 ? (
            <div onClick={ARE_U_sure_PINUI_selected} id='PINUI_cirecle'>
              <span id='PINUI_iconXXX'>פינוי</span>
            </div>
          ) : (
            <div></div>
          )}

          {ShowUserFilter && (
            <UserFilter
              Bussines_ID={BusinessId}
              close={() => setShowUserFilter(false)}
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

          {SHOWsmallSCreenPick1HoursForCREATEION && (
            <Modal
              id='ModalStyle'
              open={setSHOWsmallSCreenPick1_OPEN}
              close={setSHOWsmallSCreenPick1_CLOSE}
            >
              <Box id='BOXlStyleForChooseTipul'>
                <div id='reciptcloseNav'>
                  <button
                    onClick={setSHOWsmallSCreenPick1_CLOSE}
                    id='reciptcloseNavX'
                  >
                    X
                  </button>
                  <div>
                    <Col md={12}>
                      <h1 id='h1SugTipul'>בחר טווח שעות</h1>
                    </Col>
                    <Col md={12}>
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
                    </Col>
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {SHOWsmallSCreenPick2HoursForCREATEION && (
            <Modal
              id='ModalStyle'
              open={setSHOWsmallSCreenPick2_OPEN}
              close={setSHOWsmallSCreenPick2_CLOSE}
            >
              <Box id='BOXlStyleForChooseTipul'>
                <div id='reciptcloseNav'>
                  <button
                    onClick={setSHOWsmallSCreenPick2_CLOSE}
                    id='reciptcloseNavX'
                  >
                    X
                  </button>
                  <div>
                    <Col md={12}>
                      <h1 id='h1SugTipul'>בחר טווח שעות</h1>
                    </Col>
                    <Col md={12}>
                      {' '}
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
                    </Col>
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {SHOWchooseTipul && (
            <Modal
              id='ModalStyle'
              open={setSHOWchooseTipul}
              onClose={() => {
                handleCloseShowChooseTipul()
              }}
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
                      <h2 id='h2SugTipul'>
                        לתור בשעה <span id='coloredme'>{ChoosenClockTIME}</span>
                      </h2>
                    </Col>
                    <Col md={12}>
                      <form ref={TipulRef} id='centeForm'>
                        <select
                          name='tipul'
                          id='tipulimCooseOptions'
                          onChange={CHOOSEA}
                        >
                          {Arr[0] &&
                            displayhalf && ( //map this***
                              <option
                                value={
                                  Arr[0] ? `${Arr[0]._id},${Arr[0].time}` : ''
                                }
                              >
                                {Arr[0] ? `${Arr[0].name}` : ''}
                              </option>
                            )}

                          {Arr[1] && displayhalf && (
                            <option
                              value={
                                Arr[1] ? `${Arr[1]._id},${Arr[1].time}` : ''
                              }
                            >
                              {Arr[1] ? Arr[1].name : ''}
                            </option>
                          )}
                          {Arr[2] && displayhalf && (
                            <option
                              value={
                                Arr[2] ? `${Arr[2]._id},${Arr[2].time}` : ''
                              }
                            >
                              {Arr[2] ? Arr[2].name : ''}
                            </option>
                          )}

                          {Arrforhour[0] && display1 && (
                            <option
                              value={
                                Arrforhour[0]
                                  ? `${Arrforhour[0]._id},${Arrforhour[0].time}`
                                  : ''
                              }
                            >
                              {Arrforhour[0] ? Arrforhour[0].name : ''}
                            </option>
                          )}
                          {Arrforhour[1] && display1 && (
                            <option
                              value={
                                Arrforhour[1]
                                  ? `${Arrforhour[1]._id},${Arrforhour[1].time}`
                                  : ''
                              }
                            >
                              {Arrforhour[1] ? Arrforhour[1].name : ''}
                            </option>
                          )}
                          {Arrforhour[2] && display1 && (
                            <option
                              value={
                                Arrforhour[2]
                                  ? `${Arrforhour[2]._id},${Arrforhour[2].time}`
                                  : ''
                              }
                            >
                              {Arrforhour[2] ? Arrforhour[2].name : ''}
                            </option>
                          )}
                          {Arrarrforhourandhalf[0] && display1andhalf && (
                            <option
                              value={
                                Arrarrforhourandhalf[0]
                                  ? `${Arrarrforhourandhalf[0]._id},${Arrarrforhourandhalf[0].time}`
                                  : ''
                              }
                            >
                              {Arrarrforhourandhalf[0]
                                ? Arrarrforhourandhalf[0].name
                                : ''}
                            </option>
                          )}
                          {Arrarrforhourandhalf[1] && display1andhalf && (
                            <option
                              value={
                                Arrarrforhourandhalf[1]
                                  ? `${Arrarrforhourandhalf[1]._id},${Arrarrforhourandhalf[1].time}`
                                  : ''
                              }
                            >
                              {Arrarrforhourandhalf[1]
                                ? Arrarrforhourandhalf[1].name
                                : ''}
                            </option>
                          )}
                          {Arrarrforhourandhalf[2] && display1andhalf && (
                            <option
                              value={
                                Arrarrforhourandhalf[2]
                                  ? `${Arrarrforhourandhalf[2]._id},${Arrarrforhourandhalf[2].time}`
                                  : ''
                              }
                            >
                              {Arrarrforhourandhalf[2]
                                ? Arrarrforhourandhalf[2].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor2hours[0] && display2 && (
                            <option
                              value={
                                Arrarrfor2hours[0]
                                  ? `${Arrarrfor2hours[0]._id},${Arrarrfor2hours[0].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor2hours[0]
                                ? Arrarrfor2hours[0].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor2hours[1] && display2 && (
                            <option
                              value={
                                Arrarrfor2hours[1]
                                  ? `${Arrarrfor2hours[1]._id},${Arrarrfor2hours[1].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor2hours[1]
                                ? Arrarrfor2hours[1].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor2hours[2] && display2 && (
                            <option
                              value={
                                Arrarrfor2hours[2]
                                  ? `${Arrarrfor2hours[2]._id},${Arrarrfor2hours[2].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor2hours[2]
                                ? Arrarrfor2hours[2].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor2hoursandhalf[0] && display2andhalf && (
                            <option
                              value={
                                Arrarrfor2hoursandhalf[0]
                                  ? `${Arrarrfor2hoursandhalf[0]._id},${Arrarrfor2hoursandhalf[0].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor2hoursandhalf[0]
                                ? Arrarrfor2hoursandhalf[0].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor2hoursandhalf[1] && display2andhalf && (
                            <option
                              value={
                                Arrarrfor2hoursandhalf[1]
                                  ? `${Arrarrfor2hoursandhalf[1]._id},${Arrarrfor2hoursandhalf[1].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor2hoursandhalf[1]
                                ? Arrarrfor2hoursandhalf[1].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor2hoursandhalf[2] && display2andhalf && (
                            <option
                              value={
                                Arrarrfor2hoursandhalf[2]
                                  ? `${Arrarrfor2hoursandhalf[2]._id},${Arrarrfor2hoursandhalf[2].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor2hoursandhalf[2]
                                ? Arrarrfor2hoursandhalf[2].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor3hours[0] && display3 && (
                            <option
                              value={
                                Arrarrfor3hours[0]
                                  ? `${Arrarrfor3hours[0]._id},${Arrarrfor3hours[0].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor3hours[0]
                                ? Arrarrfor3hours[0].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor3hours[1] && display3 && (
                            <option
                              value={
                                Arrarrfor3hours[1]
                                  ? `${Arrarrfor3hours[1]._id},${Arrarrfor3hours[1].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor3hours[1]
                                ? Arrarrfor3hours[1].name
                                : ''}
                            </option>
                          )}
                          {Arrarrfor3hours[2] && display3 && (
                            <option
                              value={
                                Arrarrfor3hours[2]
                                  ? `${Arrarrfor3hours[2]._id},${Arrarrfor3hours[2].time}`
                                  : ''
                              }
                            >
                              {Arrarrfor3hours[2]
                                ? Arrarrfor3hours[2].name
                                : ''}
                            </option>
                          )}
                        </select>
                        <div id='tipultimesmallsstyle'>
                          <span>
                            {' '}
                            {TipulTime == 30
                              ? 'חצי שעה'
                              : TipulTime == 60
                              ? 'שעה'
                              : TipulTime == 90
                              ? 'שעה וחצי'
                              : TipulTime == 120
                              ? 'שעתיים'
                              : TipulTime == 150
                              ? 'שעתיים וחצי'
                              : TipulTime == 180
                              ? '3 שעות'
                              : ''}
                          </span>
                        </div>
                        <Button
                          className='ChhoseTipuliBTN'
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
          <div onClick={OpenSmallScreenOptions_Swal} id='SMALL_SCREEN_ACTIONS'>
            <div id='actionsSmallScreen'>
              {' '}
              <div id='actions123123div'>
                {' '}
                <span id='thePlusIcon'>+ פעולות</span>
              </div>
            </div>
          </div>

          <Col md={12}>
            <div id='smallSicumScreen'>
              {!afterdate ? (
                <div>
                  <div
                    onClick={swalDeleteChoose}
                    className='OPTIONS-BTN-DELETE'
                  >
                    <i id='plustrash' class='fas fa-trash'></i>
                  </div>
                  <div onClick={swalADDfunction} className='OPTIONS-BTN-HOSEF'>
                    <i id='plusplus' class='fas fa-plus'></i>
                  </div>{' '}
                  <div
                    onClick={setSHOW_TH_CHHOSE_FUNCTION}
                    className='CHOOSETORIM_BTNForSmallScreen'
                  >
                    בחר
                  </div>{' '}
                  <div
                    onClick={showSicumNow}
                    className='bigSicumBTNForSmallScreen'
                  >
                    סיכום
                  </div>{' '}
                </div>
              ) : (
                <></>
              )}
              <div
                onClick={showFilterForSmallScreenFunction}
                className='SINUN-BTN'
              >
                <i class='fas fa-filter'></i> סינון
              </div>{' '}
              {showFilterForSmallScreen && (
                <div>
                  <div
                    onClick={setSHOWAllToirmForTodayFUNCTION}
                    className='SINUN-BTN-ALL'
                  >
                    <i class='fas fa-filter'></i> הכל
                  </div>{' '}
                  <div
                    onClick={setSHOWonlyAvilableFUNCTION}
                    className='SINUN-BTN-AVILABLE'
                  >
                    <span id='coloredmePlease'>
                      {' '}
                      <i class='fas fa-circle'></i>{' '}
                    </span>
                    פנוי{' '}
                  </div>{' '}
                  <div
                    onClick={setSHOWonlyNotAvilableFUNCTION}
                    className='SINUN-BTN-NOT-AVILABLE'
                  >
                    <span id='colorgreenme'>
                      {' '}
                      <i class='fas fa-circle'></i>{' '}
                    </span>
                    תפוס
                  </div>{' '}
                  <div
                    onClick={setSHOWonlyPaydFUNCTION}
                    className='SINUN-BTN-PAYD'
                  >
                    <span id='colorgreenme'>
                      {' '}
                      <i class='fas fa-money-bill-wave'></i>
                    </span>
                    שולם
                  </div>{' '}
                </div>
              )}
              <div className='text-update'>
                <NewsTicker
                  id='styleNoBULLETS'
                  rowHeight={12}
                  maxRows={2}
                  speed={300}
                  duration={2500}
                  autoStart={true}
                  pauseOnHover={true}
                >
                  <div id='styleNoBULLETS'>
                    <span id='boldme1'> {PredictedIncome()}₪</span> הכנסה צפויה{' '}
                  </div>
                  <div>
                    {' '}
                    <span id='boldme1'>{workingDay.moneyCount}₪</span> הכנסה
                    בפועל{' '}
                  </div>
                  <div>
                    <span id='boldme1'>{clockList.length}</span> תורים סה"כ{' '}
                  </div>
                  <div>
                    {' '}
                    <span id='boldme1'>
                      {
                        clockList.filter((clock) => clock.avilable === true)
                          .length
                      }{' '}
                    </span>{' '}
                    תורים פנויים{' '}
                  </div>
                </NewsTicker>
              </div>
            </div>
          </Col>
          <Col md={2} id='singlewirkingdayoptionsbgwhite'>
            <div className={ValueScroll}>
              <img
                className='arrowaUp'
                onClick={FixUP}
                id={ValueForArrowUP}
                src='https://i.ibb.co/Xtr67DT/ezgif-com-gif-maker-1.gif'
              />
              <div>
                <div id='centerme'>
                  <div id='block'>
                    <h5 id='block' className='whitemeandrightaligen'>
                      {' '}
                      <span id='boldme'>{clockList.length}</span>
                      תורים סה"כ
                    </h5>
                    <h5 id='block' className='whitemeandrightaligen'>
                      {' '}
                      <span id='boldme'>
                        {clockList.length -
                          clockList.filter((clock) => clock.avilable === true)
                            .length}
                      </span>
                      תורים תפוסים{' '}
                    </h5>

                    <h5 id='block' className='whitemeandrightaligen'>
                      {' '}
                      <span id='boldmered'>
                        {
                          clockList.filter((clock) => clock.avilable === true)
                            .length
                        }
                      </span>{' '}
                      תורים פנויים
                    </h5>

                    <h5 id='block' className='whitemeandrightaligen'>
                      <span id='boldme'> {PredictedIncome()}₪</span> הכנסה צפויה
                    </h5>
                    <h5 id='block' className='whitemeandrightaligen'>
                      <span id='boldme'>{workingDay.moneyCount}₪</span> הכנסה
                      בפועל{' '}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {SHOWAllToirmForToday && (
            <Col md={10}>
              <div>
                <Table bordered hover responsive id='tablewhiteSingle'>
                  <thead id='centertext'>
                    <tr>
                      <th id='tableheadlines' className='Payd_TH'>
                        שולם
                      </th>
                      <th id='tableheadlines' className='PRICE_TH'>
                        מחיר
                      </th>
                      <th id='tableheadlines' className='TIPUL_TH'>
                        טיפול
                      </th>
                      <th id='tableheadlines' className='CLIENT_TH'>
                        לקוח/ה
                      </th>
                      <th id='tableheadlines' className='hour_TH'>
                        שעה
                      </th>
                      <th
                        id={`${
                          SHOW_TH_CHHOSE
                            ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                            : 'tableTHdisplayNoneCHOOSE'
                        }`}
                        className='classFOrTHdisplay'
                      >
                        <form>
                          <input
                            id='checkbox'
                            onClick={selectAllTors}
                            type='checkbox'
                            checked={stateChecked}
                          ></input>
                        </form>{' '}
                      </th>
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
                          className={
                            SHOW_TH_CHHOSE
                              ? `${returnClassNameForCheckedTRFUNCTION(
                                  clock._id,
                                  clock.avilable
                                )}`
                              : `${returnClassNameForCheckedTR(clock.avilable)}`
                          }
                          id={FunctionBlingThisTime(clock.time)}
                        >
                          <td>
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
                            ) : clock.isPaid &&
                              clock.paymentMethod === 'bit' ? (
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
                          <td
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
                                clock.ReciptNumber,
                                clock
                              )
                            }}
                          >
                            {clock.tipul ? clock.tipul.cost : ''}
                          </td>
                          <td
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
                                clock.ReciptNumber,
                                clock
                              )
                            }}
                          >
                            {clock.tipul ? clock.tipul.name : ''}
                          </td>

                          <td
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
                                clock.ReciptNumber,
                                clock
                              )
                            }}
                          >
                            {clock.mistaper && clock.mistaper.name}
                            <br />
                            <div id='phonetable'>
                              {' '}
                              {clock.mistaper && '0' + clock.mistaper.phone}
                            </div>
                          </td>
                          <td
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
                                clock.ReciptNumber,
                                clock
                              )
                            }}
                          >
                            {clock.time}
                          </td>

                          {!CheckIfTimePassed(clock.time) ? (
                            <td
                              id={`${
                                SHOW_TH_CHHOSE
                                  ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                                  : 'tableTHdisplayNoneCHOOSE'
                              }`}
                              className='classFOrTHdisplay2'
                            >
                              <form>
                                <input
                                  onClick={() =>
                                    selectOneTor(
                                      clock._id,
                                      clock.avilable,
                                      clock.mistaper
                                    )
                                  }
                                  type='checkbox'
                                  id='checkbox'
                                  aria-checked='false'
                                  className='checkboxxx'
                                  value={clock._id}
                                  data-valuetwo={clock._id}
                                  data-value33={clock.avilable}
                                ></input>
                              </form>{' '}
                            </td>
                          ) : (
                            <></>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          )}

          {SHOWonlyAvilable && (
            <Col md={10}>
              <div>
                <Table bordered hover responsive id='tablewhiteSingle'>
                  <thead id='centertext'>
                    <tr>
                      <th id='tableheadlines' className='Payd_TH'>
                        שולם
                      </th>
                      <th id='tableheadlines' className='PRICE_TH'>
                        מחיר
                      </th>
                      <th id='tableheadlines' className='TIPUL_TH'>
                        טיפול
                      </th>
                      <th id='tableheadlines' className='CLIENT_TH'>
                        לקוח/ה
                      </th>
                      <th id='tableheadlines' className='hour_TH'>
                        שעה
                      </th>
                      <th
                        id={`${
                          SHOW_TH_CHHOSE
                            ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                            : 'tableTHdisplayNoneCHOOSE'
                        }`}
                        className='classFOrTHdisplay'
                      >
                        <form>
                          <input
                            id='checkbox'
                            onClick={selectAllTors}
                            type='checkbox'
                            checked={stateChecked}
                          ></input>
                        </form>{' '}
                      </th>
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

                      .map((clock) =>
                        clock.avilable ? (
                          <tr
                            key={clock._id}
                            className={
                              SHOW_TH_CHHOSE
                                ? `${returnClassNameForCheckedTRFUNCTION(
                                    clock._id,
                                    clock.avilable
                                  )}`
                                : `${returnClassNameForCheckedTR(
                                    clock.avilable
                                  )}`
                            }
                            id={FunctionBlingThisTime(clock.time)}
                          >
                            <td>
                              {clock.isPaid &&
                              clock.paymentMethod === 'cash' ? (
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
                              ) : clock.isPaid &&
                                clock.paymentMethod === 'bit' ? (
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
                                    <p
                                      style={{ fontSize: '25px', color: 'red' }}
                                    >
                                      x
                                    </p>
                                  </button>
                                )
                              )}
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.tipul ? clock.tipul.cost : ''}
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.tipul ? clock.tipul.name : ''}
                            </td>

                            <td
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
                              {clock.mistaper && clock.mistaper.name}
                              <br />
                              <div id='phonetable'>
                                {' '}
                                {clock.mistaper && '0' + clock.mistaper.phone}
                              </div>
                            </td>
                            <td
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
                              {clock.time}
                            </td>
                            <td
                              id={`${
                                SHOW_TH_CHHOSE
                                  ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                                  : 'tableTHdisplayNoneCHOOSE'
                              }`}
                              className='classFOrTHdisplay2'
                            >
                              <form>
                                <input
                                  onClick={() =>
                                    selectOneTor(
                                      clock._id,
                                      clock.avilable,
                                      clock.mistaper
                                    )
                                  }
                                  type='checkbox'
                                  id='checkbox'
                                  aria-checked='false'
                                  className='checkboxxx'
                                  value={clock._id}
                                  data-valuetwo={clock._id}
                                  data-value33={clock.avilable}
                                ></input>
                              </form>{' '}
                            </td>
                          </tr>
                        ) : (
                          <div id='displaynonePlease'></div>
                        )
                      )}
                  </tbody>
                </Table>
              </div>
            </Col>
          )}
          {SHOWonlyNotAvilable && (
            <Col md={10}>
              <div>
                <Table bordered hover responsive id='tablewhiteSingle'>
                  <thead id='centertext'>
                    <tr>
                      <th id='tableheadlines' className='Payd_TH'>
                        שולם
                      </th>
                      <th id='tableheadlines' className='PRICE_TH'>
                        מחיר
                      </th>
                      <th id='tableheadlines' className='TIPUL_TH'>
                        טיפול
                      </th>
                      <th id='tableheadlines' className='CLIENT_TH'>
                        לקוח/ה
                      </th>
                      <th id='tableheadlines' className='hour_TH'>
                        שעה
                      </th>
                      <th
                        id={`${
                          SHOW_TH_CHHOSE
                            ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                            : 'tableTHdisplayNoneCHOOSE'
                        }`}
                        className='classFOrTHdisplay'
                      >
                        <form>
                          <input
                            id='checkbox'
                            onClick={selectAllTors}
                            type='checkbox'
                            checked={stateChecked}
                          ></input>
                        </form>{' '}
                      </th>
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

                      .map((clock) =>
                        !clock.avilable ? (
                          <tr
                            key={clock._id}
                            className={
                              SHOW_TH_CHHOSE
                                ? `${returnClassNameForCheckedTRFUNCTION(
                                    clock._id,
                                    clock.avilable
                                  )}`
                                : `${returnClassNameForCheckedTR(
                                    clock.avilable
                                  )}`
                            }
                            id={FunctionBlingThisTime(clock.time)}
                          >
                            <td>
                              {clock.isPaid &&
                              clock.paymentMethod === 'cash' ? (
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
                              ) : clock.isPaid &&
                                clock.paymentMethod === 'bit' ? (
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
                                    <p
                                      style={{ fontSize: '25px', color: 'red' }}
                                    >
                                      x
                                    </p>
                                  </button>
                                )
                              )}
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.tipul ? clock.tipul.cost : ''}
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.tipul ? clock.tipul.name : ''}
                            </td>

                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.mistaper && clock.mistaper.name}
                              <br />
                              <div id='phonetable'>
                                {' '}
                                {clock.mistaper && '0' + clock.mistaper.phone}
                              </div>
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.time}
                            </td>
                            <td
                              id={`${
                                SHOW_TH_CHHOSE
                                  ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                                  : 'tableTHdisplayNoneCHOOSE'
                              }`}
                              className='classFOrTHdisplay2'
                            >
                              <form>
                                <input
                                  onClick={() =>
                                    selectOneTor(
                                      clock._id,
                                      clock.avilable,
                                      clock.mistaper
                                    )
                                  }
                                  type='checkbox'
                                  id='checkbox'
                                  aria-checked='false'
                                  className='checkboxxx'
                                  value={clock._id}
                                  data-valuetwo={clock._id}
                                  data-value33={clock.avilable}
                                ></input>
                              </form>{' '}
                            </td>
                          </tr>
                        ) : (
                          <div id='displaynonePlease'></div>
                        )
                      )}
                  </tbody>
                </Table>
              </div>
            </Col>
          )}
          {SHOWonlyPayd && (
            <Col md={10}>
              <div>
                <Table bordered hover responsive id='tablewhiteSingle'>
                  <thead id='centertext'>
                    <tr>
                      <th id='tableheadlines' className='Payd_TH'>
                        שולם
                      </th>
                      <th id='tableheadlines' className='PRICE_TH'>
                        מחיר
                      </th>
                      <th id='tableheadlines' className='TIPUL_TH'>
                        טיפול
                      </th>
                      <th id='tableheadlines' className='CLIENT_TH'>
                        לקוח/ה
                      </th>
                      <th id='tableheadlines' className='hour_TH'>
                        שעה
                      </th>
                      <th
                        id={`${
                          SHOW_TH_CHHOSE
                            ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                            : 'tableTHdisplayNoneCHOOSE'
                        }`}
                        className='classFOrTHdisplay'
                      >
                        <form>
                          <input
                            id='checkbox'
                            onClick={selectAllTors}
                            type='checkbox'
                            checked={stateChecked}
                          ></input>
                        </form>{' '}
                      </th>
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

                      .map((clock) =>
                        !clock.avilable && clock.isPaid ? (
                          <tr
                            key={clock._id}
                            className={
                              SHOW_TH_CHHOSE
                                ? `${returnClassNameForCheckedTRFUNCTION(
                                    clock._id,
                                    clock.avilable
                                  )}`
                                : `${returnClassNameForCheckedTR(
                                    clock.avilable
                                  )}`
                            }
                            id={FunctionBlingThisTime(clock.time)}
                          >
                            <td>
                              {clock.isPaid &&
                              clock.paymentMethod === 'cash' ? (
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
                              ) : clock.isPaid &&
                                clock.paymentMethod === 'bit' ? (
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
                                    <p
                                      style={{ fontSize: '25px', color: 'red' }}
                                    >
                                      x
                                    </p>
                                  </button>
                                )
                              )}
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.tipul ? clock.tipul.cost : ''}
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.tipul ? clock.tipul.name : ''}
                            </td>

                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.mistaper && clock.mistaper.name}
                              <br />
                              <div id='phonetable'>
                                {' '}
                                {clock.mistaper && '0' + clock.mistaper.phone}
                              </div>
                            </td>
                            <td
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
                                  clock.ReciptNumber,
                                  clock
                                )
                              }}
                            >
                              {clock.time}
                            </td>
                            <td
                              id={`${
                                SHOW_TH_CHHOSE
                                  ? 'tableTHdisplayNoneCHOOSEDISPLAY'
                                  : 'tableTHdisplayNoneCHOOSE'
                              }`}
                              className='classFOrTHdisplay2'
                            >
                              <form>
                                <input
                                  onClick={() =>
                                    selectOneTor(
                                      clock._id,
                                      clock.avilable,
                                      clock.mistaper
                                    )
                                  }
                                  type='checkbox'
                                  id='checkbox'
                                  aria-checked='false'
                                  className='checkboxxx'
                                  value={clock._id}
                                  data-valuetwo={clock._id}
                                  data-value33={clock.avilable}
                                ></input>
                              </form>{' '}
                            </td>
                          </tr>
                        ) : (
                          <div id='displaynonePlease'></div>
                        )
                      )}
                  </tbody>
                </Table>
              </div>
            </Col>
          )}

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

export default AdminSingleWorkDay

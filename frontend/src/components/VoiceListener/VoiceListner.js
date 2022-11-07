//************backyp voicelistener 3:00*****/**

'use strict'
import Swal from 'sweetalert2'
import './VoiceListner.css'
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UserFIlterMakeTorVoiceControll from '../Filters/UserFIlterMakeTorVoiceControll'
import { useDispatch, useSelector } from 'react-redux'
import {
  listOneWorkingDay,
  listWorkingDaysFORthisWEEK,
  getTomorrowWorkday,
  SearchOneUserAction,
  FindClockByWorkID_and_time,
  confirmTor,
  WorkingDayTors,
  deleteAvilableClocks,
  SugeiTipulimAction,
  List_of_Potential_Users_By_FirstNameActionSearch,
  registerByADMIN,
  nextSevenDays,
  Next7Daysss,
} from '../../actions/userActions'
import {
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_RESET,
  USER_REGISTERByADMIN_RESET,
  ONE_WORKING_DAY_RESET,
  TOMORROW_WORKING_DAY_RESET,
  ONE_USER_SEARCH_RESET,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET,
  CONFIRM_TOR_RESET,
} from '../../constants/userConstants'
import audio from './wateDropSound.wav'
import daysArr from './KeyWords/daysArr'
import LeMaharArr from './KeyWords/LeMaharArr'
import inShahaArr from './KeyWords/inShahaArr'
import LeHaiomArr from './KeyWords/LeHaiomArr'
import KevaArr from './KeyWords/KevaArr'
import TorArr from './KeyWords/TorArr'
import TorimArr from './KeyWords/TorimArr'
import zminimArr from './KeyWords/zminimArr'
import HOURconfigrator from './HOURconfigrator'
import AvilableBox from '../AvilableBox'

//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'he'

//------------------------COMPONENT-----------------------------
const Speech = ({ history, match, tipulimList }) => {
  const dispatch = useDispatch()
  const AdminRegister = useSelector((state) => state.AdminRegister)
  const {
    success: newUserSuccess,
    userInfo: newUserInfo,
    error: newUserCreateByadminError,
  } = AdminRegister

  const ListworkingDayForNEXT7days = useSelector(
    (state) => state.ListworkingDayForNEXT7days
  )
  const {
    sevendaysloading,
    sevendaysworkingdays,
    sevendayssuccess,
    sevendayserror,
  } = ListworkingDayForNEXT7days

  const Tors = useSelector((state) => state.Tors)
  const { loading, error, clockList, Torssuccess } = Tors
  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const {
    success: confirmsuccess,
    confirm,
    loadingConfirm,
    errorConfirm,
    CONFIRM_TORsuccess,
  } = confirmMyTor

  const Potential_Users_By_FirstName = useSelector(
    (state) => state.Potential_Users_By_FirstName
  )
  const { list, listloading, listerror, listsuccess } =
    Potential_Users_By_FirstName

  const ONE_WORKING_DAY = useSelector((state) => state.ONE_WORKING_DAY)
  const { onesuccess, oneworkingdays } = ONE_WORKING_DAY

  const TomorrowworkingDay = useSelector((state) => state.TomorrowworkingDay)
  const {
    tomorrowloading,
    tomorrowworkingdays,
    tomorrowsuccess,
    tomorrowerror,
  } = TomorrowworkingDay

  const LIST_WORK_DAYS_WEEK = useSelector((state) => state.LIST_WORK_DAYS_WEEK)
  const { weekloading, weekworkingdays, weeksuccess, weekerror } =
    LIST_WORK_DAYS_WEEK

  const SearchOneUser = useSelector((state) => state.SearchOneUser)
  const { loadinguserfound, userfound, successuserfound, erroruserfound } =
    SearchOneUser

  const FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME = useSelector(
    (state) => state.FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME
  )
  const { loadingclockFound, clockFound, successclockFound, errorclockFound } =
    FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME

  const [listening, setlistening] = useState(false)
  const [ShowIfNotFoundByVoiceUsers, setShowIfNotFoundByVoiceUsers] =
    useState(false)

  const [ShowConfirmAfterListUser, setShowConfirmAfterListUser] =
    useState(false)
  const [IM_IN_A_SPESIFIC_WORKING_DAY, setIM_IN_A_SPESIFIC_WORKING_DAY] =
    useState(false)
  const [ArrOFavilableClocksForToday, setArrOFavilableClocksForToday] =
    useState([])
  const [
    SHOWMEArrOFavilableClocksForToday,
    setSHOWMEArrOFavilableClocksForToday,
  ] = useState(false)
  const [IM_IN_A_ADMIN_TORS, setIM_IN_A_ADMIN_TORS] = useState(false)
  const [DayToFind, setDayToFind] = useState('')
  const [word, setWord] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [userImage, setuserImage] = useState('')
  const [StateForNewUserWindow, setStateForNewUserWindow] = useState(false)
  const [userToRegister, setuserToRegister] = useState('')
  const [NewUser_Situatuion, setNewUser_Situatuion] = useState(false)
  const [statefinalText, setstatefinalText] = useState('')
  const [redirectHome, setredirectHome] = useState(false)
  const [GoTorim, setGoTorim] = useState(false)
  const [GoToday, setGoToday] = useState(false)
  const [GoTOMORROW, setGoTOMORROW] = useState(false)
  const [Hour, SetHour] = useState('')
  const [username, setusername] = useState('')
  const [userid, setuserid] = useState('')
  const [userimage, setuserimage] = useState('')
  const [userphone, setuserphone] = useState('')
  const [WorkdayFound_ID, setWorkdayFound_ID] = useState('')
  const [WorkdayFound_DayINweek, setWorkdayFound_DayINweek] = useState('')
  const [ClockForNewUser, setClockForNewUser] = useState('')
  const [WorkdayFoundDay_DATE, setWorkdayFoundDay_DATE] = useState('')
  const [ForToday, setForToday] = useState(false)
  const [ForTomorow, setForTomorow] = useState(false)
  const [ForSpesisfic, setForSpesisfic] = useState(false)
  const [ForSpesisficRedirect, setForSpesisficRedirect] = useState(false)
  const [UserToFindX, setUserToFindX] = useState('')
  const [SHOWavilableTorimForToday, setSHOWavilableTorimForToday] =
    useState(false)
  const [isMouseDown, setisMouseDown] = useState(false)
  const [
    PushTOworkingdayAfterPinuiAvilableTorim,
    setPushTOworkingdayAfterPinuiAvilableTorim,
  ] = useState(false)
  const toggleListen = () => {
    setlistening(true)
    setisMouseDown(true)
    handleListen()
  }

  const toggleListenfalse = () => {
    setlistening(false)
    setisMouseDown(false)
    handleListen()
  }
  const toggleL = () => {
    if (!isMouseDown) {
      console.log('mouse is not down do nothing')
    } else {
      setlistening(false)
      setisMouseDown(true)
      handleListen()
    }
  }

  const FuncTionDeleteAllAvilableTors = () => {
    if (!clockList) {
      Swal.fire({
        position: 'top-end',
        cancelButtonColor: 'rgb(194, 0, 0)',
        confirmButtonColor: 'rgb(3, 148, 39)',
        icon: 'error',
        title: `לא נמצאו תורים זמינים להיום`,
        text: `לא נמצאו ביום עבודה זה תורים זמינים `,
        showConfirmButton: false,
        timer: 8000,
      })

      ResetFunction_Cancel_or_BACKdrop()
    } else {
      for (let clock of clockList) {
        if (clock.avilable) {
          dispatch(deleteAvilableClocks(oneworkingdays[0]._id, clock._id)).then(
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

        ResetFunction_Cancel_or_BACKdrop()
      }

      setPushTOworkingdayAfterPinuiAvilableTorim(true)
    }
  }
  const FuncTionDeleteAllAvilableTors2 = (lastItem) => {
    if (!clockList || clockList.length == 0) {
      Swal.fire({
        position: 'top-end',
        cancelButtonColor: 'rgb(194, 0, 0)',
        confirmButtonColor: 'rgb(3, 148, 39)',
        icon: 'error',
        title: `לא נמצאו תורים זמינים להיום`,
        text: `לא נמצאו ביום עבודה זה תורים זמינים `,
        showConfirmButton: false,
        timer: 8000,
      })

      ResetFunction_Cancel_or_BACKdrop()
    } else {
      for (let clock of clockList) {
        if (clock.avilable) {
          dispatch(deleteAvilableClocks(lastItem, clock._id)).then(
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

        ResetFunction_Cancel_or_BACKdrop()
      }

      setPushTOworkingdayAfterPinuiAvilableTorim(true)
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('succses')
        if (window.location.href.indexOf('torim') > -1) {
          alert('your url contains the name torim')
          await dispatch(listOneWorkingDay)
          await dispatch(WorkingDayTors(oneworkingdays[0]._id))
          await FuncTionDeleteAllAvilableTors()
        } else if (window.location.href.indexOf('workingday') > -1) {
          alert('your url contains the name workingday')
          const lastItem = window.location.href.substring(
            window.location.href.lastIndexOf('/') + 1
          )
          alert(lastItem)

          await dispatch(listOneWorkingDay)
          await dispatch(WorkingDayTors(lastItem))
          await FuncTionDeleteAllAvilableTors2(lastItem)
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop
      ) {
        ResetFunction_Cancel_or_BACKdrop()
      }
    })
  }

  const handleListen = () => {
    console.log('listening?', listening)

    if (!listening) {
      recognition.start()
      recognition.onend = () => {
        console.log('...continue listening...')
        recognition.start()
      }
    } else if (isMouseDown && !listening) {
      recognition.stop()
      recognition.onend = () => {
        console.log('Stopped listening per click')
        setisMouseDown(false)
      }
    } else {
      recognition.stop()
      recognition.onend = () => {
        console.log('Stopped listening per click')
      }
    }

    recognition.onstart = () => {
      console.log('Listening!')
    }

    let finalTranscript = ''
    recognition.onresult = (event) => {
      setisMouseDown(false)

      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) finalTranscript += transcript + ' '
        else interimTranscript += transcript
      }
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript

      //-------------------------COMMANDS------------------------------------
      //הפסק האזנה
      const transcriptArr = finalTranscript.split(' ')
      const stopCmd = transcriptArr.slice(-3, -1)
      console.log('stopCmd', stopCmd)
      let stopwordArr = [
        'הפסק',
        'תפסיק',
        'תפסיק',
        'הפסקת',
        'הפסקה',
        'סקס',
        'מפסק',
      ]
      let stopwordArr2 = ['להאזין', 'האזנה', 'להאזין', 'הזנה']
      if (
        stopwordArr.includes(stopCmd[0]) &&
        stopwordArr2.includes(stopCmd[1])
      ) {
        recognition.stop()
        recognition.onend = () => {
          console.log('Stopped listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          setstatefinalText(statefinalText)
        }
      }
      ///לדף הבית
      const HomeCMD = transcriptArr.slice(-3, -1)
      console.log('OprnTorimCMD', HomeCMD)
      let HomeArr = ['פתח', 'תפתח', 'דף', 'לדף', 'מדף', 'בית', 'לעמוד']
      let HomeArr2 = ['זית', 'בית', 'הבית']
      if (HomeArr.includes(HomeCMD[0]) && HomeArr2.includes(HomeCMD[1])) {
        recognition.stop()
        recognition.onend = () => {
          setredirectHome(true)
          console.log('home listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          setstatefinalText(statefinalText)
        }
      }
      ///ליומן העבודה
      const OprnTorimCMD = transcriptArr.slice(-3, -1)
      console.log('OprnTorimCMD', OprnTorimCMD)
      let OpenAllTorimArr = [
        'פתח',
        'טרקטורים',
        'תפתח',
        'דף',
        'לדף',
        'רדף',
        'מדף',
        'תורים',
        'עמוד',
        'לעמוד',
        'הצג',
        'תראה',
      ]
      let OpenAllTorimArr2 = TorimArr
      if (
        (OpenAllTorimArr.includes(OprnTorimCMD[0]) &&
          OpenAllTorimArr2.includes(OprnTorimCMD[1])) ||
        OprnTorimCMD[0] === 'תורים' ||
        OprnTorimCMD[0] === 'טורים' ||
        OprnTorimCMD[0] === 'לתורים' ||
        OprnTorimCMD[0] === 'פורים' ||
        OprnTorimCMD[0] === 'לטורים' ||
        OprnTorimCMD[0] === 'התורים' ||
        (OprnTorimCMD[0] === 'זמן' && OprnTorimCMD[1] === 'העבודה') ||
        (OprnTorimCMD[0] === 'זמן' && OprnTorimCMD[1] === 'עבודה') ||
        (OprnTorimCMD[0] === 'יומן' && OprnTorimCMD[1] === 'עבודה') ||
        (OprnTorimCMD[0] === 'יומן' && OprnTorimCMD[1] === 'העבודה') ||
        (OprnTorimCMD[0] === 'הצג' &&
          OprnTorimCMD[1] === 'את' &&
          OprnTorimCMD[2] === 'התורים') ||
        (OprnTorimCMD[0] === 'פתח' &&
          OprnTorimCMD[1] === 'את' &&
          OprnTorimCMD[2] === 'התורים')
      ) {
        recognition.stop()
        recognition.onend = () => {
          setGoTorim(true)
          console.log('GoTorimPAge listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          setstatefinalText(statefinalText)
        }
      }
      //לפתוח את יום העבודה היום
      const OPEN_TODAY_CMD = transcriptArr.slice(-3, -1)
      console.log('OPEN_TODAY_CMD', OPEN_TODAY_CMD)
      let OpenTodayArr = [
        'פתח',
        'את',
        'היום',
        'הצג',
        'התורים',
        'לדף',
        'מדף',
        'תורים',
        'לעמוד',
        'הצג',
        'תראה',
      ]
      let OpenTodayArr2 = ['יומי', 'להיום', 'היום', 'היומי']
      if (
        (OpenTodayArr.includes(OPEN_TODAY_CMD[0]) &&
          OpenTodayArr2.includes(OPEN_TODAY_CMD[1])) ||
        OPEN_TODAY_CMD[0] === 'היום' ||
        OPEN_TODAY_CMD[0] === 'להיום' ||
        (OPEN_TODAY_CMD[0] === 'הצג' &&
          OPEN_TODAY_CMD[1] === 'את' &&
          OPEN_TODAY_CMD[0] === 'היום') ||
        (OPEN_TODAY_CMD[0] === 'פתח' &&
          OPEN_TODAY_CMD[1] === 'את' &&
          OPEN_TODAY_CMD[0] === 'היום') ||
        (OPEN_TODAY_CMD[0] === 'פתח' &&
          OPEN_TODAY_CMD[1] === 'תורים' &&
          OPEN_TODAY_CMD[0] === 'להיום') ||
        (OPEN_TODAY_CMD[0] === 'פתח' &&
          OPEN_TODAY_CMD[1] === 'טובים' &&
          OPEN_TODAY_CMD[0] === 'להיום')
      ) {
        recognition.stop()
        recognition.onend = () => {
          setGoToday(true)
          console.log('GoToDAYPAge listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          setstatefinalText(statefinalText)
        }
      }
      //לפתוח את יום העבודה מחר
      const OPEN_TOMMOROW_CMD = transcriptArr.slice(-3, -1)
      console.log('OPEN_TOMMOROW_CMD', OPEN_TOMMOROW_CMD)
      let OpenTOMORROWArr = [
        'פתח',
        'את',
        'מחר',
        'הצג',
        'התורים',
        'לדף',
        'מדף',
        'תורים',
        'לעמוד',
        'הצג',
        'תראה',
      ]
      let OpenTOMORROWArr2 = ['יומי', 'למחר', 'מחר', 'היומי']
      if (
        (OpenTOMORROWArr.includes(OPEN_TOMMOROW_CMD[0]) &&
          OpenTOMORROWArr2.includes(OPEN_TOMMOROW_CMD[1])) ||
        OPEN_TOMMOROW_CMD[0] === 'מחר' ||
        (OPEN_TOMMOROW_CMD[0] === 'הצג' &&
          OPEN_TOMMOROW_CMD[1] === 'את' &&
          OPEN_TOMMOROW_CMD[0] === 'מחר') ||
        (OPEN_TOMMOROW_CMD[0] === 'פתח' &&
          OPEN_TOMMOROW_CMD[1] === 'את' &&
          OPEN_TOMMOROW_CMD[0] === 'מחר') ||
        (OPEN_TOMMOROW_CMD[0] === 'פתח' &&
          OPEN_TOMMOROW_CMD[1] === 'תורים' &&
          OPEN_TOMMOROW_CMD[0] === 'למחר')
      ) {
        recognition.stop()
        recognition.onend = () => {
          setGoTOMORROW(true)
          console.log('GoTOMOOROW PAge listening per command')
          const finalText = transcriptArr.slice(0, -3).join(' ')
          document.getElementById('final').innerHTML = finalText
          setstatefinalText(statefinalText)
        }
      }

      /************** פנה  תורים הזמינים להיום  ************** */
      const CANCEL_AVILABLE_TORIM_TODAY_CMD = transcriptArr
      console.log(
        'CANCEL_AVILABLE_TORIM_TODAY_CMD',
        CANCEL_AVILABLE_TORIM_TODAY_CMD
      )
      console.log(`BEFORE :${CANCEL_AVILABLE_TORIM_TODAY_CMD}`)
      let f = 0
      for (let word of CANCEL_AVILABLE_TORIM_TODAY_CMD) {
        if (word === 'ל') {
          CANCEL_AVILABLE_TORIM_TODAY_CMD.splice(f, 1)
        }
        f++
      }
      console.log(`AFTER :${CANCEL_AVILABLE_TORIM_TODAY_CMD}`)
      let arrayyy_CANCEL0 = [
        'פנה',
        'פנדה',
        'תפנה',
        'לפנות',
        'פינוי',
        'הסר',
        'ביטול',
        'מחק',
        'הסר',
        'חסר',
        'החסרת',
        'הסרת',
        'בטל',
      ]
      let arrayyy_CANCEL1 = TorimArr
      let arrayyy_CANCEL2 = zminimArr
      let arrayyy_CANCEL3 = LeHaiomArr
      if (
        (arrayyy_CANCEL0.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[0]) &&
          arrayyy_CANCEL1.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[1]) &&
          arrayyy_CANCEL2.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[2]) &&
          arrayyy_CANCEL3.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[3])) ||
        (arrayyy_CANCEL0.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[0]) &&
          arrayyy_CANCEL1.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[2]) &&
          arrayyy_CANCEL2.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[3]) &&
          arrayyy_CANCEL3.includes(CANCEL_AVILABLE_TORIM_TODAY_CMD[4]))
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('CANCEL ALL AVILABLE TORIM command')

          SwalFuncTionDeleteAllAvilableTors()

          const finalText = transcriptArr.join(' ')
          document.getElementById('final').innerHTML = finalText
          console.log(`final TEXT:, ${finalText}`)
          setstatefinalText(statefinalText)
        }
      }

      /************** הצג תורים פנויים להיום  ************** */
      const TORIM_PNUIM_FOR_TODAY_CMD = transcriptArr
      console.log('TORIM_PNUIM_FOR_TODAY_CMD', TORIM_PNUIM_FOR_TODAY_CMD)
      console.log(`BEFORE :${TORIM_PNUIM_FOR_TODAY_CMD}`)
      let Y = 0
      for (let word of TORIM_PNUIM_FOR_TODAY_CMD) {
        if (word === 'ל') {
          TORIM_PNUIM_FOR_TODAY_CMD.splice(Y, 1)
        }
        Y++
      }
      console.log(`AFTER :${TORIM_PNUIM_FOR_TODAY_CMD}`)
      let arrayyytT0 = ['תראה', 'פתח', 'הצג']
      let arrayyytT1 = ['את']
      let arrayyytT2 = TorimArr
      let arrayyytT3 = zminimArr
      let arrayyytT4 = LeHaiomArr
      if (
        (arrayyytT0.includes(TORIM_PNUIM_FOR_TODAY_CMD[0]) &&
          arrayyytT1.includes(TORIM_PNUIM_FOR_TODAY_CMD[1]) &&
          arrayyytT2.includes(TORIM_PNUIM_FOR_TODAY_CMD[2]) &&
          arrayyytT3.includes(TORIM_PNUIM_FOR_TODAY_CMD[3]) &&
          arrayyytT4.includes(TORIM_PNUIM_FOR_TODAY_CMD[4])) ||
        (arrayyytT2.includes(TORIM_PNUIM_FOR_TODAY_CMD[0]) &&
          arrayyytT3.includes(TORIM_PNUIM_FOR_TODAY_CMD[1]) &&
          arrayyytT4.includes(TORIM_PNUIM_FOR_TODAY_CMD[2]))
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('show AVILABLE TORS  ACTION listening per command')
          setForToday(true)
          setForTomorow(false)
          setForSpesisfic(false)
          SHOWavilableTors()
          const finalText = transcriptArr.join(' ')
          document.getElementById('final').innerHTML = finalText
          console.log(`final TEXT:, ${finalText}`)

          setstatefinalText(statefinalText)
        }
      }

      /************** קבע תור להיום לעומרי בקיש לשעה  ************** */
      const MAKE_TOR_FOR_TODAY_CMD = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD', MAKE_TOR_FOR_TODAY_CMD)
      console.log(`BEFORE :${MAKE_TOR_FOR_TODAY_CMD}`)
      let i = 0
      for (let word of MAKE_TOR_FOR_TODAY_CMD) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TODAY_CMD.splice(i, 1)
        }
        i++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TODAY_CMD}`)
      let arrayyy0 = KevaArr
      let arrayyy1 = TorArr
      let arrayyy2 = LeHaiomArr
      let arrayyy5 = inShahaArr
      if (
        (MAKE_TOR_FOR_TODAY_CMD[0] === 'כפתור' &&
          MAKE_TOR_FOR_TODAY_CMD[1] === 'להיום' &&
          MAKE_TOR_FOR_TODAY_CMD[5] === 'בשעה') ||
        (arrayyy0.includes(MAKE_TOR_FOR_TODAY_CMD[0]) &&
          arrayyy1.includes(MAKE_TOR_FOR_TODAY_CMD[1]) &&
          arrayyy2.includes(MAKE_TOR_FOR_TODAY_CMD[2]) &&
          arrayyy5.includes(MAKE_TOR_FOR_TODAY_CMD[5]))
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')

          const lamedd = MAKE_TOR_FOR_TODAY_CMD[3].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD[3].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD[4]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD[6]
            if (MAKE_TOR_FOR_TODAY_CMD[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD[7]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)

            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD[3]
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD[4]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD[6]
            if (MAKE_TOR_FOR_TODAY_CMD[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD[7]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)

            setstatefinalText(statefinalText)
          }
        }
      }

      /**************Make tor commend2 קבע תור לעומרי בקיש להיום  בשעה  ************** */
      const MAKE_TOR_FOR_TODAY_CMD2 = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD2', MAKE_TOR_FOR_TODAY_CMD2)
      console.log(`BEFORE :${MAKE_TOR_FOR_TODAY_CMD2}`)
      let z = 0
      for (let word of MAKE_TOR_FOR_TODAY_CMD2) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TODAY_CMD2.splice(z, 1)
        }
        z++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TODAY_CMD2}`)

      let arrayy0 = KevaArr
      let arrayy1 = TorArr
      let arrayy4 = LeHaiomArr
      let arrayy5 = inShahaArr

      if (
        arrayy0.includes(MAKE_TOR_FOR_TODAY_CMD2[0]) &&
        arrayy1.includes(MAKE_TOR_FOR_TODAY_CMD2[1]) &&
        arrayy4.includes(MAKE_TOR_FOR_TODAY_CMD2[4]) &&
        arrayy5.includes(MAKE_TOR_FOR_TODAY_CMD2[5])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')
          const lamedd = MAKE_TOR_FOR_TODAY_CMD2[2].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD2[2].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD2[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD2[6]
            if (MAKE_TOR_FOR_TODAY_CMD2[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD2[7]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD2[2]
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD2[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD2[6]
            if (MAKE_TOR_FOR_TODAY_CMD2[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD2[7]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }
      /**************Make tor commend3 קבע תור לעומרי בקיש בשעה  ************** */
      const MAKE_TOR_FOR_TODAY_CMD3 = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD3', MAKE_TOR_FOR_TODAY_CMD3)
      console.log(`BEFORE :${MAKE_TOR_FOR_TODAY_CMD3}`)
      let t = 0
      for (let word of MAKE_TOR_FOR_TODAY_CMD3) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TODAY_CMD3.splice(t, 1)
        }
        t++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TODAY_CMD3}`)
      let arrayyyyyy0 = KevaArr
      let arrayyyyyy1 = TorArr
      let arrayyyyyy4 = inShahaArr

      if (
        arrayyyyyy0.includes(MAKE_TOR_FOR_TODAY_CMD3[0]) &&
        arrayyyyyy1.includes(MAKE_TOR_FOR_TODAY_CMD3[1]) &&
        arrayyyyyy4.includes(MAKE_TOR_FOR_TODAY_CMD3[4])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')

          const lamedd = MAKE_TOR_FOR_TODAY_CMD3[2].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD3[2].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD3[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD3[5]
            if (MAKE_TOR_FOR_TODAY_CMD3[6] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD3[6]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD3[2]
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD3[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD3[5]
            if (MAKE_TOR_FOR_TODAY_CMD3[6] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD3[6]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }

      /**************Make tor commend4  תור לעומרי בקיש בשעה  ************** */
      const MAKE_TOR_FOR_TODAY_CMD4 = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD3', MAKE_TOR_FOR_TODAY_CMD4)
      console.log(`BEFORE :${MAKE_TOR_FOR_TODAY_CMD4}`)
      let v = 0
      for (let word of MAKE_TOR_FOR_TODAY_CMD4) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TODAY_CMD4.splice(v, 1)
        }
        v++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TODAY_CMD4}`)

      let arrayyyyyyx0 = TorArr
      let arrayyyyyyx3 = inShahaArr

      if (
        arrayyyyyyx0.includes(MAKE_TOR_FOR_TODAY_CMD4[0]) &&
        arrayyyyyyx3.includes(MAKE_TOR_FOR_TODAY_CMD4[3])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')

          const lamedd = MAKE_TOR_FOR_TODAY_CMD4[1].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD4[1].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD4[2]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD4[4]
            if (MAKE_TOR_FOR_TODAY_CMD4[5] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD4[5]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD4[1]
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD4[2]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD4[4]
            if (MAKE_TOR_FOR_TODAY_CMD4[5] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD4[5]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }
      /**************Make tor commend5  תור לעומרי בקיש היום בשעה  ************** */
      const MAKE_TOR_FOR_TODAY_CMD5 = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD3', MAKE_TOR_FOR_TODAY_CMD5)
      console.log(`BEFORE :${MAKE_TOR_FOR_TODAY_CMD5}`)
      let b = 0
      for (let word of MAKE_TOR_FOR_TODAY_CMD5) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TODAY_CMD5.splice(b, 1)
        }
        b++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TODAY_CMD5}`)

      let arrayyyyyyxz0 = TorArr
      let arrayyyyyyxz3 = ['היום', 'יום', 'כיום', 'יון', 'נכון']
      let arrayyyyyyxz4 = inShahaArr

      if (
        arrayyyyyyxz0.includes(MAKE_TOR_FOR_TODAY_CMD5[0]) &&
        arrayyyyyyxz3.includes(MAKE_TOR_FOR_TODAY_CMD5[3]) &&
        arrayyyyyyxz4.includes(MAKE_TOR_FOR_TODAY_CMD5[4])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')

          const lamedd = MAKE_TOR_FOR_TODAY_CMD5[1].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD5[1].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD5[2]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD5[5]
            if (MAKE_TOR_FOR_TODAY_CMD5[6] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD5[6]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD5[1]
            const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD5[2]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TODAY_CMD5[5]
            if (MAKE_TOR_FOR_TODAY_CMD5[6] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD5[6]
              makeTorForToday(UserToFind, hour, half)
            } else {
              makeTorForToday(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }

      //*******************קבע תור לעומרי בקיש   למחר//תור//  בשעה *********TOMORROW2********************* */
      const MAKE_TOR_FOR_TOMORROW_CMD2 = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD2', MAKE_TOR_FOR_TOMORROW_CMD2)
      console.log(`BEFORE :${MAKE_TOR_FOR_TOMORROW_CMD2}`)
      let m = 0
      for (let word of MAKE_TOR_FOR_TOMORROW_CMD2) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TOMORROW_CMD2.splice(m, 1)
        }
        m++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TOMORROW_CMD2}`)

      let arrayyyyy0 = KevaArr
      let arrayyyyy1 = TorArr
      let arrayyyyy4 = LeMaharArr
      let arrayyyyy5 = inShahaArr

      if (
        arrayyyyy0.includes(MAKE_TOR_FOR_TOMORROW_CMD2[0]) &&
        arrayyyyy1.includes(MAKE_TOR_FOR_TOMORROW_CMD2[1]) &&
        arrayyyyy4.includes(MAKE_TOR_FOR_TOMORROW_CMD2[4]) &&
        arrayyyyy5.includes(MAKE_TOR_FOR_TOMORROW_CMD2[5])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')

          const lamedd = MAKE_TOR_FOR_TOMORROW_CMD2[2].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind =
              MAKE_TOR_FOR_TOMORROW_CMD2[2].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TOMORROW_CMD2[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TOMORROW_CMD2[6]
            if (MAKE_TOR_FOR_TOMORROW_CMD2[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD2[7]
              PremakeTorForTommorrow(UserToFind, hour, half)
            } else {
              PremakeTorForTommorrow(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TOMORROW_CMD2[2]
            const UserLastNameToFind = MAKE_TOR_FOR_TOMORROW_CMD2[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TOMORROW_CMD2[6]
            if (MAKE_TOR_FOR_TOMORROW_CMD2[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TODAY_CMD2[7]
              PremakeTorForTommorrow(UserToFind, hour, half)
            } else {
              PremakeTorForTommorrow(UserToFind, hour)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }

      //*******************//תור לעומרי בקיש מחר בשעה-זה עוד לא קיים//קבע תור למחר לעומרי בקיש בשעה *********TOMORROW********************* */
      const MAKE_TOR_FOR_TOMORROW_CMD = transcriptArr
      console.log('MAKE_TOR_FOR_TOMORROW_CMD', MAKE_TOR_FOR_TOMORROW_CMD)
      console.log(`BEFORE :${MAKE_TOR_FOR_TOMORROW_CMD}`)
      let x = 0
      for (let word of MAKE_TOR_FOR_TOMORROW_CMD) {
        if (word === 'ל') {
          MAKE_TOR_FOR_TOMORROW_CMD.splice(x, 1)
        }
        x++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_TOMORROW_CMD}`)
      let arrayyyy0 = KevaArr
      let arrayyyy1 = TorArr
      let arrayyyy2 = LeMaharArr
      let arrayyyy5 = inShahaArr

      if (
        arrayyyy0.includes(MAKE_TOR_FOR_TOMORROW_CMD[0]) &&
        arrayyyy1.includes(MAKE_TOR_FOR_TOMORROW_CMD[1]) &&
        arrayyyy2.includes(MAKE_TOR_FOR_TOMORROW_CMD[2]) &&
        arrayyyy5.includes(MAKE_TOR_FOR_TOMORROW_CMD[5])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')

          const lamed = MAKE_TOR_FOR_TOMORROW_CMD[3].charAt(0)
          console.log(`lamed:${lamed}`)
          if (lamed == 'ל') {
            const UserFirstNameToFind =
              MAKE_TOR_FOR_TOMORROW_CMD[3].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_TOMORROW_CMD[4]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TOMORROW_CMD[6]
            if (MAKE_TOR_FOR_TOMORROW_CMD[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TOMORROW_CMD[7]
              makeTorForTommorrow(UserToFind, hour, half)
            } else {
              makeTorForTommorrow(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_TOMORROW_CMD[3]
            const UserLastNameToFind = MAKE_TOR_FOR_TOMORROW_CMD[4]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_TOMORROW_CMD[6]
            if (MAKE_TOR_FOR_TOMORROW_CMD[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_TOMORROW_CMD[7]
              makeTorForTommorrow(UserToFind, hour, half)
            } else {
              makeTorForTommorrow(UserToFind, hour)
            }
            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }

      /**************קבע תור לעומרי בקיש ליום _______ בשעה  ************** */
      const MAKE_TOR_FOR_SPESIFIC_DAY_CMD = transcriptArr
      console.log(
        'MAKE_TOR_FOR_SPECIFIC DAY_CMD',
        MAKE_TOR_FOR_SPESIFIC_DAY_CMD
      )
      console.log(`BEFORE :${MAKE_TOR_FOR_SPESIFIC_DAY_CMD}`)
      let l = 0
      for (let word of MAKE_TOR_FOR_SPESIFIC_DAY_CMD) {
        if (word === 'ל') {
          MAKE_TOR_FOR_SPESIFIC_DAY_CMD.splice(l, 1)
        }
        l++
      }
      console.log(`AFTER :${MAKE_TOR_FOR_SPESIFIC_DAY_CMD}`)

      let arrayyg0 = KevaArr

      let arrayyg1 = TorArr
      let arrayyg4 = LeHaiomArr
      let arrayyg5 = daysArr
      let arrayyg6 = inShahaArr

      if (
        arrayyg0.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[0]) &&
        arrayyg1.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[1]) &&
        arrayyg4.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[4]) &&
        arrayyg5.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[5]) &&
        arrayyg6.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[6])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log(
            'MAKE TOR  FOR A SPESIFIC DAY ACTION listening per command'
          )
          const lamedd = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[2].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind =
              MAKE_TOR_FOR_SPESIFIC_DAY_CMD[2].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[7]

            if (MAKE_TOR_FOR_SPESIFIC_DAY_CMD[8] === 'וחצי') {
              const half = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[8]
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[5]
              console.log(dayTofind)
              PremakeTorSpesificDAY2(UserToFind, hour, half, dayTofind)
            } else {
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[5]
              console.log(dayTofind)
              PremakeTorSpesificDAY(UserToFind, hour, dayTofind)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[2]
            const UserLastNameToFind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[3]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[7]
            if (MAKE_TOR_FOR_SPESIFIC_DAY_CMD[8] === 'וחצי') {
              const half = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[8]
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[5]
              PremakeTorSpesificDAY2(UserToFind, hour, half, dayTofind)
            } else {
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[5]
              PremakeTorSpesificDAY(UserToFind, hour, dayTofind)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      } else if (
        arrayyg1.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[0]) &&
        arrayyg4.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[3]) &&
        arrayyg5.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[4]) &&
        arrayyg6.includes(MAKE_TOR_FOR_SPESIFIC_DAY_CMD[5])
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log(
            'MAKE TOR  FOR A SPESIFIC DAY ACTION listening per command'
          )
          const lamedd = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[1].charAt(0)
          console.log(`lamedd:${lamedd}`)
          if (lamedd == 'ל') {
            const UserFirstNameToFind =
              MAKE_TOR_FOR_SPESIFIC_DAY_CMD[1].substring(1)
            const UserLastNameToFind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[2]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[6]

            if (MAKE_TOR_FOR_SPESIFIC_DAY_CMD[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[7]
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[4]
              console.log(dayTofind)
              PremakeTorSpesificDAY2(UserToFind, hour, half, dayTofind)
            } else {
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[4]
              console.log(dayTofind)
              PremakeTorSpesificDAY(UserToFind, hour, dayTofind)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          } else {
            const UserFirstNameToFind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[1]
            const UserLastNameToFind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[2]
            const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
            console.log(`user to find:${UserToFind}`)
            const hour = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[6]
            if (MAKE_TOR_FOR_SPESIFIC_DAY_CMD[7] === 'וחצי') {
              const half = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[7]
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[4]
              PremakeTorSpesificDAY2(UserToFind, hour, half, dayTofind)
            } else {
              const dayTofind = MAKE_TOR_FOR_SPESIFIC_DAY_CMD[4]
              PremakeTorSpesificDAY(UserToFind, hour, dayTofind)
            }

            const finalText = transcriptArr.join(' ')
            document.getElementById('final').innerHTML = finalText
            console.log(`final TEXT:, ${finalText}`)
            setstatefinalText(statefinalText)
          }
        }
      }
    }
    setisMouseDown(false)

    //---------------END OF COMMENDS--------------------------------------------------------
    recognition.onerror = (event) => {
      console.log('Error occurred in recognition: ' + event.error)
    }
  }
  ///bring back all the users with same last or dirstname if the main one not found by voice
  const functionX = async () => {
    console.log('FUNCTION X')

    let id = oneworkingdays[0]._id
    await findClockNow(id, Hour)
    dispatch({ type: ONE_USER_SEARCH_RESET })
    console.log(`UserToFindX`)
    console.log(UserToFindX)
    await dispatch(
      List_of_Potential_Users_By_FirstNameActionSearch(UserToFindX)
    )
  }
  const functionT = async () => {
    console.log('FUNCTION T')
    console.log(tomorrowworkingdays._id)
    let id = tomorrowworkingdays._id
    await findClockNow(id, Hour)
    dispatch({ type: ONE_USER_SEARCH_RESET })
    console.log(`UserToFindX`)
    console.log(UserToFindX)
    await dispatch(
      List_of_Potential_Users_By_FirstNameActionSearch(UserToFindX)
    )
  }

  const functionV = async () => {
    console.log('FUNCTION V')

    let id = window.location.href.substring(
      window.location.href.lastIndexOf('/') + 1
    )
    await findClockNow(id, Hour)
    dispatch({ type: ONE_USER_SEARCH_RESET })

    console.log(`UserToFindX`)
    console.log(UserToFindX)
    await dispatch(
      List_of_Potential_Users_By_FirstNameActionSearch(UserToFindX)
    )
    setUserToFindX('')
  }

  const FUNCTIONz = async () => {
    console.log('FUNCTIONz')
    setShowConfirmAfterListUser(false)
    if (ForToday) {
      let id = oneworkingdays[0]._id
      await findClockNow(id, Hour)
      if (successclockFound) {
        dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
        console.log(`word:${word}`)
        console.log(`tipulimList:${tipulimList[0]._id}`)
        console.log(`clockFound:${clockFound._id}`)
        setShowIfNotFoundByVoiceUsers(false)
        Swal.fire({
          imageUrl: `${userImage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${name} להיום בשעה ${Hour}  `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(confirmTor(clockFound._id, word, tipulimList[0]._id)) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
      }
    } else if (ForTomorow) {
      let idT = tomorrowworkingdays._id
      console.log(idT)
      await findClockNow(idT, Hour)
    } else if (ForSpesisfic) {
      setShowIfNotFoundByVoiceUsers(false)
      Swal.fire({
        imageUrl: `${userImage}`,
        imageWidth: 200,
        imageHeight: 200,
        title: `אישור תור`,
        text: `בלחיצה על אישור תשבץ את ${name} ליום  ${WorkdayFound_DayINweek} הקרוב ${Hour}  `,
        showCancelButton: true,
        cancelButtonText: 'ביטול',
        confirmButtonText: 'אישור',
        footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(confirmTor(clockFound._id, word, tipulimList[0]._id)) //*hard code///
        } else if (
          result.dismiss === Swal.DismissReason.cancel ||
          result.dismiss === Swal.DismissReason.backdrop
        ) {
          ResetFunction_Cancel_or_BACKdrop()
        }
      })
    }
  }
  const ResetFunction_Cancel_or_BACKdrop = () => {
    setSHOWMEArrOFavilableClocksForToday(false)
    console.log('reset-Voice !@!')
    setForToday(false)
    setShowIfNotFoundByVoiceUsers(false)
    setForTomorow(false)
    setName('')
    setWord('')
    setPhone('')
    setPhone('')
    setstatefinalText('')
    SetHour('')
    setusername('')
    setuserid('')
    setuserphone('')
    setuserimage('')
    setUserToFindX('')
    dispatch({ type: ONE_USER_SEARCH_RESET })
    dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
    dispatch({ type: CONFIRM_TOR_RESET })
    dispatch({ type: USER_REGISTERByADMIN_RESET })
  }
  const swalConfirmForTomorrow = (id) => {
    setShowIfNotFoundByVoiceUsers(false)
    dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
    Swal.fire({
      imageUrl: `${userImage}`,
      imageWidth: 200,
      imageHeight: 200,
      title: `אישור תור`,
      text: `בלחיצה על אישור תשבץ את ${name} למחר בשעה ${Hour}  `,
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      confirmButtonText: 'אישור',
      footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(confirmTor(id, word, tipulimList[0]._id))
      } else if (
        result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop
      ) {
        ResetFunction_Cancel_or_BACKdrop()
      }
    })
  }

  const swalConfirmForSpesific = (id) => {
    setShowIfNotFoundByVoiceUsers(false)
    dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
    Swal.fire({
      imageUrl: `${userImage}`,
      imageWidth: 200,
      imageHeight: 200,
      title: `אישור תור`,
      text: `בלחיצה על אישור תשבץ את ${name} ליום עבודה זה בשעה ${Hour}  `,
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      confirmButtonText: 'אישור',
      footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(confirmTor(id, word, tipulimList[0]._id))
      } else if (
        result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop
      ) {
        ResetFunction_Cancel_or_BACKdrop()
      }
    })
  }
  const CreateClientHandler = async () => {
    setStateForNewUserWindow(false)
    console.log(userToRegister)
    console.log(userToRegister)
    console.log(userToRegister)
    const USRG = userToRegister
    let value1 = userToRegister.split(' ')[0] + ' '
    let value2 = userToRegister.split(' ')[1]
    let value3 = ' '
    console.log(value1)
    console.log(value2)

    const { value: formValues } = await Swal.fire({
      imageUrl: 'https://i.ibb.co/k5YCM8z/animation-200-kyobojkk.gif',
      imageWidth: 100,
      imageHeight: 100,
      title: 'הוסף משתמש חדש ',
      footer: `הסיסמה שהונפקה ללקוח זה מספר הנייד שהזנת`,
      confirmButtonText: 'רשום משתמש חדש',

      html:
        `<input  id="swal-input11" class="swal2-input" value=${value1}  
        >` +
        `<label for="swal-input11">${'  '}שם פרטי</label>` +
        `<input  id="swal-input22" class="swal2-input" value=${value2} 
        >` +
        `<label for="swal-input22">${'  '}שם משפחה</label>` +
        `<input id="swal-input33" class="swal2-input">` +
        '<label for="swal-input33">אימייל</label>' +
        `<input id="swal-input44" class="swal2-input">` +
        `<label for="swal-input44">${'  '}נייד</label>`,
      focusConfirm: false,
      preConfirm: async () => {
        return [
          document.getElementById('swal-input11').value,
          document.getElementById('swal-input22').value,
          document.getElementById('swal-input33').value,
          document.getElementById('swal-input44').value,
        ]
      },
    })

    if (formValues) {
      const name = formValues[0] + ' ' + formValues[1]
      const email = formValues[2]
      const phone = formValues[3]
      const password = formValues[3]
      const image = 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif'
      await dispatch(registerByADMIN(name, email, phone, password, image))
    }
  }
  const hourCoNfigaraitor = (hour, half) => {
    const result = HOURconfigrator(hour, half)
    SetHour(result)
  }

  const FUNCTIONm = async (workdayFound_id) => {
    console.log('FUNCTIONm')
    console.log(
      `searching for hour in this work day ${workdayFound_id} dispaching action...`
    )
    await dispatch(FindClockByWorkID_and_time(workdayFound_id, Hour))
  }
  const Function_MakeList_For_Spresific = async () => {
    setForSpesisficRedirect(true)
    await dispatch(Next7Daysss()) ///7 next days
    await dispatch(
      List_of_Potential_Users_By_FirstNameActionSearch(UserToFindX)
    )
  }

  const swalThisUserAlreadyExits = () => {
    Swal.fire({
      position: 'top-end',
      cancelButtonColor: 'rgb(194, 0, 0)',
      confirmButtonColor: 'rgb(3, 148, 39)',
      icon: 'error',
      title: `משתמש זה כבר קיים במערכת `,
      text: `הנייד או האימייל שהזנת כבר קיימים במערכת אנא הזן משתמש אחר`,
      showConfirmButton: false,
      timer: 8000,
    })
    ResetFunction_Cancel_or_BACKdrop()
  }
  const SHOWavilableTors = async () => {
    await dispatch(listOneWorkingDay)
    setSHOWavilableTorimForToday(true)
  }
  const swalalaSHOWavilable = async () => {
    await dispatch(WorkingDayTors(oneworkingdays[0]._id))
    dispatch({ type: ONE_WORKING_DAY_RESET })
  }
  const AvILABLeSwal = async () => {
    let ArrOFavilableClocksForToday = []
    for (let clock of clockList) {
      if (clock.avilable) {
        console.log(clock)
        ArrOFavilableClocksForToday.push(clock)
      }
    }
    console.log(ArrOFavilableClocksForToday)
    setArrOFavilableClocksForToday(ArrOFavilableClocksForToday)
    setSHOWMEArrOFavilableClocksForToday(true)
  }

  // ██╗   ██╗███████╗███████╗    ███████╗███████╗███████╗███████╗ ██████╗████████╗
  // ██║   ██║██╔════╝██╔════╝    ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
  // ██║   ██║███████╗█████╗      █████╗  █████╗  █████╗  █████╗  ██║        ██║
  // ██║   ██║╚════██║██╔══╝      ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
  // ╚██████╔╝███████║███████╗    ███████╗██║     ██║     ███████╗╚██████╗   ██║
  //  ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝
  useEffect(() => {
    if (onesuccess && SHOWavilableTorimForToday) {
      swalalaSHOWavilable()
    }
    if (Torssuccess && SHOWavilableTorimForToday) {
      setSHOWavilableTorimForToday(false)
      AvILABLeSwal()
    }

    if (newUserCreateByadminError) {
      dispatch({ type: USER_REGISTERByADMIN_RESET })
      swalThisUserAlreadyExits()
    }
    if (sevendayssuccess && successuserfound) {
      console.log(sevendaysworkingdays)
      console.log(`userfound _id: ${userfound._id}`)
      console.log(`Hour: ${Hour}`)
      console.log(`date to find: ${DayToFind}`)
      for (let workdayFound of sevendaysworkingdays) {
        if (workdayFound.dayInWeek === DayToFind) {
          console.log(`WORD DAY FOUND id!!!: ${workdayFound._id}`)
          console.log(`WORD DAY FOUND date!!!: ${workdayFound.date}`)
          console.log(`WORD DAY FOUND dayInWeek !!!: ${workdayFound.dayInWeek}`)
          setWorkdayFound_ID(workdayFound._id)
          setWorkdayFound_DayINweek(workdayFound.dayInWeek)
          setWorkdayFoundDay_DATE(workdayFound.dayInWeek)

          FUNCTIONm(workdayFound._id)
        }
      }
      dispatch({ type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_RESET })
    } else if (sevendayssuccess) {
      for (let workdayFound of sevendaysworkingdays) {
        if (workdayFound.dayInWeek === DayToFind) {
          console.log(`WORD DAY FOUND id!!!: ${workdayFound._id}`)
          console.log(`WORD DAY FOUND date!!!: ${workdayFound.date}`)
          console.log(`WORD DAY FOUND dayInWeek !!!: ${workdayFound.dayInWeek}`)
          setWorkdayFound_ID(workdayFound._id)
          setWorkdayFound_DayINweek(workdayFound.dayInWeek)
          setWorkdayFoundDay_DATE(workdayFound.dayInWeek)

          FUNCTIONm(workdayFound._id)
        }
      }
      dispatch({ type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_RESET })
    }

    if (successclockFound && ForSpesisfic && userfound) {
      setForSpesisfic(false)
      setForSpesisficRedirect(true)
      console.log(`this action and this action only`)
      console.log(`clock found id ${clockFound._id}`)
      Swal.fire({
        imageUrl: `${userfound.image}`,
        imageWidth: 200,
        imageHeight: 200,
        title: `אישור תור`,
        text: `בלחיצה על אישור תשבץ את ${userfound.name} ליום  ${WorkdayFound_DayINweek} הקרוב בשעה ${Hour}`,
        showCancelButton: true,
        cancelButtonText: 'ביטול',
        confirmButtonText: 'אישור',
        footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${userfound.phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${userfound.phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(
            confirmTor(clockFound._id, userfound._id, tipulimList[0]._id)
          ) //*hard code///
        } else if (
          result.dismiss === Swal.DismissReason.cancel ||
          result.dismiss === Swal.DismissReason.backdrop
        ) {
          ResetFunction_Cancel_or_BACKdrop()
        }
      })
    } else if (successclockFound && ForSpesisfic && !userfound) {
      setClockForNewUser(clockFound._id)
    }

    if (errorclockFound && ForToday) {
      if (errorclockFound === 'Hour Not Avilavle') {
        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'error',
          title: `התור בשעה ${Hour} תפוס`,
          text: `התור שביקשת בשעה ${Hour} עבור ${UserToFindX} תפוס ע"י משתמש אחר`,
          showConfirmButton: false,
          timer: 8000,
        })
        ResetFunction_Cancel_or_BACKdrop()
      } else {
        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'error',
          title: `התור בשעה ${Hour} לא נמצא במערכת`,
          text: `התור בשעה ${Hour} עבור ${UserToFindX} לא קיימת במערכת ,תוכל ליצור אותה באמצעות לחיצה על אישור`,
          showConfirmButton: false,
          timer: 8000,
        })
      }
      ResetFunction_Cancel_or_BACKdrop()
    }
    if (errorclockFound && ForSpesisfic) {
      if (errorclockFound === 'Hour Not Avilavle') {
        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'error',
          title: `התור בשעה ${Hour} תפוס`,
          text: `התור שביקשת בשעה ${Hour} עבור ${UserToFindX} תפוס ע"י משתמש אחר`,
          showConfirmButton: false,
          timer: 8000,
        })
        ResetFunction_Cancel_or_BACKdrop()
      } else {
        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'error',
          title: `התור בשעה ${Hour} לא נמצא במערכת`,
          text: `התור בשעה ${Hour} עבור ${UserToFindX} לא קיימת במערכת ,תוכל ליצור אותה באמצעות לחיצה על אישור`,
          showConfirmButton: false,
          timer: 8000,
        })
      }
      ResetFunction_Cancel_or_BACKdrop()
    }
    if (errorclockFound && ForTomorow) {
      if (errorclockFound === 'Hour Not Avilavle') {
        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'error',
          title: `התור בשעה ${Hour} תפוס`,
          text: `התור שביקשת בשעה ${Hour} מחר,עבור  ${UserToFindX} תפוס ע"י משתמש אחר`,
          showConfirmButton: false,
          timer: 8000,
        })
        ResetFunction_Cancel_or_BACKdrop()
      } else {
        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'error',
          title: `התור בשעה ${Hour} לא נמצא במערכת`,
          text: `התור בשעה ${Hour} עבור ${UserToFindX} לא קיימת במערכת ,תוכל ליצור אותה באמצעות לחיצה על אישור`,
          showConfirmButton: false,
          timer: 8000,
        })
      }
      ResetFunction_Cancel_or_BACKdrop()
    }

    //****if admin torim url */
    if (newUserSuccess) {
      dispatch({ type: USER_REGISTERByADMIN_RESET })
      console.log(newUserInfo.name)
      console.log(newUserInfo._id)
      console.log(newUserInfo.image)
      console.log(newUserInfo.phone)
      console.log(Hour)
      setWord(newUserInfo._id)
      setName(newUserInfo.name)
      setPhone(newUserInfo.phone)
      setuserImage(newUserInfo.image)
      setNewUser_Situatuion(true)
      if (ForToday) {
        findClockNow(oneworkingdays[0]._id, Hour)
      } else if (ForTomorow) {
        findClockNow(tomorrowworkingdays._id, Hour)
      }
    }

    if (successclockFound && NewUser_Situatuion) {
      if (ForToday) {
        console.log(clockFound._id)
        console.log(clockFound.time)
        console.log(word)
        console.log(name)
        console.log(userImage)
        console.log(phone)
        console.log(Hour)
        console.log(oneworkingdays[0]._id)
        Swal.fire({
          imageUrl: `${userImage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${name} להיום בשעה ${clockFound.time}  `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(confirmTor(clockFound._id, word, tipulimList[0]._id)) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
      } else if (ForTomorow) {
        console.log(clockFound._id)

        Swal.fire({
          imageUrl: `${userImage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${name} למחר בשעה ${clockFound.time}  `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(confirmTor(clockFound._id, word, tipulimList[0]._id)) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
      } else if (ForSpesisfic) {
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(`for spesificc`)
        console.log(ClockForNewUser)
        console.log(ClockForNewUser)
        console.log(ClockForNewUser)
        console.log(ClockForNewUser)
        console.log(ClockForNewUser)
        Swal.fire({
          imageUrl: `${userImage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${name} ליום ${WorkdayFound_DayINweek} הקרוב בשעה ${clockFound.time}  `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${phone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${phone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            setNewUser_Situatuion(false)
            await dispatch(
              confirmTor(ClockForNewUser, word, tipulimList[0]._id)
            ) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
      }
    }

    if (StateForNewUserWindow) {
      setShowIfNotFoundByVoiceUsers(false)
      CreateClientHandler()
    }
    if (word != '' && phone != '' && name != '' && ShowConfirmAfterListUser) {
      FUNCTIONz()
    }

    if (erroruserfound) {
      setShowIfNotFoundByVoiceUsers(true)
      if (IM_IN_A_ADMIN_TORS) {
        if (ForToday) {
          functionX()
        } else if (ForTomorow) {
          functionT()
        } else if (ForSpesisfic) {
          dispatch({ type: ONE_USER_SEARCH_RESET })
          Function_MakeList_For_Spresific()
          setShowIfNotFoundByVoiceUsers(true)
        }
      } else if (IM_IN_A_SPESIFIC_WORKING_DAY) {
        functionV()
      }
      dispatch({ type: ONE_USER_SEARCH_RESET })
    }

    if (statefinalText) {
      console.log(`statefinalText:${statefinalText}`)
    }
    if (redirectHome) {
      history.push('/')
    }
    if (GoTorim) {
      setGoTorim(false)
      history.push('/admin/torim')
    }
    if (GoToday) {
      console.log('dispaching action for getting today deets')
      sendTodayWorkDay()
    }
    if (onesuccess && GoToday) {
      setGoToday(false)
      console.log(`the woekinf dat dees are :${oneworkingdays[0]._id}`)
      history.push(`/admin/workingday/${oneworkingdays[0]._id}`)
      dispatch({ type: ONE_WORKING_DAY_RESET })
      dispatch({ type: ONE_WORKING_DAY_RESET })
    }
    if (GoTOMORROW) {
      console.log('going tomorrow')
      sendTOMORROWWorkDay()
    }
    if (tomorrowsuccess && GoTOMORROW) {
      setGoTOMORROW(false)
      console.log(
        `the woekinf day for tomorrrow dees are :${tomorrowworkingdays._id}`
      )
      history.push(`/admin/workingday/${tomorrowworkingdays._id}`)
      dispatch({ type: ONE_WORKING_DAY_RESET })
      window.location.reload()
    }
    if (tomorrowsuccess && successuserfound && IM_IN_A_ADMIN_TORS) {
      console.log(userfound._id)
      console.log(tomorrowworkingdays._id)
      console.log(Hour)
    }

    if (successuserfound && IM_IN_A_ADMIN_TORS && !errorclockFound) {
      setUserToFindX('')
      if (ForToday) {
        let id = oneworkingdays[0]._id
        console.log(`workingdayfound : ${oneworkingdays[0]._id}`)
        console.log(`workingdayfounddate : ${oneworkingdays[0].date}`)
        console.log(`userfound _id: ${userfound._id}`)
        console.log(`userfound _name: ${userfound.name}`)
        console.log(`hour to confirm : ${Hour}`)
        setusername(userfound.name)
        setuserid(userfound._id)
        setuserimage(userfound.image)
        setuserphone(userfound.phone)
        findClockNow(id, Hour)
      } else if (ForTomorow) {
        let idT = tomorrowworkingdays._id
        console.log(`workingdayfound : ${tomorrowworkingdays._id}`)
        console.log(`workingdayfounddate : ${tomorrowworkingdays.date}`)
        console.log(`userfound _id: ${userfound._id}`)
        console.log(`userfound _name: ${userfound.name}`)
        console.log(`hour to confirm : ${Hour}`)
        setusername(userfound.name)
        setuserid(userfound._id)
        setuserimage(userfound.image)
        setuserphone(userfound.phone)
        findClockNow(idT, Hour)
      }
    } else if (successuserfound && IM_IN_A_SPESIFIC_WORKING_DAY) {
      alert('your url contains the name workingday!!!!!!!!!!!!!!!')

      let id = window.location.href.substring(
        window.location.href.lastIndexOf('/') + 1
      )
      setusername(userfound.name)
      setuserid(userfound._id)
      setuserimage(userfound.image)
      setuserphone(userfound.phone)
      findClockNow(id, Hour)
    }
    if (PushTOworkingdayAfterPinuiAvilableTorim) {
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
      setPushTOworkingdayAfterPinuiAvilableTorim(false)
    }
    if (successclockFound && successuserfound) {
      dispatch({ type: ONE_USER_SEARCH_RESET })

      if (ForToday) {
        setForTomorow(false)
        console.log(`workingdayfound : ${oneworkingdays[0]._id}`)
        console.log(`workingdayfounddate : ${oneworkingdays[0].date}`)
        console.log(`USER ID : ${userid}`)
        console.log(`USER NAME : ${username}`)
        console.log(`hour to confirm : ${Hour}`)
        console.log(`hour ID to confirm : ${clockFound._id}`)

        Swal.fire({
          imageUrl: `${userimage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${username} להיום בשעה ${Hour}  `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${userphone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${userphone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(
              confirmTor(clockFound._id, userid, tipulimList[0]._id)
            ) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
        dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
      } else if (ForTomorow) {
        setForToday(false)
        console.log(`workingdayfound for tomorrow: ${tomorrowworkingdays._id}`)
        console.log(
          `workingdayfounddate for tomorrow: ${tomorrowworkingdays.date}`
        )
        console.log(`USER ID : ${userid}`)
        console.log(`USER NAME : ${username}`)
        console.log(`hour to confirm : ${Hour}`)
        console.log(`hour ID to confirm : ${clockFound._id}`)

        Swal.fire({
          imageUrl: `${userimage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${username} לשעה ${Hour} מחר `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${userphone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${userphone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(confirmTor(clockFound._id, userid, tipulimList[0]._id)) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
        dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
      } else if (IM_IN_A_SPESIFIC_WORKING_DAY) {
        alert('your url contains the name workingday!!!!!!!!!!')

        Swal.fire({
          imageUrl: `${userimage}`,
          imageWidth: 200,
          imageHeight: 200,
          title: `אישור תור`,
          text: `בלחיצה על אישור תשבץ את ${username} לשעה ${Hour} ביום עבודה זה `,
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          confirmButtonText: 'אישור',
          footer: `<div id='ActionsForUSer101'>
<div id='CallClientBigBTN'><a
              
              href='tel:+972${userphone} id='smallcall'
          
            >
              <i  class='fas fa-phone-alt'></i>
            </a></div><div id='SMSBigBTN'><a
              href='tel:+972${userphone} id='smallcall'
            >
             <i class="fas fa-envelope"></i>
            </a></div></div>`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(confirmTor(clockFound._id, userid, tipulimList[0]._id)) //*hard code///
          } else if (
            result.dismiss === Swal.DismissReason.cancel ||
            result.dismiss === Swal.DismissReason.backdrop
          ) {
            ResetFunction_Cancel_or_BACKdrop()
          }
        })
        dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
      }
    }
    if (CONFIRM_TORsuccess) {
      if (ForToday) {
        ResetFunction_Cancel_or_BACKdrop()

        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'success',
          title: `בוצע בהצלחה`,
          text: `התור שביקשת נכנס בהצלחה למערכת`,
          showConfirmButton: false,
          timer: 8000,
        }).then(history.push(`/admin/workingday/${oneworkingdays[0]._id}`))
      } else if (ForTomorow) {
        ResetFunction_Cancel_or_BACKdrop()

        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'success',
          title: `בוצע בהצלחה`,
          text: `התור שביקשת נכנס בהצלחה למערכת`,
          showConfirmButton: false,
          timer: 8000,
        }).then(history.push(`/admin/workingday/${tomorrowworkingdays._id}`))
      } else if (ForSpesisficRedirect) {
        ResetFunction_Cancel_or_BACKdrop()

        Swal.fire({
          position: 'top-end',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          icon: 'success',
          title: `בוצע בהצלחה`,
          text: `התור שביקשת נכנס בהצלחה למערכת`,
          showConfirmButton: false,
          timer: 8000,
        }).then(history.push(`/admin/workingday/${WorkdayFound_ID}`))
      }
    }
    if (successclockFound && ForTomorow && name) {
      console.log(clockFound)
      console.log(`word:${word}`)
      console.log(`tipulimList:${tipulimList[0]._id}`)
      console.log(`clockFound:${clockFound._id}`)
      swalConfirmForTomorrow(clockFound._id)
    }
    if (successclockFound && IM_IN_A_SPESIFIC_WORKING_DAY && name) {
      console.log(clockFound)
      console.log(`word:${word}`)
      console.log(`tipulimList:${tipulimList[0]._id}`)
      console.log(`clockFound:${clockFound._id}`)
      swalConfirmForSpesific(clockFound._id)
    }
  }, [
    tipulimList,
    statefinalText,
    redirectHome,
    GoTorim,
    GoToday,
    onesuccess,
    tomorrowsuccess,
    weeksuccess,
    GoTOMORROW,
    successuserfound,
    confirmsuccess,
    confirm,
    successclockFound,
    CONFIRM_TORsuccess,
    ForToday,
    ForTomorow,
    ForSpesisfic,
    erroruserfound,
    list,
    word,
    name,
    phone,
    ShowConfirmAfterListUser,
    StateForNewUserWindow,
    newUserSuccess,
    sevendayssuccess,
    newUserCreateByadminError,
    history,

    clockList,
    SHOWavilableTorimForToday,
  ])

  const findClockNow = async (id, Hour) => {
    console.log(`hour to dispatch :${Hour}`)
    console.log(`id :${id}`)
    await dispatch(FindClockByWorkID_and_time(id, Hour))
  }

  const sendTodayWorkDay = async () => {
    await dispatch(listOneWorkingDay)
  }

  const sendTOMORROWWorkDay = async () => {
    console.log('going tomorrow....')
    await dispatch(getTomorrowWorkday())
    console.log('after dispatch going tomorrow....')
  }

  const PremakeTorForTommorrow = async (UserToFind, hour, half) => {
    hourCoNfigaraitor(hour, half)
    makeTorForTommorrow(UserToFind, hour)
  }
  const makeTorForTommorrow = async (UserToFind) => {
    if (window.location.href.indexOf('torim') > -1) {
      //***יש להוסיף אפשרות שאם אנחנוט בעמוד תורים */
      console.log('your url contains the name torim')
      setIM_IN_A_ADMIN_TORS(true)
      setIM_IN_A_SPESIFIC_WORKING_DAY(false)

      console.log(`hour sets :${Hour} `)
      setForTomorow(true)
      setForSpesisfic(false)
      setForToday(false)
      await dispatch(getTomorrowWorkday())
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    }
  }

  const makeTorForToday = async (UserToFind, hour, half) => {
    console.log(`hour to dispatch :${hour}`)
    hourCoNfigaraitor(hour, half)
    console.log(`hour sets :${Hour} `)
    setForToday(true)
    setForTomorow(false)
    if (window.location.href.indexOf('torim') > -1) {
      console.log('your url contains the name torim')
      setIM_IN_A_ADMIN_TORS(true)
      setIM_IN_A_SPESIFIC_WORKING_DAY(false)
      await dispatch(listOneWorkingDay)
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    } else if (window.location.href.indexOf('workingday') > -1) {
      console.log('your url contains the name workingday')
      setForToday(false)
      setForTomorow(false)
      setIM_IN_A_SPESIFIC_WORKING_DAY(true)
      setIM_IN_A_ADMIN_TORS(false)
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    }
  }
  const PremakeTorSpesificDAY = async (UserToFind, hour, dayTofind) => {
    console.log(UserToFind)
    console.log(hour)
    console.log(dayTofind)
    hourCoNfigaraitor(hour)
    makeTorSpesificDAY(UserToFind, hour, dayTofind)
  }
  const PremakeTorSpesificDAY2 = async (UserToFind, hour, half, dayTofind) => {
    console.log(UserToFind)
    console.log(hour)
    console.log(half)
    console.log(dayTofind)
    hourCoNfigaraitor(hour, half)
    makeTorSpesificDAY2(UserToFind, hour, half, dayTofind)
  }

  const makeTorSpesificDAY2 = async (UserToFind, hour, half, dayTofind) => {
    console.log(`hour to dispatch :${hour}:${half}`)
    console.log(dayTofind)
    setDayToFind(dayTofind)
    console.log(`UserToFind :${UserToFind}`)
    console.log(`hour sets :${Hour} `)
    setForSpesisfic(true)
    setForToday(false)
    setForTomorow(false)
    if (window.location.href.indexOf('torim') > -1) {
      console.log('your url contains the name torim')
      setIM_IN_A_ADMIN_TORS(true)
      setIM_IN_A_SPESIFIC_WORKING_DAY(false)
      console.log('disatching....')
      dispatch(Next7Daysss()) ///7 next days
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    } else if (window.location.href.indexOf('workingday') > -1) {
      console.log('your url contains the name workingday')
      setIM_IN_A_SPESIFIC_WORKING_DAY(true)
      setIM_IN_A_ADMIN_TORS(false)
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    }
  }
  const makeTorSpesificDAY = async (UserToFind, hour, dayTofind) => {
    console.log(`hour to dispatch :${hour}`)
    console.log(dayTofind)
    setDayToFind(dayTofind)
    console.log(`UserToFind :${UserToFind}`)
    console.log(`hour sets :${Hour} `)
    setForSpesisfic(true)
    setForToday(false)
    setForTomorow(false)
    if (window.location.href.indexOf('torim') > -1) {
      console.log('your url contains the name torim')
      setIM_IN_A_ADMIN_TORS(true)
      setIM_IN_A_SPESIFIC_WORKING_DAY(false)
      console.log('disatching....')
      dispatch(Next7Daysss()) ///7 next days
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    } else if (window.location.href.indexOf('workingday') > -1) {
      console.log('your url contains the name workingday')
      setIM_IN_A_SPESIFIC_WORKING_DAY(true)
      setIM_IN_A_ADMIN_TORS(false)
      setUserToFindX(UserToFind)
      await dispatch(SearchOneUserAction(UserToFind))
    }
  }

  return (
    <div>
      {SHOWMEArrOFavilableClocksForToday && (
        <AvilableBox
          close={() => ResetFunction_Cancel_or_BACKdrop()}
          list={ArrOFavilableClocksForToday}
        />
      )}

      {ShowIfNotFoundByVoiceUsers && (
        <UserFIlterMakeTorVoiceControll
          close={() => ResetFunction_Cancel_or_BACKdrop()}
          nameNotFound={UserToFindX}
          changeWord={(word) => setWord(word)}
          changeName={(name) => setName(name)}
          changePhone={(phone) => setPhone(phone)}
          changeImage={(userImage) => setuserImage(userImage)}
          changeStateForNewUserWindow={(StateForNewUserWindow) =>
            setStateForNewUserWindow(StateForNewUserWindow)
          }
          ChangeusertoRegister={(userToRegister) =>
            setuserToRegister(userToRegister)
          }
          changeStateForShowingConfirmAfterListUser={(
            ShowConfirmAfterListUser
          ) => setShowConfirmAfterListUser(true)}
          list={list}
        />
      )}
      <div
        className={!listening ? 'microphone-btn' : 'microphone-btnOnclick'}
        onMouseDown={toggleListen}
        onMouseUp={toggleListenfalse}
        onMouseLeave={toggleL}
        onTouchStart={toggleListen}
        onTouchEnd={toggleListenfalse}
        onTouchMove={toggleL}
      >
        <i id='fontawsomeMicro' class='fas fa-microphone'></i>
      </div>
      <div id='interim'></div>
      <div id='final'></div>
    </div>
  )
}

export default Speech

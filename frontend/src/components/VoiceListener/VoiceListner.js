//************backyp voicelistener 3:00*****/**

'use strict'
import Swal from 'sweetalert2'
import './VoiceListner.css'
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

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
} from '../../actions/userActions'
import {
  ONE_WORKING_DAY_RESET,
  TOMORROW_WORKING_DAY_RESET,
  ONE_USER_SEARCH_RESET,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET,
  CONFIRM_TOR_RESET,
} from '../../constants/userConstants'
import audio from './wateDropSound.wav'
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

  const Tors = useSelector((state) => state.Tors)
  const { loading, error, clockList } = Tors
  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const {
    success: confirmsuccess,
    confirm,
    loadingConfirm,
    errorConfirm,
    CONFIRM_TORsuccess,
  } = confirmMyTor

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
  const [ForToday, setForToday] = useState(false)
  const [ForTomorow, setForTomorow] = useState(false)
  const [isMouseDown, setisMouseDown] = useState(false)
  const [
    PushTOworkingdayAfterPinuiAvilableTorim,
    setPushTOworkingdayAfterPinuiAvilableTorim,
  ] = useState(false)
  const aydioo = new Audio(audio)
  const toggleListen = () => {
    aydioo.play()
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
      let OpenAllTorimArr2 = [
        'תורים',
        'את',
        'מורים',
        'טורים',
        'לטורים',
        'התורים',
        'הטורים',
      ]
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
      let arrayyy_CANCEL1 = [
        'תורים',
        'טורים',
        'שורים',
        'סורים',
        'מורים',
        'קוראים',
        'התורים',
        'הדובים',
        'הטובים',
        'הטורים',
        'הדברים',
      ]
      let arrayyy_CANCEL2 = [
        'הפנוים',
        'פנויים',
        'זמינים',
        'הזמינים',
        'מזמינים',
        'פנויים',
        'פנויים',
      ]
      let arrayyy_CANCEL3 = ['היום', 'להיום', 'יום', 'כיום', 'מהיום']
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
      let arrayyy0 = [
        'קבע',
        'קבעת',
        'תקבע',
        'קובעת',
        'תקווה',
        'נקבע',
        'קובע',
        'קובע',
        'אקבע',
        'נקבע',
        'מה',
        'אבל',
        'בעל',
        'כבר',
        'וואלה',
        'כבעל',
      ]
      let arrayyy1 = [
        'תור',
        'מור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
        'בתור',
        'קור',
        'נור',
        'נאור',
        'טהור',
      ]
      let arrayyy2 = ['היום', 'להיום', 'יום', 'כיום', 'מהיום']
      let arrayyy5 = ['שבשעה', 'בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה']
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

      let arrayy0 = [
        'קבע',
        'כבד',
        'קבעת',
        'תקבע',
        'קובעת',
        'קובע',
        'קובע',

        'תקווה',
        'אקבע',
        'נקבע',
        'מה',
        'אבל',
        'בעל',
        'כבר',
        'וואלה',
        'כבעל',
      ]
      let arrayy1 = [
        'תור',
        'מור',
        'בתור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
      ]
      let arrayy4 = ['היום', 'להיום', 'יום', 'כיום', 'מהיום']
      let arrayy5 = ['שבשעה', 'בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה']

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
      let arrayyyyyy0 = [
        'קבע',
        'קבעת',
        'תקבע',
        'קובעת',
        'קובע',

        'תקווה',
        'אקבע',
        'נקבע',
        'מה',
        'אבל',
        'בעל',
        'כבר',
        'וואלה',
        'כבעל',
      ]
      let arrayyyyyy1 = [
        'תור',
        'מור',
        'בתור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
      ]
      let arrayyyyyy4 = ['שבשעה', 'בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה']

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

      let arrayyyyyyx0 = [
        'תור',
        'מור',
        'כפתור',
        'מטול',
        'מסור',
        'מסור',
        'נכון',
        'הכל',
        'התור',
        'מטור',
        'בתור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
      ]
      let arrayyyyyyx3 = ['בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה', 'שבשעה']

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

      let arrayyyyyyxz0 = [
        'תור',
        'תובל',
        'מור',
        'כפתור',
        'מטול',
        'מסור',
        'מסור',
        'נכון',
        'הכל',
        'התור',
        'מטור',
        'בתור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
      ]
      let arrayyyyyyxz3 = ['היום', 'יום', 'כיום', 'יון', 'נכון']
      let arrayyyyyyxz4 = ['בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה', 'שבשעה']

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

      let arrayyyyy0 = [
        'קבע',
        'קבעת',
        'תקבע',
        'תקווה',
        'קובעת',
        'אקבע',
        'קבעת',
        'נקבע',
        'קובע',

        'מה',
        'אבל',
        'בעל',
        'כבר',
        'וואלה',
        'כבעל',
      ]
      let arrayyyyy1 = [
        'תור',
        'מור',
        'בתור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
      ]
      let arrayyyyy4 = ['ממחר', 'מחר', 'לשחר', 'לשחכר', 'למחר']
      let arrayyyyy5 = ['שבשעה', 'בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה']

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
              makeTorForTommorrow(UserToFind, hour, half)
            } else {
              makeTorForTommorrow(UserToFind, hour)
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
      let arrayyyy0 = [
        'קבע',
        'קבעת',
        'תקבע',
        'תקווה',
        'קובעת',
        'אקבע',
        'נקבע',
        'קובע',

        'מה',
        'אבל',
        'בעל',
        'כבר',
        'וואלה',
        'כבעל',
        'קובע',
      ]
      let arrayyyy1 = [
        'תור',
        'מור',
        'שור',
        'סור',
        'קור',
        'טור',
        'טוב',
        'טוסט',
        'בתור',
      ]
      let arrayyyy2 = ['נחל', 'שחר', 'שכר', 'מחר', 'למחר']
      let arrayyyy5 = ['בשעה', 'לשעה', 'שעה', 'נשמה', 'כשעה', 'שבשעה']

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
    }
    setisMouseDown(false)

    //---------------END OF COMMENDS--------------------------------------------------------
    recognition.onerror = (event) => {
      console.log('Error occurred in recognition: ' + event.error)
    }
  }

  // ██╗   ██╗███████╗███████╗    ███████╗███████╗███████╗███████╗ ██████╗████████╗
  // ██║   ██║██╔════╝██╔════╝    ██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝╚══██╔══╝
  // ██║   ██║███████╗█████╗      █████╗  █████╗  █████╗  █████╗  ██║        ██║
  // ██║   ██║╚════██║██╔══╝      ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██║        ██║
  // ╚██████╔╝███████║███████╗    ███████╗██║     ██║     ███████╗╚██████╗   ██║
  //  ╚═════╝ ╚══════╝╚══════╝    ╚══════╝╚═╝     ╚═╝     ╚══════╝ ╚═════╝   ╚═╝
  useEffect(() => {
    if (tipulimList) {
      console.log(tipulimList[0]._id)
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
    }

    if (successuserfound) {
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
        dispatch({ type: ONE_USER_SEARCH_RESET })
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
        dispatch({ type: ONE_USER_SEARCH_RESET })
      }
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
    if (successclockFound) {
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
          footer: `<a href="">התקשר לנייד של ${username} בנייד 0${userphone}</a>`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await dispatch(
              confirmTor(clockFound._id, userid, tipulimList[0]._id)
            ) //*hard code///
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
          footer: `<a href="">התקשר לנייד של ${username} בנייד 0${userphone}</a>`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(confirmTor(clockFound._id, userid, tipulimList[0]._id)) //*hard code///
          }
        })
        dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
      }
    }
    if (CONFIRM_TORsuccess) {
      if (ForToday) {
        dispatch({ type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET })
        dispatch({ type: CONFIRM_TOR_RESET })

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
      }
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
    history,
  ])

  const findClockNow = async (id, Hour) => {
    console.log(`hour to dispatch :${Hour}`)
    console.log(`hour to dispatch :${Hour}`)
    console.log(`hour to dispatch :${Hour}`)
    console.log(`hour to dispatch :${Hour}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)
    console.log(`id :${id}`)

    await dispatch(FindClockByWorkID_and_time(id, Hour))
  }

  const sendTodayWorkDay = async () => {
    await dispatch(listOneWorkingDay)
  }

  const sendTOMORROWWorkDay = async () => {
    console.log('going tomorrow....')
    console.log('going tomorrow....')
    console.log('going tomorrow....')
    console.log('going tomorrow....')
    await dispatch(getTomorrowWorkday())
    console.log('after dispatch going tomorrow....')
  }

  const makeTorForTommorrow = async (UserToFind, hour, half) => {
    console.log(`hour to dispatch :${hour}`)
    if (hour === 7 || (hour === 'שבע' && half === '')) {
      SetHour('7:00' || hour === '7')
    } else if (hour === '7:30') {
      SetHour('7:30')
    } else if (hour === 8 || hour === 'שמונה' || hour === '8') {
      SetHour('8:00')
    } else if (hour === '8:30' || (hour === '8' && half === 'וחצי')) {
      SetHour('8:30')
    } else if (hour === '9:00' || hour === '9') {
      SetHour('9:00')
    } else if (hour === '9:30' || (hour === '9' && half === 'וחצי')) {
      SetHour('9:30')
    } else if (hour === '10:00' || hour === 'עשר' || hour === '10') {
      SetHour('10:00')
    } else if (hour === '10:30' || (hour === '10' && half === 'וחצי')) {
      SetHour('10:30')
    } else if (hour === '11:00' || hour === '11') {
      SetHour('11:00')
    } else if (hour === '11:30' || (hour === '11' && half === 'וחצי')) {
      SetHour('11:30')
    } else if (
      hour === '12:00' ||
      (hour === 'שניים' && half === 'עשרה') ||
      (hour === 'שתיים' && half === 'עשרה') ||
      (hour === '2' && half === 'עשרה')
    ) {
      SetHour('12:00')
    } else if (hour === '12:30' || (hour === '12' && half === 'וחצי')) {
      SetHour('12:30')
    } else if (
      hour === '13:00' ||
      hour === '1:00' ||
      hour === '1' ||
      hour === 'אחת' ||
      hour === 'אחד'
    ) {
      SetHour('13:00')
    } else if (
      hour === '13:30' ||
      hour === '1:30' ||
      (hour === '1' && half === 'וחצי') ||
      (hour === 'אחת' && half === 'וחצי') ||
      (hour === 'אחד' && half === 'וחצי')
    ) {
      SetHour('13:30')
    } else if (
      hour === '14:00' ||
      hour === '2:00' ||
      hour === '2' ||
      hour === 'שתיים' ||
      hour === 'שניים'
    ) {
      SetHour('14:00')
    } else if (
      hour === '14:30' ||
      hour === '2:30' ||
      (hour === '2' && half === 'וחצי') ||
      (hour === 'שתיים' && half === 'וחצי') ||
      (hour === 'שניים' && half === 'וחצי')
    ) {
      SetHour('14:30')
    } else if (
      hour === '15:00' ||
      hour === '3' ||
      hour === 'שלוש' ||
      hour === '3:00'
    ) {
      SetHour('15:00')
    } else if (
      hour === '15:30' ||
      hour === '3:30' ||
      (hour === 'שלוש' && half === 'וחצי') ||
      (hour === '3' && half === 'וחצי') ||
      (hour === '3' && half === 'ושלושים') ||
      (hour === 'שלוש' && half === 'ושלושים')
    ) {
      SetHour('15:30')
    } else if (
      hour === '16:00' ||
      hour === '4' ||
      (hour === 'ארבע' && half === '') ||
      hour === 'ארבעה' ||
      hour === '4:00'
    ) {
      SetHour('16:00')
    } else if (
      hour === '16:30' ||
      hour === '4:30' ||
      (hour === 'ארבע' && half === 'וחצי') ||
      (hour === '4' && half === 'וחצי') ||
      (hour === '4' && half === 'ושלושים') ||
      (hour === 'ארבע' && half === 'ושלושים')
    ) {
      SetHour('16:30')
    } else if (
      hour === '17:00' ||
      hour === '5' ||
      hour === '5:00' ||
      hour === 'חמש' ||
      hour === 'חמש' ||
      hour === '17:00'
    ) {
      SetHour('17:00')
    } else if (
      hour === '17:30' ||
      hour === '5:30' ||
      (hour === 'חמש' && half === 'וחצי') ||
      (hour === '5' && half === 'וחצי') ||
      (hour === '5' && half === 'ושלושים') ||
      (hour === 'חמש' && half === 'ושלושים')
    ) {
      SetHour('17:30')
    } else if (
      hour === '18:00' ||
      hour === '6:00' ||
      hour === '6' ||
      (hour === 'שש' && half === '') ||
      hour === '18:00'
    ) {
      SetHour('18:00')
    } else if (
      hour === '18:30' ||
      hour === '6:30' ||
      (hour === 'שש' && half === 'וחצי') ||
      (hour === '6' && half === 'וחצי') ||
      (hour === '6' && half === 'ושלושים') ||
      (hour === 'שש' && half === 'ושלושים')
    ) {
      SetHour('18:30')
    } else if (
      (hour === '19:00' && half === 'בערב') ||
      (hour === '7' && half === 'בערב') ||
      (hour === '7:00' && half === 'בערב') ||
      (hour === 'שבע' && half === 'בערב') ||
      (hour === '19:00' && half === 'בערב')
    ) {
      SetHour('19:00')
    } else if (
      (hour === '19:30' && half === 'בערב') ||
      (hour === '7:30' && half === 'בערב')
    ) {
      SetHour('19:30')
    } else if (
      (hour === '20:00' && half === 'בערב') ||
      (hour === '8' && half === 'בערב') ||
      (hour === '8:00' && half === 'בערב') ||
      (hour === 'שמונה ' && half === 'בערב') ||
      (hour === '20:00' && half === 'בערב')
    ) {
      SetHour('20:00')
    }
    setForToday(false)
    setForTomorow(true)

    await dispatch(getTomorrowWorkday())
    await dispatch(SearchOneUserAction(UserToFind))
  }
  const makeTorForToday = async (UserToFind, hour, half) => {
    console.log(`hour to dispatch :${hour}`)
    if (hour === 7 || (hour === 'שבע' && half === '')) {
      SetHour('7:00' || hour === '7')
    } else if (hour === '7:30') {
      SetHour('7:30')
    } else if (hour === 8 || hour === 'שמונה' || hour === '8') {
      SetHour('8:00')
    } else if (hour === '8:30' || (hour === '8' && half === 'וחצי')) {
      SetHour('8:30')
    } else if (hour === '9:00' || hour === '9') {
      SetHour('9:00')
    } else if (hour === '9:30' || (hour === '9' && half === 'וחצי')) {
      SetHour('9:30')
    } else if (hour === '10:00' || hour === 'עשר' || hour === '10') {
      SetHour('10:00')
    } else if (hour === '10:30' || (hour === '10' && half === 'וחצי')) {
      SetHour('10:30')
    } else if (hour === '11:00' || hour === '11') {
      SetHour('11:00')
    } else if (hour === '11:30' || (hour === '11' && half === 'וחצי')) {
      SetHour('11:30')
    } else if (
      hour === '12:00' ||
      (hour === 'שניים' && half === 'עשרה') ||
      (hour === 'שתיים' && half === 'עשרה') ||
      (hour === '2' && half === 'עשרה')
    ) {
      SetHour('12:00')
    } else if (hour === '12:30' || (hour === '12' && half === 'וחצי')) {
      SetHour('12:30')
    } else if (
      hour === '13:00' ||
      hour === '1:00' ||
      hour === '1' ||
      hour === 'אחת' ||
      hour === 'אחד'
    ) {
      SetHour('13:00')
    } else if (
      hour === '13:30' ||
      hour === '1:30' ||
      (hour === '1' && half === 'וחצי') ||
      (hour === 'אחת' && half === 'וחצי') ||
      (hour === 'אחד' && half === 'וחצי')
    ) {
      SetHour('13:30')
    } else if (
      hour === '14:00' ||
      hour === '2:00' ||
      hour === '2' ||
      hour === 'שתיים' ||
      hour === 'שניים'
    ) {
      SetHour('14:00')
    } else if (
      hour === '14:30' ||
      hour === '2:30' ||
      (hour === '2' && half === 'וחצי') ||
      (hour === 'שתיים' && half === 'וחצי') ||
      (hour === 'שניים' && half === 'וחצי')
    ) {
      SetHour('14:30')
    } else if (
      hour === '15:00' ||
      hour === '3' ||
      hour === 'שלוש' ||
      hour === '3:00'
    ) {
      SetHour('15:00')
    } else if (
      hour === '15:30' ||
      hour === '3:30' ||
      (hour === 'שלוש' && half === 'וחצי') ||
      (hour === '3' && half === 'וחצי') ||
      (hour === '3' && half === 'ושלושים') ||
      (hour === 'שלוש' && half === 'ושלושים')
    ) {
      SetHour('15:30')
    } else if (
      hour === '16:00' ||
      hour === '4' ||
      (hour === 'ארבע' && half === '') ||
      hour === 'ארבעה' ||
      hour === '4:00'
    ) {
      SetHour('16:00')
    } else if (
      hour === '16:30' ||
      hour === '4:30' ||
      (hour === 'ארבע' && half === 'וחצי') ||
      (hour === '4' && half === 'וחצי') ||
      (hour === '4' && half === 'ושלושים') ||
      (hour === 'ארבע' && half === 'ושלושים')
    ) {
      SetHour('16:30')
    } else if (
      hour === '17:00' ||
      (hour === '5' && half === '') ||
      (hour === '5' && half === 'בערב') ||
      (hour === '5:00' && !half) ||
      (hour === '5:00' && half === '') ||
      (hour === '5:00' && half === 'בערב') ||
      (hour === 'חמש' && half === 'בערב') ||
      (hour === 'חמש' && half === '') ||
      hour === '17:00'
    ) {
      SetHour('17:00')
    } else if (
      hour === '17:30' ||
      hour === '5:30' ||
      (hour === 'חמש' && half === 'וחצי') ||
      (hour === '5' && half === 'וחצי') ||
      (hour === '5' && half === 'ושלושים') ||
      (hour === 'חמש' && half === 'ושלושים')
    ) {
      SetHour('17:30')
    } else if (
      hour === '18:00' ||
      hour === '6:00' ||
      hour === '6' ||
      (hour === 'שש' && half === '') ||
      hour === '18:00'
    ) {
      SetHour('18:00')
    } else if (
      hour === '18:30' ||
      hour === '6:30' ||
      (hour === 'שש' && half === 'וחצי') ||
      (hour === '6' && half === 'וחצי') ||
      (hour === '6' && half === 'ושלושים') ||
      (hour === 'שש' && half === 'ושלושים')
    ) {
      SetHour('18:30')
    } else if (
      (hour === '19:00' && half === 'בערב') ||
      (hour === '7' && half === 'בערב') ||
      (hour === '7:00' && half === 'בערב') ||
      (hour === 'שבע' && half === 'בערב') ||
      (hour === '19:00' && half === 'בערב')
    ) {
      SetHour('19:00')
    } else if (
      (hour === '19:30' && half === 'בערב') ||
      (hour === '7:30' && half === 'בערב')
    ) {
      SetHour('19:30')
    } else if (
      (hour === '20:00' && half === 'בערב') ||
      (hour === '8' && half === 'בערב') ||
      (hour === '8:00' && half === 'בערב') ||
      (hour === 'שמונה ' && half === 'בערב') ||
      (hour === '20:00' && half === 'בערב')
    ) {
      SetHour('20:00')
    }
    setForToday(true)
    setForTomorow(false)
    await dispatch(listOneWorkingDay)
    await dispatch(SearchOneUserAction(UserToFind))
  }

  return (
    <div>
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

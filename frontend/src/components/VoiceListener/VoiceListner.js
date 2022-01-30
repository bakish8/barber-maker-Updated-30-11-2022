'use strict'
import { SettingsPhoneRounded } from '@material-ui/icons'
import React, { Component, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  listOneWorkingDay,
  listWorkingDaysFORthisWEEK,
  SearchOneUserAction,
} from '../../actions/userActions'
import {
  ONE_WORKING_DAY_RESET,
  TOMORROW_WORKING_DAY_RESET,
} from '../../constants/userConstants'
//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = true
recognition.lang = 'he'

//------------------------COMPONENT-----------------------------
const Speech = () => {
  const dispatch = useDispatch()

  let history = useHistory()

  const ONE_WORKING_DAY = useSelector((state) => state.ONE_WORKING_DAY)
  const { onesuccess, oneworkingdays } = ONE_WORKING_DAY

  const LIST_WORK_DAYS_WEEK = useSelector((state) => state.LIST_WORK_DAYS_WEEK)
  const { weekloading, weekworkingdays, weeksuccess, weekerror } =
    LIST_WORK_DAYS_WEEK

  const SearchOneUser = useSelector((state) => state.SearchOneUser)
  const { loadinguserfound, userfound, successuserfound, erroruserfound } =
    SearchOneUser

  const [listening, setlistening] = useState(false)
  const [statefinalText, setstatefinalText] = useState('')
  const [redirectHome, setredirectHome] = useState(false)
  const [GoTorim, setGoTorim] = useState(false)
  const [GoToday, setGoToday] = useState(false)
  const [GoTOMORROW, setGoTOMORROW] = useState(false)
  const [Hour, SetHour] = useState('')

  const toggleListen = () => {
    setlistening(!listening)
    handleListen()
  }

  const handleListen = () => {
    console.log('listening?', listening)

    if (listening) {
      recognition.start()
      recognition.onend = () => {
        console.log('...continue listening...')
        recognition.start()
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
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) finalTranscript += transcript + ' '
        else interimTranscript += transcript
      }
      document.getElementById('interim').innerHTML = interimTranscript
      document.getElementById('final').innerHTML = finalTranscript

      //-------------------------COMMANDS------------------------------------

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
        OprnTorimCMD[0] === 'לטורים' ||
        OprnTorimCMD[0] === 'התורים' ||
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
        (OPEN_TODAY_CMD[0] === 'הצג' &&
          OPEN_TODAY_CMD[1] === 'את' &&
          OPEN_TODAY_CMD[0] === 'היום') ||
        (OPEN_TODAY_CMD[0] === 'פתח' &&
          OPEN_TODAY_CMD[1] === 'את' &&
          OPEN_TODAY_CMD[0] === 'היום') ||
        (OPEN_TODAY_CMD[0] === 'פתח' &&
          OPEN_TODAY_CMD[1] === 'תורים' &&
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
      /**************************** */
      const MAKE_TOR_FOR_TODAY_CMD = transcriptArr
      console.log('MAKE_TOR_FOR_TODAY_CMD', MAKE_TOR_FOR_TODAY_CMD)
      let MAKE_TOR_FOR_TODAY_Arr = ['קבע', 'תקבע']
      let MAKE_TOR_FOR_TODAY_Arr2 = ['תור', 'מתור', 'טור']
      if (
        (MAKE_TOR_FOR_TODAY_CMD[0] === 'כפתור' &&
          MAKE_TOR_FOR_TODAY_CMD[1] === 'להיום' &&
          MAKE_TOR_FOR_TODAY_CMD[5] === 'בשעה') ||
        (MAKE_TOR_FOR_TODAY_CMD[0] === 'קבע' &&
          MAKE_TOR_FOR_TODAY_CMD[1] === 'תור' &&
          MAKE_TOR_FOR_TODAY_CMD[2] === 'להיום' &&
          MAKE_TOR_FOR_TODAY_CMD[5] === 'בשעה') ||
        (MAKE_TOR_FOR_TODAY_CMD[0] === 'קבעת' &&
          MAKE_TOR_FOR_TODAY_CMD[1] === 'תור' &&
          MAKE_TOR_FOR_TODAY_CMD[2] === 'להיום' &&
          MAKE_TOR_FOR_TODAY_CMD[5] === 'בשעה') ||
        (MAKE_TOR_FOR_TODAY_CMD[0] === 'קבעת' &&
          MAKE_TOR_FOR_TODAY_CMD[1] === 'תור' &&
          MAKE_TOR_FOR_TODAY_CMD[2] === 'להיום' &&
          MAKE_TOR_FOR_TODAY_CMD[5] === 'לשעה')
      ) {
        recognition.stop()
        recognition.onend = async () => {
          console.log('MAKE TOR ACTION listening per command')
          const UserFirstNameToFind = MAKE_TOR_FOR_TODAY_CMD[3].substring(1)
          const UserLastNameToFind = MAKE_TOR_FOR_TODAY_CMD[4]
          const UserToFind = `${UserFirstNameToFind} ${UserLastNameToFind}`
          console.log(`user to find:${UserToFind}`)
          const hour = MAKE_TOR_FOR_TODAY_CMD[6]
          makeTorForToday(UserToFind, hour)

          const finalText = transcriptArr.join(' ')
          document.getElementById('final').innerHTML = finalText
          console.log(`final TEXT:, ${finalText}`)

          setstatefinalText(statefinalText)
        }
      }
    }

    //-----------------------------------------------------------------------

    recognition.onerror = (event) => {
      console.log('Error occurred in recognition: ' + event.error)
    }
  }

  useEffect(() => {
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
    }
    if (GoTOMORROW) {
      console.log('going tomorrow')
      sendTOMORROWWorkDay()
    }
    if (weeksuccess && GoTOMORROW) {
      setGoTOMORROW(false)
      console.log(
        `the woekinf day for tomorrrow dees are :${weekworkingdays[1]._id}`
      )
      history.push(`/admin/workingday/${weekworkingdays[1]._id}`)
      dispatch({ type: ONE_WORKING_DAY_RESET })
    }

    if (successuserfound) {
      console.log(`workingdayfound : ${oneworkingdays[0]._id}`)
      console.log(`userfound : ${userfound._id}`)
      console.log(`hour to confirm : ${Hour}`)
    }
  }, [
    statefinalText,
    redirectHome,
    GoTorim,
    GoToday,
    onesuccess,
    weeksuccess,
    GoTOMORROW,
    successuserfound,
    history,
  ])

  const sendTodayWorkDay = async () => {
    await dispatch(listOneWorkingDay)
  }

  const sendTOMORROWWorkDay = async () => {
    console.log('going tomorrow....')
    await dispatch(listWorkingDaysFORthisWEEK)
    console.log('after dispatch going tomorrow....')
  }
  const makeTorForToday = async (UserToFind, hour) => {
    console.log(`hour to dispatch :${hour}`)
    if (hour === 7 || hour === 'שבע') {
      SetHour('7:00')
    } else if (hour === '7:30') {
      SetHour('7:30')
    } else if (hour === 8 || hour === 'שמונה') {
      SetHour('8:00')
    } else if (hour === '8:30') {
      SetHour('8:30')
    } else if (hour === '9:00') {
      SetHour('9:00')
    } else if (hour === '9:30') {
      SetHour('9:30')
    } else if (hour === '10:00' || hour === 'עשר') {
      SetHour('10:00')
    } else if (hour === '10:30') {
      SetHour('10:30')
    } else if (hour === '11:00') {
      SetHour('11:00')
    }
    await dispatch(listOneWorkingDay)
    await dispatch(SearchOneUserAction(UserToFind))
  }

  return (
    <div style={container}>
      <button id='microphone-btn' style={button} onClick={toggleListen} />
      <div id='interim' style={interim}></div>
      <div id='final' style={final}></div>
    </div>
  )
}

export default Speech

//-------------------------CSS------------------------------------

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    width: '60px',
    height: '60px',
    background: 'lightblue',
    borderRadius: '50%',
    margin: '6em 0 2em 0',
  },
  interim: {
    color: 'gray',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px',
  },
  final: {
    color: 'black',
    border: '#ccc 1px solid',
    padding: '1em',
    margin: '1em',
    width: '300px',
  },
}

const { container, button, interim, final } = styles

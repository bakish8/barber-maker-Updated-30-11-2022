import React, { useEffect, useState } from 'react'
import './Verfy4Digits.css'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@material-ui/core'
import Swal from 'sweetalert2'

const Verfy4Digits = (props) => {
  //const [SHOW_ME_VARIFICATION, SetSHOW_ME_VARIFICATION] = useState(props.send)
  const [Show, setShow] = useState(false)
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)
  const [Arr, setArr] = useState([])
  const [arrOneValue, setarrOneValue] = useState('')
  const [arr2Value, setarr2Value] = useState('')
  const [arr3Value, setarr3Value] = useState('')
  const [arr4Value, setarr4Value] = useState('')
  const [ReadyToCheck, setReadyToCheck] = useState(false)
  const [Ready, setReady] = useState(false)

  const codes = document.getElementsByClassName('code-codeInput')
  useEffect(() => {
    if (props) {
      console.log(props.send)
    }
    if (codes) {
      setArr(codes)
    }
    if (Arr.length) {
      Arr[0].focus()
    }
    if (
      arrOneValue != '' ||
      arr2Value != '' ||
      arr3Value != '' ||
      arr4Value != ''
    ) {
      setReadyToCheck(true)
    }
    if (ReadyToCheck) {
      let CheckValue = arrOneValue + arr2Value + arr3Value + arr4Value
      if (CheckValue.length != 4 || CheckValue != props.send) {
        setReady(false)
        props.changeword(false)
      } else if (CheckValue == props.send) {
        setShow(false)
        setstateFORshowingModal(false)
        props.close()
        props.changeword(true)
      }
    }
  }, [
    props,
    stateFORshowingModal,
    codes,
    codes.length,
    Arr.length,
    ReadyToCheck,
    arrOneValue,
    arr2Value,
    arr3Value,
    arr4Value,
  ])
  const cgange1 = (e) => {
    if (e.key >= 0 && e.key <= 9) {
      setarrOneValue(e.key)
      setarr2Value('')
      setTimeout(() => {
        Arr[1].focus()
      }, 10)
    } else if (e.key === 'Backspace') {
      setReadyToCheck(false)

      console.log('delete')
      setarrOneValue('')
      setTimeout(() => {
        Arr[0].focus()
      }, 10)
    }
  }
  const cgange2 = (e) => {
    if (e.key >= 0 && e.key <= 9) {
      setarr2Value(e.key)
      setarr3Value('')
      setTimeout(() => {
        Arr[2].focus()
      }, 10)
    } else if (e.key === 'Backspace') {
      setReadyToCheck(false)

      console.log('delete')
      setarr2Value('')
      setTimeout(() => {
        Arr[0].focus()
      }, 10)
    }
  }
  const cgange3 = (e) => {
    if (e.key >= 0 && e.key <= 9) {
      setarr3Value(e.key)
      setarr4Value('')
      setTimeout(() => {
        Arr[3].focus()
      }, 10)
    } else if (e.key === 'Backspace') {
      setReadyToCheck(false)

      console.log('delete')
      setarr3Value('')
      setTimeout(() => {
        Arr[1].focus()
      }, 10)
    }
  }
  const cgange4 = (e) => {
    if (e.key >= 0 && e.key <= 9) {
      setarr4Value(e.key)
      setReadyToCheck(true)
    } else if (e.key === 'Backspace') {
      setReadyToCheck(false)
      console.log('delete')
      setarr4Value('')
      setTimeout(() => {
        Arr[2].focus()
      }, 10)
    }
  }
  return (
    <>
      {stateFORshowingModal ? (
        <Modal id='ModalStyle' open={setShow} onClose={() => props.close()}>
          <div className='Verfy4Digits_Container'>
            <h1>אישור הזדהות</h1>
            <div className='code-Container'>
              <input
                value={arrOneValue}
                onKeyDownCapture={cgange1}
                className='code-codeInput'
                type='number'
                placeholder='0'
                min='0'
                max='9'
                required
              ></input>
              <input
                value={arr2Value}
                onKeyDownCapture={cgange2}
                className='code-codeInput'
                type='number'
                placeholder='0'
                min='0'
                max='9'
                required
              ></input>
              <input
                value={arr3Value}
                onKeyDownCapture={cgange3}
                className='code-codeInput'
                type='number'
                placeholder='0'
                min='0'
                max='9'
                required
              ></input>
              <input
                value={arr4Value}
                onKeyDownCapture={cgange4}
                className='code-codeInput'
                type='number'
                placeholder='0'
                min='0'
                max='9'
                required
              ></input>
            </div>
            <small className='smallInfoDesignOnly'>
              אנא הזן את ארבעת הספרות שקיבלת לנייד שלך כדי ליצור סיסמה חדשה
            </small>
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default Verfy4Digits

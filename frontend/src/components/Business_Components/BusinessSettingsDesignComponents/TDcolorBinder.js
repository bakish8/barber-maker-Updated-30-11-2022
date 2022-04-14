import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@material-ui/core'
import Swal from 'sweetalert2'
import './TDcolorBinder.css'
const TDcolorBinder = (props) => {
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)
  const [Show, setShow] = useState(false)
  //changing color and close model function
  const functionChange = (color) => {
    props.change(color)
    props.close()
  }
  return (
    <>
      {stateFORshowingModal ? (
        <Modal id='ModalStyle' open={setShow} onClose={() => props.close()}>
          <div className='TDcolorBinder_Container'>
            <h1 className='Choosecolor'> בחר צבע</h1>

            <img
              onClick={() => functionChange('black+white')}
              id={props.color == 'black+white' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/j9CyFyq/black-white.png'
            />
            <img
              onClick={() => functionChange('strongrey+white')}
              id={props.color == 'strongrey+white' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/02TGyHM/grey-white.png'
            />
            <img
              onClick={() => functionChange('white+blue')}
              id={props.color == 'white+blue' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/Dffy1tP/blue-white.png'
            />
            <img
              onClick={() => functionChange('black+blue')}
              id={props.color == 'black+blue' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/jZGpwff/black-blue.png'
            />

            <img
              onClick={() => functionChange('white+pink')}
              id={props.color == 'white+pink' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/nP3TPYm/white-pink.png'
            />
            <img
              onClick={() => functionChange('pink+white')}
              id={props.color == 'pink+white' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/GvhN5C1/pink-white.png'
            />
            <img
              onClick={() => functionChange('black+orange')}
              id={props.color == 'black+orange' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/RyKtPSw/black-orange.png'
            />
            <img
              onClick={() => functionChange('yellow+black')}
              id={props.color == 'yellow+black' ? 'imChoosen' : ''}
              className='colorTD'
              src='https://i.ibb.co/bKQHbkR/yellow-black.png'
            />
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default TDcolorBinder

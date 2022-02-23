///****NEED TO WRITE LIVE VALIFATIONS FOR EMAIL AND PASSWORD */

//IF USER NOT IN THE SYSTEM DONT SEND EMAIL ! ! !

import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  login,
  emailLogin,
  RESET_PASSWORD_PAGE_ACTION,
  RESET_MY_PASSWORD_ACTION,
} from '../actions/userActions'
import './LoginScreen.css'
import Swal from 'sweetalert2'

const ForgottenPasswordResetByEmail = ({ location, history }) => {
  const [ID, setID] = useState('')
  const [TOKEN, setTOKEN] = useState('')

  const [email, setEmail] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [NewPassword2, setNewPassword2] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const RESET_PAGE = useSelector((state) => state.RESET_PAGE)
  const { loading, page, success, error } = RESET_PAGE

  const RESET_MY_PASSWORD = useSelector((state) => state.RESET_MY_PASSWORD)
  const { reset, loadingreset, errorreset, successreset } = RESET_MY_PASSWORD

  const url = window.location.href
  const token = url.split('/').pop()
  const id = url.split('/')[4] //to get the id in production
  const redirect = location.search ? location.search.split('=')[1] : '/login'

  useEffect(() => {
    if (id && token) {
      console.log(token)
      console.log(id)
      setID(id)
      setTOKEN(token)
      dispatch(RESET_PASSWORD_PAGE_ACTION(id, token))
    }
    if (successreset) {
      Swal.fire({
        icon: 'success',
        title: 'הססמא שלך שונתה בהצלחה',
        text: 'כעת תועבר לעמוד ההתחברות',
        showConfirmButton: false,
        timer: 3500,
      }).then(history.push(redirect))
    }
  }, [url, id, token, successreset])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!NewPassword.length || !NewPassword2) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'נא להזין את הססמא פעמיים',
        text: 'ע"מ לאשר את ססמתך החדשה יש למלא את כל השדות',
        showConfirmButton: false,
        timer: 2500,
      })
    } else if (NewPassword.length < 5 || NewPassword2 < 5) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: '!הססמא שבחרת קצרה מדי',
        text: 'בחר ססמא בעלת 6 תווים לפחות ',
        showConfirmButton: false,
        timer: 2500,
      })
    } else if (NewPassword !== NewPassword2) {
      setMessage('Passwords do not match')
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: '!הססמאות אינן תואמות',
        text: 'כדי ליצור לך ססמא חדשה נסה שנית והזן ססמאות זהות ',
        showConfirmButton: false,
        timer: 4500,
      })
    } else {
      dispatch(RESET_MY_PASSWORD_ACTION(ID, TOKEN, NewPassword))
    }
  }

  return (
    <>
      <div class='login-box'>
        <FormContainer>
          {loading && <Loader />}
          <div id='centerme'>
            <Form onSubmit={submitHandler} className='loginForm'>
              <h2 className='headlineme'>שחזור ססמא</h2>
              <div className='user-box'>
                <Form.Group controlId='email'>
                  <Form.Control
                    type='disable'
                    className='form-control'
                    placeholder={'אימייל'}
                    value={page}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div class='user-box'>
                <Form.Group controlId='password'>
                  <Form.Control
                    className='form-control'
                    placeholder='הזן ססמא חדשה'
                    type='password'
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div class='user-box'>
                <Form.Group controlId='password'>
                  <Form.Control
                    className='form-control'
                    placeholder='חזור על הססמא החדשה'
                    type='password'
                    value={NewPassword2}
                    onChange={(e) => setNewPassword2(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <Button type='submit' className='loginBTN'>
                שחזר
              </Button>
            </Form>
          </div>
        </FormContainer>
      </div>
    </>
  )
}

export default ForgottenPasswordResetByEmail

///****NEED TO WRITE LIVE VALIFATIONS FOR EMAIL AND PASSWORD */
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
  const dispatch = useDispatch()
  //states
  const [ID, setID] = useState('')
  const [TOKEN, setTOKEN] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [NewPassword2, setNewPassword2] = useState('')
  const [message, setMessage] = useState(null)
  const RESET_PAGE = useSelector((state) => state.RESET_PAGE) ///*** */
  const { loading, page, success, error } = RESET_PAGE
  const RESET_MY_PASSWORD = useSelector((state) => state.RESET_MY_PASSWORD)
  const { reset, loadingreset, errorreset, successreset } = RESET_MY_PASSWORD

  //token and id taken
  const url = window.location.href
  const token = url.split('/').pop()
  const id = url.split('/')[4] //to get the id in production
  const redirect = location.search ? location.search.split('=')[1] : '/login'
  //use Effect
  useEffect(() => {
    if (id && token) {
      console.log(`token:${token}`)
      console.log(`id:${id}`)
      setID(id)
      setTOKEN(token)
      dispatch(RESET_PASSWORD_PAGE_ACTION(id, token))
    }
    if (successreset) {
      Swal.fire({
        icon: 'success',
        title: 'הסיסמה שלך שונתה בהצלחה',
        text: 'כעת תועבר לעמוד ההתחברות',
        showConfirmButton: false,
        timer: 3500,
      }).then(history.push(redirect))
    }
  }, [url, id, token, successreset])

  //functions
  const submitHandler = (e) => {
    e.preventDefault()
    if (!NewPassword.length || !NewPassword2) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'נא להזין את הסיסמה פעמיים',
        text: 'ע"מ לאשר את ססמתך החדשה יש למלא את כל השדות',
        showConfirmButton: false,
        timer: 2500,
      })
    } else if (NewPassword.length < 5 || NewPassword2.length < 5) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: '!הסיסמה שבחרת קצרה מדי',
        text: 'בחר סיסמה בעלת 6 תווים לפחות ',
        showConfirmButton: false,
        timer: 2500,
      })
    } else if (NewPassword !== NewPassword2) {
      setMessage('Passwords do not match')
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: '!הסיסמהות אינן תואמות',
        text: 'כדי ליצור לך סיסמה חדשה נסה שנית והזן סיסמהות זהות ',
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
              <h2 className='headlineme'>שחזור סיסמה</h2>
              <div id='helloonreset'>{success && 'שלום' + ' ' + page.name}</div>
              <div class='user-box'>
                <Form.Group controlId='password'>
                  <Form.Control
                    className='form-control'
                    placeholder='הזן סיסמה חדשה'
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
                    placeholder='חזור על הסיסמה החדשה'
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

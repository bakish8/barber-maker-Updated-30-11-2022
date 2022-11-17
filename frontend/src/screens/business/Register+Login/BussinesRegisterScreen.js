//****need To Bring Back Admin ID and Only AFTER registeration !!!*/

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { CreatelNotifications, register } from '../../../actions/userActions'
import {
  getAdminName,
  getBuissnesDetails,
  register_client,
} from '../../../actions/BuissnesActions/Buissnes_User_Actions'
import './LoginScreen.css'
import moment from 'moment'
import { io } from 'socket.io-client'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import gregorian_ar from 'react-date-object/locales/gregorian_ar'

var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
var hasNumber = /\d/
var regName = /^[a-zA-Zא-ת]+ [a-zA-Zא-ת]+$/

const BussinesRegisterScreen = ({ location, history, match }) => {
  const BussinesID = match.params.id
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
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

  const [DateOfBirth, setDateOfBirth] = useState({ format: 'DD/MM/YYYY' })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [Bday, setBday] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const ClientRegister = useSelector((state) => state.ClientRegister)
  const { success, loading, error, userInfo } = ClientRegister
  const cancelNoti = useSelector((state) => state.cancelNoti)
  const {
    loading: loadingcancel_noti,
    success: successcancel_noti,
    cancel_noti,
    error: errorcancel_noti,
  } = cancelNoti
  const GetAdminName = useSelector((state) => state.GetAdminName)
  const { AdmiNameloading, AdmiName, AdmiNamesuccess, AdmiNameerror } =
    GetAdminName
  const redirect = `/business/${BussinesID}`

  useEffect(() => {
    setSocket(io())
  }, [])

  console.log(`socket:${socket}`)
  useEffect(() => {
    if (userInfo) {
      let NOW = moment()
      let now = NOW.toDate()

      dispatch(getAdminName(BussinesID))
      /*/**add if business foudn user bussines owner */
      if (AdmiName) {
        dispatch(
          CreatelNotifications(
            null,
            null,
            null,
            null,
            AdmiName.name,
            userInfo._id,
            AdmiName.id,
            3,
            now
          )
        )
        if (socket) {
          socket.emit('sendNotification', {
            senderName: userInfo.name,
            receiverName: AdmiName.name,
            type: 3,
            time: '00:00',
            dayInWeek: 'defult',
          })
        }

        history.push(redirect)
      }
    }
    if (success === false) {
      Swal.fire({
        title: 'משהו השתבש',
        text: error,
        icon: 'error',
        focusConfirm: true,
        confirmButtonText: 'אוקי, הבנתי',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
    }
  }, [history, userInfo, redirect, message, success, socket, AdmiName])

  const submitHandler = (e) => {
    e.preventDefault()
    let random = Math.floor(Math.random() * 100000000000) + 1

    let image = 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif'
    if (password !== confirmPassword) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: 'הסיסמהות אינן תואמות',
        text: 'אנא נסה שנית',
      })
    } else if (phone.length != 10 || phone.substring(0, 2) != '05') {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: ' !המספר אינו תקין ',
        text: ' יש להזין מספר נייד תקין בעל 10 ספרות וקידומת ישראלית',
      })
    } else if (
      name === '' ||
      hasNumber.test(name) === true ||
      format.test(name) === true ||
      regName.test(name) === false
    ) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: 'השם אינו תקין ',
        text: 'שדה השם הוא שדה חובה נא להזין את השם המלא שלך בעברית או באנגלית חשוב שהשם לא יכלול מספרים או אותיות מיוחידות כמו:?!@#$%^&*) ',
      })
    } else {
      dispatch(
        register_client(
          name,
          email,
          phone,
          password,
          image,
          BussinesID,
          DateOfBirth.gregorian
        )
      )
    }
  }

  const GoogleSigninsubmitHandler = () => {
    window.open('https://www.barber-maker.com/api/google', '_self')
  }

  const convert = (date, format = DateOfBirth.format) => {
    let object = { date, format }
    setDateOfBirth({
      gregorian: new DateObject(object).format(),
      jsDate: date.toDate(),
      ...object,
    })
  }
  return (
    <>
      <div class='login-box'>
        <FormContainer>
          <h2 id='headlineme'>הירשם</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <div id='centerme'>
            <Form onSubmit={submitHandler} className='loginForm'>
              <div class='user-box'>
                <Form.Group controlId='name'>
                  <Form.Control
                    type='name'
                    placeholder='הכנס שם מלא'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>

              <div class='user-box'>
                <Form.Group controlId='email'>
                  <Form.Control
                    type='email'
                    placeholder='הכנס אימייל'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>
              <div class='user-box'>
                <Form.Group controlId='phone'>
                  <Form.Control
                    type='phone'
                    placeholder='הכנס נייד'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className='user-box'>
                <DatePicker
                  onChange={convert}
                  id='BdayPicker'
                  format='DD/MM/YYYY'
                  months={months}
                  weekDays={weekDays}
                  locale={gregorian_ar}
                  placeholder='תאריך לידה'
                  digits={digits}
                  mapDays={({ date, today }) => {
                    let props = {}
                    let result = date.toDays() - today.toDays()
                    if (result === -1) props.title = 'אתמול'
                    if (result === 0) props.title = 'היום'
                    if (result === 1) props.title = 'מחר'
                    return props
                  }}
                ></DatePicker>
              </div>
              <div className='user-box'>
                <Form.Group controlId='password'>
                  <Form.Control
                    type='password'
                    placeholder='הכנס סיסמה'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>
              <div className='user-box'>
                <Form.Group controlId='confirmPassword'>
                  <Form.Control
                    type='password'
                    placeholder='אשר סיסמה'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>

              <Button type='submit' id='centermebtnlogin'>
                הירשם
              </Button>

              <Row className='whiteme'>
                <Col>
                  יש לך כבר חשבון?{' '}
                  <Link
                    id='signUp'
                    className='whiteme'
                    to={`/business/${BussinesID}/login`}
                  >
                    התחבר
                  </Link>
                </Col>
                <br />
              </Row>
              <btn onClick={GoogleSigninsubmitHandler}>
                {' '}
                <img
                  className='googleSIgnUP'
                  src='https://i.ibb.co/X3YFxN2/11111111111111111.png'
                ></img>
              </btn>
            </Form>
          </div>
        </FormContainer>
      </div>
    </>
  )
}

export default BussinesRegisterScreen

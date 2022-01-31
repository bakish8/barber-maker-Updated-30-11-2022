import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import './LoginScreen.css'

var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
var hasNumber = /\d/
var regName = /^[a-zA-Zא-ת]+ [a-zA-Zא-ת]+$/

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { success, loading, error, userInfo } = userRegister
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
    if (success === false) {
      console.log(error)
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
  }, [history, userInfo, redirect, message, success])

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
        title: 'הססמאות אינן תואמות',
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
      dispatch(register(name, email, phone, password, image))
    }
  }
  const GoogleSigninsubmitHandler = () => {
    window.open('http://localhost:5000/api/google', '_self')
    console.log('ggggggggggggggggggooogle Login TRY')
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
                <Form.Group controlId='password'>
                  <Form.Control
                    type='password'
                    placeholder='הכנס ססמא'
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
                    placeholder='אשר ססמא'
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
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}
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

export default RegisterScreen

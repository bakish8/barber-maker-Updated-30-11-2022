///****NEED TO WRITE LIVE VALIFATIONS FOR EMAIL AND PASSWORD */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  login,
  emailLogin,
  SearchOneUserBYEMAIL,
  Create15PortForResetPASSWORD,
} from '../actions/userActions'
import './LoginScreen.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import emailjs from 'emailjs-com'

const LoginScreen = ({ location, history }) => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [LoginWithPhone, setLoginWithPhone] = useState(true)
  const [LoginWithEmail, setLoginWithEmail] = useState(false)
  const [emailTyping, setEmailTyping] = useState(true)
  const [emailToSendTo, setemailToSendTo] = useState('')
  const form = useRef()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const BUILD_RESET_PAGE = useSelector((state) => state.BUILD_RESET_PAGE)
  const {
    loading: pageloading,
    page,
    success: pagesuccess,
    error: pageerror,
  } = BUILD_RESET_PAGE

  const SearchOneUserBYEMAIL = useSelector(
    (state) => state.SearchOneUserBYEMAIL
  )
  const { loadinguserfound, userfound, successuserfound, erroruserfound } =
    SearchOneUserBYEMAIL

  const userLoginEMAIL = useSelector((state) => state.userLoginEMAIL)
  const {
    loading: loadingEmail,
    error: errorEmail,
    userInfo: userInfoEmail,
  } = userLoginEMAIL

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatchSearchUserAction = (email) => {
    dispatch(SearchOneUserBYEMAIL(email))
  }

  useEffect(() => {
    if (emailToSendTo != '') {
      console.log(emailToSendTo)
    }
    if (userInfo || userInfoEmail) {
      history.push(redirect)
    }
    if (successuserfound) {
      console.log('susses!')
      console.log('userfound')
    }
    if (pagesuccess) {
      console.log('pagesuccess susses!')
      console.log(`page :${page}`)
      sendEmail()
    }
  }, [
    history,
    userInfo,
    userInfoEmail,
    redirect,
    successuserfound,
    emailToSendTo,
    pagesuccess,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(email)
    dispatch(emailLogin(email, password)) //send to actions and fowerd as email
  }
  const submitHandler2 = (e) => {
    e.preventDefault()
    dispatch(login(phone, password)) //send to actions and fowerd as email needto be fixed to phone fron action
  }

  const GoogleSigninsubmitHandler = () => {
    //window.open('http://localhost:5000/api/google', '_self')/**********production need to be  created */
    window.open(
      'https://www.barber-maker.com/api/google',
      '_self'
    ) /**********production need to be  created */
    console.log('ggggggggggggggggggooogle Login TRY')
  }
  const Swal_I_Forgot_My_Pass = () => {
    console.log('Swal_I_Forgot_My_Pass')
    Swal.fire({
      title: 'שחזור ססמא',
      text: `ניתן לשחזר את הססמא באמצעות הנייד או האימייל `,
      imageUrl: 'https://i.ibb.co/30z4Vsr/ezgif-com-gif-maker-15.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'שחזור באמצעות הנייד',
      confirmButtonText: 'שחזור באמצעות האימייל',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'שחזור באמצעות אימייל',
          text: `הזן את כתובת האימייל אליה ישלח קישור לשחזור הססמא שלך `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שחזר ססמא',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          allowOutsideClick: () => !Swal.isLoading(),

          preConfirm: async (email) => {
            setemailToSendTo(email)
            console.log(email)
            return await fetch(`/api/search/email/${email}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                } else {
                  console.log(response)
                  console.log(response.url)
                  dispatch(Create15PortForResetPASSWORD(email))
                  //axios.post('/api/forgot-password', { email })
                }
              })
              .catch((error) => {
                Swal.showValidationMessage(`האימייל שרשמת לא נמצא במערכת`)
              })
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            //  sendEmail(e).then(

            //if user found in used then send email with link
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
            //)
          }
        })

        // Swal.fire({
        //   text: 'משחזר ססמא אנא המתן',
        //   imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
        //   imageWidth: 400,
        //   imageHeight: 400,
        //   imageAlt: 'Custom image',
        //   timer: 500,
        //   background: '#68b4ff00',
        //   backdrop: 'rgba(0, 0, 0,0.8)',
        //   color: 'rgba(255, 255, 255)',
        //   showConfirmButton: false,
        // })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('your workingday is safe')
        Swal.fire({
          title: 'שחזור באמצעות הנייד',
          text: `הזן את הנייד אליו ישלח קוד חד פעמי לשחזור הססמא  `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שחזר ססמא',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          preConfirm: (email) => {
            // SetemailToSendTo(email)
          },
        }).then((result) => {
          if (result.isConfirmed) {
            //  sendEmail(e).then(
            Swal.fire({
              imageUrl: 'https://i.ibb.co/Khnvrcr/icons8-subscribe.gif',
              title: `ההודעה  נשלח בהצלחה`,
              showConfirmButton: false,
              timer: 5000,
            })
            //)
          }
        })
      }
    })
  }

  //****Email Js Send Config */
  const sendEmail = () => {
    console.log('sendind email')
    emailjs.sendForm(
      'service_39dykwd',
      'template_t1982nv',
      form.current,
      'user_MeCZIT7caY2EMmsA27uFt'
    )
  }

  return (
    <>
      {LoginWithPhone && (
        <div class='login-box'>
          <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <div id='centerme'>
              <Form onSubmit={submitHandler2} className='loginForm'>
                <h2 className='headlineme'>התחבר</h2>
                <div className='user-box'>
                  <Form.Group controlId='email'>
                    <Form.Control
                      className='form-control'
                      placeholder='נייד'
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div class='user-box'>
                  <Form.Group controlId='password'>
                    <Form.Control
                      className='form-control'
                      placeholder='ססמא'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div>
                  <btn
                    className='whitemeforgot'
                    id='signUp'
                    onClick={Swal_I_Forgot_My_Pass}
                  >
                    שחכתי ססמא
                  </btn>
                </div>
                <Button type='submit' className='loginBTN'>
                  התחבר
                </Button>
                <Button
                  onClick={() => {
                    setLoginWithPhone(false)
                    setLoginWithEmail(true)
                  }}
                  className='loginBTN1'
                >
                  התחבר באמצעות האימייל{' '}
                </Button>

                <btn onClick={GoogleSigninsubmitHandler}>
                  {' '}
                  <img
                    className='googleSIgnUP'
                    src='https://i.ibb.co/X3YFxN2/11111111111111111.png'
                  ></img>
                </btn>
                <Row className='py-3'>
                  <Col>
                    <div className='whiteme'>
                      לקוח חדש?{' '}
                      <Link
                        id='signUp'
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : '/register'
                        }
                      >
                        הירשם
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </FormContainer>
        </div>
      )}
      {LoginWithEmail && (
        <div class='login-box'>
          <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <div id='centerme'>
              <Form onSubmit={submitHandler} className='loginForm'>
                <h2 className='headlineme'>התחבר</h2>
                <div className='user-box'>
                  <Form.Group controlId='email'>
                    <Form.Control
                      className='form-control'
                      placeholder='אימייל'
                      type='email'
                      value={email}
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
                      placeholder='ססמא'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <div>
                  <btn
                    className='whitemeforgot'
                    id='signUp'
                    onClick={Swal_I_Forgot_My_Pass}
                  >
                    שחכתי ססמא
                  </btn>
                </div>
                <Button type='submit' className='loginBTN'>
                  התחבר
                </Button>
                <Button
                  onClick={() => {
                    setLoginWithPhone(true)
                    setLoginWithEmail(false)
                  }}
                  className='loginBTN1'
                >
                  התחבר באמצעות הנייד{' '}
                </Button>
                <Row className='py-3'>
                  <Col>
                    <div className='whiteme'>
                      לקוח חדש?{' '}
                      <Link
                        id='signUp'
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : '/register'
                        }
                      >
                        הירשם
                      </Link>
                    </div>
                  </Col>
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
      )}
      <form id='disableView' method='post' ref={form} onSubmit={sendEmail}>
        <input type='email' name='user_email' value={emailToSendTo} />
        <input type='text' name='reset_link' value={page} />
      </form>
    </>
  )
}

export default LoginScreen

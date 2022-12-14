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
  Create15PortForResetPASSWORD_withPhone,
  Send_RESET_PASS_SMS,
} from '../actions/userActions'
import './LoginScreen.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import emailjs from 'emailjs-com'
import Verfy4Digits from '../components/Verfy4Digits/Verfy4Digits.js'
import { SEND_RESET_SMS_TOR_RESET } from '../constants/userConstants'
const LoginScreen = ({ location, history }) => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [LoginWithPhone, setLoginWithPhone] = useState(true)
  const [LoginWithEmail, setLoginWithEmail] = useState(false)
  const [emailTyping, setEmailTyping] = useState(true)
  const [emailToSendTo, setemailToSendTo] = useState('')
  const [PhoneToSendTo, SetPhoneToSendTo] = useState('')
  const [SHOW_ME_VARIFICATION, SetSHOW_ME_VARIFICATION] = useState('')
  const [word, setWord] = useState(false)

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

  const BUILD_RESET_PAGE_FOR_PHONE = useSelector(
    (state) => state.BUILD_RESET_PAGE_FOR_PHONE
  )
  const { pagePhone, loadingPhone, errorPhone, successPhone } =
    BUILD_RESET_PAGE_FOR_PHONE

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

  const SendTorSMS_RESET = useSelector((state) => state.SendTorSMS_RESET)
  const { loadingSendSMS, successSend, send } = SendTorSMS_RESET

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const dispatchSearchUserAction = (email) => {
    dispatch(SearchOneUserBYEMAIL(email))
  }

  useEffect(() => {
    if (emailToSendTo != '') {
    }
    if (userInfo || userInfoEmail) {
      if (userInfo) {
        if (userInfo.workingIn) {
          history.push(`/business/${userInfo.workingIn}`)
        } else if (
          userInfo.ClientOfBusiness &&
          userInfo.ClientOfBusiness != 0
        ) {
          history.push(`/business/${userInfo.ClientOfBusiness}`)
        } else {
          history.push(redirect)
        }
      }
    }

    if (pagesuccess) {
      console.log('pagesuccess susses!')
      console.log(`page :${page}`)
      sendEmail()
    }
    if (successPhone) {
      console.log('success Phone susses!')
      console.log(`successPhone  :${pagePhone}`)
      let PAGEPHONE = pagePhone
      dispatch({ type: SEND_RESET_SMS_TOR_RESET })
      history.push(PAGEPHONE)
    }
    if (successSend) {
      SetSHOW_ME_VARIFICATION(true)
    }
    if (word) {
      setWord(false)
      SetSHOW_ME_VARIFICATION(false)
      dispatch(Create15PortForResetPASSWORD_withPhone(PhoneToSendTo))
      Swal.fire({
        title: '?????? ???????????? ???????? ??????????',
        text: '?????? ?????????? ?????? ???????????? ???????????? ??????',
        icon: 'success',
        showCancelButton: false,
        showConfirmButton: false,
      })
    }
  }, [
    history,
    userInfo,
    userInfoEmail,
    redirect,
    successuserfound,
    emailToSendTo,
    pagesuccess,
    successPhone,
    successSend,
    word,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(emailLogin(email, password)) //send to actions and fowerd as email
  }
  const submitHandler2 = (e) => {
    e.preventDefault()
    if (phone.length != 10 || phone.substring(0, 2) != '05') {
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
        title: ' !?????????? ???????? ???????? ',
        text: ' ???? ?????????? ???????? ???????? ???????? ?????? 10 ?????????? ?????????????? ??????????????',
      })
    } else {
      dispatch(login(phone, password)) //send to actions and fowerd as email needto be fixed to phone fron action
    }
  }

  const Swal_I_Forgot_My_Pass = () => {
    Swal.fire({
      title: '?????????? ??????????',
      text: `???????? ?????????? ???? ???????????? ?????????????? ?????????? ???? ?????????????? `,
      imageUrl: 'https://i.ibb.co/30z4Vsr/ezgif-com-gif-maker-15.gif',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      cancelButtonText: '?????????? ?????????????? ??????????',
      confirmButtonText: '?????????? ?????????????? ??????????????',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '?????????? ?????????????? ????????????',
          text: `?????? ???? ?????????? ?????????????? ???????? ???????? ?????????? ???????????? ???????????? ?????? `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: '??????????',
          confirmButtonText: '???????? ??????????',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          allowOutsideClick: () => !Swal.isLoading(),

          preConfirm: async (email) => {
            setemailToSendTo(email)
            return await fetch(`/api/search/email/${email}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                } else {
                  dispatch(Create15PortForResetPASSWORD(email))
                  //axios.post('/api/forgot-password', { email })
                }
              })
              .catch((error) => {
                Swal.showValidationMessage(`?????????????? ?????????? ???? ???????? ????????????`)
              })
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            //  sendEmail(e).then(

            //if user found in used then send email with link
            Swal.fire({
              imageUrl: 'https://i.ibb.co/8sscqJ0/animation-300-kzzdqz4y.gif',
              title: `?????????????? ???????? ????????????`,
              showConfirmButton: false,

              timer: 5000,
            })
            //)
          }
        })

        // Swal.fire({
        //   text: '?????????? ?????????? ?????? ????????',
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
        Swal.fire({
          title: '?????????? ?????????????? ??????????',
          text: `?????? ???? ?????????? ???????? ???????? ?????? ???? ???????? ???????????? ????????????  `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: '??????????',
          confirmButtonText: '???????? ??????????',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          preConfirm: async (phone) => {
            SetPhoneToSendTo(phone)
            return await fetch(`/api/search/phones/${phone}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                } else {
                  /****here create a auth sms to phone  */
                  dispatch(Send_RESET_PASS_SMS(phone))
                }
              })
              .catch((error) => {
                Swal.showValidationMessage(`?????????? ?????????? ???? ???????? ????????????`)
              })
          },
        }).then((result) => {
          if (result.isConfirmed) {
            //  sendEmail(e).then(
            Swal.fire({
              imageUrl: 'https://i.ibb.co/8sscqJ0/animation-300-kzzdqz4y.gif',
              title: `????????????  ???????? ????????????`,
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

  const closemodel = () => {
    SetSHOW_ME_VARIFICATION(false)
  }

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: '??????????',
        text: `${error}`,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> ??????????',
      })
    }
    if (errorEmail) {
      Swal.fire({
        icon: 'error',
        title: '??????????',
        text: `${errorEmail}`,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> ??????????',
      })
    }
  }, [error, errorEmail])
  return (
    <>
      {SHOW_ME_VARIFICATION && (
        <Verfy4Digits
          changeword={(word) => setWord(word)}
          close={() => closemodel()}
          send={send}
        />
      )}

      {LoginWithPhone && (
        <div class='login-box'>
          <FormContainer>
            {loading && <Loader />}
            <div id='centerme'>
              <Form onSubmit={submitHandler2} className='loginForm'>
                <h2 className='headlineme'>??????????</h2>
                <div className='user-box'>
                  <Form.Group controlId='email'>
                    <Form.Control
                      className='form-control'
                      placeholder='????????'
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
                      placeholder='??????????'
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
                    ?????????? ??????????
                  </btn>
                </div>
                <Button type='submit' className='loginBTN'>
                  ??????????
                </Button>
                <Button
                  onClick={() => {
                    setLoginWithPhone(false)
                    setLoginWithEmail(true)
                  }}
                  className='loginBTN1'
                >
                  ?????????? ?????????????? ??????????????{' '}
                </Button>

                <Row className='py-3'>
                  <Col>
                    <div className='whiteme'>
                      ???????? ???????{' '}
                      <Link
                        id='signUp'
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : '/register'
                        }
                      >
                        ??????????
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
            {loading && <Loader />}
            <div id='centerme'>
              <Form onSubmit={submitHandler} className='loginForm'>
                <h2 className='headlineme'>??????????</h2>
                <div className='user-box'>
                  <Form.Group controlId='email'>
                    <Form.Control
                      className='form-control'
                      placeholder='????????????'
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
                      placeholder='??????????'
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
                    ?????????? ??????????
                  </btn>
                </div>
                <Button type='submit' className='loginBTN'>
                  ??????????
                </Button>
                <Button
                  onClick={() => {
                    setLoginWithPhone(true)
                    setLoginWithEmail(false)
                  }}
                  className='loginBTN1'
                >
                  ?????????? ?????????????? ??????????{' '}
                </Button>
                <Row className='py-3'>
                  <Col>
                    <div className='whiteme'>
                      ???????? ???????{' '}
                      <Link
                        id='signUp'
                        to={
                          redirect
                            ? `/register?redirect=${redirect}`
                            : '/register'
                        }
                      >
                        ??????????
                      </Link>
                    </div>
                  </Col>
                </Row>
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

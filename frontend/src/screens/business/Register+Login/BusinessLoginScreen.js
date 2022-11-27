///****NEED TO WRITE LIVE VALIFATIONS FOR EMAIL AND PASSWORD */
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import {
  login,
  emailLogin,
  SearchOneUserBYEMAIL,
  Create15PortForResetPASSWORD,
  Create15PortForResetPASSWORD_withPhone,
  Send_RESET_PASS_SMS,
} from '../../../actions/userActions'
import './LoginScreen.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import emailjs from 'emailjs-com'
import Verfy4Digits from '../../../components/Verfy4Digits/Verfy4Digits.js'
import { SEND_RESET_SMS_TOR_RESET } from '../../../constants/userConstants'
import { getBuissnesDetails } from '../../../actions/BuissnesActions/Buissnes_User_Actions'
const BusinessLoginScreen = ({ location, history, match }) => {
  const BusinessId = window.location.pathname.split('/')[2]
  let URLL = `${BusinessId}`
  localStorage.setItem('roll-back-business', URLL)
  const BussinesID = match.params.id
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
  const GetBusinessDetails = useSelector((state) => state.GetBusinessDetails)
  const {
    loading: BussinesLoading,
    business,
    success,
    error: BussinesError,
  } = GetBusinessDetails

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

  //const redirect = location.search ? location.search.split('=')[1] : '/'
  const redirect = `/business/${BussinesID}`

  const dispatchSearchUserAction = (email) => {
    dispatch(SearchOneUserBYEMAIL(email))
  }

  useEffect(() => {
    dispatch(getBuissnesDetails(BussinesID))
  }, [dispatch])

  useEffect(() => {
    if (userInfo || userInfoEmail) {
      history.push(redirect)
    }

    if (pagesuccess) {
      sendEmail()
    }
    if (successPhone) {
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
        title: 'קוד השחזור אומת בצלחה',
        text: 'מיד תועבר לדף לשחזור הסיסמה שלך',
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

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: `${error}`,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> הבנתי',
      })
    }
    if (errorEmail) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: `${errorEmail}`,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> הבנתי',
      })
    }
  }, [error, errorEmail])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(emailLogin(email, password)) //send to actions and fowerd as email
  }
  const submitHandler2 = (e) => {
    e.preventDefault()
    dispatch(login(phone, password)) //send to actions and fowerd as email needto be fixed to phone fron action
  }

  const GoogleSigninsubmitHandler = () => {
    window.open('https://www.barber-maker.com/api/google', '_self')
  }
  const Swal_I_Forgot_My_Pass = () => {
    Swal.fire({
      title: 'שחזור סיסמה',
      text: `ניתן לשחזר את הסיסמה באמצעות הנייד או האימייל `,
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
          text: `הזן את כתובת האימייל אליה ישלח קישור לשחזור הסיסמה שלך `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שחזר סיסמה',
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
                  axios.post('/api/forgot-password', { email })
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
              imageUrl: 'https://i.ibb.co/8sscqJ0/animation-300-kzzdqz4y.gif',
              title: `האימייל נשלח בהצלחה`,
              showConfirmButton: false,

              timer: 5000,
            })
            //)
          }
        })

        // Swal.fire({
        //   text: 'משחזר סיסמה אנא המתן',
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
          title: 'שחזור באמצעות הנייד',
          text: `הזן את הנייד אליו ישלח קוד חד פעמי לשחזור הסיסמה  `,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'ביטול',
          confirmButtonText: 'שחזר סיסמה',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          preConfirm: async (phone) => {
            SetPhoneToSendTo(phone)
            return await fetch(`/api/search/phones/${phone}`)
              ////******** */   dispatch(Create15PortForResetPASSWORD(email))

              .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                } else {
                  /****here create a auth sms to phone  */
                  dispatch(Send_RESET_PASS_SMS(phone))
                }
              })
              .catch((error) => {
                Swal.showValidationMessage(`המספר שרשמת לא נמצא במערכת`)
              })
          },
        }).then((result) => {
          if (result.isConfirmed) {
            //  sendEmail(e).then(
            Swal.fire({
              imageUrl: 'https://i.ibb.co/8sscqJ0/animation-300-kzzdqz4y.gif',
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

  const closemodel = () => {
    SetSHOW_ME_VARIFICATION(false)
  }

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
                      placeholder='סיסמה '
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
                    שחכתי סיסמה
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
                      <Link id='signUp' to={`/business/${BussinesID}/register`}>
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
                      placeholder='סיסמה'
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
                    שחכתי סיסמה
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
                      <Link id='signUp' to={`/business/${BussinesID}/register`}>
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

export default BusinessLoginScreen

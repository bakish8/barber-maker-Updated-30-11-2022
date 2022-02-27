///****NEED TO WRITE LIVE VALIFATIONS FOR EMAIL AND PASSWORD */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, emailLogin } from '../actions/userActions'
import './LoginScreen.css'
const LoginScreen = ({ location, history }) => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [LoginWithPhone, setLoginWithPhone] = useState(true)
  const [LoginWithEmail, setLoginWithEmail] = useState(false)
  const [emailTyping, setEmailTyping] = useState(true)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const userLoginEMAIL = useSelector((state) => state.userLoginEMAIL)
  const {
    loading: loadingEmail,
    error: errorEmail,
    userInfo: userInfoEmail,
  } = userLoginEMAIL

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo || userInfoEmail) {
      history.push(redirect)
    }
  }, [history, userInfo, userInfoEmail, redirect])

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
    </>
  )
}

export default LoginScreen

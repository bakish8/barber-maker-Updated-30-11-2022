import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import './LoginScreen.css'
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailTyping, setEmailTyping] = useState(true)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const GoogleSigninsubmitHandler = () => {
    window.open('http://localhost:5000/api/google', '_self')
    console.log('ggggggggggggggggggooogle Login TRY')
  }

  return (
    <>
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
                      setEmail(e.target.value) && setEmailTyping(true)
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
    </>
  )
}

export default LoginScreen

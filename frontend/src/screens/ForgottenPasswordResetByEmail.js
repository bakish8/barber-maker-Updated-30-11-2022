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
import Swal from 'sweetalert2'

const ForgottenPasswordResetByEmail = ({ location, history }) => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [NewPassword, setNewPassword] = useState('')
  const [NewPassword2, setNewPassword2] = useState('')

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
    console.log('email')
    //console.log(email)
    //dispatch(emailLogin(email, password))   //cchange ! ! !
  }

  return (
    <>
      <div class='login-box'>
        <FormContainer>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <div id='centerme'>
            <Form onSubmit={submitHandler} className='loginForm'>
              <h2 className='headlineme'>שחזור ססמא</h2>
              <div className='user-box'>
                <Form.Group controlId='email'>
                  <Form.Control
                    className='form-control'
                    placeholder='אימייל'
                    value={phone}
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
                    value={password}
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
                    value={password}
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

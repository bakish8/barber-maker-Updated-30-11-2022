import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    let random = Math.floor(Math.random() * 100000000000) + 1

    let image = random
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, phone, password, image))
    }
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
            <Form onSubmit={submitHandler} className='whitemeandblackbg'>
              <div class='user-box'>
                <Form.Group controlId='name'>
                  <Form.Control
                    type='name'
                    placeholder='הכנס שם מלא'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              <div class='user-box'>
                <Form.Group controlId='password'>
                  <Form.Control
                    type='password'
                    placeholder='הכנס ססמא'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div class='user-box'>
                <Form.Group controlId='confirmPassword'>
                  <Form.Control
                    type='password'
                    placeholder='אשר ססמא'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <Button type='submit' id='centermebtnlogin'>
                הירשם
              </Button>
            </Form>
          </div>

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
          </Row>
        </FormContainer>
      </div>
    </>
  )
}

export default RegisterScreen

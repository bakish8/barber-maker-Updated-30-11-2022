import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (
    <>
      <div class='login-box'>
        <FormContainer>
          <h2 id='headlineme'>התחבר</h2>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <div id='centerme'>
            <Form onSubmit={submitHandler} className='whitemeandblackbg'>
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
                <Form.Group controlId='password'>
                  <Form.Control
                    type='password'
                    placeholder='הכנס ססמא'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <Button id='centermebtnlogin' type='submit' variant='primary'>
                התחבר
              </Button>
            </Form>
          </div>

          <Row className='py-3'>
            <Col>
              <div className='whiteme'>
                לקוח חדש?{' '}
                <Link
                  id='signUp'
                  className='whiteme'
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  הירשם
                </Link>
              </div>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </>
  )
}

export default LoginScreen

import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

import { Calendar, DateObject } from 'react-multi-date-picker'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import gregorian_ar from 'react-date-object/locales/gregorian_ar'
import { addDays } from 'date-fns'

const MakeTorScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const [startDate, setStartDate] = useState(new Date())
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
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const [state, setState] = useState({ format: 'DD/MM/YYYY' })

  const convert = (date, format = state.format) => {
    let object = { date, format }
    setState({
      gregorian: new DateObject(object).format(),
      jsDate: date.toDate(),
      ...object,
    })
    let day = `${date.weekDay.number}`
    let dateLink = `${date.day}_${date.month.number}_${date.year}_${date.weekDay.number}`
    console.log(dateLink)
    let dateData = `${date.day}/${date.month.number}/${date.year}`
    console.log(dateData)
  }

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUserProfile({ id: user._id, name, email, password, phone }))
  }

  return (
    <Row>
      <Col md={9}>
        <h2 id='headlineme'>קבע תור</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <div id='centerme1'>
            <Calendar
              value={state.date}
              onChange={convert}
              className='bg-dark'
              format='DD/MM/YYYY'
              weekDays={weekDays}
              months={months}
              minDate={startDate}
              maxDate={addDays(new Date(), 30)}
              locale={gregorian_ar}
              digits={digits}
              mapDays={({ date, today }) => {
                let isWeekend = [6].includes(date.weekDay.index)
                let props = {}
                let result = date.toDays() - today.toDays()

                if (isWeekend)
                  return {
                    disabled: true,
                    style: { color: '#6c757d' },
                  }
                if (result === -1) props.title = 'אתמול'
                if (result === 0) props.title = 'היום'
                if (result === 1) props.title = 'מחר'

                return props
              }}
            />
          </div>
        )}
      </Col>
      <Col md={3}>
        <h2 id='headlineme'>משתמש</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>שם</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>אימייל</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>נייד</Form.Label>
              <Form.Control
                type='phone'
                placeholder='Enter phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        )}
      </Col>
    </Row>
  )
}

export default MakeTorScreen

import swal from 'sweetalert'
import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { listMyTorim } from '../actions/userActions'
import { CancelMyTor } from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { Link } from 'react-router-dom'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const CancelTor = useSelector((state) => state.CancelTor)
  const { cancel } = CancelTor
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const MyTorim = useSelector((state) => state.MyTorim)
  const { loading: loadingMyTorim, error: errorMyTorim, clocks } = MyTorim

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
      }
      dispatch(listMyOrders())
      dispatch(listMyTorim())
    }
  }, [dispatch, history, userInfo, user, success, cancel])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, phone })
      )
    }
  }

  const submitHandler2 = (id) => {
    const uid = userInfo._id

    swal('?אתה בטוח שברצונך לבטל את התור', {
      buttons: {
        catch: {
          text: 'כן אני בטוח,בטל את התור',
          value: 'catch',
        },
        cancel: 'לא',
      },
    }).then((value) => {
      switch (value) {
        case 'defeat':
          history.goBack()

          break

        case 'catch':
          swal(
            'התור בוטל בהצלחה',
            'אין צורך להגיע ביום ובשעה שקבעת,תודה והמשך יום נעים',
            'success'
          ).then(dispatch(CancelMyTor(id, uid)))
          break
      }
    })
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Link id='goback' onClick={() => history.goBack()}>
            <i class='fas fa-angle-double-right'></i>
          </Link>
        </Col>

        <Col md={9}>
          <h2 id='headlineme'>התורים שלי</h2>
          {loadingMyTorim ? (
            <Loader />
          ) : errorMyTorim ? (
            <Message variant='danger'>{errorMyTorim}</Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              id='tablewhite'
            >
              <thead>
                <tr>
                  <th id='tableheadlines'>ספר</th>
                  <th id='tableheadlines'>שעה</th>
                  <th id='tableheadlines'>יום בשבוע</th>
                  <th id='tableheadlines'>תאריך</th>
                  <th id='tableheadlines'>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {clocks.map((clock) => (
                  <tr key={clock._id} id='hoverandblue'>
                    <td>{clock.sapar}</td>
                    <td>{clock.time}</td>

                    <td>{clock.owner.dayInWeek}</td>
                    <td>{clock.date}</td>
                    <td>
                      <Button
                        onClick={() => submitHandler2(clock._id)}
                        className='CancelTorSmallbtn'
                      >
                        בטל תור{' '}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        <Col md={3}>
          <h2 className='whiteme'>הפרופיל שלי</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {}
          {success && <Message variant='success'>הפרופיל עודכן בהצלחה</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div class='login-box'>
              <Form onSubmit={submitHandler} className='whiteme'>
                <div class='user-box'>
                  <Form.Group controlId='name'>
                    <Form.Control
                      type='name'
                      placeholder='הכנס שם '
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
                      placeholder='הכנס ססמה'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>

                <div class='user-box'>
                  <Form.Group controlId='confirmPassword'>
                    <Form.Control
                      type='password'
                      placeholder='אשר ססמה'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
                <Button id='updateProfileBTN' type='submit'>
                  עדכן
                </Button>
              </Form>
            </div>
          )}
        </Col>
        <Col md={9}>
          <h2 id='headlineme'>ההזמנות שלי</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className='table-sm'
              className='whiteme'
              id='tablewhite'
            >
              <thead>
                <tr>
                  <th id='tableheadlines' className='OrderDeetsTD'>
                    פרטים
                  </th>

                  <th id='tableheadlines'>סטאטוס</th>

                  <th id='tableheadlines'>שולם</th>

                  <th id='tableheadlines'>סה"כ</th>

                  <th id='tableheadlines'>תאריך</th>

                  <th id='tableheadlines'>מס הזמנה</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <LinkContainer to={`/order/${order._id}`}>
                    <tr key={order._id} id='hoverandblue'>
                      <td className='OrderDeetsTD'>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>
                            לפרטים
                          </Button>
                        </LinkContainer>
                      </td>

                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>

                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>

                      <td>{order.totalPrice}</td>

                      <td>{order.createdAt.substring(0, 10)}</td>

                      <td style={{ wordBreak: 'break-word' }}>{order._id}</td>
                    </tr>
                  </LinkContainer>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen

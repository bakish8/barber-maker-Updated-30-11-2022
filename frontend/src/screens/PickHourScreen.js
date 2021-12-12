import swal from 'sweetalert'

import Modal from '../components/UIelements/Modal'
import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {
  confirmTor,
  workingDayDetails,
  AvilableWorkingDayTors,
} from '../actions/userActions.js'
var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const SingleWorkDayScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const [showOK, setShowOK] = useState(false)
  const openOKHandler = () => setShowOK(true)
  const closeOKHandler = () => setShowOK(false)

  const WorkDayid = match.params.id

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const workingDaySingle = useSelector((state) => state.workingDaySingle)
  const { workingDay, loadingSingle, errorSingle } = workingDaySingle

  const AvilableTors = useSelector((state) => state.AvilableTors)
  const { loading, error, clockList } = AvilableTors

  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const {
    success: confirmsuccess,
    confirm,
    loadingConfirm,
    errorConfirm,
  } = confirmMyTor

  useEffect(() => {
    if (userInfo) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(AvilableWorkingDayTors(WorkDayid))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, confirmsuccess, confirm])

  const submitHandler = (id) => {
    const uid = userInfo._id

    swal('?לסגור את התור', {
      buttons: {
        catch: {
          text: 'סגור את התור',
          value: 'catch',
        },
        cancel: 'בחר שעה אחרת',
      },
    }).then((value) => {
      switch (value) {
        case 'defeat':
          history.goBack()

          break

        case 'catch':
          dispatch(confirmTor(id, uid)).then(
            swal(
              '!התור נקבע בהצלחה',
              'נא להגיע בזמן תישלח תזכורת ביום התספורת',
              'success'
            ).then(history.push('/'))
          )
          break
      }
    })
  }

  return (
    <>
      <Row>
        {loadingSingle ? (
          <Loader />
        ) : errorSingle ? (
          <Message variant='danger'>{error}</Message>
        ) : loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Col md={12}>
              <h2 id='headlineme'>
                <img
                  src='https://cdn-icons.flaticon.com/png/512/2241/premium/2241645.png?token=exp=1638891549~hmac=0bca4ac92cbf00ac3e185bb897c8b6d1'
                  id='miniICON'
                />{' '}
                קבע שעה{' '}
              </h2>
              <h2 id='dayinWeekmin'>
                ליום {workingDay.dayInWeek} בתאריך
                <span id='bold' className='.bolder'>
                  {workingDay.date}
                </span>{' '}
              </h2>
            </Col>

            <Col md={12}>
              <div>
                <Table striped bordered hover responsive className='table-sm'>
                  {clockList

                    .sort((a, b) => {
                      const dateA = new Date(`${a.date} ${a.time}`).valueOf()
                      const dateB = new Date(`${b.date} ${b.time}`).valueOf()
                      if (dateA > dateB) {
                        return 1 // return -1 here for DESC order
                      }
                      return -1 // return 1 here for DESC Order
                    })

                    .map((clock) => (
                      <Button
                        id='clockbtn'
                        key={clock._id}
                        onClick={() => submitHandler(clock._id)}
                        //onClick={() => openOKHandler(clock.time)}
                      >
                        {clock.time}
                      </Button>
                    ))}
                  <Modal
                    show={showOK}
                    onCancel={closeOKHandler}
                    header='רוצה לקבוע תור?'
                    footer={<Button onClick={closeOKHandler}>CLOSE</Button>}
                  ></Modal>
                </Table>
              </div>
            </Col>
            <Col md={12}>
              <Link className='btn btn-light' id='centerme1' to='/picksapar'>
                חזור
              </Link>
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default SingleWorkDayScreen

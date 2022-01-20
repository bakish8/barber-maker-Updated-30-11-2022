import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

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
  SendTorSMS,
  SendNotificationSMS,
  BookMEonGoogleCalenderAction,
  SpecificTipulDeetsAction,
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
  const Tipulid = match.params.tipulid
  console.log(WorkDayid)
  console.log(Tipulid)
  console.log('_____________')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const workingDaySingle = useSelector((state) => state.workingDaySingle)
  const { workingDay, loadingSingle, errorSingle } = workingDaySingle
  const AvilableTors = useSelector((state) => state.AvilableTors)
  const { loading, error, clockList } = AvilableTors
  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const { success: confirmsuccess, confirm } = confirmMyTor
  const SEND_SMS = useSelector((state) => state.SEND_SMS)
  const { loadingSendSMS, errorSendSMS, successSend } = SEND_SMS

  const goback = () => {
    history.push('/picksapar')
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(AvilableWorkingDayTors(WorkDayid))
      dispatch(SpecificTipulDeetsAction(Tipulid))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, confirmsuccess, confirm])

  const submitHandler = (id, time, date, sapar) => {
    const uid = userInfo._id

    Swal.fire({
      title: `?לסגור את התור`,
      text: `שלום ${userInfo.name} , האם ברצונך לקבוע תור ל ${sapar} בשעה ${time} בתאריך ${date}`,
      confirmButtonText: 'כן',
      showCancelButton: true,
      cancelButtonText: 'לא',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#90be6d',
      cancelButtonColor: '#d33',
      imageUrl: 'https://i.ibb.co/F7ytm19/animation-300-kym86n2q.gif',
      imageWidth: 150,
      imageHeight: 150,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(confirmTor(id, uid, Tipulid))
          .then(
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `התור שלך נקבע בהצלחה`,
              text: ` שובצת לתור בתאריך ${date} ,בשעה ${time}  אנו נתזכר אותך כשעה לפני התספורת , המשך יום נעים`,
              showConfirmButton: false,
              timer: 8000,
            }).then(history.push('/'))
          )
          .then(dispatch(SendTorSMS(id, uid)))
          .then(dispatch(SendNotificationSMS(id, uid)))
          .then(dispatch(BookMEonGoogleCalenderAction(id, uid)))
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        history.goBack()
      }
    })
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Link id='goback' to='/picksapar'>
            <i class='fas fa-angle-double-right'></i>
          </Link>
        </Col>
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
                <img src='https://i.ibb.co/vV1pLtg/clock.png' id='miniICON' />{' '}
                בחר שעה{' '}
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
                  {clockList.length != 0 ? (
                    clockList
                      .sort((a, b) => {
                        const dateA = new Date(` ${a.time}`).valueOf()
                        const dateB = new Date(` ${b.time}`).valueOf()
                        if (dateA > dateB) {
                          return -1 // return -1 here for DESC order
                        }
                        return 1 // return 1 here for DESC Order
                      })

                      .map((clock) => (
                        <div id='clockbtndiv' className='scaleAbit'>
                          <Button
                            id='clockbtn'
                            key={clock._id}
                            onClick={() =>
                              submitHandler(
                                clock._id,
                                clock.time,
                                clock.date,
                                clock.sapar
                              )
                            }
                            //onClick={() => openOKHandler(clock.time)}
                          >
                            <img
                              id='clcktimeimg'
                              src='https://i.ibb.co/0n8Y0bk/output-onlinegiftools-1.gif'
                            />
                            <div id='clcktime'> {clock.time}</div>
                          </Button>
                        </div>
                      ))
                  ) : (
                    <div id='weSorryAllTafus'>
                      אנו מצטערים, כל התורים תפוסים ביום זה{' '}
                      <button onClick={() => goback()} id='anotherday'>
                        קבע תור ליום אחר
                      </button>
                    </div>
                  )}

                  <Modal
                    show={showOK}
                    onCancel={closeOKHandler}
                    header='רוצה לקבוע תור?'
                    footer={<Button onClick={closeOKHandler}>CLOSE</Button>}
                  ></Modal>
                </Table>
              </div>
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default SingleWorkDayScreen

import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
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
  AvilableWorkingDayTorsForOneHourTipul,
  AvilableWorkingDayTorsForOneHourHALFTipul,
  AvilableWorkingDayTorsFor2horsTipul,
  AvilableWorkingDayTorsFor2horsHALFTipul,
  AvilableWorkingDayTorsFor3hours,
  CreatelNotifications,
  SendTorWhatsapp,
} from '../actions/userActions.js'

import { io } from 'socket.io-client'

var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const SingleWorkDayScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)
  const [showOK, setShowOK] = useState(false)
  const [TipilChoosenTime, setTipilChoosenTime] = useState('')
  const openOKHandler = () => setShowOK(true)
  const closeOKHandler = () => setShowOK(false)
  const WorkDayid = match.params.id
  const Tipulid = match.params.tipulid
  console.log(WorkDayid)
  console.log(Tipulid)
  console.log('_____________')
  const [user, setUser] = useState('')

  /******************************************** */
  const userGoogleLogin = useSelector((state) => state.userGoogleLogin)
  const { userGoogleInfo, Gsuccess } = userGoogleLogin
  console.log(userGoogleInfo)
  /******************************************** */

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
  const TipulDeets = useSelector((state) => state.TipulDeets)
  const { loadingDeets, tipulimDeets, errorDeets } = TipulDeets
  const avilableTorsForOneHour = useSelector(
    (state) => state.avilableTorsForOneHour
  )
  const { clockListForOneHour, loadingForOneHour, errorForOneHour } =
    avilableTorsForOneHour

  const avilableTorsForOneHourHALF = useSelector(
    (state) => state.avilableTorsForOneHourHALF
  )
  const {
    clockListForOneHALFHour,
    loadingForOneHALFHour,
    errorForOneHALFHour,
  } = avilableTorsForOneHourHALF

  const avilableTorsFor2Hours = useSelector(
    (state) => state.avilableTorsFor2Hours
  )
  const { loadingFor2Hour, clockListFor2Hour, errorFor2Hour } =
    avilableTorsFor2Hours

  const avilableTorsFor2Hourshalf = useSelector(
    (state) => state.avilableTorsFor2Hourshalf
  )
  const {
    clockListFor2HourandHALF,
    loadingFor2HourandHALF,
    errorFor2HourandHALF,
  } = avilableTorsFor2Hourshalf

  const avilableTorsFor3Hours = useSelector(
    (state) => state.avilableTorsFor3Hours
  )
  const { loadingFor3Hours, clockListFor3Hours, errorFor3Hours } =
    avilableTorsFor3Hours

  const goback = () => {
    history.push('/picksapar')
  }

  const handleNotification = (type, sapar, time, dayInWeek, date) => {
    let NOW = moment()
    let now = NOW.toDate()
    console.log(`type:::${type}`)
    console.log(`sapar name:::${sapar}`)
    console.log(`time:::${time}`)
    console.log(`dayInWeek:::${dayInWeek}`)

    if (socket) {
      socket.emit('sendNotification', {
        senderName: user.name,
        receiverName: sapar,
        type,
        time,
        dayInWeek,
        date,
        now,
      })
    }
  }

  useEffect(() => {
    setSocket(io())
  }, [])
  console.log(`socket:${socket}`)

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo)
      console.log(
        `make tor Page user passed to Here is :${user.name} ! ! ! !!!`
      )
    }
  }, [user])
  useEffect(() => {
    if (userInfo) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(AvilableWorkingDayTors(WorkDayid))
      dispatch(SpecificTipulDeetsAction(Tipulid))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, confirmsuccess, confirm])

  useEffect(() => {
    if (tipulimDeets && tipulimDeets.time === 60) {
      console.log(tipulimDeets.time)
      dispatch(AvilableWorkingDayTorsForOneHourTipul(WorkDayid))
    } else if (tipulimDeets && tipulimDeets.time === 90) {
      console.log(tipulimDeets.time)
      dispatch(AvilableWorkingDayTorsForOneHourHALFTipul(WorkDayid))
    } else if (tipulimDeets && tipulimDeets.time === 120) {
      console.log(tipulimDeets.time)
      dispatch(AvilableWorkingDayTorsFor2horsTipul(WorkDayid))
      console.log(clockListFor2Hour)
    } else if (tipulimDeets && tipulimDeets.time === 150) {
      console.log(tipulimDeets.time)
      dispatch(AvilableWorkingDayTorsFor2horsHALFTipul(WorkDayid))
      console.log(clockListFor2HourandHALF)
    } else if (tipulimDeets && tipulimDeets.time === 180) {
      console.log(tipulimDeets.time)
      dispatch(AvilableWorkingDayTorsFor3hours(WorkDayid))
    }
  }, [dispatch, tipulimDeets])

  const submitHandler = (id, time, date, sapar, dayInWeek, sapar_id) => {
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
        let NOW = moment()
        let now = NOW.toDate()
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
          //.then(dispatch(SendTorSMS(id, uid))) //sendins sms for client //***returnn after dev */
          .then(dispatch(SendTorWhatsapp(id, uid))) //sendins Whatsapp for client bY Confiemed whatsapp sender  and Templete*/
          .then(dispatch(SendNotificationSMS(id, uid))) //creating reminder Sms for client
          .then(dispatch(BookMEonGoogleCalenderAction(id, uid))) //need To Be Fixed --TRY NOW***************************************
          .then(
            dispatch(
              CreatelNotifications(
                id,
                date,
                time,
                dayInWeek,
                sapar,
                uid,
                sapar_id,
                2,
                now
              )
            )
          )
          .then(handleNotification(2, sapar, time, dayInWeek, date))
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
        ) : loading ||
          loadingDeets ||
          loadingForOneHour ||
          loadingForOneHALFHour ||
          loadingFor2Hour ||
          loadingFor2HourandHALF ? (
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
                  {clockList.length != 0 && tipulimDeets.time === 30 ? (
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
                                clock.sapar,
                                clock.owner.dayInWeek,
                                clock.owner.owner
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
                  ) : clockListForOneHour &&
                    clockListForOneHour.length != 0 &&
                    tipulimDeets.time === 60 ? (
                    clockListForOneHour
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
                                clock.sapar,
                                clock.owner.dayInWeek,
                                clock.owner.owner
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
                  ) : clockListForOneHALFHour &&
                    clockListForOneHALFHour.length != 0 &&
                    tipulimDeets.time === 90 ? (
                    clockListForOneHALFHour
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
                                clock.sapar,
                                clock.owner.dayInWeek,
                                clock.owner.owner
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
                  ) : clockListFor2Hour &&
                    clockListFor2Hour.length != 0 &&
                    tipulimDeets.time === 120 ? (
                    clockListFor2Hour
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
                                clock.sapar,
                                clock.owner.dayInWeek,
                                clock.owner.owner
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
                  ) : clockListFor2HourandHALF &&
                    clockListFor2HourandHALF.length != 0 &&
                    tipulimDeets.time === 150 ? (
                    clockListFor2HourandHALF
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
                                clock.sapar,
                                clock.owner.dayInWeek,
                                clock.owner.owner
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
                  ) : clockListFor3Hours &&
                    clockListFor3Hours.length != 0 &&
                    tipulimDeets.time === 180 ? (
                    clockListFor3Hours
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
                                clock.sapar,
                                clock.owner.dayInWeek,
                                clock.owner.owner
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

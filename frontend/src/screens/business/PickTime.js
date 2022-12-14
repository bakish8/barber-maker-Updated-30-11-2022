//***Need TO add Google Calender Settings if not a goole user dont try to add google calener Fix */

import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Modal from '../../components/UIelements/Modal'
import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
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
  WorkingDayTors,
} from '../../actions/userActions.js'
import { getBuissnesSettings } from '../../actions/BuissnesActions/Buissnes_User_Actions'

var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const PickTime = ({ history, match }) => {
  const BussinesID = match.params.id
  const [afterdate, Setfterdate] = useState(false) //**caclculate if passed date for day state */

  const dispatch = useDispatch()
  const [showOK, setShowOK] = useState(false)
  const [TipilChoosenTime, setTipilChoosenTime] = useState('')
  const openOKHandler = () => setShowOK(true)
  const closeOKHandler = () => setShowOK(false)
  const WorkDayid = match.params.wid
  const Tipulid = match.params.tid
  const BusinessId = match.params.id
  const [user, setUser] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const workingDaySingle = useSelector((state) => state.workingDaySingle)
  const { workingDay, loadingSingle, errorSingle } = workingDaySingle
  //const AvilableTors = useSelector((state) => state.AvilableTors)
  //const { loading, error, clockList } = AvilableTors
  const Tors = useSelector((state) => state.Tors)
  const { loading, error, clockList } = Tors
  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const { success: confirmsuccess, confirm } = confirmMyTor
  const SEND_SMS = useSelector((state) => state.SEND_SMS)
  const { loadingSendSMS, errorSendSMS, successSend } = SEND_SMS
  const TipulDeets = useSelector((state) => state.TipulDeets)
  const { loadingDeets, tipulimDeets, errorDeets } = TipulDeets
  const avilableTorsForOneHour = useSelector(
    (state) => state.avilableTorsForOneHour
  )
  const GetBusinessSETTINGS = useSelector((state) => state.GetBusinessSETTINGS)
  const {
    loading: loading_settings,
    business: business_settings,
    success: success_settings,
    error: error_settings,
  } = GetBusinessSETTINGS
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

  const CheckIfTimePassed = (time, date) => {
    const hourToCheck = time.substring(0, 2)
    const minuteToCheck = time.slice(3)
    let searchDate2 = new Date()
    let FormatedSearchDate = moment(searchDate2).format()

    const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
    const month = CalculateMonthmonth.slice(-2) * 1
    const CalculateDay = FormatedSearchDate.substring(0, 10)
    const day = CalculateDay.slice(8) * 1
    const year = FormatedSearchDate.substring(0, 4)
    const dateToCheck = `${day}/${month}/${year}`
    //const dateToCheck = `1/12/2022`
    if (date === dateToCheck) {
      let CalculateminuteNow = FormatedSearchDate.slice(14)
      let MinuteNow = CalculateminuteNow.substring(0, 2)
      //let MinuteNow = '31'
      let CalculateHourNow = FormatedSearchDate.slice(11)
      let HourNow = CalculateHourNow.substring(0, 2)
      //let HourNow = '09'
      if (
        HourNow > hourToCheck ||
        (HourNow === hourToCheck && MinuteNow > minuteToCheck)
      ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  useEffect(() => {
    if (clockList) {
      console.log(clockList)
    }
  }, [clockList])

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
      dispatch(WorkingDayTors(WorkDayid))
      dispatch(SpecificTipulDeetsAction(Tipulid))
      dispatch(getBuissnesSettings(BussinesID))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, confirmsuccess, confirm])

  useEffect(() => {
    if (tipulimDeets && tipulimDeets.time === 60) {
      dispatch(AvilableWorkingDayTorsForOneHourTipul(WorkDayid))
    } else if (tipulimDeets && tipulimDeets.time === 90) {
      dispatch(AvilableWorkingDayTorsForOneHourHALFTipul(WorkDayid))
    } else if (tipulimDeets && tipulimDeets.time === 120) {
      dispatch(AvilableWorkingDayTorsFor2horsTipul(WorkDayid))
    } else if (tipulimDeets && tipulimDeets.time === 150) {
      dispatch(AvilableWorkingDayTorsFor2horsHALFTipul(WorkDayid))
    } else if (tipulimDeets && tipulimDeets.time === 180) {
      dispatch(AvilableWorkingDayTorsFor3hours(WorkDayid))
    }
  }, [dispatch, tipulimDeets])

  const EndActionsFunction = (
    id,
    uid,
    BusinessId,
    time,
    sapar,
    sapar_id,
    date,
    dayInWeek,
    now
  ) => {
    if (success_settings) {
      console.log(
        `we got business settings ......readt to choose between actions!!!`
      )
      if (business_settings.settings.sendSMSClientSide == true) {
        dispatch(SendTorSMS(id, uid, BusinessId))
      }
      if (business_settings.settings.sendWhatsappClientSide == true) {
        dispatch(SendTorWhatsapp(id, uid, BusinessId))
      }
      if (business_settings.settings.sendSMSClientSideReminder == true) {
        //creates Sms Reminder
        dispatch(
          SendNotificationSMS(
            id,
            uid,
            'sms',
            business_settings.settings.notificationsTime
          )
        )
      }
      if ((business_settings.settings.sendWhatsappClientSideReminder = true)) {
        //creates Whatsapp  Reminder
        dispatch(
          SendNotificationSMS(
            id,
            uid,
            'whatsapp',
            business_settings.settings.notificationsTime
          )
        )
      }
      if (business_settings.settings.bookingooglecalender == true) {
        //Booking on User+Admin Google Calender
        dispatch(BookMEonGoogleCalenderAction(id, uid))
      }
      //creating a notification and then handle it
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
    }
  }
  ///
  const submitHandler = (id, time, date, sapar, dayInWeek, sapar_id) => {
    const uid = userInfo._id
    Swal.fire({
      title: `??????????? ???? ????????`,
      text: `???????? ${userInfo.name} , ?????? ???????????? ?????????? ?????? ?? ${sapar} ???????? ${time} ???????????? ${date}`,
      confirmButtonText: '????',
      showCancelButton: true,
      cancelButtonText: '????',
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
        dispatch(confirmTor(id, uid, Tipulid, BussinesID))
          .then(
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `???????? ?????? ???????? ????????????`,
              text: ` ?????????? ???????? ???????????? ${date} ,???????? ${time}  ?????? ?????????? ???????? ???????? ???????? ?????????????? , ???????? ?????? ????????`,
              showConfirmButton: false,
              timer: 8000,
            }).then(history.push(`/business/${BusinessId}`))
          )
          .then(
            EndActionsFunction(
              id,
              uid,
              BusinessId,
              time,
              sapar,
              sapar_id,
              date,
              dayInWeek,
              now
            )
          )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        history.goBack()
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
                ?????? ??????{' '}
              </h2>
              <h2 id='dayinWeekmin'>
                ???????? {workingDay.dayInWeek} ????????????
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
                        const TimeA = ` ${a.time}`.valueOf()
                        const TimeB = ` ${b.time}`.valueOf()
                        if (TimeA > TimeB) {
                          return 1 // return -1 here for DESC order
                        }
                        return -1 // return 1 here for DESC Order
                      })

                      .map((clock) =>
                        clock.avilable &&
                        !CheckIfTimePassed(clock.time, clock.date) ? (
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
                        ) : (
                          <></>
                        )
                      )
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
                      ?????? ??????????????, ???? ???????????? ???????????? ???????? ????{' '}
                      <button onClick={() => history.goBack()} id='anotherday'>
                        ?????? ?????? ???????? ??????
                      </button>
                    </div>
                  )}

                  <Modal
                    show={showOK}
                    onCancel={closeOKHandler}
                    header='???????? ?????????? ???????'
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

export default PickTime

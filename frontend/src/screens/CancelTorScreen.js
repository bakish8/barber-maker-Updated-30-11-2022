import Swal from 'sweetalert2'
import moment from 'moment'

import {
  CancelMyTor,
  CreatelNotifications,
  SendCancelTorSMS,
} from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import CancelTorItem from '../components/CancelTor/CancelTorItem'
import { listMyTorim } from '../actions/userActions'
import { io } from 'socket.io-client'

const CancelTorScreen = ({ history }) => {
  const BussinesID = match.params.id
  //states
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)
  const userLogin = useSelector((state) => state.userLogin)
  const MyTorim = useSelector((state) => state.MyTorim)
  const { loading: loadingMyTorim, error: errorMyTorim, clocks } = MyTorim
  const CancelTor = useSelector((state) => state.CancelTor)
  const { cancel } = CancelTor
  const { userInfo } = userLogin

  //UseEffects

  useEffect(() => {
    setSocket(io())
  }, [])

  useEffect(() => {
    if (!userInfo) {
      history.push(`/business/${BussinesID}/login`)
    } else {
      dispatch(listMyTorim())
      if (clocks) {
        if (
          (loadingMyTorim == false && !clocks) ||
          (loadingMyTorim == false && clocks.length === 0)
        ) {
          Swal.fire({
            title: ` לא נמצאו תורים לביטול עבור ${userInfo.name}`,
            text: `?האם ברצונך לקבוע תור`,
            confirmButtonText: 'קבע תור',
            showCancelButton: true,
            cancelButtonText: 'חזור לדף הבית',
            showLoaderOnConfirm: true,
            confirmButtonColor: '#90be6d',
            cancelButtonColor: '#d33',
            imageUrl: 'https://i.ibb.co/fpZL6Px/animation-300-kym7smbo.gif',
          }).then((result) => {
            if (result.isConfirmed) {
              history.push(`/business/${BussinesID}/picksapar`)
            } else if (
              result.dismiss === Swal.DismissReason.cancel ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              history.push(`/business/${BussinesID}`)
            }
          })
        }
      }
    }
  }, [dispatch, history, userInfo, cancel])

  //Socket Notification Function
  const handleNotification = (type, sapar, time, dayInWeek) => {
    if (socket) {
      console.log(`socket: ${socket}`)
      socket.emit('sendNotification', {
        senderName: userInfo.name,
        receiverName: sapar,
        type,
        time,
        dayInWeek,
      })
    }
  }

  const submitHandler = (id, time, date, sapar, dayInWeek, sapar_id) => {
    const uid = userInfo._id
    Swal.fire({
      title: `?לבטל את תור זה`,
      text: `?שלום ${userInfo.name} ,האם אתה בטוח שברצונך לבטל תור זה `,
      confirmButtonText: 'כן',
      showCancelButton: true,
      cancelButtonText: 'לא',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#90be6d',
      cancelButtonColor: '#d33',
      imageUrl: 'https://i.ibb.co/fpZL6Px/animation-300-kym7smbo.gif',
    }).then((result) => {
      if (result.isConfirmed) {
        let NOW = moment()
        let now = NOW.toDate()
        dispatch(CancelMyTor(id, uid)).then(
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `התור בוטל בהצלחה בהצלחה`,
            text: ` התור שלך אצל ${sapar} בתאריך ${date} ,בשעה ${time}  !בוטל בהצלחה!  אין צורך להגיע ביום ובשעה שקבעת, תודה והמשך יום נעים`,
            showConfirmButton: false,
            timer: 8000,
          })
            // .then(dispatch(SendCancelTorSMS(id, uid)))
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
                  1,
                  now
                )
              )
            )
            .then(handleNotification(1, sapar, time, dayInWeek, date, now))
          // .then(history.push('/'))
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('ביטול')
      }
    })
  }

  return (
    <Row>
      <Col md={12}>
        <Link id='goback' onClick={() => history.goBack()}>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <Col md={12}>
        <h2 id='headlineme'>
          {' '}
          <img
            src='https://cdn-icons-png.flaticon.com/512/399/399274.png'
            id='miniICON'
          />
          בטל תור{' '}
        </h2>
        {loadingMyTorim ? (
          <Loader />
        ) : errorMyTorim ? (
          <Message variant='danger'>{errorMyTorim}</Message>
        ) : (
          <>
            {' '}
            <ul id='noBullets'>
              {clocks.map((clock) => (
                <div id='IDasd' className='scaleAbit'>
                  <CancelTorItem
                    key={clock._id}
                    id={clock._id}
                    date={clock.date}
                    dayInWeek={clock.owner.dayInWeek}
                    time={clock.time}
                    sapar={clock.sapar}
                    image={'https://i.ibb.co/5nNPr42/cancel.png'}
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
                  ></CancelTorItem>
                </div>
              ))}
            </ul>
          </>
        )}
      </Col>
    </Row>
  )
}

export default CancelTorScreen

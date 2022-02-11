import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { CancelMyTor, SendCancelTorSMS } from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import CancelTorItem from '../components/CancelTor/CancelTorItem'
import { listMyTorim } from '../actions/userActions'

const PickSaparScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)

  const MyTorim = useSelector((state) => state.MyTorim)
  const { loading: loadingMyTorim, error: errorMyTorim, clocks } = MyTorim

  const CancelTor = useSelector((state) => state.CancelTor)
  const { cancel } = CancelTor
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listMyTorim())
      if (clocks) {
        if (
          (!loadingMyTorim && !clocks) ||
          (!loadingMyTorim && clocks.length === 0)
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
              history.push('/picksapar')
            } else if (
              result.dismiss === Swal.DismissReason.cancel ||
              result.dismiss === Swal.DismissReason.backdrop
            ) {
              history.push('/')
            }
          })
        }
      }
    }
  }, [dispatch, history, userInfo, cancel])

  const submitHandler = (id, time, date, sapar) => {
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
        dispatch(CancelMyTor(id, uid)).then(
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `התור בוטל בהצלחה בהצלחה`,
            text: ` התור שלך אצל ${sapar} בתאריך ${date} ,בשעה ${time}  !בוטל בהצלחה!  אין צורך להגיע ביום ובשעה שקבעת, תודה והמשך יום נעים`,
            showConfirmButton: false,
            timer: 8000,
          })
            .then(dispatch(SendCancelTorSMS(id, uid)))
            .then(history.push('/'))
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('ביטול')
      }
    })
  }

  return (
    <Row>
      <Col md={12}>
        <Link id='goback' to='/'>
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
                <div id='centermeAndBlock' className='scaleAbit'>
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
                        clock.sapar
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

export default PickSaparScreen

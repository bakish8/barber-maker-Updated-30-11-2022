import swal from 'sweetalert'

//import { confirmTor } from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */
import { CancelMyTor } from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */

import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSaparim } from '../actions/userActions'
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
    }
  }, [dispatch, history, userInfo, cancel])

  const submitHandler = (id) => {
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
                <div id='centermeAndBlock'>
                  <CancelTorItem
                    key={clock._id}
                    id={clock._id}
                    date={clock.date}
                    dayInWeek={clock.owner.dayInWeek}
                    time={clock.time}
                    sapar={clock.sapar}
                    image={'https://i.ibb.co/5nNPr42/cancel.png'}
                    onClick={() => submitHandler(clock._id)}
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

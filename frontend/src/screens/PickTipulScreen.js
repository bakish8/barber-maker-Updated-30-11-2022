import TipulItem from '../components/tipul/TipulItem.js'
import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  SugeiTipulimAction,
  workingDayDetails,
} from '../actions/userActions.js'
var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const PickTipulScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const WorkDayid = match.params.id
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const TipulimList = useSelector((state) => state.TipulimList)
  const { tipulimList } = TipulimList

  useEffect(() => {
    if (userInfo) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(SugeiTipulimAction())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Row>
        <Col md={12}>
          <Link id='goback' onClick={() => history.goBack()}>
            <i class='fas fa-angle-double-right'></i>
          </Link>
        </Col>
        <Col md={12}>
          <h2 id='headlineme'>
            {' '}
            <img src='https://i.ibb.co/cwptSX3/hair-dryer.png' id='miniICON' />
            בחר טיפול
          </h2>
        </Col>

        <>
          <Col md={12}>
            <ul id='noBullets'>
              {tipulimList &&
                tipulimList.map((tipul) => (
                  <div id='centermeAndBlock' className='scaleAbit'>
                    <TipulItem
                      key={tipul._id}
                      id={WorkDayid}
                      tipulID={tipul._id}
                      phone=''
                      name={tipul.name}
                      image={tipul.image}
                    ></TipulItem>
                  </div>
                ))}
            </ul>
          </Col>
        </>
      </Row>
    </>
  )
}

export default PickTipulScreen

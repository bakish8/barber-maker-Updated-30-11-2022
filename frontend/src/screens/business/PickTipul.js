import TipulItem from '../../components/tipul/TipulItem.js'
import TreatmentItem from '../../components/Business_Components/Treatment/TreatmentItem'
import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  SugeiTipulimAction,
  workingDayDetails,
} from '../../actions/userActions.js'
import { TREATMENTSListAction } from '../../actions/BuissnesActions/Buissnes_User_Actions.js'
import { PICK_WORKINGDAY_RESET } from '../../constants/userConstants.js'
var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const PickTipul = ({ history, match }) => {
  const dispatch = useDispatch()
  dispatch({ type: PICK_WORKINGDAY_RESET })

  let BusinessId = match.params.id
  let WorkDayid = match.params.did
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const BusinessTreatmentsList = useSelector(
    (state) => state.BusinessTreatmentsList
  )
  const { tipulim, tipulimloading, tipulimerror } = BusinessTreatmentsList

  useEffect(() => {
    if (userInfo) {
      dispatch(workingDayDetails(WorkDayid))
      dispatch(TREATMENTSListAction(BusinessId))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])
  useEffect(() => {
    if (tipulim) {
      console.log(tipulim)
    }
  }, [tipulim])

  return (
    <>
      <Row>
        <Col md={12}>
          <Link id='goback' to={`/business/${BusinessId}/picksapar`}>
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
              {tipulim &&
                tipulim.map((tipul) => (
                  <div id='centermeAndBlock' className='scaleAbit'>
                    <TreatmentItem
                      key={tipul._id}
                      bid={BusinessId}
                      wid={WorkDayid}
                      tid={tipul._id}
                      phone=''
                      name={tipul.name}
                      image={tipul.image}
                      price={tipul.cost}
                    ></TreatmentItem>
                  </div>
                ))}
            </ul>
          </Col>
        </>
      </Row>
    </>
  )
}

export default PickTipul

import React, { useState } from 'react'
import Admin from '../shared/images/Admin.jpg'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Table, Button } from 'react-bootstrap'
import { useEffect } from 'react'
import { getBuissnesDetailsforDesign } from '../actions/BuissnesActions/Buissnes_User_Actions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import './DesignSettingsImage.css'
const DesignSettingsImage = (props, match) => {
  const dispatch = useDispatch()

  const GetBusinessDetailsfordesign = useSelector(
    (state) => state.GetBusinessDetailsfordesign
  )
  const { loading, business, success, error } = GetBusinessDetailsfordesign

  const BusinessId = window.location.pathname.split('/')[2]
  let Firstlocation = window.location.pathname.split('/')[1]

  useEffect(() => {
    if (
      !window.location.host === 'barber-maker.com:3000' ||
      Firstlocation === 'business'
    ) {
      console.log(
        ' we are in Barber-Maker.com or localHost 3000 dispatching   getBuissnesDetailsforDesign ! ! !'
      )
      dispatch(getBuissnesDetailsforDesign(BusinessId))
    }
  }, [])
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : business ? (
    <>
      <Row>
        {' '}
        <Col md={12}>
          {' '}
          <h1 id='managerOptionsPageHeadLine' className='whiteme'>
            הגדרות עיצוב{' '}
          </h1>
        </Col>
        <Col>
          <Table
            bordered
            responsive
            className='whiteme'
            id='tablewhiteUserLIST_table'
          >
            <thead>
              <tr id='tableheadlines'>
                <th>תכונות</th>
                <th>מאפיינים</th>
              </tr>
            </thead>

            <tbody id='centertext'>
              <td>{business.name}</td>
              <td>שם המספרה</td>
            </tbody>
            <tbody id='centertext'>
              <td>{business.location.name}</td>
              <td>מיקום המספרה</td>
            </tbody>
            <tbody id='centertext'>
              <td>{business.logoNameOnNav ? 'כן' : 'לא'}</td>
              <td>הופעת שם המספרה בתפריט הניווט</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                <select name='cars' id='cars'>
                  <option id='blackanddwhite'>fsaf</option>
                  <option value='saab'>Saab</option>
                  <option value='mercedes'>Mercedes</option>
                  <option value='audi'>Audi</option>
                </select>{' '}
              </td>
              <td>צבעים</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                <img id='businessLogoDesignSettings' src={business.logo}></img>
              </td>
              <td>לוגו</td>
            </tbody>

            <tbody id='centertext'>
              <td>
                {' '}
                <img id='businessMakeTorBGimage' src={business.image}></img>
              </td>

              <td>תמונת כפתור "קבע תור" בעמוד הראשי </td>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Button id='updateProfileBTN'>עדכן</Button>
    </>
  ) : (
    <div />
  )
}

export default DesignSettingsImage
//***** Fix add to line with business.location.name function with google api thats find location by name and update cootdinates*/
//Fix add Bg for business application

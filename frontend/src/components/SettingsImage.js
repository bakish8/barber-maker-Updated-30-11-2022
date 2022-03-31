import React, { useState } from 'react'
import Admin from '../shared/images/Admin.jpg'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

//const SettingsImage = () => (
const SettingsImage = (props) => (
  <>
    <Row>
      {' '}
      <img
        id='settingsSCREENimage'
        src='https://i.ibb.co/726p9sC/animation-200-kyohrsre.gif'
      />
      <Col md={12}>
        {' '}
        <h1 id='managerOptionsPageHeadLine' className='whiteme'>
          הגדרות{' '}
        </h1>
      </Col>
      <Col>
        {' '}
        <Parallax className='imageParalaxAdmin' bgImage={Admin} strength={800}>
          <div>
            <Link
              style={{ textDecoration: 'none' }}
              //to='/admin/settings/newtipul'
              to={`/business/${props.BussinessId}/admin/${props.OwnerId}/settings/newtipul`}
            >
              <button id='centermeAndBlock1' class='maketorbtn'>
                <span>הוסף טיפול חדש</span>
              </button>
            </Link>

            <Link style={{ textDecoration: 'none' }} to='/admin/reports/'>
              <button id='centermeAndBlock1' class='maketorbtn'>
                <span>הגדר יום חופש</span>
              </button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/admin/userlist/'>
              <button id='centermeAndBlock1' class='maketorbtn'>
                <span>הגדר ספר חדש</span>
              </button>
            </Link>
          </div>
        </Parallax>
      </Col>
    </Row>
  </>
)

export default SettingsImage

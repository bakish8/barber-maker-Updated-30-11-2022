import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSaparim } from '../actions/userActions'
import { Link } from 'react-router-dom'
import SaparItem from '../components/SaparItem'

const PickSaparScreen = ({ history }) => {
  const dispatch = useDispatch()

  const saparList = useSelector((state) => state.saparList)
  const { sapars, saparsloading, saparserror } = saparList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listSaparim())
    }
  }, [dispatch, history, userInfo])

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
          <img src='https://i.ibb.co/wwKrdtx/man.png' id='miniICON' />
          בחר ספר
        </h2>
        {saparsloading ? (
          <Loader />
        ) : saparserror ? (
          <Message variant='danger'>{saparserror}</Message>
        ) : (
          <>
            {' '}
            <ul id='noBullets'>
              {sapars.map((sapar) => (
                <div id='centermeAndBlock'>
                  <SaparItem
                    key={sapar._id}
                    id={sapar._id}
                    phone={sapar.phone}
                    name={sapar.name}
                    image={sapar.image}
                  ></SaparItem>
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

import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSaparim } from '../actions/userActions'
import { Link } from 'react-router-dom'

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
        <h2 id='headlineme'>בחר ספר</h2>
        {saparsloading ? (
          <Loader />
        ) : saparserror ? (
          <Message variant='danger'>{saparserror}</Message>
        ) : (
          <>
            {' '}
            {sapars.map((sapar) => (
              <Link to={`/${sapar._id}/maketor`}>
                <Button key={sapar._id} id='clockbtn' key={sapar._id}>
                  <span id='block'> 0{sapar.phone}</span>
                  <span id='block'> {sapar.name}</span>
                </Button>
              </Link>
            ))}
          </>
        )}
      </Col>
    </Row>
  )
}

export default PickSaparScreen

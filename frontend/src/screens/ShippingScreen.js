import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { Link } from 'react-router-dom'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <>
      <Row>
        <Col md={12}>
          <Link id='goback' to='/cart'>
            <i class='fas fa-angle-double-right'></i>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <CheckoutSteps step2 />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormContainer>
            <h1 id='headlineme'>משלוח</h1>
            <Form onSubmit={submitHandler} className='whiteme'>
              <Form.Group controlId='address'>
                <Form.Label>כתובת</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='הכנס כתובת'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='city'>
                <Form.Label>עיר</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='הזן עיר'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='postalCode'>
                <Form.Label>מיקוד</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='הכנס מיקוד'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='country'>
                <Form.Label>מדינה</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='הזן מדינה'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                המשך
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </>
  )
}

export default ShippingScreen

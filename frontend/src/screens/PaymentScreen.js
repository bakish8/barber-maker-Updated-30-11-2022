import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import { Link } from 'react-router-dom'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/shipping'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1 id='headlineme' className='whiteme'>
          שיטת תשלום
        </h1>
        <Form onSubmit={submitHandler} className='whiteme'>
          <Form.Group>
            <Form.Label>
              אנא בחר את שיטת התשלום איתה אתה מעוניין לבצע את הרכישה
            </Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='מזומן'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <i class='fas fa-money-bill-wave' id='fontsizebiggerIcon'></i>
            </Col>
            <Col>
              <Form.Check
                type='radio'
                label='אשראי'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <i id='fontsizebiggerIcon' class='far fa-credit-card'></i>
            </Col>
            <Col>
              <Form.Check
                type='radio'
                id='PayPal'
                label='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <i id='fontsizebiggerIcon' class='fab fa-cc-paypal'></i>
            </Col>
          </Form.Group>

          <Button type='submit' id='updateProfileBTN'>
            המשך{' '}
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen

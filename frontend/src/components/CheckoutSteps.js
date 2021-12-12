import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4' id='checkoytstepsNav'>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder' className='whitemeACTIVE'>
            <Nav.Link>שלח הזמנה</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>שלח הזמנה</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment' className='whitemeACTIVE'>
            <Nav.Link>תשלום</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>תשלום</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping' className='whitemeACTIVE'>
            <Nav.Link>משלוח</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>משלוח</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps

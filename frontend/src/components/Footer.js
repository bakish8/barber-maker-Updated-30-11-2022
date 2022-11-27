import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer id='footer'>
      <Container>
        <Row>
          <a id='Copyrights' href='https://www.barber-maker.com/'>
            <Col className='text-center py-3'>
              barber-maker.com
              <br />
              <a id='Copyrights2' href='http://omri-protofilio.online/'>
                developed by Omri Bakish&copy;
              </a>{' '}
            </Col>
          </a>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
//

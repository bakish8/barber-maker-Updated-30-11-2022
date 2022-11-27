import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer id='footer'>
      <Container>
        <Row>
          <a id='Copyrights' href='https://www.barber-maker.com/'>
            <Col className='text-center py-3'>&copy;barber-maker.com </Col>
          </a>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
//http://omri-protofilio.online/

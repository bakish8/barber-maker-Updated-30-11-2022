import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer id='footer'>
      <Container>
        <Row>
          <a id='Copyrights' href='http://omri-protofilio.online/'>
            <Col className='text-center py-3'>Copyright &copy; Omri Bakish</Col>
          </a>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

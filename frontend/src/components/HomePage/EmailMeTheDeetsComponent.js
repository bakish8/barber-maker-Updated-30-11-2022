import React from 'react'
import './EmailMeTheDeetsComponent.css'
import { Container } from 'react-bootstrap'
import { MdOutlineEmail } from 'react-icons/md'
import { RiMessengerLine } from 'react-icons/ri'
import { BsWhatsapp } from 'react-icons/bs'
import { BsPhone } from 'react-icons/bs'
const EmailMeTheDeetsComponent = () => (
  <div className='EmailMeTheDeetsComponent'>
    <Container className='Container'>
      {' '}
      <a href='tel:+972509089090' id='aaaa'>
        <BsPhone className='contact__option-icon' />
      </a>
      <a href='https://api.whatsapp.com/send?phone=+972509089090' id='aaaa'>
        {' '}
        <BsWhatsapp className='contact__option-icon' />
      </a>
      <a href='https://m.me/omri.bakish.9' id='aaaa'>
        <RiMessengerLine className='contact__option-icon' />
      </a>
      <a href='mailto:omribakish8@gmail.com' id='aaaa'>
        {' '}
        <MdOutlineEmail className='contact__option-icon' />
      </a>
      <span id='tellmemore'>:צור קשר</span>
    </Container>
  </div>
)

export default EmailMeTheDeetsComponent

import React, { useEffect } from 'react'
import ProductCarousel from '../ProductCarousel'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import './SmartCounter.css'

const SmartCounter = () => {
  return (
    <div className='MotherOFSMARTCONTAINER'>
      <div className='Smart-counter-container'>
        <div className='Smart-Counter'>
          {' '}
          <i id='idid' class='fa-solid fa-ban-smoking'></i>{' '}
          <i id='idid' class='fas fa-calendar-week'></i>
          <i id='idid' class='fas fa-calendar-day'></i>
        </div>
        <div className='Smart-Counter'> </div>
        <span className=''>b</span>
        <div className='Smart-Counter'> </div>
        <span className=''>c</span>
      </div>
    </div>
  )
}

export default SmartCounter

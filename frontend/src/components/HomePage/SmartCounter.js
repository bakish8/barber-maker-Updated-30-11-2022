import React, { useEffect } from 'react'
import ProductCarousel from '../ProductCarousel'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import './SmartCounter.css'

const SmartCounter = () => {
  return (
    <div className='MotherOFSMARTCONTAINER'>
      <div className='Smart-counter-container'>
        <div className='DIVinterior'>
          <div className='Smart-Counter'>46 </div>
          <div className='HEADLINE-SMART-COUNTER'>בעלי מספרות מרוצים</div>
          <img
            id='imGcounyer606'
            src='https://i.ibb.co/v4ChrP4/animation-500-kzsjh8oi.gif'
          />{' '}
        </div>

        <div className='DIVinterior'>
          {' '}
          <div className='Smart-Counter'>30,053</div>{' '}
          <div className='HEADLINE-SMART-COUNTER'>תורים נקבעו דרך המערכת</div>{' '}
          <img
            id='imGcounyer606'
            src='https://i.ibb.co/vHYbxwJ/ezgif-com-gif-maker-10.gif'
          />{' '}
        </div>
      </div>
    </div>
  )
}

export default SmartCounter

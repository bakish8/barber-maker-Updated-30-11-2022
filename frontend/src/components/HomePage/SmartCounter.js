import React, { useEffect } from 'react'
import ProductCarousel from '../ProductCarousel'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import './SmartCounter.css'

const SmartCounter = () => {
  const f = () => {
    const counters = document.getElementsByClassName('Smart-Counter')
    for (let counter of counters) {
      counter.innerText = '0'
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target') //+ is parse
        console.log(target)
        const c = +counter.innerText
        const incricement = target / 200
        if (c < target) {
          counter.innerText = `${Math.ceil(c + incricement)}`
          setTimeout(updateCounter, 1)
        } else {
          counter.innerText = target
        }
      }
      updateCounter()
    }
  }

  f() /// ****shhow with state is screen highet

  return (
    <div className='MotherOFSMARTCONTAINER'>
      <div className='Smart-counter-container'>
        <div className='DIVinterior'>
          <div data-target='256' className='Smart-Counter'>
            {' '}
          </div>
          <div className='HEADLINE-SMART-COUNTER'>בעלי מספרות מרוצים</div>
          <img
            id='imGcounyer606'
            src='https://i.ibb.co/v4ChrP4/animation-500-kzsjh8oi.gif'
          />{' '}
        </div>

        <div className='DIVinterior'>
          {' '}
          <div data-target='321' className='Smart-Counter'></div>{' '}
          <div className='HEADLINE-SMART-COUNTER'>תורים נקבעו היום</div>{' '}
          <img
            id='imGcounyer606'
            src='https://i.ibb.co/HGFNgLb/animation-500-kzuit19p.gif'
          />{' '}
        </div>

        <div className='DIVinterior'>
          {' '}
          <div data-target='48037' className='Smart-Counter'></div>{' '}
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

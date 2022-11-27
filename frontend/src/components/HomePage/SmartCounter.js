import React, { useEffect, useState } from 'react'
import './SmartCounter.css'

const SmartCounter = () => {
  const [scrollPosition, setPosition] = useState(0)

  const f = () => {
    const counters = document.getElementsByClassName('Smart-Counter')
    for (let counter of counters) {
      counter.innerText = '0'
      const updateCounter = () => {
        const target = +counter.getAttribute('data-target') //+ is parse
        const c = +counter.innerText
        const incricement = target / 200
        if (c < target) {
          counter.innerText = `${Math.ceil(c + incricement)}`
          setTimeout(updateCounter, 2)
        } else {
          counter.innerText = target
        }
      }
      updateCounter()
    }
  }
  setTimeout(f, 1000) //if window scroll is this component top hifet dispatch action

  useEffect(() => {
    const updatePosition = () => {
      setPosition(window.scrollY)
    }

    window.addEventListener('scroll', updatePosition)
  }, [scrollPosition])

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

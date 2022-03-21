import React from 'react'
import SmartCounter from './SmartCounter'

//functions for scroll highet
const fixScrollHighetForBarberSystem = () => {
  window.scrollTo({
    top: 3182,
    behavior: 'smooth',
  })
}

const OpenVirtualBarberShop = () => (
  <div className='openVirtualBarberShopImage1'>
    <div>
      <span id='workcorrectly'>מספרה וירטואלית</span>
      <br />
      <span id='workcorrectly3'>מותאמת אישית</span>
      <br />
      <span id='workcorrectly4'>נהל את המספרה שלך בצורה חכמה ומתקדמת</span>
      <div onClick={fixScrollHighetForBarberSystem} id='formoredeetsBtn'>
        לפרטים נוספים
      </div>{' '}
      <div className='SmartCountersmall'>
        {' '}
        <SmartCounter />
      </div>
    </div>{' '}
  </div>
)

export default OpenVirtualBarberShop

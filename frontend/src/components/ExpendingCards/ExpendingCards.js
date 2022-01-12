import React, { useState } from 'react'
import './ExpendingCards.css'

const ExpendingCards = () => {
  const [Panel0, setPanel0] = useState(true)
  const [Panel1, setPanel1] = useState(false)
  const [Panel2, setPanel2] = useState(false)
  const [Panel3, setPanel3] = useState(false)
  const [Panel4, setPanel4] = useState(false)

  const setPanel0F = () => {
    setPanel0(true)
    setPanel1(false)
    setPanel2(false)
    setPanel3(false)
    setPanel4(false)
    console.log('click 0')
  }
  const setPanel1F = () => {
    setPanel1(true)
    setPanel0(false)
    setPanel2(false)
    setPanel3(false)
    setPanel4(false)

    console.log('click 01')
  }
  const setPanel2F = () => {
    setPanel2(true)
    setPanel0(false)
    setPanel1(false)
    setPanel3(false)
    setPanel4(false)

    console.log('click 02')
  }
  const setPanel3F = () => {
    setPanel3(true)
    setPanel1(false)
    setPanel2(false)
    setPanel4(false)
    setPanel0(false)

    console.log('click 03')
  }
  const setPanel4F = () => {
    setPanel4(true)
    setPanel0(false)
    setPanel1(false)
    setPanel2(false)
    setPanel3(false)

    console.log('click 04')
  }

  return (
    <>
      <div className='container-Cards-Expending'>
        <div
          onClick={setPanel0F}
          className={`panel-active ${Panel0 === true ? 'active' : ''}`}
        >
          <h9>קביעת תור עצמאית</h9>
        </div>
        <div
          onClick={setPanel1F}
          className={`panel1   ${Panel1 === true ? 'active' : ''}`}
        >
          <h9>מערכת תזכורות מתקדמת </h9>
        </div>
        <div
          onClick={setPanel2F}
          className={`panel2 ${Panel2 === true ? 'active' : ''}`}
        >
          <h9>ניהול יומן</h9>
        </div>
        <div
          onClick={setPanel3F}
          className={`panel3 ${Panel3 === true ? 'active' : ''}`}
        >
          <h9>סליקה חכמה</h9>
        </div>
        <div
          onClick={setPanel4F}
          className={`panel4 ${Panel4 === true ? 'active' : ''}`}
        >
          <h9>הוצאת דוח"ות</h9>
        </div>
      </div>
    </>
  )
}

export default ExpendingCards

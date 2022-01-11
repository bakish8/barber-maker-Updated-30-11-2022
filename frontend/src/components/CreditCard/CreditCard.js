import React from 'react'
import './CreditCardForm.css'
import { useState, useRef, useEffect } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { Row, Col } from 'react-bootstrap'
import PayMyTor from '../../actions/userActions'
import { useDispatch } from 'react-redux'

const CreditCard = (props) => {
  const dispatch = useDispatch()

  const ClockID = props.id
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')

  const handlePay = () => {
    console.log(ClockID)
    console.log(number)
    console.log(name)
    console.log(expiry)
    console.log(cvc)
  }

  useEffect(() => {
    ref.current.focus()
  }, [])

  const ref = useRef(null)
  return (
    <div id='AllForm'>
      <div id='CreditImage'>
        <Row>
          <Col id='margintopMe'>
            <Cards
              className='centerCard'
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focus}
            />
          </Col>
          <Col>
            <h3 id='puutCreditDeets_headLine'>הזן פרטי אשראי</h3>

            <form className='centerCard'>
              <input
                id='Input'
                type='tel'
                name='number'
                placeholder='מספר הכרטיס'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
                ref={ref}
              />
              <input
                id='Input'
                type='text'
                name='name'
                placeholder='שם בעל/ת הכרטיס'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
              <input
                id='Input'
                type='text'
                name='expiry'
                placeholder='חודש/שנה'
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
              <input
                id='Input'
                type='tel'
                name='cvc'
                placeholder='cvv'
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
            </form>
          </Col>
        </Row>
        <Row>
          <button onClick={handlePay} id='pay'>
            שלם
          </button>
        </Row>
      </div>
    </div>
  )
}

export default CreditCard

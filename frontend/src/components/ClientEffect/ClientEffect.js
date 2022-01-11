import { updateExpression } from 'jscodeshift'
import React, { useEffect, useState } from 'react'
import './ClientEffect.css'

const ClientEffect = () => {
  const [state, setState] = useState('אביחי מלול')
  const [statepic, setStatepic] = useState(
    'https://images.unsplash.com/photo-1611095973763-414019e72400?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'
  )
  const [statetext, setStatetext] = useState(
    '     הפסקתי להתעסק בנייד שלי בזמן תספורות ,הלקוחות שלי קובעים תורים עצמאית בקלות דרך הנייד וגם לא שוחכים להגיע בזמן בזכות מערכת התזכורות !האוטומטית ,נהנה מכל רגע ! סוף סוף אני יכול לעבוד עם שני הידיים'
  )
  const [statetextRoll, setStatetextRoll] = useState('בעל מספרה')

  const testimonials = [
    {
      name: 'מייקל בטיטו',
      position: 'בעל מספרה',
      photo:
        'https://images.unsplash.com/photo-1512353087810-25dfcd100962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
      text: 'עבדתי קשה כל החיים,עכשיו יש לי זמן לשתות קפה,כולם באים בזמן ואני מתעסק בלספר אנשים היום אני גם מוכר מוצרים דרך האתר שלי כמו שמן לזקן וקרם פנים לגבר וכך מנהל את התורים בקלות וגם חנות דיגיטלית בנוסף',
    },
    {
      name: 'דניאל עמרן',
      position: 'מעצב שיער',
      photo:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
      text: 'משלם 200 ש"ח בחודש שזה עלות של 4 לקוחות שמסתפרים אצלי ,אני מספר בחודש בין 300 ל-400 לקוחות ,השקעה של 1% מההכנסות של העסק למערכת שתנהל את הכל וגם תחסוך לכם את המזכירה,חבל על הזמן שווה את הכסף',
    },
    {
      name: 'רפי כהן',
      position: 'ספר',
      photo:
        'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      text: 'מערכת האס אם אסים מקלה על הספר ועל הלקוח ומונעת "הברזת תורים" מה שמאפשר לעסק להתקדם',
    },
  ]

  let idx = 1

  function updateTestomonials() {
    const { name, position, photo, text } = testimonials[idx]

    console.log(name)
    console.log(position)
    console.log(photo)
    console.log(text)
    setState(name)
    setStatepic(photo)
    setStatetext(text)
    setStatetextRoll(position)
    idx++

    if (idx > testimonials.length - 1) {
      idx = 0
    }
    return name
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateTestomonials()

      console.log('This will run every second!')
    }, 10000)
  }, [])

  return (
    <>
      <div className='testimonial-container'>
        <div className='.fa-quote-left  fa-quote'>
          {' '}
          <i class='fas fa-quote-left'></i>
        </div>

        <p className='testmonial'>{statetext}</p>

        <div className='.fa-quote-right  fa-quote'>
          {' '}
          <i class='fas fa-quote-right'></i>
        </div>

        <div className='user-Say'>
          <i id='smileee' class='far fa-smile'></i>

          <div className='user-details-Say'>
            <p className='Role-User-Say'>{statetextRoll}</p>{' '}
            <h4 className='user-Name-Say'>{state}</h4>
          </div>
          <img className='user-Image-Say' src={statepic} />
        </div>
        <div className='progress-Bar'> </div>
      </div>
    </>
  )
}

export default ClientEffect

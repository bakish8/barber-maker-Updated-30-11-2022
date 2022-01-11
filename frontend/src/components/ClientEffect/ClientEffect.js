import React from 'react'
import './ClientEffect.css'

const ClientEffect = () => {
  return (
    <>
      <div className='testimonial-container'>
        <div className='.fa-quote-left  fa-quote'>
          {' '}
          <i class='fas fa-quote-left'></i>
        </div>

        <p className='testmonial'>
          הפסקתי להתעסק בנייד שלי בזמן תספורות ,הלקוחות שלי קובעים תורים עצמאית
          בקלות דרך הנייד וגם לא שוחכים להגיע בזמן בזכות מערכת התזכורות
          !האוטומטית ,נהנה מכל רגע ! סוף סוף אני יכול לעבוד עם שני הידיים
        </p>

        <div className='.fa-quote-right  fa-quote'>
          {' '}
          <i class='fas fa-quote-right'></i>
        </div>

        <div className='user-Say'>
          <i id='smileee' class='far fa-smile'></i>

          <div className='user-details-Say'>
            <p className='Role-User-Say'>בעל מספרה</p>{' '}
            <h4 className='user-Name-Say'>אביחי מלול</h4>
          </div>
          <img
            className='user-Image-Say'
            src='https://images.unsplash.com/photo-1611095973763-414019e72400?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80'
          />
        </div>
        <div className='progress-Bar'> </div>
      </div>
    </>
  )
}

export default ClientEffect

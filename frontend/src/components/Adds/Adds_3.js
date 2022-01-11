import React from 'react'
import './Adds_3.css'

const Adds_3 = () => {
  return (
    <div className='price-section' id='scaleAbit'>
      <article className='price-tableRed'>
        <div id='innerrRed'>
          <div className='pricedivRed'>
            <div className='priceRed'>חינם</div>
          </div>
          <h2 className='title1'>לחודש ניסיון</h2>

          <p className='description3'>!נסה את המערכת ללא עלות</p>
          <div className='features'>
            <details id='checkmark' className='feature'>
              <summary>
                <i className='question-iconRed'></i>

                <h3 className='nameRed'>רישיון אישי מתחדש</h3>
                <i
                  className='fas fa-times'
                  style={{ color: 'red' }}
                  id='smallX'
                ></i>
              </summary>
              <div className='answer'>גישה חופשית לכלל האפשרויות במערכת</div>
            </details>
            <details id='checkmark' className='feature'>
              <summary>
                <i className='question-iconRed'></i>

                <h3 className='nameRed'>עדכונים בחינם</h3>

                <i
                  className='fas fa-times'
                  style={{ color: 'red' }}
                  id='smallX'
                ></i>
              </summary>
              <div className='answer'>
                תזכורות אישיות למשתמשים ,מערכת אס.אם.אסים אוטומטית שתזכיר ללקוח
                שלך להגיע בזמן
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'></i>
                <h3 className='nameRed'>ניהול יומן עבודה</h3>

                <i className='checkmark' id='checkmark'></i>
              </summary>
              <div className='answer'>
                {' '}
                יצרנו בשבילך את מערכת ניהול התורים והעבודה האולטימטיבית כדי
                שתוכל להמשיך לעבוד עם שתי הידיים
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'></i>
                <h3 className='nameRed'>ניהול דוחו"ת</h3>

                <i className='checkmark' id='checkmark'></i>
              </summary>
              <div className='answer'>
                סיכומים חודשיים,שבועיים ויומיים ,דוח"ות כספיים ועוד
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i id='checkmark' className='question-iconRed'></i>
                <h3 className='nameRed'>אבטחה מקסימלית</h3>

                <i className='checkmark' id='checkmark'></i>
              </summary>
              <div className='answer'>
                כאן בברבר מייקר אנחנו דואגים לאבטחה של הלקוחות שלך ושלך עם
                שירותי הסליקה והאבטחה המתקדמים בעולם
              </div>
            </details>
            <details id='checkmark' className='feature'>
              <summary>
                <i className='question-iconRed'></i>
                <h3 className='nameRed'>אפשרויות סליקה</h3>

                <i
                  className='fas fa-times'
                  style={{ color: 'red' }}
                  id='smallX'
                ></i>
              </summary>
              <div className='answer'>
                אפשרויות סליקה,קבלת כסף באשראי בביט או במזומן וניהול קופה
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'></i>
                <h3 className='nameRed'>ניהול עובדים</h3>
                <i className='checkmark' id='checkmark'></i>
              </summary>
              <div className='answer'>נהל את העובדים שלך</div>
            </details>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Adds_3

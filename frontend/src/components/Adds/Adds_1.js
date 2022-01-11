import React from 'react'
import './Adds_1.css'

const Adds_1 = () => {
  return (
    <div className='price-section' id='scaleAbit'>
      <article className='price-table'>
        <div id='innerr'>
          <div className='pricediv'>
            <div className='price'>
              <small>₪</small>200
            </div>
          </div>

          <h2 className='title'>לחודש</h2>
          <p className='description1'>:תשלום שיכלול </p>
          <div className='features'>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>

                <h3 className='name'>רישיון אישי מתחדש</h3>
                <i className='checkmark'></i>
              </summary>
              <div className='answer'>גישה חופשית לכלל האפשרויות במערכת</div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>

                <h3 className='name'>עדכונים בחינם</h3>

                <i className='checkmark'></i>
              </summary>
              <div className='answer'>
                תזכורות אישיות למשתמשים ,מערכת אס.אם.אסים אוטומטית שתזכיר ללקוח
                שלך להגיע בזמן
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>
                <h3 className='name'>ניהול יומן עבודה</h3>

                <i className='checkmark'></i>
              </summary>
              <div className='answer'>
                {' '}
                יצרנו בשבילך את מערכת ניהול התורים והעבודה האולטימטיבית כדי
                שתוכל להמשיך לעבוד עם שתי הידיים
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>
                <h3 className='name'>ניהול דוחו"ת </h3>

                <i className='checkmark'></i>
              </summary>
              <div className='answer'>
                סיכומים חודשיים,שבועיים ויומיים ,דוח"ות כספיים ועוד
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>
                <h3 className='name'>אבטחה מקסימלית</h3>

                <i className='checkmark'></i>
              </summary>
              <div className='answer'>
                כאן בברבר מייקר אנחנו דואגים לאבטחה של הלקוחות שלך ושלך עם
                שירותי הסליקה והאבטחה המתקדמים בעולם
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>
                <h3 className='name'>אפשרויות סליקה</h3>

                <i className='checkmark'></i>
              </summary>
              <div className='answer'>
                אפשרויות סליקה,קבלת כסף באשראי בביט או במזומן וניהול קופה
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-icon'></i>
                <h3 className='name'>ניהול עובדים</h3>
                <i className='checkmark'></i>
              </summary>
              <div className='answer'>נהל את העובדים שלך</div>
            </details>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Adds_1

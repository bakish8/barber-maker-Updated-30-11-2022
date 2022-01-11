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
            <details className='feature'>
              <summary>
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>

                <h3 className='nameRed'>רישיון אישי מתחדש</h3>
                <i
                  className='fas fa-times'
                  style={{ color: 'red' }}
                  id='smallX'
                ></i>
              </summary>
              <div className='answer'>גישה חופשית לכלל האפשרויות במערכת</div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>

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
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>
                <h3 className='nameRed'>ניהול יומן עבודה</h3>

                <i className='checkmark'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'
                    />
                  </svg>
                </i>
              </summary>
              <div className='answer'>
                {' '}
                יצרנו בשבילך את מערכת ניהול התורים והעבודה האולטימטיבית כדי
                שתוכל להמשיך לעבוד עם שתי הידיים
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>
                <h3 className='nameRed'>ניהול דוחו"ת</h3>

                <i className='checkmark'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'
                    />
                  </svg>
                </i>
              </summary>
              <div className='answer'>
                סיכומים חודשיים,שבועיים ויומיים ,דוח"ות כספיים ועוד
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>
                <h3 className='nameRed'>אבטחה מקסימלית</h3>

                <i className='checkmark'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'
                    />
                  </svg>
                </i>
              </summary>
              <div className='answer'>
                כאן בברבר מייקר אנחנו דואגים לאבטחה של הלקוחות שלך ושלך עם
                שירותי הסליקה והאבטחה המתקדמים בעולם
              </div>
            </details>
            <details className='feature'>
              <summary>
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>
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
                <i className='question-iconRed'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z'
                    />
                  </svg>
                </i>
                <h3 className='nameRed'>ניהול עובדים</h3>
                <i className='checkmark'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                  >
                    <path fill='none' d='M0 0h24v24H0z' />
                    <path
                      fill='currentColor'
                      d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z'
                    />
                  </svg>
                </i>
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

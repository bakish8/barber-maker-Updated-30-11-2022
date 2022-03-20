import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Parallax } from 'react-parallax'
import './FAQ.css'

const FAQ = () => {
  const [ShowAnswer, setShowAnswer] = useState(false)
  const [ShowAnswer1, setShowAnswer1] = useState(false)
  const [ShowAnswer2, setShowAnswer2] = useState(false)
  const [ShowAnswer3, setShowAnswer3] = useState(false)
  const [ShowAnswer4, setShowAnswer4] = useState(false)
  const [ShowAnswer5, setShowAnswer5] = useState(false)
  return (
    <>
      <Parallax
        className='imageParalaxxxx'
        bgImage='https://i.ibb.co/QCXvPnb/7971.jpg'
        strength={400}
      >
        {' '}
        <span className='weareBarberMaker'>
          <section id='faqs'>
            <div class='container'>
              <h1 className='faqsss'>שאלות נפוצות</h1>
              <div class='content'>
                <article onClick={() => setShowAnswer(!ShowAnswer)}>
                  <img
                    id='imggggggg'
                    src='https://i.ibb.co/xCDdG98/money.png'
                  ></img>
                  <div className='icon'>
                    <i
                      onClick={() => setShowAnswer(true)}
                      className={ShowAnswer ? 'Hidemeanswer' : 'Showmeanswer'}
                    >
                      +
                    </i>
                    <i
                      onClick={() => setShowAnswer(false)}
                      className={ShowAnswer ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      -
                    </i>
                  </div>
                  <div class='detail'>
                    <h4 className={ShowAnswer ? 'questionanswer' : 'question'}>
                      ?כמה זה עולה
                    </h4>
                    <p className={ShowAnswer ? 'Showmeanswer' : 'Hidemeanswer'}>
                      קיימים לרשותך מספר אופציות לשימוש במערכת לחץ כאן לצפייה
                      בתוכנית ובמחיר שמתאימה לך
                    </p>
                  </div>
                </article>
                <article onClick={() => setShowAnswer1(!ShowAnswer1)}>
                  <img
                    id='imggggggg'
                    src='https://i.ibb.co/5hRPgJ7/BM-SVG.png'
                  ></img>
                  <div className='icon'>
                    <i
                      onClick={() => setShowAnswer1(true)}
                      className={ShowAnswer1 ? 'Hidemeanswer' : 'Showmeanswer'}
                    >
                      +
                    </i>
                    <i
                      onClick={() => setShowAnswer1(false)}
                      className={ShowAnswer1 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      -
                    </i>
                  </div>
                  <div class='detail'>
                    <h4 className={ShowAnswer1 ? 'questionanswer' : 'question'}>
                      ?איך זה עובד
                    </h4>
                    <p
                      className={ShowAnswer1 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      פשוט וקל!, קבע את השעות שבהם תרצה לעבוד במערכת ותן ללקוחות
                      שלך לקבוע תור עצמאית
                    </p>
                  </div>
                </article>
                <article onClick={() => setShowAnswer2(!ShowAnswer2)}>
                  <img
                    id='imggggggg'
                    src='https://i.ibb.co/Q9H2Twn/icons8-credit-card-96.png'
                  ></img>
                  <div className='icon'>
                    <i
                      onClick={() => setShowAnswer2(true)}
                      className={ShowAnswer2 ? 'Hidemeanswer' : 'Showmeanswer'}
                    >
                      +
                    </i>
                    <i
                      onClick={() => setShowAnswer2(false)}
                      className={ShowAnswer2 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      -
                    </i>
                  </div>
                  <div class='detail'>
                    <h4
                      className={ShowAnswer2 ? 'questionanswer' : 'question2'}
                    >
                      ?הלקוחות שלי יוכלו לשלם במערכת{' '}
                    </h4>
                    <p
                      className={ShowAnswer2 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      בהחלט,בנוסף לקביעת תור עצמאית ולעוד המון פיצ'רים מגניבים
                      בסיום הטיפול יהיה ניתן לבצע תשלום מאובטח שיגיע ישירות אליך
                      באמצעות ביט אשראי או מזומן
                    </p>
                  </div>
                </article>
                <article onClick={() => setShowAnswer3(!ShowAnswer3)}>
                  <img
                    id='imggggggg'
                    src='https://i.ibb.co/51290Z3/icons8-www-64.png'
                  ></img>
                  <div className='icon'>
                    <i
                      onClick={() => setShowAnswer3(true)}
                      className={ShowAnswer3 ? 'Hidemeanswer' : 'Showmeanswer'}
                    >
                      +
                    </i>
                    <i
                      onClick={() => setShowAnswer3(false)}
                      className={ShowAnswer3 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      -
                    </i>
                  </div>
                  <div class='detail'>
                    <h4
                      className={ShowAnswer3 ? 'questionanswer' : 'question2'}
                    >
                      ?אני מקבל אתר משלי{' '}
                    </h4>
                    <p
                      className={ShowAnswer3 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      המערכת פועלת על אתר אינטרנט ממותג ואישי משלך שתוכל לשלח
                      בלינק לכל הלקוחות שלך שמהיום יוכלו לקבוע תור בקלות יותר
                      מבלי להתקשר
                    </p>
                  </div>
                </article>{' '}
                <article onClick={() => setShowAnswer4(!ShowAnswer4)}>
                  <img
                    id='imggggggg'
                    src='https://i.ibb.co/0mwkrf6/icons8-whatsapp-100.png'
                  ></img>
                  <div className='icon'>
                    <i
                      onClick={() => setShowAnswer4(true)}
                      className={ShowAnswer4 ? 'Hidemeanswer' : 'Showmeanswer'}
                    >
                      +
                    </i>
                    <i
                      onClick={() => setShowAnswer4(false)}
                      className={ShowAnswer4 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      -
                    </i>
                  </div>
                  <div class='detail'>
                    <h4
                      className={ShowAnswer4 ? 'questionanswer' : 'question2'}
                    >
                      ?מה לגבי תזכורות ווצאפ{' '}
                    </h4>
                    <p
                      className={ShowAnswer4 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      תוכל להתאים אישית את התזכורות וההודעות שישלחו ללקוחות שלך
                      ותוכל לשלח אותם בהודעת ווצאפ ו/או בהודעת אס.אם.אס
                    </p>
                  </div>
                </article>{' '}
                <article onClick={() => setShowAnswer5(!ShowAnswer5)}>
                  <img
                    id='imggggggg'
                    src='https://i.ibb.co/9g2m93T/icons8-robot-60.png'
                  ></img>
                  <div className='icon'>
                    <i
                      onClick={() => setShowAnswer5(true)}
                      className={ShowAnswer5 ? 'Hidemeanswer' : 'Showmeanswer'}
                    >
                      +
                    </i>
                    <i
                      onClick={() => setShowAnswer5(false)}
                      className={ShowAnswer5 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      -
                    </i>
                  </div>
                  <div class='detail'>
                    <h4
                      className={ShowAnswer5 ? 'questionanswer' : 'question2'}
                    >
                      ?מה עם יחס אישי
                    </h4>
                    <p
                      className={ShowAnswer5 ? 'Showmeanswer' : 'Hidemeanswer'}
                    >
                      תכננו עוזר אישי שיעזור לכם לנהל את היום באמצעות פקודות
                      קוליות כך שתוכל לדוגמא להכריז: תכניס לי את יוסי וקנין היום
                      לשעה 8 והכל יטופל כפי שביקשת
                    </p>
                  </div>
                </article>{' '}
                <div> </div>
              </div>{' '}
            </div>{' '}
          </section>
        </span>{' '}
      </Parallax>
    </>
  )
}

export default FAQ

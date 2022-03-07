//*****הגדרוות */
import { google } from 'googleapis'
const { OAuth2 } = google.auth
export const BookmeOnGoogleCalender = (m1, userEmail) => {
  let OAuth2Client = new OAuth2(
    '452001077432-h4lhfoemnipvlbokdtamftv3p7m0rr9f.apps.googleusercontent.com',
    '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'
  )
  OAuth2Client.setCredentials({
    refresh_token:
      '1//04_JNl9Q-kdjMCgYIARAAGAQSNwF-L9IrXZvAKctjjtftOzDxE2o0k3vBT1qM9EztxONmJwQ8zfMrgaZPb9uohWrZC78SGrnJpQk',
  })
  console.log(`OAuth2Client is :${OAuth2Client}`)

  let calender = google.calendar({ version: 'v3', auth: OAuth2Client })
  let eventStartTime = new Date(m1)
  eventStartTime.setHours(eventStartTime.getHours() + 2)
  console.log(`eventStartTime:${eventStartTime}`)
  // eventStartTime.setDate(eventStartTime.getDay()) //***זה ישים לנו תזכורת למחר בגוגל קלנדר */

  let eventEndTime = new Date(m1)
  console.log(`eventEndTime:${eventEndTime}`)

  eventEndTime.setMinutes(eventEndTime.getMinutes() + 30) //***זה יוסיף חצי שעה */
  eventEndTime.setHours(eventEndTime.getHours() + 2)

  console.log(`eventEndTime AFTER:${eventEndTime}`)

  let event = {
    summary: 'תור למספרה',
    location: 'עלי 4, אשקלון',
    description: 'תספורת גבר',
    start: {
      dateTime: eventStartTime, //***תאריך ההתחלה */
      timeZone: 'Asia/Jerusalem',
    },
    end: {
      dateTime: eventEndTime, //***תאריך סיום */
      timeZone: 'Asia/Jerusalem',
    },
    colorId: 9,
    attendees: [{ email: 'omribakish8@gmail.com' }, { email: userEmail }],
  }
  console.log(`event:${event}`)
  //******מוודא שלא ישלח לנו ארורר במידה ויש כבר מישהו בשעה הזאת לכל משתמש יש את היומן שלו יכולים להיות 2 מספתפרים לאותה שעה לשני ספרים שונים */
  calender.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'Asia/Jerusalem',
        items: [{ id: 'primary' }], //כך אנו בודקים את הקלנדר אהראשי של המשתמש
      },
    },
    (err, res) => {
      if (err) return console.error('FREE-BUSY QUIRY ERROR ! :', err)
      let eventsArr = res.data.calendars.primary.busy
      if (eventsArr.length === 0)
        return calender.events.insert(
          { calendarId: 'primary', resource: event },
          (err) => {
            if (err)
              return console.error('Calender Event Creation Error!!! :', err)
            return console.log('Calrnder Event Created!!!!!!!!!')
          }
        )
      return console.log('Sorry The User is Busy in hes Calender')
    }
  )
}

//*****new google make appointment try */
//steps to be done...get google user from reducer to pick hour screen ig google user send the action to BookMEonGoogleCalenderControllerAction and then to google auth 2 with this file
import { google } from 'googleapis'

export const BookmeOnGoogleCalender2 = (m1, OAuth2Client) => {
  const calender = google.calendar({ version: 'v3', auth: OAuth2Client })
  const eventStartTime = new Date(m1)
  eventStartTime.setDate(eventStartTime.getDay()) //***זה ישים לנו תזכורת למחר בגוגל קלנדר */
  const eventEndTime = new Date(m1)
  eventEndTime.setMinutes(eventEndTime.getMinutes() + 30) //***זה יוסיף חצי שעה */
  const event = {
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
    attendees: [{ email: 'omribakish8@gmail.com' }, { email: userEmail }], //למי יקבע אירוע ביומן
  }
  //******מוודא שלא ישלח לנו ארורר במידה ויש כבר מישהו בשעה הזאת לכל משתמש יש את היומן שלו יכולים להיות 2 מספתפרים לאותה שעה לשני ספרים שונים */
  calender.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'Asia/Jerusalem',
        items: [{ id: 'primary' }], //כך אנו בודקים את הקלנדר הראשי של המשתמש
      },
    },
    (err, res) => {
      if (err) return console.error('FREE-BUSY QUIRY ERROR ! :', err)
      const eventsArr = res.data.calendars.primary.busy
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

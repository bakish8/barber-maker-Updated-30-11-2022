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

/********************BOOK ME ON GOOGLE CALENDER COPY WORKED VEFORE ON DEVELOPMENT ************************************* */
//*****הגדרוות */
import { google } from 'googleapis'
const { OAuth2 } = google.auth
export const BookmeOnGoogleCalender = (m1, userEmail) => {
  const SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly',
  ] /********* */
  const OAuth2Client = new OAuth2(
    '452001077432-h4lhfoemnipvlbokdtamftv3p7m0rr9f.apps.googleusercontent.com',
    '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'
  )
  OAuth2Client.setCredentials({
    refresh_token:
      '1//04gWcMbm5KBFVCgYIARAAGAQSNwF-L9IrV5GV1g0NDL85gGsAPhNUcGCQKyPJBrwCDMVfSyXGjyuOME81hdMaiBvlZZi4MoL0h58',
  })
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
    attendees: [{ email: 'omribakish8@gmail.com' }, { email: userEmail }],
  }
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

/*************AppointmentsController SENDS EMAIL WOERKED BRFORE IN DEVLOPMENT WITH THE CODE UP***************** */
//need to be fixed to if is google user is logged in ==> use scope and send google user to next google caldner api function
//if not a google user open a new Aouth passport screen and get accses to calender
const BookMEonGoogleCalenderControllerAction = asyncHandler(
  async (req, res) => {
    const clock = await Clock.findById(req.params.id).populate(
      'owner',
      'Dateday Datemonth Dateyear dayInWeek'
    )
    const user = await User.findById(req.params.uid)
    console.log(clock.time)
    const hour = clock.time.substring(0, 2)
    const minute = clock.time.slice(-2)
    const year = clock.owner.Dateyear
    const month = clock.owner.Datemonth - 1
    const day = clock.owner.Dateday

    const m1 = moment({
      year: `${year}`,
      month: `${month}`,
      day: `${day}`,
      hour: `${hour}`,
      minute: `${minute}`,
      second: 0,
      millisecond: 0,
    }).tz('Asia/Jerusalem')

    BookmeOnGoogleCalender(m1, user.email)
  }
)

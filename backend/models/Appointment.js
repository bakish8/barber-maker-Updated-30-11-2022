//IMPORTS
import moment from 'moment'
import mongoose from 'mongoose'
import Twilio from 'twilio'
//NEED TO BE ENV IMPORTS *****
const accountSid = 'AC17b672eb86d7fd2088ffd30cc1cbc0c2'
const authToken = '90eccfedbc5d9e5d5c3e1edc25bedc5b'

// Appointment
// ███████╗██╗  ██╗ ██████╗███████╗███╗   ███╗ █████╗
// ██╔════╝██║  ██║██╔════╝██╔════╝████╗ ████║██╔══██╗
// ███████╗███████║██║     █████╗  ██╔████╔██║███████║
// ╚════██║██╔══██║██║     ██╔══╝  ██║╚██╔╝██║██╔══██║
// ███████║██║  ██║╚██████╗███████╗██║ ╚═╝ ██║██║  ██║
// ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝

var AppointmentSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  notification: Number,
  time: { type: Date, index: true },
  sapar: String,
  smsTime: String,
  smsDate: String,
  smsDay: String,
  reminderType: { type: String, enum: ['whatsapp', 'sms'] },
})

// ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
// ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
// ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
// ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
// ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
// ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝

//Calculate time agains appintment
AppointmentSchema.methods.requiresNotification = function (FormatedSearchDate) {
  console.log(
    `Monent This Time ${moment(this.time).tz('Asia/Jerusalem').utc()}`
  )
  console.log(
    `FormatedSearchDate utc  ${moment(FormatedSearchDate)
      .add(3, 'hours')
      .utc()}`
  )
  console.log(
    `Duration is :${Math.round(
      moment
        .duration(
          moment(this.time)
            .tz('Asia/Jerusalem')
            .utc()
            // .diff(moment(FormatedSearchDate).utc())
            .diff(moment(FormatedSearchDate).add(3, 'hours').utc())
        )
        .asMinutes()
    )}`
  )
  return (
    Math.round(
      moment
        .duration(
          moment(this.time)
            .tz('Asia/Jerusalem')
            .utc()
            //.diff(moment(FormatedSearchDate).utc())
            .diff(moment(FormatedSearchDate).add(3, 'hours').utc())
        )
        .asMinutes()
    ) === this.notification
  )
}
//send Notifications
AppointmentSchema.statics.sendNotifications = function (callback) {
  //now
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()

  Appointment.find().then(function (appointments) {
    appointments = appointments.filter(function (appointment) {
      return appointment.requiresNotification(FormatedSearchDate)
    })
    if (appointments.length > 0) {
      sendNotifications(appointments)
    }
  })
  /*** Send messages to all appoinment owners via Twilio
   * @param {array} appointments //List of appointments.
   */
  //
  function sendNotifications(appointments) {
    const client = new Twilio(accountSid, authToken)
    appointments.forEach(function (appointment) {
      // Create options to send the message
      const options = {
        to: `+972${appointment.phoneNumber}`,
        from: '+972526971902',
        /* eslint-disable max-len */
        body: `שלום ${appointment.name}. להזכירך נפגשים במספרה בשעה ${appointment.smsTime} ,מצפה לראותך ${appointment.sapar} ,במידה ואינך מגיע יש באפשרותך לבטל את התור בלחיצה כאן`,
        /* eslint-enable max-len */
      }
      if (appointment.reminderType == 'sms') {
        console.log(`SMS REMINDER TIME ...TRYING TO SEND IT !`)
        // Send the message!
        client.messages.create(options, function (err, response) {
          if (err) {
            // Just log it for now
            console.error(err)
          } else {
            // Log the last few digits of a phone number
            let masked = appointment.phoneNumber.substr(
              0,
              appointment.phoneNumber.length - 5
            )
            masked += '*****'
            console.log(`SMS Message sent to ${masked}`)
          }
        })
      } else if (appointment.reminderType == 'whatsapp') {
        console.log(`whatsapp REMINDER TIME ...TRYING TO SEND IT !`)
        client.messages
          .create({
            body: `שלום ${appointment.name}. להזכירך נפגשים במספרה בשעה ${appointment.smsTime} ,מצפה לראותך ${appointment.sapar} ,במידה ואינך מגיע יש באפשרותך לבטל את התור בלחיצה כאן`,
            to: `whatsapp:+972${appointment.phoneNumber}`,
            from: `whatsapp:+972526971902`,
          })
          .then((message) =>
            console.log(
              `EMMMM...I SEND WHATSAPP MESSAGE  !! AND THIS IS MESSAGE SID :${message.sid}`
            )
          )
          .done()
      }
    })
    // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery
    if (callback) {
      callback.call()
    }
  }
}
//EXPORT
const Appointment = mongoose.model('appointment', AppointmentSchema)
export default Appointment

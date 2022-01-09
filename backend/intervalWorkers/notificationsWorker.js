import Appointment from '../models/Appointment.js'
const notificationWorkerFactory = function () {
  return {
    run: function () {
      Appointment.sendNotifications()
    },
  }
}

export default notificationWorkerFactory()

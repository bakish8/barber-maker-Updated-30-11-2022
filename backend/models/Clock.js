import mongoose from 'mongoose'
import moment from 'moment'
import User from './userModel.js'

// CLOCK
// ███████╗██╗  ██╗ ██████╗███████╗███╗   ███╗ █████╗
// ██╔════╝██║  ██║██╔════╝██╔════╝████╗ ████║██╔══██╗
// ███████╗███████║██║     █████╗  ██╔████╔██║███████║
// ╚════██║██╔══██║██║     ██╔══╝  ██║╚██╔╝██║██╔══██║
// ███████║██║  ██║╚██████╗███████╗██║ ╚═╝ ██║██║  ██║
// ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝
const ClockSchema = mongoose.Schema(
  {
    time: { type: String, required: true },
    avilable: { type: Boolean, required: true },
    isPending: { type: Boolean, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'WorkingDay',
    },
    date: {
      type: String,
      required: true,
    },
    mistaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tipul: {
      type: mongoose.Schema.Types.ObjectId, //*** new****/
      ref: 'Tipul',
    },
    sapar: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    TotalAmmountPaid: {
      type: Number,
    },
    paymentMethod: { type: String, enum: ['credit', 'cash', 'bit', null] },
    paidAt: {
      type: Date,
    },
    creditLastDigits: {
      type: String,
    },
    ReciptNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)
// ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
// ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
// ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
// ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
// ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
// ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
ClockSchema.statics.checkifRelvantforUser = async function () {
  const searchDate = new Date()
  const FormatedSearchDate = moment(searchDate).format()
  const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
  const month = CalculateMonthmonth.slice(-2)
  const CalculateDay = FormatedSearchDate.substring(0, 10)
  const day = CalculateDay.slice(8)
  const year = FormatedSearchDate.substring(0, 4)
  const Calculateminute = FormatedSearchDate.slice(14)
  const minute = Calculateminute.substring(0, 2)
  const CalculateHour = FormatedSearchDate.slice(11)
  const hour = CalculateHour.substring(0, 2)
  const time = `${hour}:${minute}`
  const date = `${day}/${month}/${year}`

  //DELETE TORS FROM USER AFTER THE TIME PAST
  const clocks = await Clock.find({ date: date })
  if (clocks) {
    for (let clock of clocks) {
      const clockhour = clock.time.substring(0, 2)
      if (clockhour < hour && !clock.avilable) {
        const user = await User.findById(clock.mistaper).populate('torim')
        if (user) {
          for (let tor of user.torim) {
            if ((tor._id = clock._id)) {
              tor.isPending = false
              await tor.save()
            }
          }
        }
      } else if (clockhour <= hour) {
        clock.isPending = false
        await clock.save()
      }
    }
  }
}
const Clock = mongoose.model('Clock', ClockSchema)
export default Clock

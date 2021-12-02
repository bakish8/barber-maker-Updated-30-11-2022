import mongoose from 'mongoose'

const WorkingDaySchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', //יוזר שהוא אובייקט איידי
    },
    date: {
      type: String,
      required: true,
    },
    avilable: {
      type: Boolean,
      required: true,
    },
    dayInWeek: {
      type: String,
      required: true,
    },

    torim: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clock',
      },
    ],

    numTorim: {
      type: Number,
      required: true,
      default: 0,
    },
    numAvilableTorim: {
      type: Number,
      required: true,
      default: 0,
    },
    moneyCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, //ייצור שדות נוספים ננוצר ב. ווהתעדכן ב.
  }
)

const WorkingDay = mongoose.model('WorkingDay', WorkingDaySchema)

export default WorkingDay

import mongoose from 'mongoose'

const CancelNotificationSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    clock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clock',
    },
    date: {
      type: String,
    },
    dayinweek: {
      type: String,
    },
    time: {
      type: String,
    },
    UTimeStamp: {
      type: String,
      required: true,
    },
    watch: {
      type: Boolean,
      default: false,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,  // FIX
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const CancelNotification = mongoose.model(
  'CancelNotification',
  CancelNotificationSchema
)

export default CancelNotification

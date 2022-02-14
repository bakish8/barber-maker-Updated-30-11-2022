import mongoose from 'mongoose'

const CancelNotificationSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    clock: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Clock',
    },
    date: {
      type: String,
      required: true,
    },
    dayinweek: {
      type: String,
      required: true,
    },
    time: {
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
      required: true,
      ref: 'User',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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

import mongoose from 'mongoose'

const ClockSchema = mongoose.Schema(
  {
    time: { type: String, required: true },
    avilable: { type: Boolean, required: true },
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
    sapar: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Clock = mongoose.model('Clock', ClockSchema)

export default Clock

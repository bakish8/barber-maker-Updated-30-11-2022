import mongoose from 'mongoose'

const PaymentSchema = mongoose.Schema(
  {
    giver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    getter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    paymentMethod: { type: String, enum: ['credit', 'cash', 'bit'] },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    paidAt: {
      type: Date,
      required: true,
    },
    creditLastDigits: {
      type: String,
    },
    ReciptNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Payment = mongoose.model('Payment', PaymentSchema)

export default Payment

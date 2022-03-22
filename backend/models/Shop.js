import mongoose from 'mongoose'

const shopSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
    phone: {
      type: Number,
    },
    shopOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    ],
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tipulim: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tipul',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Shop = mongoose.model('Shop', shopSchema)

export default Shop

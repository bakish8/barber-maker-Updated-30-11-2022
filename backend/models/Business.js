import mongoose from 'mongoose'

const shopSchema = mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    location: {
      /*** */ name: { type: String },
      lat: { type: String },
      lng: { type: String },
    },
    websiteColors: {
      type: String,
      enum: ['black+white', 'black+blue'],
      default: 'black+white',
    },
    image: {
      type: String,
    },
    logo: {
      type: String,
    },
    logoNameOnNav: {
      type: Boolean,
    },
    phone: {
      type: Number,
      unique: true,
    },
    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    workers: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

const Business = mongoose.model('Business', shopSchema)

export default Business

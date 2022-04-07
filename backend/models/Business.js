import mongoose from 'mongoose'

const shopSchema = mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    location: {
      /*** */ name: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    },
    settings: {
      sendSMSClientSide: { type: Boolean },
      sendWhatsappClientSide: { type: Boolean },
      sendSMSAdminSide: { type: Boolean },
      sendWhatsappAdminSide: { type: Boolean },
      sendSMSClientSideCancel: { type: Boolean },
      sendWhatsappClientSideCancel: { type: Boolean },
      sendSMSAdminSideCancel: { type: Boolean },
      sendWhatsappAdminSideCancel: { type: Boolean },
      sendSMSClientSideReminder: { type: Boolean },
      sendWhatsappClientSideReminder: { type: Boolean },
      sendSMSAdminSideReminder: { type: Boolean },
      sendWhatsappAdminSideReminder: { type: Boolean },
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

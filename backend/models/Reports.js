import mongoose from 'mongoose'

// Report
// ███████╗██╗  ██╗ ██████╗███████╗███╗   ███╗ █████╗
// ██╔════╝██║  ██║██╔════╝██╔════╝████╗ ████║██╔══██╗
// ███████╗███████║██║     █████╗  ██╔████╔██║███████║
// ╚════██║██╔══██║██║     ██╔══╝  ██║╚██╔╝██║██╔══██║
// ███████║██║  ██║╚██████╗███████╗██║ ╚═╝ ██║██║  ██║
// ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝
const ReportSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    clocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clock',
      },
    ],
    type: { type: String, required: true },

    date: { type: String, required: true },

    afterdate: { type: Boolean, required: true },

    numOfWorkDays: {
      type: Number,
      required: true,
    },
    numAllTorim: {
      type: Number,
      required: true,
    },
    numAvilableTorim: {
      type: Number,
      required: true,
    },
    numNOTAvilableTorim: {
      type: Number,
      ref: 'User',
    },
    numCanceledTorim: {
      type: Number,
      ref: 'User',
    },
    moneyCount: {
      type: Number,
      required: true,
    },
    createatDate: {
      type: String,
      required: true,
    },
    createdAtTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Report = mongoose.model('Report', ReportSchema)
export default Report

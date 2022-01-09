import mongoose from 'mongoose'

const tipulSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  time: { type: Number, required: true },
  cost: { type: Number, required: true },
  image: { type: String },
})

const Tipul = mongoose.model('Tipul', tipulSchema)

export default Tipul

import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
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

const productSchema = mongoose.Schema(
  {
    user: {
      //האדמין שיצר את המוצר
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', //יוזר שהוא אובייקט איידי
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema], //אריי של ביקורות ביקורות הסקימה שלו נמצאת בקובץ זה

    rating: {
      //המומצע של הביקורות
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      //מספר הביקורות
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, //ייצור שדות נוספים ננוצר ב. ווהתעדכן ב.
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product

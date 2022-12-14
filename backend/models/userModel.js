import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Bday: {
      type: String,
      required: false,
    },

    image: {
      type: String,
    },

    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdminOfAdmins: {
      type: Boolean,
      required: true,
      default: false,
    },
    WorkingIn: {
      type: String,
      required: false,
    },
    ClientOfBusiness: {
      type: String,
      required: false,
    },
    commentsForTipul: {
      type: String,
      required: false,
    },
    workingdays: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'WorkingDay',
      },
    ],
    torim: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clock',
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User

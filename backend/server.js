//IMPORTS
import colors from 'colors'
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js' //החיבור למונגו
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import workingdayRoutes from './routes/workingdayRoutes.js'
import makeTor from './routes/makeTorRoutes.js'
import cancelTorRoutes from './routes/cancelTorRoutes.js'
import reportsRouts from './routes/reportsRouts.js'
import searchRoutes from './routes/searchRoutes.js'
import sendmessagesRoutes from './routes/sendmessagesRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import moment from 'moment'
import notificationsWorker from './intervalWorkers/notificationsWorker.js'
import relvantTimeWorker from './intervalWorkers/relvantTimeWorker.js'
import session from 'express-session'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import User from './models/userModel.js'
// RANDOM FOR SESSION
let random = Math.floor(Math.random() * 100000000000) + 1
const app = express()
app.use(express.json())

// ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
// ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
// ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
// ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
// ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
// ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝
app.use(
  session({
    secret: `${random}`,
    resave: false,
    saveUninitialized: false,
  })
)
//  ██████╗  ██████╗  ██████╗  ██████╗ ██╗     ███████╗    ██████╗  █████╗ ███████╗███████╗██████╗  ██████╗ ██████╗ ████████╗
// ██╔════╝ ██╔═══██╗██╔═══██╗██╔════╝ ██║     ██╔════╝    ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
// ██║  ███╗██║   ██║██║   ██║██║  ███╗██║     █████╗      ██████╔╝███████║███████╗███████╗██████╔╝██║   ██║██████╔╝   ██║
// ██║   ██║██║   ██║██║   ██║██║   ██║██║     ██╔══╝      ██╔═══╝ ██╔══██║╚════██║╚════██║██╔═══╝ ██║   ██║██╔══██╗   ██║
// ╚██████╔╝╚██████╔╝╚██████╔╝╚██████╔╝███████╗███████╗    ██║     ██║  ██║███████║███████║██║     ╚██████╔╝██║  ██║   ██║
//  ╚═════╝  ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚══════╝    ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
  return done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findById(id, (err, doc) => {
    return done(null, doc)
  })
})
passport.use(
  new GoogleStrategy(
    {
      clientID:
        '452001077432-h4lhfoemnipvlbokdtamftv3p7m0rr9f.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/api/google/callback',
    },
    async function (accessToken, refreshToken, profile, cb) {
      const googleuser = await User.findOne({ googleId: profile.id })

      if (!googleuser) {
        const newUser = new User({
          name: profile.name.givenName,
          email: profile.emails[0].value,
          googleId: profile.id,
          image: profile.photos[0].value,
          phone: null,
          password: '123123',
          isAdmin: false,
        })
        await newUser.save()
        console.log('New User Created By Google_!_!_!')
        const googlenewuser = await User.findOne({ googleId: profile.id })
        console.log(googlenewuser)
        cb(null, googlenewuser)
      } else {
        cb(null, googleuser)
      }
    }
  )
)
app.get(
  '/api/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/user.phonenumbers.read',
    ],
  })
)
app.get(
  '/api/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.redirect('http://localhost:3000/')
  }
)

// ██╗███╗   ██╗████████╗███████╗██████╗ ██╗   ██╗ █████╗ ██╗
// ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗██║   ██║██╔══██╗██║
// ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝██║   ██║███████║██║
// ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══██║██║
// ██║██║ ╚████║   ██║   ███████╗██║  ██║ ╚████╔╝ ██║  ██║███████╗
// ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚══════╝

setInterval(function () {
  const currentTime = new Date()
  console.log(
    `Running Send Notifications Worker for ${moment(currentTime).format()}`
  )
  notificationsWorker.run() //sms notification
  relvantTimeWorker.run() //check relvant time for user
}, 60000) //run this thang every 60 seconds

// ███╗   ███╗ ██████╗ ███╗   ██╗ ██████╗  ██████╗
// ████╗ ████║██╔═══██╗████╗  ██║██╔════╝ ██╔═══██╗
// ██╔████╔██║██║   ██║██╔██╗ ██║██║  ███╗██║   ██║
// ██║╚██╔╝██║██║   ██║██║╚██╗██║██║   ██║██║   ██║
// ██║ ╚═╝ ██║╚██████╔╝██║ ╚████║╚██████╔╝╚██████╔╝
// ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝
dotenv.config()
connectDB()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//  █████╗ ██████╗ ██╗
// ██╔══██╗██╔══██╗██║
// ███████║██████╔╝██║
// ██╔══██║██╔═══╝ ██║
// ██║  ██║██║     ██║
// ╚═╝  ╚═╝╚═╝     ╚═╝ 's

app.use('/api/products', productRoutes)
app.use('/api/reports', reportsRouts)
app.use('/api/users', userRoutes)
app.use('/api/maketor', makeTor)
app.use('/api/cancel', cancelTorRoutes)
app.use('/api/workingday', workingdayRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/messages', sendmessagesRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.get('/getgoogleuser', (req, res) => {
  res.status(207)
  res.send(req.user)
})
app.post('/logout', (req, res) => {
  res.status(307)
  req.logOut()
})
//Upload
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

// ██████╗  ██████╗ ██████╗ ████████╗
// ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
// ██████╔╝██║   ██║██████╔╝   ██║
// ██╔═══╝ ██║   ██║██╔══██╗   ██║
// ██║     ╚██████╔╝██║  ██║   ██║
// ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

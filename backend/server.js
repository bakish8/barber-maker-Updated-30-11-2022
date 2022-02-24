//IMPORTS
import jwt from 'jsonwebtoken'
import colors from 'colors'
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js' //החיבור למונגו
import notificationsRoutes from './routes/notificationsRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import workingdayRoutes from './routes/workingdayRoutes.js'
import makeTor from './routes/makeTorRoutes.js'
import cancelTorRoutes from './routes/cancelTorRoutes.js'
import reportsRouts from './routes/reportsRouts.js'
import ForgotpasswordRoutes from './routes/ForgotpasswordRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import sendmessagesRoutes from './routes/sendmessagesRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import moment from 'moment'
import notificationsWorker from './intervalWorkers/notificationsWorker.js'
import relvantTimeWorker from './intervalWorkers/relvantTimeWorker.js'
import session from 'cookie-session'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from './models/userModel.js'
import fs from 'fs'
import https from 'https'
import http from 'http'
import { Server, Socket } from 'socket.io'
const SSocket = Socket

//options fit SSL Socket
// const options = {
//   key: fs.readFileSync('../certs/server-key.pem'),
//   cert: fs.readFileSync('../certs/server-crt.pem'),
//   ca: [fs.readFileSync('../certs/client-ca-crt.pem')],
//   requestCert: true,
//   rejectUnauthorized: false,
// }

const JWT_SECRET = process.env.JWT_SECRET

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
      callbackURL: 'https://www.barber-maker.com/api/google/callback',
      //callbackURL: '/api/google/callback', development
    },
    async function (accessToken, refreshToken, profile, cb) {
      const googleuser = await User.findOne({ googleId: profile.id })
      console.log(`gogole user is :${profile.name}`)
      console.log(`gogole user is :${googleuser}`)
      if (!googleuser) {
        console.log('no google user found! create')

        const newUser = new User({
          name: profile.name.givenName + ' ' + profile.name.familyName,
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
  '/api/google/callback', // development
  //'https://www.barber-maker.com/api/google/callback', // production
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    //res.redirect('http://localhost:3000/') //development /// working  /**** */
    //res.redirect('https://barber-maker.com/') //production ///NOT working  /**** */
    res.redirect('/') //production ///NOT working  /**** */
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
//ForgotMyPASSword Routes
// app.use('/api/forgot-password', (req, res, next) => {
//   const { email } = req.body
//   console.log(JWT_SECRET)
//   console.log(email)
//   console.log(JWT_SECRET)
//   console.log(email)
//   const NewSecret = JWT_SECRET + email
// })

app.use('/api/forgot-password', ForgotpasswordRoutes)
app.use('/api/notifications', notificationsRoutes)
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
  console.log(req.user)
  console.log(req.user)

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

const server = https.createServer(app)
//Run When Client Connenct
//const io = new Server(server, { origin: '*:*' }) /development
const io = new Server(server, {
  //production
  origin: 'https://www.barber-maker.com',
  methods: ['GET', 'POST'],
})
let onlineUsers = []
//add new connected user to the array onlineUsers
const addNewUser = (username, socketId) => {
  console.log(`${username} just connected`)
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId })
  console.log(`online users are  :`)
  for (let i of onlineUsers) {
    console.log(i.username)
  }
}
//renmove disconnected user from array onlineUsers
const removeUser = (socketId) => {
  console.log(`renmoving : ${socketId} from list`)
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
}
//return spesific online user from the array onlineUsers
const getUser = (username) => {
  const result = onlineUsers.find((user) => user.username === username) //for online users
  if (result) {
    return result
  } else {
    console.log('user for Socket Not Found ')
  }
}

io.on('connection', (SSocket) => {
  console.log('someone is connected')
  SSocket.on('newUser', (username) => {
    addNewUser(username, SSocket.id)
  })
  SSocket.on('disconnect', () => {
    console.log(`${SSocket.id} is Disconnection`)
    removeUser(SSocket.id)
  })
  SSocket.on(
    'sendNotification',
    ({ senderName, receiverName, type, time, dayInWeek, date, now }) => {
      if (type == 1) {
        console.log(`type is 1 !!!`)
      }
      console.log(`receiverName:::${receiverName}`)
      console.log(`date:::${date}`)
      console.log(`time:::${time}`)
      console.log(`dayInWeek:::${dayInWeek}`)
      const receiver = getUser(receiverName)
      if (receiver) {
        io.to(receiver.socketId).emit('getNotification', {
          senderName,
          type,
          time,
          dayInWeek,
          date,
          now,
        })
      }
    }
  )
})

// ██████╗  ██████╗ ██████╗ ████████╗
// ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
// ██████╔╝██║   ██║██████╔╝   ██║
// ██╔═══╝ ██║   ██║██╔══██╗   ██║
// ██║     ╚██████╔╝██║  ██║   ██║
// ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝

const PORT = process.env.PORT || 5000
server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

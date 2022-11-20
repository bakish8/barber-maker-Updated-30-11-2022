//IMPORTS
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
import BusinessRoutes from './routes/BusinessRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import sendmessagesRoutes from './routes/sendmessagesRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import moment from 'moment'
import notificationsWorker from './intervalWorkers/notificationsWorker.js'
import relvantTimeWorker from './intervalWorkers/relvantTimeWorker.js'
import session from 'cookie-session'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Server, Socket } from 'socket.io'
import http from 'http'
const SSocket = Socket
import User from './models/userModel.js'
import cors from 'cors'
import axios from 'axios'

let random = Math.floor(Math.random() * 100000000000) + 1 // RANDOM FOR SESSION
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)
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
      let APIKEY = 'AIzaSyBynh_gUEZiSiiqejzH8BkbxtUUx5dR4Jw'
      axios
        .get(
          `https://people.googleapis.com/v1/people/${profile.id}?personFields=birthdays&key=${APIKEY}&access_token=${accessToken}`,
          { withCredentials: true }
        )
        .then(async (res) => {
          if (res) {
            // if res for Bday is OK calculate and Register Bday
            let day = res.data.birthdays[1].date.day.toString()
            let month = res.data.birthdays[1].date.month.toString()
            let year = res.data.birthdays[1].date.year
            if (day.length === 1) {
              day = day.toString().padStart(2, '0')
            }
            if (month.length === 1) {
              month = month.toString().padStart(2, '0')
            }
            let birthdayReturned = `${day}/${month}/${year}`
            const googleuser = await User.findOne({ googleId: profile.id })
            console.log(`gogole user name is :${profile.name}`)
            if (!googleuser && birthdayReturned) {
              console.log(`__no google user found! create..._`)
              const newUser = new User({
                name: profile.name.givenName + ' ' + profile.name.familyName,
                email: profile.emails[0].value,
                Bday: birthdayReturned,
                googleId: profile.id,
                image: profile.photos[0].value,
                phone: null,
                password: birthdayReturned,
                isAdmin: false,
              })
              await newUser.save()
              console.log('New User Created By Google_!_!_!')
              const googlenewuser = await User.findOne({ googleId: profile.id })
              cb(null, googlenewuser)
            } else {
              cb(null, googleuser)
            }
          } else {
            // if res for Bday is NOT  OK Register Without Bday
            if (!googleuser) {
              console.log(`__no google user found! create..._`)
              const newUser = new User({
                name: profile.name.givenName + ' ' + profile.name.familyName,
                email: profile.emails[0].value,
                googleId: profile.id,
                image: profile.photos[0].value,
                phone: null,
                password: '123456',
                isAdmin: false,
              })
              await newUser.save()
              console.log('New User Created By Google_!_!_!')
              const googlenewuser = await User.findOne({ googleId: profile.id })
              cb(null, googlenewuser)
            } else {
              cb(null, googleuser)
            }
            console.log(`Error Getting Birth Day Deets ... `)
          }
        })
    }
  )
)

app.get(
  `/api/google`,
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/user.birthday.read',
    ],
  })
)
app.get(
  '/api/google/callback', // development + production
  passport.authenticate('google', {
    failureRedirect: '/login', // Fix to redirect to bussines page ...
  }),

  function (req, res) {
    res.redirect('/') //production // Fix to redirect to bussines page ...
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
app.use('/api/business', BusinessRoutes)
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
if (process.env.NODE_ENV === 'production') {
  //Production
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

//IO +SERVER
const server = http.createServer(app)
//Run When Client Connenct
const io = new Server(server)
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
    ({ senderName, receiverName, type, time, dayInWeek }) => {
      if (type == 1) {
        console.log(`type is 1 !!!`) //cancaling tor
      } else if (type == 2) {
        console.log(`type is 2 !!!`) // making tor
      } else if (type == 3) {
        console.log(`type is 3 !!!`) //new user signUp
      }
      console.log(`receiverName:${receiverName}`)
      console.log(`time:${time}`)
      console.log(`dayInWeek:${dayInWeek}`)
      let receiver = getUser(receiverName)
      if (receiver) {
        io.to(receiver.socketId).emit('getNotification', {
          senderName,
          type,
          time,
          dayInWeek,
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

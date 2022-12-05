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
import http from 'http'
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

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout()
    res.send('succsses')
  }
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

import asyncHandler from 'express-async-handler'
import Business from '../models/Business.js'
import Tipul from '../models/Tipul.js'
import User from '../models/userModel.js'

//loading details + check if token is Verfied after email send + send email user to load in temp page
const getBusinessDetailsPage = asyncHandler(async (req, res) => {
  console.log('Spesific Business Page load From Business Controller !!!')
  const { id } = req.params
  console.log(`id:${id}`)
  const BusinessFound = await Business.findOne({ _id: id })
  if (BusinessFound) {
    console.log(BusinessFound)
    res.json({
      _id: BusinessFound._id,
      name: BusinessFound.businessName,
      location: BusinessFound.location,
      websiteColors: BusinessFound.websiteColors,
      image: BusinessFound.image,
      logo: BusinessFound.logo,
      phone: BusinessFound.phone,
      businessOwner: BusinessFound.businessOwner,
      workers: BusinessFound.workers,
      clients: BusinessFound.clients,
    })
  } else {
    console.log(`Error Business Not Found`)
    res.status(404)
    throw new Error(' the business not found')
  }
})
//loading details + check if token is Verfied after email send + send email user to load in temp page
const getBusinessDetailsForNavBar = asyncHandler(async (req, res) => {
  const { id } = req.params
  const BusinessFound = await Business.findOne({ _id: id })
  if (BusinessFound) {
    res.json({
      id: BusinessFound._id,
      name: BusinessFound.businessName,
      logo: BusinessFound.logo,
      logoNameOnNav: BusinessFound.logoNameOnNav,
    })
  } else {
    res.status(404)
    throw new Error(' the business not found')
  }
})

const getBusinessWorkers = asyncHandler(async (req, res) => {
  const sapars = await User.find({ isAdmin: true, WorkingIn: req.params.id })
  res.json(sapars)
})

///Make new Kind of tipul
const registerNewTipulForBussines = asyncHandler(async (req, res) => {
  const { name, time, cost, image, BussinesId } = req.body

  const BusinessFound = await Business.findOne({ _id: BussinesId }).populate(
    'tipulim'
  )
  if (!BusinessFound) {
    throw new Error(' the business not found')
  } else {
    let tipulimArr = BusinessFound.tipulim
    console.log(tipulimArr)
    let CheckArr = []
    for (let tipul of tipulimArr) {
      if (tipul.name === name) {
        CheckArr.push(tipul.name)
      }
    }
    if (CheckArr.includes(name)) {
      console.log(`tipulimArr  includes ${name}`)
      throw new Error(`כבר קיים טיפול בשם זה: ${name}`)
    } else {
      if (name && time && cost && BussinesId) {
        const tipul = await Tipul.create({
          name,
          time,
          cost,
          image,
          BussinesId,
        })
        //****make sure u save the tipul in business */
        BusinessFound.tipulim.push(tipul)
        BusinessFound.save()

        if (tipul) {
          res.status(201).json({
            name,
            time,
            cost,
            image,
            BussinesId,
          })
        }
      }
    }
  }
})

const getreatments = asyncHandler(async (req, res) => {
  const BusinessFound = await Business.findOne({ _id: req.params.id }).populate(
    'tipulim'
  )
  if (BusinessFound) {
    BusinessFound
    console.log(`BusinessFound tipulim is : ${BusinessFound.tipulim}`)

    res.json(BusinessFound.tipulim)
  } else {
    console.log(`Error Business Not Found`)
    res.status(404)
    throw new Error(' the business not found')
  }
})

const BussinesUserList = asyncHandler(async (req, res) => {
  console.log(`getting specific users for business`)
  const Users = await User.find({ ClientOfBusiness: req.params.id })
  if (Users) {
    res.json(Users)
  } else {
    console.log(`Error getting bussines users`)
    res.status(404)
    throw new Error(' the business not found')
  }
})

const adminSideRegistaration = asyncHandler(async (req, res) => {
  const { name, email, phone, password, businessid } = req.body
  console.log('phone')
  const userExists = await User.findOne({ email })
  const business = await Business.findById(businessid).populate('clients')
  console.log(`______________________________Business !!!!!!!${business}`)
  if (userExists) {
    res.status(400)
    throw new Error('המשתמש כבר קיים במערכת')
  }

  let firstname = name.split(' ')[0]
  let lastname = name.split(' ')[1]
  const user = await User.create({
    name,
    firstname,
    lastname,
    email,
    phone,
    password,
    image: 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif',
    ClientOfBusiness: businessid,
  })

  if (user) {
    console.log('user created sucssuusfully')
    business.clients.push(user)
    await business.save()
    res.status(201).json(`user created`)
  } else {
    res.status(400)
    throw new Error('אחד מהפרטים שגוי נסה שנית')
  }
})

export {
  getBusinessDetailsPage,
  getBusinessDetailsForNavBar,
  getBusinessWorkers,
  registerNewTipulForBussines,
  getreatments,
  BussinesUserList,
  adminSideRegistaration,
}

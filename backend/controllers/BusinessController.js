import asyncHandler from 'express-async-handler'
import Business from '../models/Business.js'
import Tipul from '../models/Tipul.js'
import User from '../models/userModel.js'

//loading details + check if token is Verfied after email send + send email user to load in temp page
const getBusinessDetailsPage = asyncHandler(async (req, res) => {
  console.log('Spesific Business Page load From Business Controller !!!')
  const { id } = req.params
  const BusinessFound = await Business.findOne({ _id: id })
  if (BusinessFound) {
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

//GetAllBusinessForHomePage
const GetAllBusinessForHomePage = asyncHandler(async (req, res) => {
  const Found = await Business.find({})
  if (Found) {
    //****Fix when add More business by RUN  aFunction  thats create  aarray of obj and thne res JSON this ... */
    res.json([
      {
        B_id: Found[0]._id,
        B_name: Found[0].businessName,
        B_logo: Found[0].logo,
      },
    ])
  } else {
    console.log(`Error Business Not Found`)
    res.status(404)
    throw new Error('ERROR!!!  the business.s was not found')
  }
})
const getAdminNameForSocket = asyncHandler(async (req, res) => {
  const { id } = req.params
  const BusinessFound = await Business.findOne({ _id: id })
  if (BusinessFound) {
    if (BusinessFound.businessOwner) {
      const AdminFound = await User.findOne({
        _id: BusinessFound.businessOwner,
      })
      if (AdminFound) {
        res.json({
          name: AdminFound.name,
          id: AdminFound._id,
        })
      } else {
        console.log(`Error Admin Not Found`)
        res.status(404)
        throw new Error(' the Admin not found')
      }
    }
  } else {
    console.log(`Error Business Not Found`)
    res.status(404)
    throw new Error(' the business not found')
  }
})

//need to add more Design Elements
const getBusinessDesignSettings = asyncHandler(async (req, res) => {
  const { id } = req.params
  const BusinessFound = await Business.findOne({ _id: id })
  if (BusinessFound) {
    res.json({
      name: BusinessFound.businessName,
      location: BusinessFound.location,
      websiteColors: BusinessFound.websiteColors,
      image: BusinessFound.image,
      logo: BusinessFound.logo,
      logoNameOnNav: BusinessFound.logoNameOnNav,
    })
  } else {
    console.log(`Error Business Not Found`)
    res.status(404)
    throw new Error(' the business not found')
  }
})

const getBusinessSettings = asyncHandler(async (req, res) => {
  const { id } = req.params
  const BusinessFound = await Business.findOne({ _id: id })
  if (BusinessFound) {
    res.json({
      settings: BusinessFound.settings,
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
    let CheckArr = []
    for (let tipul of tipulimArr) {
      if (tipul.name === name) {
        CheckArr.push(tipul.name)
      }
    }
    if (CheckArr.includes(name)) {
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
    res.status(404)
    throw new Error(' the business not found')
  }
})

const adminSideRegistaration = asyncHandler(async (req, res) => {
  const { name, email, phone, password, businessid } = req.body
  const userExists = await User.findOne({ email })
  const business = await Business.findById(businessid).populate('clients')
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

const UpdateBussinesSettingsController = asyncHandler(async (req, res) => {
  const {
    sendSMSClientSide_CheckBox_state,
    sendWhatsappClientSide_CheckBox_state,
    sendSMSAdminSide_CheckBox_state,
    sendWhatsappAdminSide_CheckBox_state,
    sendSMSClientSideCancel_CheckBox_state,
    sendWhatsappClientSideCancel_CheckBox_state,
    sendSMSAdminSideCancel_CheckBox_state,
    sendWhatsappAdminSideCancel_CheckBox_state,
    sendSMSClientSideReminder_CheckBox_state,
    sendWhatsappClientSideReminder_CheckBox_state,
    sendSMSAdminSideReminder_CheckBox_state,
    sendWhatsappAdminSideReminder_CheckBox_state,
    BookUSERSongooglCalender,
    BusinessNotificationsTime,
    BussinesID,
  } = req.body
  const Businesss = await Business.findById(BussinesID)

  if (Businesss) {
    Businesss.settings.sendSMSClientSide = sendSMSClientSide_CheckBox_state
    Businesss.settings.sendWhatsappClientSide =
      sendWhatsappClientSide_CheckBox_state
    Businesss.settings.sendSMSAdminSide = sendSMSAdminSide_CheckBox_state
    Businesss.settings.sendWhatsappAdminSide =
      sendWhatsappAdminSide_CheckBox_state
    Businesss.settings.sendSMSClientSideCancel =
      sendSMSClientSideCancel_CheckBox_state
    Businesss.settings.sendWhatsappClientSideCancel =
      sendWhatsappClientSideCancel_CheckBox_state
    Businesss.settings.sendSMSAdminSideCancel =
      sendSMSAdminSideCancel_CheckBox_state
    Businesss.settings.sendWhatsappAdminSideCancel =
      sendWhatsappAdminSideCancel_CheckBox_state
    Businesss.settings.sendSMSClientSideReminder =
      sendSMSClientSideReminder_CheckBox_state
    Businesss.settings.sendWhatsappClientSideReminder =
      sendWhatsappClientSideReminder_CheckBox_state
    Businesss.settings.sendSMSAdminSideReminder =
      sendSMSAdminSideReminder_CheckBox_state
    Businesss.settings.sendWhatsappAdminSideReminder =
      sendWhatsappAdminSideReminder_CheckBox_state
    Businesss.settings.bookingooglecalender = BookUSERSongooglCalender
    Businesss.settings.notificationsTime = BusinessNotificationsTime

    const updatedBusinesss = await Businesss.save()

    res.json({
      settings: updatedBusinesss.settings,
    })
  } else {
    res.status(404)
    throw new Error('המשתמש אינו נמצא')
  }
})

const UpdateBussinesDesigenSettings = asyncHandler(async (req, res) => {
  const {
    name,
    location,
    lat,
    lng,
    businessNameOnNavState,
    colors,
    logo,
    MainPic,
  } = req.body
  const { id } = req.params
  const Businesss = await Business.findById(id)

  if (Businesss) {
    Businesss.businessName = name
    Businesss.location.name = location
    Businesss.location.lat = lat
    Businesss.location.lng = lng
    Businesss.logoNameOnNav = businessNameOnNavState
    Businesss.websiteColors = colors
    Businesss.logo = logo
    Businesss.image = MainPic

    const updatedBusinesss = await Businesss.save()

    res.json(
      updatedBusinesss.businessName,
      updatedBusinesss.location.name,
      updatedBusinesss.logoNameOnNav.name,
      updatedBusinesss.websiteColors,
      updatedBusinesss.logo,
      updatedBusinesss.image
    )
  } else {
    res.status(404)
    throw new Error('העסק אינו נמצא')
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
  getBusinessSettings,
  UpdateBussinesSettingsController,
  getBusinessDesignSettings,
  UpdateBussinesDesigenSettings,
  getAdminNameForSocket,
  GetAllBusinessForHomePage,
}

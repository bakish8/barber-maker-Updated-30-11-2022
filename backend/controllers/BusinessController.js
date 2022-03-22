import asyncHandler from 'express-async-handler'
import Shop from '../models/Shop.js'
import Tipul from '../models/Tipul.js'
import User from '../models/userModel.js'

//loading details + check if token is Verfied after email send + send email user to load in temp page
const getBusinessDetailsPage = asyncHandler(async (req, res) => {
  console.log('Spesific Business Page load From Business Controller !!!')
  const { id } = req.params
  console.log(`id:${id}`)
  const BusinessFound = await Shop.findOne({ _id: id })
  if (BusinessFound) {
    console.log(BusinessFound)
    res.json({
      _id: BusinessFound._id,
      name: BusinessFound.shopName,
      email: BusinessFound.location,
      image: BusinessFound.image,
      phone: BusinessFound.phone,
      shopOwner: BusinessFound.shopOwner,
      workers: BusinessFound.workers,
      clients: BusinessFound.clients,
    })
  } else {
    console.log(`Error Business Not Found`)
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

  const BusinessFound = await Shop.findOne({ _id: BussinesId }).populate(
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
        //****make sure u save the tipul in shop */
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
  const BusinessFound = await Shop.findOne({ _id: req.params.id }).populate(
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

export {
  getBusinessDetailsPage,
  getBusinessWorkers,
  registerNewTipulForBussines,
  getreatments,
}

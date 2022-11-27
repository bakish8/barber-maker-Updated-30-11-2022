import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Tipul from '../models/Tipul.js'
import Business from '../models/Business.js'
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

//PHONE
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ phone: email }) //need to be fixed  is phone all the way

  if (user && (await user.matchPassword(password))) {
    console.log(`user password match`)
    if (user.WorkingIn) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
        isAdminOfAdmins: user.isAdminOfAdmins,
        token: generateToken(user._id),
        workingIn: user.WorkingIn, //***NEW */
      })
    } else if (user.ClientOfBusiness) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
        isAdminOfAdmins: user.isAdminOfAdmins,
        token: generateToken(user._id),
        workingIn: user.WorkingIn, //***NEW */
        ClientOfBusiness: user.ClientOfBusiness, //***NEW */
      })
    } else {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        isAdmin: user.isAdmin,
        isAdminOfAdmins: user.isAdminOfAdmins,
        token: generateToken(user._id),
      })
    }
  } else {
    res.status(401)
    throw new Error('הנייד או סיסמה אינם תקינים אנא נסה שנית')
  }
})

//Email
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUserBYphone = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
      isAdmin: user.isAdmin,
      isAdminOfAdmins: user.isAdminOfAdmins,
      token: generateToken(user._id),
      workingIn: user.WorkingIn, //***NEW */
    })
  } else {
    res.status(401)
    throw new Error('האימייל או הסיסמה אינם תקינים אנא נסה שנית')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, image, businessid, DateOfBirth } =
    req.body
  const userExists = await User.findOne({ email })

  if (businessid != 0) {
    const business = await Business.findById(businessid).populate('clients')

    if (userExists) {
      res.status(400)
      throw new Error('המשתמש כבר קיים במערכת')
    }
    if (image === null) {
      let firstname = name.split(' ')[0]
      let lastname = name.split(' ')[1]
      const user = await User.create({
        name,
        firstname,
        lastname,
        email,
        Bday: DateOfBirth,
        phone,
        password,
        image: 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif',
        ClientOfBusiness: businessid,
      })

      if (user) {
        business.clients.push(user)
        await business.save()
        res.status(201).json({
          _id: user._id,
          name: user.name,
          firstname: firstname,
          lastname: lastname,
          email: user.email,
          Bday: user.Bday,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isAdminOfAdmins: user.isAdminOfAdmins,
          image: user.image,
          ClientOfBusiness: businessid,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('אחד מהפרטים שגוי נסה שנית')
      }
    } else {
      let firstname = name.split(' ')[0]
      let lastname = name.split(' ')[1]
      const user = await User.create({
        name,
        firstname,
        lastname,
        email,
        Bday: DateOfBirth,
        phone,
        password,
        image,
        ClientOfBusiness: businessid,
      })

      if (user) {
        business.clients.push(user)
        await business.save()
        res.status(201).json({
          _id: user._id,
          name: user.name,
          firstname: firstname,
          lastname: lastname,
          email: user.email,
          Bday: user.Bday,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isAdminOfAdmins: user.isAdminOfAdmins,
          image: user.image,
          ClientOfBusiness: user.ClientOfBusiness,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('אחד מהפרטים שגוי נסה שנית')
      }
    }
  } else {
    if (userExists) {
      res.status(400)
      throw new Error('המשתמש כבר קיים במערכת')
    }
    if (image === null) {
      let firstname = name.split(' ')[0]
      let lastname = name.split(' ')[1]
      const user = await User.create({
        name,
        firstname,
        lastname,
        email,
        Bday: DateOfBirth,
        phone,
        password,
        image: 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif',
        ClientOfBusiness: businessid,
      })

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          firstname: firstname,
          lastname: lastname,
          email: user.email,
          Bday: user.Bday,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isAdminOfAdmins: user.isAdminOfAdmins,
          image: user.image,
          ClientOfBusiness: businessid,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('אחד מהפרטים שגוי נסה שנית')
      }
    } else {
      let firstname = name.split(' ')[0]
      let lastname = name.split(' ')[1]
      const user = await User.create({
        name,
        firstname,
        lastname,
        email,
        Bday: DateOfBirth,

        phone,
        password,
        image,
        ClientOfBusiness: businessid,
      })

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          firstname: firstname,
          lastname: lastname,
          email: user.email,
          Bday: user.Bday,
          phone: user.phone,
          isAdmin: user.isAdmin,
          isAdminOfAdmins: user.isAdminOfAdmins,
          image: user.image,
          ClientOfBusiness: user.ClientOfBusiness,
          token: generateToken(user._id),
        })
      } else {
        res.status(400)
        throw new Error('אחד מהפרטים שגוי נסה שנית')
      }
    }
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isAdminOfAdmins: user.isAdminOfAdmins,
    })
  } else {
    res.status(404)
    throw new Error('המשתמש אינו נמצא')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    //****להמשיך לעדכן עדכון תמונה בהמשך  */
    user.name = req.body.name ? req.body.name : user.name
    user.firstname = req.body.name
      ? req.body.name.split(' ')[0]
      : user.firstname
    user.lastname = req.body.name ? req.body.name.split(' ')[1] : user.lastname
    user.email = req.body.email ? req.body.email : user.email
    user.phone = req.body.phone ? req.body.phone : user.phone

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      phone: user.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('המשתמש אינו נמצא')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'המשתמש הוסר בהצלחה' })
  } else {
    res.status(404)
    throw new Error('המשתמש לא נמצא')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('המשתמש לא נמצא')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.firstname = req.body.name.split(' ')[0] || user.firstname
    user.lastname = req.body.name.split(' ')[1] || user.lastname
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.image = req.body.image || user.image
    user.isAdmin = req.body.isAdmin
    user.WorkingIn = req.body.BusinessId

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      WorkingIn: updatedUser.WorkingIn,
    })
  } else {
    res.status(404)
    throw new Error('המשתמש לא נמצא')
  }
})
// @desc    Update user comments
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserComments = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.commentsForTipul = req.body.commentsForTipul

    const updatedUser = await user.save()
    res.json({
      commentsForTipul: updatedUser.commentsForTipul,
    })
  } else {
    res.status(404)
    throw new Error('המשתמש לא נמצא')
  }
})

///Make new Kind of tipul
const registerNewTipul = asyncHandler(async (req, res) => {
  const { name, time, cost, image } = req.body
  if (name && time && cost) {
    const tipul = await Tipul.create({
      name,
      time,
      cost,
      image,
    })
    if (tipul) {
      res.status(201).json({
        name,
        time,
        cost,
        image,
      })
    }
  }
})

export {
  authUser,
  authUserBYphone,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  registerNewTipul,
  updateUserComments,
}

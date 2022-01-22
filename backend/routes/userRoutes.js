import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  authGoogleUser,
  registerNewTipul,
  updateUserComments,
} from '../controllers/userController.js'

import { protect, admin, isUserAUTH } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.post('/googlelogin', authGoogleUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

router.route('/updatecomments/:id').put(protect, admin, updateUserComments)

router.route('/tipulim').post(protect, admin, registerNewTipul)

export default router

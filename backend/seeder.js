//קובץ הסידרס שמכניס את כל האטה בסיס מתיקיית דאטה ומוחק את כל היוזרס המוצרים וההזמנות ומזין את הדאטת בסיס

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users) //הכנסת כל המשתמשים לדאטה בייס

    const adminUser = createdUsers[0]._id //אדמין

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser } //הופך את כל המוצרים שהבעלים שלהם יהיה האדמין שמצאונ
    })

    await Product.insertMany(sampleProducts) //הכנסת כל המוצרים לדאטה בייס

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  //זה ימחק את כל הדאטה שלנו
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
//אם יועבר בטרמינל פקודה שכוללת את -די לאחרי שרשמנו סידר אז הוא ימחוק את הדאטה אם רשמו סידר לבד אז הוא יכניס את הדטה
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}

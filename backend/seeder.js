//קובץ הסידרס שמכניס את כל האטה בסיס מתיקיית דאטה ומוחק את כל היוזרס המוצרים וההזמנות ומזין את הדאטת בסיס

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import business from './data/business.js'
import workingdays from './data/workingdays.js'
import clocks from './data/clocks.js'
import tipulim from './data/tipulim.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import WorkingDay from './models/WorkingDay.js'
import Clock from './models/Clock.js'
import Appointment from './models/Appointment.js'
import Reports from './models/Reports.js'
import Tipul from './models/Tipul.js'
import connectDB from './config/db.js'
import Shop from './models/Shop.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await WorkingDay.deleteMany()
    await Clock.deleteMany()
    await Appointment.deleteMany()
    await Reports.deleteMany()
    await Tipul.deleteMany()
    await Shop.deleteMany()

    const createdTipulim = await Tipul.insertMany(tipulim)

    const createdUsers = await User.insertMany(users) //הכנסת כל המשתמשים לדאטה בייס
    const adminUser = createdUsers[0]._id //אדמין

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser } //הופך את כל המוצרים שהבעלים שלהם יהיה האדמין שמצאונ
    })
    //****hard coded */
    const createdBusiness = await User.insertMany(business) //הכנסת כל העסקים לדאטה בייס
    const BusinessDemo1 = createdBusiness[0] //העסק הראשון
    BusinessDemo1.shopOwner = adminUser //הבעלים של החנות הראשונה הוא האדמין הראשון המשתמש הראשון
    BusinessDemo1.workers = adminUser //העובדים של החנות הראשונה הוא האדמין הראשון המשתמש הראשון
    await BusinessDemo1.save()

    let sampleWorkingdays = workingdays.map((workingday) => {
      return { ...workingday, owner: adminUser } //הופך את כל את הבעלים של כל ימי העבודה בסידר לאדמין שמצאנו המשתמש הראשון
    })

    await Shop.insertMany(sampleProducts) //הכנסת כל המוצרים לדאטה בייס
    await Product.insertMany(sampleProducts) //הכנסת כל המוצרים לדאטה בייס
    let createdWorkingdays = await WorkingDay.insertMany(sampleWorkingdays) //הכנסת כל ימי העבודה לדאטה בייס

    for (let i = 0; i < sampleWorkingdays.length; i++) {
      //לולאה שמכניס לכל ימי העבודה את כל השעות
      let workingday = createdWorkingdays[i] //יום העבודה הראשון שנוצר
      let workingdayIdOwnerOfClock = workingday._id
      let workingdayDateOfClock = workingday.date
      let dayInWeek = workingday.dayInWeek

      if (dayInWeek != 'שישי') {
        let sampleClocks = clocks.map((clock) => {
          //****בונה את השעות כך שהבעלים והתאריך שלהם יהיה של התאריך הראשון שמצאנו בהמשך  לללואה  ++ */
          return {
            ...clock,
            owner: workingdayIdOwnerOfClock,
            date: workingdayDateOfClock,
          }
        })
        await Clock.insertMany(sampleClocks) //****מכניס את השעות לדאטה בייס */
      }

      let insertedClocks = await Clock.find({
        owner: workingdayIdOwnerOfClock,
        date: workingdayDateOfClock,
      }) //***מוצא את השעות בדאטה בייס כולל האיידי שנוצר להם */

      for (let clock of insertedClocks) {
        //מכניס את כל ההשעות ליום העבודה ושומר
        if (workingday.dayInWeek !== 'שישי') {
          workingday.torim.push(clock)
        }
      }
      await workingday.save()
    }

    ///******מוצא את הימים החדשים לאחר שהוכנסו אליהם השעות ומכניס אותם למשתמש הראשון האדמין  */
    let insertedWORKDAYS = await WorkingDay.find({
      owner: adminUser._id,
    })
    console.log(insertedWORKDAYS)

    let AdminUSER = await User.findById(adminUser._id)

    for (let workday of insertedWORKDAYS) {
      AdminUSER.workingdays.push(workday)
    }
    AdminUSER.WorkingIn = BusinessDemo1._id //הגדרה שהאדמין הראשון עובד במספרה הראשונה
    await AdminUSER.save() //שמירה סופית של האדמין

    console.log('Data Imported!!!!!!!'.green.inverse) //הדאטה יובאה בהצלחה
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
    await WorkingDay.deleteMany()
    await Clock.deleteMany()
    await Appointment.deleteMany()
    await Reports.deleteMany()
    await Tipul.deleteMany()
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

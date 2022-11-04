//סידס משתמשים

import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'עומרי בקיש',
    firstname: 'עומרי',
    lastname: 'בקיש',
    email: 'omri@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: 509089090,
    image: 'https://i.ibb.co/VSdQVWt/123456789.jpg',
    // WorkingIn: '62396e66ab72ecff600a830f',
    WorkingIn: null,
  },
  {
    name: 'אביחי מאיר',
    firstname: 'אביחי',
    lastname: 'מאיר',
    email: 'avihai@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: 545200623,
    image: 'https://i.ibb.co/1rR4p3b/74238.jpg',
    //WorkingIn: '62396e66ab72ecff600a835f',
    WorkingIn: null,
  },
  {
    name: 'אביב בקיש',
    firstname: 'אביב',
    lastname: 'בקיש',
    email: 'aviv@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 5079090,
    image: 'https://i.ibb.co/L0wGpqc/789465321.jpg',
  },
  {
    name: 'דניאל בקיש',
    firstname: 'דניאל',
    lastname: 'בקיש',
    email: 'daniel@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 504444156,
    image: 'https://i.ibb.co/vdBJpq0/123123123.jpg',
  },
]

export default users

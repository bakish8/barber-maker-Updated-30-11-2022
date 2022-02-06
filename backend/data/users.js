//סידס משתמשים

import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'עומרי בקיש',
    firstname: 'עומרי ',
    lastname: 'בקיש',
    email: 'omri@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: 509089090,
    image: 'https://i.ibb.co/VSdQVWt/123456789.jpg',
  },
  {
    name: 'אביחי מלול',
    firstname: 'אביחי ',
    lastname: 'מלול',
    email: 'avihai@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: 545200623,

    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'אביב בקיש',
    firstname: 'אביב ',
    lastname: 'בקיש',
    email: 'aviv@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 5079090,
    image: 'https://i.ibb.co/L0wGpqc/789465321.jpg',
  },
  {
    name: 'דניאל בקיש',
    firstname: 'דניאל ',
    lastname: 'בקיש',
    email: 'daniel@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 504444156,
    image: 'https://i.ibb.co/vdBJpq0/123123123.jpg',
  },
]

export default users

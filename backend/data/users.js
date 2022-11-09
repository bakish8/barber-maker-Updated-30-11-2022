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
    isAdminOfAdmins: true,
    phone: 509089090,
    image: 'https://i.ibb.co/VSdQVWt/123456789.jpg',
    WorkingIn: null,
  },
  {
    name: 'אביחי מאיר',
    firstname: 'אביחי',
    lastname: 'מאיר',
    email: 'avihai@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isAdminOfAdmins: false,
    phone: 545200623,
    image: 'https://i.ibb.co/1rR4p3b/74238.jpg',
    WorkingIn: null,
  },
]

export default users

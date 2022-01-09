//סידס משתמשים

import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'עומרי בקיש',
    email: 'omri@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: 509089090,
    image:
      'https://scontent.ftlv15-1.fna.fbcdn.net/v/t1.6435-9/168945510_4566460253370110_874996815474437353_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Q2x-3Cpf90QAX-qebi5&_nc_ht=scontent.ftlv15-1.fna&oh=00_AT8ErFoF_ycxcJQo9o5OC4ZMTzYNB3deZNc4SXq8BC9IIw&oe=61E612BD',
  },
  {
    name: 'אביחי מלול',
    email: 'avihai@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    phone: 545200623,

    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    name: 'אביב בקיש',
    email: 'aviv@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 5079090,
    image:
      'https://scontent.ftlv16-1.fna.fbcdn.net/v/t39.30808-6/224704067_2968748383393681_5555546859720846480_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=80BbAycWy4gAX9iFhfh&tn=wM9XEZ_3NUqVmQe4&_nc_ht=scontent.ftlv16-1.fna&oh=00_AT-Avta7lSJUWcd5_BHZ1lDf_iACmn13qEJxHtY8Jt31aQ&oe=61DF109A',
  },
  {
    name: 'דניאל בקיש',
    email: 'daniel@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 504444156,
    image:
      'https://scontent.ftlv16-1.fna.fbcdn.net/v/t39.30808-6/256604839_10217177339580250_1789126475426319574_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=vNlISWSzb14AX-3nz6p&_nc_ht=scontent.ftlv16-1.fna&oh=00_AT_e0-AkQwR0wMgnzkEzSW2AjIolA_9gzsHt5w5k-F1VcA&oe=61DE3E2A',
  },
]

export default users

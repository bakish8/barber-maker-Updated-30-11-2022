# BarberMaker

> Apointment Maker platform built with the MERN stack & Redux.

This APP BUILT BY OMRI BAKISH


## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Admin Working days menu
- Admin Working days DatePicker By Click make WorkingDay/Enter a Working Day in db
- Admin Single Working day Menu
- Admin Single Day Options : Range of Appontemnts For this Day,One Appintment By Choose and QUICK ADD 
- Client can pick a Barber
- Client Date Picker 
- Client Hour pick
- Sms send TO specific Client By Making Appointment
- Sms Reminder for this Appointment
- Google Calender For Both Admin and Client after appontment made
- Database seeder (products & users)
  


### ES Modules in Node
We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.
Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error
You can also install and setup Babel if you would like
### Env Variables****
```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Run
npm run dev

# Import data
npm run data:import 

# Destroy data
npm run data:destroy
```

```
Sample User Logins
?????????? ????????
omri@example.com (Admin of bussines 1)
123456

avihai@example.com (Admin of bussines 2)
123456

aviv@example.com (Customer)
123456

daniel@example.com (Customer)
123456

to see products in main page add or edit one product as Admin
``` 

## License
Omri BAKISH the BarberMaker

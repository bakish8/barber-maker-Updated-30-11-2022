import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import ForgottenPasswordResetByEmail from './screens/ForgottenPasswordResetByEmail'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import PickDateScreen from './screens/PickDateScreen'
import PickSaparScreen from './screens/PickSaparScreen'
import WorkingDaysScreen from './screens/workingDays'
import SingleWorkDay from './screens/SingleWorkDay'
import PickHourScreen from './screens/PickHourScreen'
import CancelTorScreen from './screens/CancelTorScreen'
import ReportsScreen from './screens/ReportsScreen'
import NewTipulScreen from './screens/NewTipulScreen'
import SingleReportScreen from './screens/SingleReportScreen'
import PrivecyPolicy from './screens/PrivecyPolicy'
import Admin from './screens/Admin'
import PickTipulScreen from './screens/PickTipulScreen'
import { io } from 'socket.io-client'
import TermsandConditaions from './screens/TermsAndConditions'
import BarberShop from './screens/business/BarberShop'
import PickSapar from './screens/business/PickSapar'
import PickDate from './screens/business/PickDate'
import PickTipul from './screens/business/PickTipul'
import PickTime from './screens/business/PickTime'
import AdminWorkingDays from './screens/business/admin/AdminWorkingDays'
import AdminSingleWorkDay from './screens/business/admin/AdminSingleWorkDay'
import AdminSettingsScreen from './screens/business/admin/AdminSettingsScreen'
import AdminNewTipulScreen from './screens/business/admin/AdminNewTipulScreen'
import AdminTerminal from './screens/business/admin/AdminTerminal'
import BussinesRegisterScreen from './screens/business/Register+Login/BussinesRegisterScreen'
import BusinessLoginScreen from './screens/business/Register+Login/BusinessLoginScreen'
import AdminUserList from './screens/business/admin/AdminUserList'
import AdminEditUserScreen from './screens/business/admin/AdminEditUserScreen'
import AdminNotificationsSettings from './screens/business/admin/AdminNotificationsSettings'
import AdminDesignSettingsScreen from './screens/business/admin/AdminDesignSettingsScreen'
import { myContext } from './actions/Context'
let googleUser = useContext(myContext)

const App = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (googleUser) {
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
      console.log(googleUser)
    }
  }, [googleUser])
  useEffect(() => {
    setSocket(io())
  }, [])

  return (
    <Router>
      <Header socket={socket} />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/picksapar' component={PickSaparScreen} />
          <Route path='/:id/maketor' component={PickDateScreen} />
          <Route
            path='/maketorr/:id/:tipulid'
            component={PickHourScreen}
            exact
          />
          <Route
            path='/maketor/:id/picktipul'
            component={PickTipulScreen}
            exact
          />

          <Route path='/payment' component={PaymentScreen} />
          <Route path='/cancel' component={CancelTorScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login/' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/torim/' component={WorkingDaysScreen} exact />

          <Route path='/admin/workingday/:id' component={SingleWorkDay} exact />
          <Route
            path='/forgot-password/:id/:token'
            component={ForgottenPasswordResetByEmail}
            exact
          />
          <Route
            path='/admin/settings/newtipul'
            component={NewTipulScreen}
            exact
          />

          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route
            path='/admin/reports/:id'
            component={SingleReportScreen}
            exact
          />

          <Route path='/admin/reports' component={ReportsScreen} exact />
          <Route path='/privecypolicy' component={PrivecyPolicy} exact />
          <Route
            path='/termsandconditaions'
            component={TermsandConditaions}
            exact
          />
          <Route path='/admin' component={Admin} exact />

          <Route path='/business/:id' component={BarberShop} exact />
          <Route
            path='/business/:id/register'
            component={BussinesRegisterScreen}
            exact
          />
          <Route path='/business/:id/profile' component={ProfileScreen} exact />
          <Route
            path='/business/:id/cancel'
            component={CancelTorScreen}
            exact
          />

          <Route
            path='/business/:id/login'
            component={BusinessLoginScreen}
            exact
          />
          <Route path='/business/:id/picksapar' component={PickSapar} exact />
          <Route
            path='/business/:id/admin/userlist'
            component={AdminUserList}
            exact
          />
          <Route
            path='/business/:id/admin/user/:uid/edit'
            component={AdminEditUserScreen}
          />

          <Route path='/business/:id/maketor/:sid' component={PickDate} exact />
          <Route
            path='/business/:id/picktipul/:did'
            component={PickTipul} /****TO BE FIX */
            exact
          />

          <Route
            path='/business/:id/admin/:aid/terminal/'
            component={AdminTerminal}
            exact
          />
          <Route
            path='/business/:id/admin/:aid/settings/'
            component={AdminSettingsScreen}
            exact
          />
          <Route
            path='/business/:id/admin/:aid/settings/design'
            component={AdminDesignSettingsScreen}
            exact
          />
          <Route
            path='/business/:id/admin/:aid/settings/notifications'
            component={AdminNotificationsSettings}
            exact
          />

          <Route
            path='/business/:id/admin/:aid/settings/newtipul'
            component={AdminNewTipulScreen}
            exact
          />

          <Route
            path='/business/:id/maketor/:wid/:tid'
            component={PickTime}
            exact
          />
          <Route
            path='/business/:id/admin/:aid/workingdays'
            component={AdminWorkingDays}
            exact
          />

          <Route
            path='/business/:bid/admin/:aid/workingdays/:id'
            component={AdminSingleWorkDay}
            exact
          />
        </Container>
        <Route path='/' component={HomeScreen} exact />
      </main>

      <Footer />
    </Router>
  )
}

export default App

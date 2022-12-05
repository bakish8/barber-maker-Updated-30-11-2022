import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {
  logout,
  GetNotifications,
  Watch_All_Notifications,
} from '../actions/userActions'
import Swal from 'sweetalert2'
import 'moment/locale/he'
import logo from '../D.gif'
import CoolNavBar from './CoolNavBar/CoolNavBar.js'
import AdminMessages from '../components/AdminMessages/AdminMessages'
import './Header.css'
import moment from 'moment'
import {
  getBuissnesDetails,
  getBuissnesDetailsfornav,
} from '../actions/BuissnesActions/Buissnes_User_Actions'
import CoolNavBarBussines from './CoolNavBar/CoolNavBarBussines'

moment.locale('he')
const Header = ({ match }) => {
  /****Fix in a way that getiing _id from sucsses bussines for nav and not fard coded because the changes of the url*/
  let Firstlocation = window.location.pathname.split('/')[1]
  const BusinessId = window.location.pathname.split('/')[2]

  const dispatch = useDispatch()
  const ClientRegister = useSelector((state) => state.ClientRegister)
  const {
    success: Rsuccess,
    loading: Rloading,
    error: Rerror,
    userInfo: RuserInfo,
  } = ClientRegister

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, success: user_connected_success } = userLogin

  const cancelNoti = useSelector((state) => state.cancelNoti)
  const {
    loading: loading_cancel_noti,
    success: success_cancel_noti,
    cancel_noti,
    error: error_cancel_noti,
  } = cancelNoti
  const MakeALLwatch = useSelector((state) => state.MakeALLwatch)
  const {
    loading: loading_make_all_watch,
    success: success_make_all_watch,
    cancel_noti: make_all_watch,
    error: error_make_all_watch,
  } = MakeALLwatch

  const cancelNotiList = useSelector((state) => state.cancelNotiList)
  const { loading, notifications, error } = cancelNotiList
  const [notificationss, setNotificationss] = useState([])
  const [open, setOpen] = useState(false)
  const [MakeBLueONEdesapier, setMakeBLueONEdesapier] = useState(true)
  //const [FirstlocationIsBusiness, setFirstlocationIsBusiness] = useState(false)
  const [stateForActiveAdminLINK, setstateForActiveAdminLINK] = useState(false)
  const [stateForActiveUserLINK, setstateForActiveUserLINK] = useState(false)
  const [stateForActiveCARTLINK, setstateForActiveCARTLINK] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  useState(false)
  const [Administrate, setAdministrate] = useState(false)

  const GetBusinessDetailsfornav = useSelector(
    (state) => state.GetBusinessDetailsfornav
  )
  const {
    loading: GetBusinessDetailsloading,
    business,
    success: GetBusinessDetailssuccess,
    error: GetBusinessDetailserror,
  } = GetBusinessDetailsfornav

  const userLoginEMAIL = useSelector((state) => state.userLoginEMAIL)
  const {
    success: successEmail,
    loading: loadingEmail,
    error: errorEmail,
    userInfo: userInfoEmail,
  } = userLoginEMAIL

  const logoutHandler = () => {
    if (Firstlocation === 'business') {
      dispatch(logout(BusinessId))
    } else {
      dispatch(logout())
    }
  }

  const ClickOnAdmin = () => {
    setstateForActiveAdminLINK(!stateForActiveAdminLINK)
    setstateForActiveUserLINK(false)
    setstateForActiveCARTLINK(false)
  }
  const ClickOnUser = () => {
    setstateForActiveUserLINK(!stateForActiveUserLINK)
    setstateForActiveAdminLINK(false)
    setstateForActiveCARTLINK(false)
  }
  const ClickOnCart = () => {
    setstateForActiveCARTLINK(!stateForActiveCARTLINK)
    setstateForActiveUserLINK(false)
    setstateForActiveAdminLINK(false)
  }

  // */

  const one = document.getElementById('navbarContainerItem')
  const two = document.getElementById('navbarContainerItem2')
  const trhee = document.getElementById('navbarContainerItem3')

  const displayNotification = ({
    senderName,
    type,
    time,
    dayInWeek,
    createdAt,
    date,
    now,
  }) => {
    let action
    if (type === 1) {
      action = 'ביטל'
      return (
        <>
          <div className='notification177'>
            {`${senderName} `}
            <span id='redMeBitel'>{`${action} `}</span>
            <span>את התור שלו בשעה</span>
            <span id='redMeBitel'>{` ${time} `}</span>
            <span>ביום</span>
            <span id='redMeBitel'>{` ${dayInWeek} `}</span>
            <div id='TimeOfNotifications107454'>{moment(now).fromNow()}</div>
          </div>
          <div className='notification177UnderLine'></div>
        </>
      )
    } else if (type === 2) {
      action = 'קבע'
      return (
        <>
          <div className='notificationGREENS'>
            {`${senderName} `}
            <span id='GREENMeBitel'>{`${action} `}</span>
            <span>תור ביום</span>
            <span id='GREENMeBitel'>{` ${dayInWeek} `}</span>
            <span>בשעה</span>
            <span id='GREENMeBitel'>{` ${time} `}</span>
            <div id='TimeOfNotifications107454'> {moment(now).fromNow()}</div>
          </div>
          <div className='notification177UnderLine'></div>
        </>
      )
    } else if (type === 3) {
      return (
        <>
          <div className='notificationBLUE'>
            {`${senderName} `}
            <span id='BlueMeBitel'>נרשם בהצלחה למערכת</span>
            <div id='TimeOfNotifications107454'> {moment(now).fromNow()}</div>
          </div>
          <div className='notification177UnderLine'></div>
        </>
      )
    }
  }
  const handleRead = () => {
    // add MARK AS READ IN DATA BASE AS WELL
    setNotificationss([])
    setOpen(false)
    setMakeBLueONEdesapier(true)
    dispatch(Watch_All_Notifications(userInfo._id))
  }

  useEffect(() => {
    if (
      !window.location.host === 'barber-maker.com:3000' ||
      Firstlocation === 'business'
    ) {
      dispatch(getBuissnesDetailsfornav(BusinessId))
    }
  }, [userInfo])
  useEffect(() => {
    if (successEmail) {
      window.location.reload()
    }
  }, [successEmail, Rsuccess])

  useEffect(() => {
    if (userInfo && user_connected_success) {
      console.log(`user ${userInfo.name} is connected sussscfully!!!!!`)
      if (userInfo.workingIn) {
        dispatch(getBuissnesDetailsfornav(userInfo.workingIn))
      }
      if (userInfo.ClientOfBusiness) {
        dispatch(getBuissnesDetailsfornav(userInfo.ClientOfBusiness))
      }
      if (localStorage.getItem('roll-back-business') != null) {
        let roleBack = localStorage.getItem('roll-back-business')
        localStorage.removeItem('roll-back-business')
        dispatch(getBuissnesDetailsfornav(roleBack))
      }
    }
  }, [userInfo])

  useEffect(() => {
    if (user_connected_success && userInfo && userInfo.isAdmin) {
      dispatch(GetNotifications(userInfo._id)) /////Fix
    }

    if (userInfo && GetBusinessDetailssuccess) {
      if (business.id === userInfo.workingIn) {
        setAdministrate(true)
      } else {
        setAdministrate(false)
      }
    }
  }, [
    notificationss,
    user_connected_success,
    userInfo,
    GetBusinessDetailssuccess,
    Administrate,
  ])

  //USE EFFECT  for **states for clicking outside div
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      /////Fix
      //**need to correct */
      dispatch(GetNotifications(userInfo._id))
    }
    window.addEventListener('click', function (e) {
      if (one && two && trhee) {
        if (
          one.contains(e.target) ||
          two.contains(e.target) ||
          trhee.contains(e.target)
        ) {
        } else {
          setstateForActiveUserLINK(false)
          setstateForActiveAdminLINK(false)
          setstateForActiveCARTLINK(false)
        }
      }
    })
  }, [one, two, trhee, success_cancel_noti, make_all_watch])

  const ChangePositionHandler = () => {
    setOpen(!open)
    setMakeBLueONEdesapier(!MakeBLueONEdesapier)
  }

  return (
    <>
      {userInfo && userInfo.isAdmin && Administrate && MakeBLueONEdesapier ? ( /////Fix
        <AdminMessages list={notifications} />
      ) : (
        <div id='displaynone'></div>
      )}
      <header id='navbar'>
        <Navbar variant='dark' expand='lg' collapseOnSelect>
          <Container id='nabarr'>
            <LinkContainer
              to={
                GetBusinessDetailssuccess && business
                  ? `/business/${business.id}`
                  : '/'
              }
            >
              <Navbar.Brand id='navbar-brand'>
                {' '}
                <div id='navlogodiv'>
                  <img
                    src={
                      GetBusinessDetailssuccess && business
                        ? business.logo
                        : logo
                    }
                    alt='logo'
                    id={
                      GetBusinessDetailssuccess && !business.logoNameOnNav
                        ? 'navlogo2'
                        : 'navlogo'
                    }
                  />
                </div>
                <div className='healineAnimationNavBAR' id='navbarHeadline'>
                  {' '}
                  <h6 id='barbermakerH1Nav'>
                    {GetBusinessDetailssuccess && business.logoNameOnNav ? (
                      business.name
                    ) : GetBusinessDetailssuccess && !business.logoNameOnNav ? (
                      <div id='displaynonePlease'></div>
                    ) : (
                      'BARBER Maker'
                    )}
                  </h6>
                </div>
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                {business && userInfo && userInfo.isAdmin && Administrate && (
                  <NavDropdown
                    onClick={ClickOnAdmin}
                    id='navbarContainerItem'
                    title={
                      <h4
                        id={
                          stateForActiveAdminLINK
                            ? 'navlinkadminActive'
                            : 'navlinksManager'
                        }
                      >
                        מנהל <i className='fas fa-user-shield'></i>
                      </h4>
                    }
                  >
                    <LinkContainer
                      id='usernameactionsNAV'
                      to={`/business/${business.id}/admin/${userInfo._id}/terminal`}
                    >
                      <NavDropdown.Item>אפשרויות</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      id='usernameactionsNAV'
                      to={
                        GetBusinessDetailssuccess && business
                          ? `/business/${business.id}/admin/${userInfo._id}/workingdays`
                          : `/admin/torim`
                      }
                    >
                      <NavDropdown.Item>תורים</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer id='usernameactionsNAV' to='/admin/reports'>
                      <NavDropdown.Item>סיכומים</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      id='usernameactionsNAV'
                      to={
                        GetBusinessDetailssuccess && business
                          ? `/business/${business.id}/admin/userlist`
                          : '/admin/userlist'
                      }
                    >
                      <NavDropdown.Item>לקוחות</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      id='usernameactionsNAV'
                      to='/admin/productlist'
                    >
                      <NavDropdown.Item>מוצרים</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      id='usernameactionsNAV'
                      to='/admin/orderlist'
                    >
                      <NavDropdown.Item>הזמנות</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      id='usernameactionsNAV'
                      to={`/business/${business.id}/admin/${userInfo._id}/settings`}
                    >
                      <NavDropdown.Item>הגדרות</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}

                {userInfo ? (
                  <NavDropdown
                    onClick={ClickOnUser}
                    id='navbarContainerItem2'
                    title={
                      <h4
                        id={
                          stateForActiveUserLINK
                            ? 'navlinksUserActiveLiNKS'
                            : 'navlinks'
                        }
                      >
                        {userInfo.name} <i className='far fa-user'></i>
                      </h4>
                    }
                  >
                    <LinkContainer
                      id='usernameactionsNAV'
                      to={
                        GetBusinessDetailssuccess && business
                          ? `/business/${business.id}/profile`
                          : '/profile'
                      }
                    >
                      <NavDropdown.Item id='centerme'>פרופיל</NavDropdown.Item>
                    </LinkContainer>
                    {GetBusinessDetailssuccess && business ? (
                      <LinkContainer
                        id='usernameactionsNAV'
                        to={`/business/${business.id}/picksapar`}
                      >
                        <NavDropdown.Item id='centerme'>
                          קבע תור
                        </NavDropdown.Item>
                      </LinkContainer>
                    ) : (
                      ''
                    )}

                    {GetBusinessDetailssuccess && business ? (
                      <LinkContainer
                        id='usernameactionsNAV'
                        to={`/business/${business.id}/cancel`}
                      >
                        <NavDropdown.Item id='centerme'>
                          בטל תור
                        </NavDropdown.Item>
                      </LinkContainer>
                    ) : (
                      ''
                    )}

                    <NavDropdown.Item
                      id='usernameactionsNAV'
                      onClick={logoutHandler}
                    >
                      התנתק
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer
                    to={
                      GetBusinessDetailssuccess && Firstlocation === 'business'
                        ? `/business/${business.id}/login`
                        : '/login'
                    }
                  >
                    <Nav.Link>
                      <h3 id='navlinks'>
                        <i className='fas fa-user'></i> כנס
                      </h3>
                    </Nav.Link>
                  </LinkContainer>
                )}

                <LinkContainer to='/cart' onClick={ClickOnCart}>
                  <Nav.Link id='navbarContainerItem3'>
                    <h3
                      id={
                        stateForActiveCARTLINK
                          ? 'navlinksCARTAAA'
                          : 'navlinksCART'
                      }
                    >
                      <span id='showmeinSmallScreeen'> עגלה</span>
                      <i className='fas fa-shopping-cart'></i>
                    </h3>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {GetBusinessDetailssuccess && business ? (
          <aside>
            <CoolNavBarBussines
              logo={business.logo}
              businessId={business.id}
              Administrate={Administrate}
            />
          </aside>
        ) : (
          <aside>
            <CoolNavBar Administrate={Administrate} />
          </aside>
        )}
      </header>
      {open && (
        <div className='notifications'>
          <span id='NotificationsHeader1077'>הודעות מערכת</span>
          <div id='NotificationsHeader1077FirstLine'></div>
          {notificationss.map((n) => displayNotification(n))}
          <button className='nButton' onClick={handleRead}>
            סמן הכל כנקרא
          </button>
        </div>
      )}
      {notificationss.length > 0 && (
        <div
          onClick={() => ChangePositionHandler()}
          className={open ? 'counter202' : 'counter'}
        >
          {notificationss.length}
        </div>
      )}
    </>
  )
}

export default Header

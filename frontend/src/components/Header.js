import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {
  logout,
  GetCancelNotification,
  MakeAllMessagesBeWatch,
} from '../actions/userActions'

import logo from '../D.gif'
import CoolNavBar from './CoolNavBar/CoolNavBar.js'
import AdminMessages from '../components/AdminMessages/AdminMessages'
import './Header.css'
const Header = ({ socket, user }) => {
  //accepting socket and user from App.js
  if (socket && user) {
    console.log(`socket:`)
    console.log(socket)
    console.log(`user name:`)
    console.log(user.name)
  }
  //*************************** */
  const dispatch = useDispatch()
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
  /************************************** */
  const [notificationss, setNotificationss] = useState([])
  const [Socket, setSocket] = useState({})
  const [open, setOpen] = useState(false)

  //*************************************** */
  const [stateForActiveAdminLINK, setstateForActiveAdminLINK] = useState(false)
  const [stateForActiveUserLINK, setstateForActiveUserLINK] = useState(false)
  const [stateForActiveCARTLINK, setstateForActiveCARTLINK] = useState(false)
  const userGoogleLogin = useSelector((state) => state.userGoogleLogin)
  const { userGoogleInfo, Gsuccess } = userGoogleLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  console.log(userInfo)
  console.log(userGoogleInfo)

  if (Gsuccess) {
    window.onload = function () {
      if (!window.location.hash) {
        window.location = window.location + '#loaded'
        window.location.reload()
      }
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

  /******************************************************** */
  /******************************************************** */
  /******************************************************** */

  const displayNotification = ({ senderName, type, time, dayInWeek }) => {
    let action

    if (type === 1) {
      action = 'ביטל'
    }
    return (
      <>
        <div className='notification177'>
          {`${senderName} `}
          <span id='redMeBitel'>{`${action} `}</span>
          <span>את התור שלו בשעה</span>
          <span id='redMeBitel'>{` ${time} `}</span>
          <span>ביום</span>
          <span id='redMeBitel'>{` ${dayInWeek} `}</span>
        </div>
        <div className='notification177UnderLine'></div>
      </>
    )
  }
  const handleRead = () => {
    // add MARK AS READ IN DATA BASE AS WELL
    setNotificationss([])
    setOpen(false)
    dispatch(MakeAllMessagesBeWatch(userInfo._id))
  }
  /******************************************************** */
  /******************************************************** */
  /******************************************************** */

  useEffect(() => {
    if (socket) {
      setSocket(socket)
      socket.on('getNotification', (data) => {
        setNotificationss((prev) => [...prev, data])
      })
    }
  }, [socket])
  useEffect(() => {
    if (notificationss) {
      console.log(`notificationss`)
      console.log(notificationss)
    }
    if (user_connected_success && userInfo && userInfo.isAdmin) {
      console.log(
        `user connected succssessfully! dispatch GetCancelNotification`
      )
      dispatch(GetCancelNotification(userInfo._id))
    }
  }, [notificationss, user_connected_success, userInfo])
  /********************************************** */

  //USE EFFECT  for **states for clicking outside div
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      //**need to correct */
      dispatch(GetCancelNotification(userInfo._id))
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
      } else {
        console.log('')
      }
      if (success_cancel_noti) {
        console.log('dispatching GetCancelNotification')
      }
    })
  }, [one, two, trhee, success_cancel_noti, make_all_watch])

  return (
    <>
      {userInfo && userInfo.isAdmin ? (
        <AdminMessages list={notifications} />
      ) : (
        <div id='displaynone'></div>
      )}
      <header id='navbar'>
        <Navbar variant='dark' expand='lg' collapseOnSelect>
          <Container id='nabarr'>
            <LinkContainer to='/'>
              <Navbar.Brand id='navbar-brand'>
                {' '}
                <div id='navlogodiv'>
                  <img src={logo} alt='logo' id='' id='navlogo' />
                </div>
                <div className='healineAnimationNavBAR' id='navbarHeadline'>
                  {' '}
                  <h6 id='barbermakerH1Nav'> BARBER Maker</h6>
                </div>
              </Navbar.Brand>
            </LinkContainer>

            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                {userInfo && userInfo.isAdmin && (
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
                    <LinkContainer id='usernameactionsNAV' to='/admin'>
                      <NavDropdown.Item>אפשרויות</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer id='usernameactionsNAV' to='/admin/torim'>
                      <NavDropdown.Item>תורים</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer id='usernameactionsNAV' to='/admin/reports'>
                      <NavDropdown.Item>סיכומים</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer id='usernameactionsNAV' to='/admin/userlist'>
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
                    <LinkContainer id='usernameactionsNAV' to='/admin/settings'>
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
                    <LinkContainer id='usernameactionsNAV' to='/profile'>
                      <NavDropdown.Item id='centerme'>פרופיל</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer id='usernameactionsNAV' to='/picksapar'>
                      <NavDropdown.Item id='centerme'>קבע תור</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer id='usernameactionsNAV' to='/cancel'>
                      <NavDropdown.Item id='centerme'>בטל תור</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item
                      id='usernameactionsNAV'
                      onClick={logoutHandler}
                    >
                      התנתק
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to='/login'>
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
        <aside>
          <CoolNavBar />
        </aside>
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
        <div onClick={() => setOpen(!open)} className='counter'>
          {notificationss.length}
        </div>
      )}
    </>
  )
}

export default Header

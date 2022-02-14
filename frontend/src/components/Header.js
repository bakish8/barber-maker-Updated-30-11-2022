import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout, GetCancelNotification } from '../actions/userActions'
import logo from '../D.gif'
import CoolNavBar from './CoolNavBar/CoolNavBar.js'
import AdminMessages from '../components/AdminMessages/AdminMessages'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
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

  //USE EFFECT  for **states for clicking outside div
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(GetCancelNotification())
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
    </>
  )
}

export default Header

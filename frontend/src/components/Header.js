import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import logo from '../D.gif'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

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
  return (
    <header id='navbar'>
      <Navbar variant='dark' expand='lg' collapseOnSelect>
        <Container id='nabarr'>
          <LinkContainer to='/'>
            <Navbar.Brand>
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
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  id='navbarContainerItem'
                  title={
                    <h3 id='navlinksManager'>
                      מנהל <i className='fas fa-user-shield'></i>
                    </h3>
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
                  <LinkContainer id='usernameactionsNAV' to='/admin/orderlist'>
                    <NavDropdown.Item>הזמנות</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer id='usernameactionsNAV' to='/admin/settings'>
                    <NavDropdown.Item>הגדרות</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo ? (
                <NavDropdown
                  id='navbarContainerItem'
                  title={
                    <h3 id='navlinks'>
                      {userInfo.name} <i className='far fa-user'></i>
                    </h3>
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

              <LinkContainer to='/cart'>
                <Nav.Link id='navbarContainerItem'>
                  <h3 id='navlinksCART'>
                    <span id='showmeinSmallScreeen'> עגלה</span>
                    <i className='fas fa-shopping-cart'></i>
                  </h3>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

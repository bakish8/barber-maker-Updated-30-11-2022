import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import logo from '../D.gif'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header id='navbar'>
      <Navbar variant='dark' expand='lg' collapseOnSelect>
        <Container>
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
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <h3 id='navlinks'>
                    עגלה <i class='fas fa-shopping-cart'></i>
                  </h3>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={
                    <h3 id='navlinks'>
                      {userInfo.name} <i class='far fa-user'></i>
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
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <h3 id='navlinksManager'>
                      מנהל <i class='fas fa-user-shield'></i>
                    </h3>
                  }
                >
                  <LinkContainer id='usernameactionsNAV' to='/admin/userlist'>
                    <NavDropdown.Item>משתמשים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer id='usernameactionsNAV' to='/admin/torim'>
                    <NavDropdown.Item>תורים</NavDropdown.Item>
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
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

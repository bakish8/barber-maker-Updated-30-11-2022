import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

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
            <Navbar.Brand
              className='healineAnimationNavBAR'
              id='navbarHeadline'
            >
              THE BARBER Maker
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> עגלה
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item id='centerme'>פרופיל</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/maketor'>
                    <NavDropdown.Item id='centerme'>קבע תור</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item id='centerme' onClick={logoutHandler}>
                    התנתק
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> כנס
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='מנהל' id='adminmenu'>
                  <LinkContainer id='centerme' to='/admin/userlist'>
                    <NavDropdown.Item>משתמשים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer id='centerme' to='/admin/torim'>
                    <NavDropdown.Item>תורים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer id='centerme' to='/admin/productlist'>
                    <NavDropdown.Item>מוצרים</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer id='centerme' to='/admin/orderlist'>
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

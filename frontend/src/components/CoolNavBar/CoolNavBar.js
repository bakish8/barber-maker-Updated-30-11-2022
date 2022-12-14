import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Backdrop from '../UIelements/Backdrop'
import './CoolNavBar.css'
import logo from '../../D.gif'
import { Link } from 'react-router-dom'
const CoolNavBar = (props) => {
  const [isSmall, setisSmall] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    setisSmallFunction()
    dispatch(logout())
  }

  //Maybe this is the problem with reloading check... \
  // ______________________________________________________
  // if (Gsuccess) {
  //   window.onload = function () {
  //     if (!window.location.hash) {
  //       window.location = window.location + '#loaded'
  //       window.location.reload()
  //     }
  //   }
  // }

  const setisSmallFunction = () => {
    setisSmall(!isSmall)
  }

  const setisSmallFunctionAndRedirectHome = () => {
    setisSmall(!isSmall)
  }

  return (
    <>
      {userInfo && (
        <div className='cool-nav-bar-div'>
          <div
            className={`cool-nav cool-nav-white ${
              isSmall === true ? 'visible' : ''
            }`}
          >
            <div
              className={`cool-nav cool-nav-blue ${
                isSmall === true ? 'visible' : ''
              }`}
            >
              {' '}
              <div
                className={`cool-nav cool-nav-black ${
                  isSmall === true ? 'visible' : ''
                }`}
              >
                <Link onClick={setisSmallFunctionAndRedirectHome} to='/'>
                  <img
                    src={logo}
                    alt='logo'
                    id='navlogo'
                    className='cool-nav-logo'
                  />
                </Link>

                <Row>
                  <Col>
                    {' '}
                    <p id='manager'>{userInfo.name} ???????? </p>{' '}
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/profile'
                    >
                      <p>????????????</p>
                    </LinkContainer>
                    <p onClick={logoutHandler}>??????????</p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
      {userInfo && userInfo.isAdmin && props.Administrate && (
        <div className='cool-nav-bar-div'>
          <div
            className={`cool-nav cool-nav-white ${
              isSmall === true ? 'visible' : ''
            }`}
          >
            <div
              className={`cool-nav cool-nav-blue ${
                isSmall === true ? 'visible' : ''
              }`}
            >
              {' '}
              <div
                className={`cool-nav cool-nav-black ${
                  isSmall === true ? 'visible' : ''
                }`}
              >
                <Link onClick={setisSmallFunctionAndRedirectHome} to='/'>
                  <img
                    src={logo}
                    alt='logo'
                    id='navlogo'
                    className='cool-nav-logo'
                  />
                </Link>
                <Row>
                  <Col>
                    {' '}
                    <p id='manager'>{userInfo.name} ????????</p>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/torim'
                    >
                      <p>??????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin'
                    >
                      <p>????????????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/reports'
                    >
                      <p>??????????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/userlist'
                    >
                      <p>????????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/productlist'
                    >
                      <p>????????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/orderlist'
                    >
                      <p>????????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/settings'
                    >
                      <p>????????????</p>
                    </LinkContainer>
                    <p onClick={logoutHandler}>??????????</p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}

      {!userInfo && (
        <div className='cool-nav-bar-div'>
          <div
            className={`cool-nav cool-nav-white ${
              isSmall === true ? 'visible' : ''
            }`}
          >
            <div
              className={`cool-nav cool-nav-blue ${
                isSmall === true ? 'visible' : ''
              }`}
            >
              {' '}
              <div
                className={`cool-nav cool-nav-black ${
                  isSmall === true ? 'visible' : ''
                }`}
              >
                <Link onClick={setisSmallFunctionAndRedirectHome} to='/'>
                  <img
                    src={logo}
                    alt='logo'
                    id='navlogo'
                    className='cool-nav-logo'
                  />
                </Link>
                <Row>
                  <Col>
                    {' '}
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/login'
                    >
                      <p>??????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/register'
                    >
                      <p>??????????</p>
                    </LinkContainer>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSmall && (
        <>
          <button
            onClick={setisSmallFunction}
            className={`cool-nav-btn cool-close-btn`}
          >
            <i class='fas fa-times'></i>
          </button>
          <Backdrop onClick={setisSmallFunction} />
        </>
      )}

      {!isSmall && (
        <button
          onClick={setisSmallFunction}
          className={`cool-nav-btn cool-open-btn`}
        >
          {' '}
          <i id='iiie' class='fas fa-bars'></i>
        </button>
      )}
    </>
  )
}

export default CoolNavBar

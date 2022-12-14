import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../../actions/userActions'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Backdrop from '../UIelements/Backdrop'
import './CoolNavBar.css'
import { Link } from 'react-router-dom'
const CoolNavBarBussines = (props) => {
  const [isSmall, setisSmall] = useState(false)
  const [Propsi, setPropsi] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    setisSmallFunction()
    dispatch(logout(props.businessId ? props.businessId : ''))
  }

  //Maybe this is the problem with reloading check... \
  // ______________________________________________________
  // if (Gsuccess) {
  //   window.onload = function () {
  //     if (!window.location.hash) {
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

  useEffect(() => {
    if (props) {
      setPropsi(true)
    } else {
      setPropsi(false)
    }
  }, [props])

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
                {!Propsi ? (
                  <Link onClick={setisSmallFunctionAndRedirectHome} to='/'>
                    <img
                      src='https://i.ibb.co/NCjCpRD/BM-SVG-gif-ready.gif'
                      alt='logo'
                      id='navlogo'
                      className='cool-nav-logo'
                    />
                  </Link>
                ) : (
                  <Link
                    onClick={setisSmallFunctionAndRedirectHome}
                    to={`/business/${props.businessId}`}
                  >
                    <img
                      src={props.logo}
                      alt='logo'
                      id='navlogo'
                      className='cool-nav-logo'
                    />
                  </Link>
                )}
                <Row>
                  <Col>
                    {' '}
                    <p id='manager'>{userInfo.name} ???????? </p>{' '}
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/picksapar`}
                    >
                      <p>?????? ??????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/profile`}
                    >
                      <p>????????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/cancel`}
                    >
                      <p>?????? ??????</p>
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
                {!Propsi ? (
                  <Link onClick={setisSmallFunctionAndRedirectHome} to='/'>
                    <img
                      src='https://i.ibb.co/NCjCpRD/BM-SVG-gif-ready.gif'
                      alt='logo'
                      id='navlogo'
                      className='cool-nav-logo'
                    />
                  </Link>
                ) : (
                  <Link
                    onClick={setisSmallFunctionAndRedirectHome}
                    to={`/business/${props.businessId}`}
                  >
                    <img
                      src={props.logo}
                      alt='logo'
                      id='navlogo'
                      className='cool-nav-logo'
                    />
                  </Link>
                )}
                <Row>
                  <Col>
                    {' '}
                    <p id='manager'>{userInfo.name} ????????</p>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/admin/${userInfo._id}/workingdays`}
                    >
                      <p>??????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/admin/${userInfo._id}/terminal`}
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
                      to={`/business/${props.businessId}/admin/userlist`}
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
                      to={`/business/${props.businessId}/admin/${userInfo._id}/settings`}
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
                {!Propsi ? (
                  <Link onClick={setisSmallFunctionAndRedirectHome} to='/'>
                    <img
                      src='https://i.ibb.co/NCjCpRD/BM-SVG-gif-ready.gif'
                      alt='logo'
                      id='navlogo'
                      className='cool-nav-logo'
                    />
                  </Link>
                ) : (
                  <Link
                    onClick={setisSmallFunctionAndRedirectHome}
                    to={`/business/${props.businessId}`}
                  >
                    <img
                      src={props.logo}
                      alt='logo'
                      id='navlogo'
                      className='cool-nav-logo'
                    />
                  </Link>
                )}

                <Row>
                  <Col>
                    {' '}
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/login`}
                    >
                      <p>??????????</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/register`}
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

export default CoolNavBarBussines

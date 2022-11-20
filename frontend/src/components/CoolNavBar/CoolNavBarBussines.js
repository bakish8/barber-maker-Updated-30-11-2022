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
  console.log(props.Administrate)
  const [isSmall, setisSmall] = useState(false)
  const [Propsi, setPropsi] = useState(false)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const userGoogleLogin = useSelector((state) => state.userGoogleLogin)
  // const { userGoogleInfo, Gsuccess } = userGoogleLogin

  const logoutHandler = () => {
    setisSmallFunction()
    dispatch(logout(props.businessId ? props.businessId : ''))
  }

  console.log(userInfo)
  // console.log(userGoogleInfo)
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
    console.log('hgfh')
    console.log(isSmall)
    setisSmall(!isSmall)
    console.log(isSmall)
  }

  const setisSmallFunctionAndRedirectHome = () => {
    console.log('hgfh')
    console.log(isSmall)
    setisSmall(!isSmall)
    console.log(isSmall)
  }

  useEffect(() => {
    if (props) {
      console.log(props)
      setPropsi(true)
    } else {
      setPropsi(false)
    }
    if (props.Administrate) {
      console.log(`props.Administrate`)
      console.log(props.Administrate)

      console.log(`________________________________________`)
    } else {
      console.log(props.Administrate)
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
                    <p id='manager'>{userInfo.name} שלום </p>{' '}
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/picksapar`}
                    >
                      <p>קבע תור</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/profile`}
                    >
                      <p>פרופיל</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/cancel`}
                    >
                      <p>בטל תור</p>
                    </LinkContainer>
                    <p onClick={logoutHandler}>התנתק</p>
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
                    <p id='manager'>{userInfo.name} שלום</p>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/admin/${userInfo._id}/workingdays`}
                    >
                      <p>תורים</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/admin/${userInfo._id}/terminal`}
                    >
                      <p>אפשרויות</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/reports'
                    >
                      <p>סיכומים</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/admin/userlist`}
                    >
                      <p>לקוחות</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/productlist'
                    >
                      <p>מוצרים</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to='/admin/orderlist'
                    >
                      <p>הזמנות</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/admin/${userInfo._id}/settings`}
                    >
                      <p>הגדרות</p>
                    </LinkContainer>
                    <p onClick={logoutHandler}>התנתק</p>
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
                      <p>התחבר</p>
                    </LinkContainer>
                    <LinkContainer
                      onClick={setisSmallFunction}
                      id=''
                      to={`/business/${props.businessId}/register`}
                    >
                      <p>הירשם</p>
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

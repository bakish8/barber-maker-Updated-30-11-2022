import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions' //ייבוא של האקשן עצמו שמביא את אמוצרים.

import EmailMeTheDeetsComponent from '../components/HomePage/EmailMeTheDeetsComponent'
import OpenVirtualBarberShop from '../components/HomePage/openVirtualBarberShop'
import ImageOne from '../components/HomePage/ImageOne'
import ImageTWO from '../components/HomePage/ImageTWO'
import ImageThree from '../components/HomePage/ImageThree'
import ImageFour from '../components/HomePage/ImageFour'
import Aos from 'aos'
import 'aos/dist/aos.css'
import LinkedinSpinnerIcon from '../components/icons/LinkedinSpinnerIcon.js'
import InstagramSpinnerIcon from '../components/icons/InstagramSpinnerIcon.js'
import FacebookIcon from '../components/icons/FacebookIcon.js'
import Adds_1 from '../components/Adds/Adds_1.js'
import Adds_2 from '../components/Adds/Adds_2.js'
import Adds_3 from '../components/Adds/Adds_3.js'
import ExpendingCards from '../components/ExpendingCards/ExpendingCards.js'
import ClientEffect from '../components/ClientEffect/ClientEffect'
import { duration } from 'moment'
import Kidma from '../components/KidmaTorim/Kidma'
import Nahel from '../components/Nahel/Nahel'
import Tilt from 'react-parallax-tilt'
import FAQ from '../components/HomePage/FAQ'

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch() //הגדרת שיגור

  const productList = useSelector((state) => state.productList) //מושכים מהפרוקדט רדיוסר מההצהרה שלנו את הארור האפשרי את המוצרים ואת הטעינה
  const { loading, error, products, page, pages } = productList
  const userGoogleLogin = useSelector((state) => state.userGoogleLogin)
  const { userGoogleInfo, Gsuccess } = userGoogleLogin

  //functions for scroll highet
  const fixScrollHighetForBarberSystem = () => {
    const BarberSystem = document.getElementById('image4')
    window.scrollTo({
      top: BarberSystem.offsetTop,
      behavior: 'smooth',
    })
  }

  //USE EFFECT  for Aos Effects
  useEffect(() => {
    Aos.init({ duration: 700 })
  }, [])

  //redirect if userGoogleInfo with Bussines Id accsepted
  // useEffect(() => {
  //   if (userGoogleInfo) {
  //     if (userGoogleInfo.WorkingIn) {
  //       history.push(`/business/${userGoogleInfo.workingIn}`)
  //     } else if (
  //       userGoogleInfo.ClientOfBusiness &&
  //       userGoogleInfo.ClientOfBusiness != 0
  //     ) {
  //       history.push(`/business/${userGoogleInfo.ClientOfBusiness}`)
  //     }
  //   }
  // }, [userGoogleInfo])

  return (
    <>
      <Meta />

      <Link to='/picksapar' className='call-to-us'>
        <div className='call-to-us__label'>
          <div className='callTousFIXED2'>
            <span id='callTousFIXED'> קבע </span>
            <span id='callTousFIXED'> תור </span>
          </div>
        </div>
      </Link>
      <OpenVirtualBarberShop />
      <EmailMeTheDeetsComponent />
      <FAQ />
      <div>
        <ImageOne />
      </div>

      <div className='grids'>
        {' '}
        <div data-aos='fade-up' className='BOXS'>
          <ImageTWO />
        </div>
        <Tilt>
          <Row id='MAINADD' onClick={fixScrollHighetForBarberSystem}>
            <Col md={4}>
              <div data-aos='fade-right' id='Add1_div'>
                <Kidma />
              </div>
            </Col>

            <Col md={4}>
              <div data-aos='zoom-in'>
                <div id='circleBlack'>
                  <img
                    id='RollPullsmall'
                    src='https://i.ibb.co/82t0dzn/ezgif-com-gif-maker-4.gif'
                  />{' '}
                  <img
                    onClick={fixScrollHighetForBarberSystem}
                    id='ScrollArrowDownForBarberMakerSystem'
                    src='https://i.ibb.co/XDLjw4r/animation-200-kylde03u.gif'
                  />{' '}
                  <div
                    data-aos='fade-right'
                    data-aos-offset='180'
                    data-aos-easing='ease-in-sine'
                  >
                    <img
                      id='CalenerCoins'
                      src='https://i.ibb.co/f1v07Fb/animation-500-kylh202z.gif'
                    />{' '}
                  </div>
                  <img
                    id='CoinsFalling'
                    src='https://i.ibb.co/LgHPZmy/animation-300-kylf8gis.gif'
                  />{' '}
                  <img
                    id='barbershopgif'
                    src='https://i.ibb.co/tQL6Qrj/ezgif-com-gif-maker-2.gif'
                  />
                </div>{' '}
              </div>
            </Col>
            <Col md={4}>
              <img
                id='underline12'
                src='https://i.ibb.co/HnHc0hs/ezgif-com-gif-maker-6.gif'
              />
              <div data-aos='fade-left'>
                <Nahel />
              </div>
            </Col>
          </Row>
        </Tilt>
        <div data-aos='flip-left' id='image4'>
          <ImageFour />
        </div>{' '}
        <div data-aos='zoom-in' id='ClientEffect'>
          <ExpendingCards />
        </div>{' '}
        <div data-aos='flip-right' id='ClientEffect'>
          <ClientEffect />
        </div>{' '}
        <Row id='RowAdds'>
          <Col>
            <Tilt className='TILT'>
              <div data-aos='fade-right' id='Add1_div'>
                <Adds_3 className='cardAdd' />
              </div>{' '}
            </Tilt>
          </Col>
          <Col>
            <Tilt className='TILT'>
              <div data-aos='fade-up' id='Add1_div'>
                <Adds_1 className='cardAdd' />
              </div>{' '}
            </Tilt>
          </Col>
          <Col>
            <Tilt className='TILT'>
              <div data-aos='fade-left' id='Add1_div'>
                <Adds_2 className='cardAdd' />
              </div>{' '}
            </Tilt>
          </Col>
        </Row>
        <div data-aos='fade-right' className='BOXS'>
          <ImageThree />
        </div>
        <div data-aos='fade-right' className='BOXS'>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/' className='btn btn-light'>
              חזור
            </Link>
          )}

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                <Col md={12} sm={8}>
                  <div id='centerme'>
                    <Paginate
                      pages={pages}
                      page={page}
                      keyword={keyword ? keyword : ''}
                    />
                  </div>
                </Col>
              </Row>
            </>
          )}
        </div>
        <div data-aos='fade-up' id='centerSocialICONS'>
          <LinkedinSpinnerIcon />
          <FacebookIcon />
          <InstagramSpinnerIcon />
        </div>{' '}
      </div>
    </>
  )
}

export default HomeScreen

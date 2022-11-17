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
import Testimonials from '../components/BussinesWeWorkWith/Testimonials'
import {
  getBuissnesDetailsfornav,
  getBusissinesForHomePage,
} from '../actions/BuissnesActions/Buissnes_User_Actions'
import { myContext_2 } from '../actions/GoogleContext'
const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch() //הגדרת שיגור

  const productList = useSelector((state) => state.productList) //מושכים מהפרוקדט רדיוסר מההצהרה שלנו את הארור האפשרי את המוצרים ואת הטעינה
  const { loading, error, products, page, pages } = productList
  const userGoogleLogin = useSelector((state) => state.userGoogleLogin)
  const { userGoogleInfo, Gsuccess } = userGoogleLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { loading: userInfoloading, error: userInfoerror, userInfo } = userLogin
  const GetAllBusiness = useSelector((state) => state.GetAllBusiness)
  const { alllBusiness } = GetAllBusiness

  const [Linki, setLinki] = useState(0)

  //functions for scroll highet
  const fixScrollHighetForBarberSystem = () => {
    const BarberSystem = document.getElementById('RowAdds')
    window.scrollTo({
      top: BarberSystem.offsetTop,
      behavior: 'smooth',
    })
  }

  let day = '1'
  let month = '5'

  if (day.length === 1) {
    day = 0 + day
  }
  if (month.length === 1) {
    month = 0 + month
  }
  console.log(day)
  console.log(month)

  useEffect(() => {
    console.log(`bussinesGoogleID is :${bussinesGoogleID}`)
    console.log(`bussinesGoogleID is :${bussinesGoogleID}`)
    console.log(`bussinesGoogleID is :${bussinesGoogleID}`)
    console.log(`bussinesGoogleID is :${bussinesGoogleID}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    console.log(`Gsuccess is :${Gsuccess}`)
    //USE EFFECT  for Aos Effects
    Aos.init({ duration: 500 })
  }, [])
  //USE EFFECT redirect if userGoogleInfo with Bussines Id accsepted
  useEffect(() => {
    if (!alllBusiness) {
      dispatch(getBusissinesForHomePage())
    }
    if (userInfo && userInfo.WorkingIn != 0) {
      console.log(`user is ADMIN`)
      console.log(userInfo.workingIn)
      setLinki(userInfo.workingIn)
    } else if (userInfo && userInfo.ClientOfBusiness) {
      console.log(userInfo.ClientOfBusiness)
      setLinki(userInfo.ClientOfBusiness)
    }
  }, [userInfo])

  //USE EFFECT redirect if GoogleLogin Came From Bussines Page .
  const { bussinesGoogleID, setBussinesGoogleID } = useContext(myContext_2) //Context
  useEffect(() => {
    if (Gsuccess && bussinesGoogleID != undefined) {
      console.log(
        `redirect opretion is :${Gsuccess} if GoogleLogin Came From Bussines Page ${bussinesGoogleID}`
      )
      //let BID = bussinesGoogleID
      //setBussinesGoogleID(undefined)
      //history.push(`/business/${BID}`)
      //history.push(`/business/${bussinesGoogleID}`)
    }
  }, [Gsuccess])

  const MoveMeNow = () => {
    console.log(`Clicked`)
    dispatch(getBuissnesDetailsfornav(Linki))
    history.push(`/business/${Linki}`)
  }
  return (
    <>
      <Meta />
      {Linki != 0 ? (
        <button onClick={() => MoveMeNow()} className='call-to-us'>
          <div className='call-to-us__label'>
            <div className='callTousFIXED2'>
              <span id='callTousFIXED'> למספרה </span>
              <span id='callTousFIXED'> שלי </span>
            </div>
          </div>
        </button>
      ) : (
        <></>
      )}
      <OpenVirtualBarberShop />
      <EmailMeTheDeetsComponent />
      <FAQ />

      <div className='grids'>
        {' '}
        <div data-aos='flip-left' id='image4'>
          <ImageFour />
        </div>{' '}
        <div data-aos='zoom-in' id='ClientEffect'>
          <ExpendingCards />
        </div>{' '}
        {alllBusiness ? (
          <div data-aos='fade-up' id='centerSocialICONS'>
            <Testimonials
              Bussiness1={alllBusiness[0]}
              Bussiness2={alllBusiness[1]}
              history={history}
            />
          </div>
        ) : (
          <></>
        )}
        <div data-aos='flip-right' id='ClientEffect'>
          <ClientEffect />
        </div>{' '}
        <div className='YouWantToo'>
          <h1 className='YouWantTooi'>?רוצה גם</h1>
          <Tilt className='TilTImainADD'>
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
        </div>
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

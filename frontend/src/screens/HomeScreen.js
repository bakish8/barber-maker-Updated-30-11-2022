import React, { useEffect, useContext } from 'react'
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
import ClientEffect from '../components/ClientEffect/ClientEffect'
import { duration } from 'moment'
import Tilt from 'react-parallax-tilt'

//* RPODUCTS DISPLAY IF U WANT THEM   {products.map((product) => (
//** */ <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//* <Product product={product} />
/** * </Col>))}*/

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch() //הגדרת שיגור

  const productList = useSelector((state) => state.productList) //מושכים מהפרוקדט רדיוסר מההצהרה שלנו את הארור האפשרי את המוצרים ואת הטעינה
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    Aos.init({ duration: 700 })
  }, [])
  return (
    <>
      <Meta />
      <Link to='/picksapar' className='call-to-us'>
        <div className='call-to-us__label'>קבע תור </div>
      </Link>

      <div>
        <ImageOne />
      </div>
      <div className='grids'>
        {' '}
        <div data-aos='zoom-out' className='BOXS'>
          <ImageTWO />
        </div>
        <div data-aos='zoom-in' id='image4'>
          <ImageFour />
        </div>{' '}
        <div data-aos='flip-left' id='ClientEffect'>
          <ClientEffect />
        </div>{' '}
        <div data-aos='fade-right' className='BOXS'>
          <ImageThree />
        </div>
        <div data-aos='fade-left' className='BOXS'>
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/' className='btn btn-light'>
              חזור
            </Link>
          )}
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
                <div data-aos='fade-down' id='Add1_div'>
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

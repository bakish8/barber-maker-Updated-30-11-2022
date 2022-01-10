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
import Aos from 'aos'
import 'aos/dist/aos.css'
import { duration } from 'moment'
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
        <div data-aos='flip-left' className='BOXS'>
          <ImageThree />
        </div>
        <div data-aos='flip-right' className='BOXS'>
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

                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>

              <div id='centerSocialICONS'>
                <a
                  href='https://www.facebook.com/omri.bakish.9'
                  className='icon-button facebook'
                >
                  <i className='icon-facebook'>
                    <i id='FacebookF' className='fab fa-facebook-f'></i>
                  </i>
                  <span></span>
                </a>
              </div>
            </>
          )}{' '}
        </div>
      </div>
    </>
  )
}

export default HomeScreen

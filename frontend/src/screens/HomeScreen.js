import React, { useEffect } from 'react'
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
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import SearchBox from '../components/SearchBox'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch() //הגדרת שיגור

  const productList = useSelector((state) => state.productList) //מושכים מהפרוקדט רדיוסר מההצהרה שלנו את הארור האפשרי את המוצרים ואת הטעינה
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber)) //שיגור של המוצרים בדף הבית באמעות האקשן ליסט פרודקטס
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      <Link to='/picksapar' class='call-to-us'>
        <div class='call-to-us__label'>קבע תור </div>
      </Link>
      <LinkContainer to={`/picksapar`}>
        <div class='button_container'>
          <button class='maketorbtn'>
            <span>קבע תור</span>
          </button>
        </div>
      </LinkContainer>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          חזור
        </Link>
      )}

      <h1 id='ourproducts' className='whiteme'>
        המוצרים שלנו
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={12} sm={8}>
              <div id='centerme'>
                <Route
                  className='whiteme'
                  render={({ history }) => <SearchBox history={history} />}
                />
              </div>
              <hr />
            </Col>

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
              class='icon-button facebook'
            >
              <i class='icon-facebook'>
                <i id='FacebookF' class='fab fa-facebook-f'></i>
              </i>
              <span></span>
            </a>
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen

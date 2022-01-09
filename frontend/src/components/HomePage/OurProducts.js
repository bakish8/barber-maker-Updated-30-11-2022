import React, { useEffect } from 'react'
import ProductCarousel from '../ProductCarousel'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Paginate from '../Paginate'
import Product from '../Product'
import Loader from '../Loader'

import Message from '../Message'

import { listProducts } from '../../actions/productActions' //ייבוא של האקשן עצמו שמביא את אמוצרים.

import SearchBox from '../SearchBox'

const OurProducts = ({ match }) => {
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
      <h1 id='ourproducts' className='whiteme'>
        המוצרים שלנו
      </h1>
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

export default OurProducts

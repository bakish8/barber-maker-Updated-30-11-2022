import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails) //פרודקט רדיוסר משם לוקחים את פרטדקט דיטיילס
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id)) //שגר  את הפעולה שייעבאנו ושלח לה את האיידי הזה באואראל
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, product._id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <h3 className='whiteme15pxmarginTOP'>{product.name}</h3>

          <Row>
            <Col md={9}>
              <Image
                id='productimageonproductPage'
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={3}>
              <Card id='produDeetseonproductPage'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                      <Col>:מחיר</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {product.countInStock > 0 ? 'במלאי' : 'לא במלאי'}
                      </Col>
                      <Col>:זמינות</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col id='produDeetseonproductPage'>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                        <Col>:כמות</Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      הוסף לעגלת הקניות
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12} id='produDeetseonproductPage'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>מחיר: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  <h4 id='block'> :תיאור המוצר</h4>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={12}>
              <h2 className='whiteme'>ביקורות</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2 id='centerme'>כתוב ביקורת</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      הביקורת הוכנסה בהצלחה למערכת
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>דירוג</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>בחר</option>
                          <option value='1'>גרוע</option>
                          <option value='2'>פייר אך לא מספק</option>
                          <option value='3'>בסדר</option>
                          <option value='4'>טוב</option>
                          <option value='5'>מצויין</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>השאר תגובה</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        id='centerme'
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        שלח תגובה
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      אנא <Link to='/login'>התחבר</Link> כדי לרשום ביקורת במערכת{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen

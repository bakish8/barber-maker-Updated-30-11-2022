import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' id='card' className='whiteme'>
      <Link to={`/product/${product._id}`}>
        <Card.Img id='maxme' src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' id='productname'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={<span id='spanush'>מתוך {product.numReviews} ביקורות</span>}
          />
        </Card.Text>

        <Card.Text id='centerme' as='h3' id='whitemeeee'>
          {product.price}₪
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product

import swal from 'sweetalert'

import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { Link } from 'react-router-dom'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    swal({
      title: '?אתה בטוח',
      text: 'ברגע שתמחק את מוצר זה לא יהיה ניתן להשיבו למערכת',
      icon: 'warning',
      buttons: ['ביטול', 'מחק מוצר'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('מוצר זה נמחק בהצלחה מהמערכת', {
          icon: 'success',
        }).then(dispatch(deleteProduct(id)))
      } else {
        console.log('your product is safe')
      }
    })
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <Row className='align-items-center'>
        <Col>
          <h1 id='headlineme'>מוצרים</h1>
        </Col>
      </Row>
      <Col className='text-right'>
        <Button id='centermebtnwidh100' onClick={createProductHandler}>
          <i className='fas fa-plus'></i> הכנס מוצר חדש
        </Button>
      </Col>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table bordered responsive className='whiteme' id='tablewhite'>
            <thead>
              <tr id='tableheadlines'>
                <th>חברה</th>
                <th>מחיר</th>
                <th>קטגוריה</th>
                <th>מוצר</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <tr key={product._id} id='hoverandblue' className='TR_CLASS'>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button
                        id='sizemefortable'
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                </LinkContainer>
              ))}
            </tbody>
          </Table>
          <div id='centerme'>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        </>
      )}
    </>
  )
}

export default ProductListScreen

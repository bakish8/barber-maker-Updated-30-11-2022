import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <h1 id='headlineme'>הזמנות</h1>
      <Col className='text-right'>
        <Button id='centermebtnwidh100'>
          <i className='fas fa-plus'></i> צור הזמנה חדשה
        </Button>
      </Col>
      <Col className='text-right'>
        <Button id='centermebtnwidh100'>
          <i class='fas fa-search'></i>
          חפש הזמנה קיימת
        </Button>
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm'
          id='tablewhite'
        >
          <thead id='centertext'>
            <tr>
              <th className='OrderDeetsTD' id='tableheadlines'>
                פרטים
              </th>
              <th id='tableheadlines'>סטאטוס משלוח</th>

              <th id='tableheadlines'>סטאטוס תשלום</th>

              <th id='tableheadlines'>סה"כ</th>

              <th id='tableheadlines'>תאריך</th>

              <th id='tableheadlines'>משתמש</th>

              <th id='tableheadlines'>מספר הזמנה</th>
            </tr>
          </thead>
          <tbody id='centertext'>
            {orders.map((order) => (
              <LinkContainer to={`/order/${order._id}`}>
                <tr key={order._id} id='hoverandblue' className='TR_CLASS'>
                  <td
                    style={{ wordBreak: 'break-word' }}
                    className='OrderDeetsTD'
                  >
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button
                        id='OrderDeetsBtn'
                        variant='light'
                        className='btn-sm'
                      >
                        פרטים
                      </Button>
                    </LinkContainer>
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td id='PhoneTD'>{order.totalPrice}₪</td>

                  <td>{order.createdAt.substring(0, 10)}</td>

                  <td>{order.user && order.user.name}</td>

                  <td style={{ wordBreak: 'break-word' }}>{order._id}</td>
                </tr>
              </LinkContainer>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen

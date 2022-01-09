import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
  CREATE_CREDIT_CARD_PAYMENT_REQUEST,
  CREATE_CREDIT_CARD_PAYMENT_SUCCESS,
  CREATE_CREDIT_CARD_PAYMENT_FAIL,
} from '../constants/payMentConstants'
import { logout } from './userActions'

export const createCreditCardPayment =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_CREDIT_CARD_PAYMENT_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(`/api/orders`, order, config)

      dispatch({
        type: CREATE_CREDIT_CARD_PAYMENT_SUCCESS,
        payload: data,
      })
      dispatch({
        type: CART_CLEAR_ITEMS,
        payload: data,
      })
      localStorage.removeItem('cartItems')
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: CREATE_CREDIT_CARD_PAYMENT_FAIL,
        payload: message,
      })
    }
  }

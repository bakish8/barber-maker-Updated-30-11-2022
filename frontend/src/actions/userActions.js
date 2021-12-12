import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  MAKE_WORKINGDAY_REQUEST,
  MAKE_WORKINGDAY_SUCCESS,
  MAKE_WORKINGDAY_FAIL,
  WORKING_DAYS_REQUEST,
  WORKING_DAYS_SUCCESS,
  WORKING_DAYS_FAIL,
  WORKING_DAY_DELETE_REQUEST,
  WORKING_DAY_DELETE_SUCCESS,
  WORKING_DAY_DELETE_FAIL,
  WORKING_DAY_DETAILS_REQUEST,
  WORKING_DAY_DETAILS_SUCCESS,
  WORKING_DAY_DETAILS_FAIL,
  MAKE_CLOCK_REQUEST,
  MAKE_CLOCK_SUCCESS,
  MAKE_CLOCK_FAIL,
  MAKE_CLOCKS_REQUEST,
  MAKE_CLOCKS_SUCCESS,
  MAKE_CLOCKS_FAIL,
  CLOCK_DELETE_REQUEST,
  CLOCK_DELETE_SUCCESS,
  CLOCK_DELETE_FAIL,
  MAKE_WORKINGDAY_RESET,
  SAPAR_LIST_REQUEST,
  SAPAR_LIST_SUCCESS,
  SAPAR_LIST_FAIL,
  PICK_WORKINGDAY_REQUEST,
  PICK_WORKINGDAY_SUCCESS,
  PICK_WORKINGDAY_RESET,
  PICK_WORKINGDAY_FAIL,
  CONFIRM_TOR_REQUEST,
  CONFIRM_TOR_SUCCESS,
  CONFIRM_TOR_FAIL,
  AVILABLE_WORKINGDAY_TORS_REQUEST,
  AVILABLE_WORKINGDAY_TORS_SUCCESS,
  AVILABLE_WORKINGDAY_TORS_FAIL,
  CLOCK_LIST_REQUEST,
  CLOCK_LIST_SUCCESS,
  CLOCK_LIST_FAIL,
  TORIM_LIST_MY_REQUEST,
  TORIM_LIST_MY_SUCCESS,
  TORIM_LIST_MY_FAIL,
  TORIM_LIST_MY_RESET,
  MAKE_CLOCKS_SUCSSES_RESET,
  MAKE_CLOCK_SUCSSES_RESET,
  CANCEL_TOR_REQUEST,
  CANCEL_TOR_SUCCESS,
  CANCEL_TOR_FAIL,
  PAY_TOR_REQUEST,
  PAY_TOR_SUCCESS,
  PAY_TOR_FAIL,
  UNPAY_TOR_REQUEST,
  UNPAY_TOR_SUCCESS,
  UNPAY_TOR_FAIL,
  USER_REGISTERByADMIN_REQUEST,
  USER_REGISTERByADMIN_SUCCESS,
  USER_REGISTERByADMIN_FAIL,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: TORIM_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET }) //**להוסיף את כל הריסטים בעת התנתקות */
  document.location.href = '/login'
}

export const registerByADMIN =
  (name, email, phone, password, image) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTERByADMIN_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        '/api/users',
        { name, email, phone, password, image },
        config
      )
      dispatch({
        type: USER_REGISTERByADMIN_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_REGISTERByADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const register =
  (name, email, phone, password, image) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/users',
        { name, email, phone, password, image },
        config
      )

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })
    dispatch({ type: ORDER_LIST_MY_RESET })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
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

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const listSaparim = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SAPAR_LIST_REQUEST,
    })
    dispatch({ type: PICK_WORKINGDAY_RESET })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/maketor`, config)

    dispatch({
      type: SAPAR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SAPAR_LIST_FAIL,
      payload: message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_SUCCESS })

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

    dispatch({ type: USER_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const makeWorkingDay =
  (dateData, day, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MAKE_WORKINGDAY_REQUEST,
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

      const { data } = await axios.post(
        '/api/workingday',
        { dateData, day, id },
        config
      )

      dispatch({
        type: MAKE_WORKINGDAY_SUCCESS,
        payload: data,
      })

      localStorage.setItem('workingDayInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: MAKE_WORKINGDAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listWorkingDays = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKING_DAYS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/workingday`, config)

    dispatch({
      type: WORKING_DAYS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: WORKING_DAYS_FAIL,
      payload: message,
    })
  }
}

export const deleteWorkingday = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKING_DAY_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/workingday/${id}`, config)

    dispatch({
      type: WORKING_DAY_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: WORKING_DAY_DELETE_FAIL,
      payload: message,
    })
  }
}

export const workingDayDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: WORKING_DAY_DETAILS_REQUEST })
    dispatch({ type: MAKE_WORKINGDAY_RESET })
    dispatch({ type: MAKE_CLOCKS_SUCSSES_RESET })
    dispatch({ type: MAKE_CLOCK_SUCSSES_RESET })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/workingday/${id}/deetsworkdayinfo`,
      config
    )

    dispatch({
      type: WORKING_DAY_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: WORKING_DAY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createClock = (id, time, sapar) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MAKE_CLOCK_REQUEST,
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
    const { data } = await axios.post(
      `/api/workingday/${id}`,
      { time, id, sapar },
      config
    )
    dispatch({
      type: MAKE_CLOCK_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MAKE_CLOCK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createClocks =
  (id, time, time2, sapar) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MAKE_CLOCKS_REQUEST,
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
      const { data } = await axios.post(
        `/api/workingday/${id}`,
        { time, time2, id, sapar },
        config
      )
      dispatch({
        type: MAKE_CLOCKS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: MAKE_CLOCKS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteClock = (id, cid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLOCK_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/workingday/${id}/${cid}`, config)

    dispatch({
      type: CLOCK_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CLOCK_DELETE_FAIL,
      payload: message,
    })
  }
}

export default workingDayDetails

export const PICKWorkingDay =
  (dateData, day, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PICK_WORKINGDAY_REQUEST,
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

      const { data } = await axios.post(
        `/api/maketor/${id}`,
        { dateData, day, id },
        config
      )

      dispatch({
        type: PICK_WORKINGDAY_SUCCESS,
        payload: data,
      })

      localStorage.setItem('foundWorkdayInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: PICK_WORKINGDAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const confirmTor = (id, uid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONFIRM_TOR_REQUEST,
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
    const { data } = await axios.put(
      `/api/maketor/${id}/${uid}`,
      { id },
      config
    )
    dispatch({
      type: CONFIRM_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONFIRM_TOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const CancelMyTor = (id, uid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANCEL_TOR_REQUEST,
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
    const { data } = await axios.put(`/api/cancel/${id}/${uid}`, { id }, config)
    dispatch({
      type: CANCEL_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CANCEL_TOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const PayMyTor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAY_TOR_REQUEST,
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
    const { data } = await axios.put(`/api/maketor/${id}`, { id }, config)
    dispatch({
      type: PAY_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PAY_TOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const UNPayMyTor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNPAY_TOR_REQUEST,
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
    const { data } = await axios.put(`/api/maketor/unpay/${id}`, { id }, config)
    dispatch({
      type: UNPAY_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UNPAY_TOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const AvilableWorkingDayTors = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: AVILABLE_WORKINGDAY_TORS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/maketor/${id}`, config)

    dispatch({
      type: AVILABLE_WORKINGDAY_TORS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AVILABLE_WORKINGDAY_TORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const WorkingDayTors = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOCK_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/workingday/${id}/deets`, config)

    dispatch({
      type: CLOCK_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CLOCK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyTorim = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TORIM_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/maketor/mytorim`, config)

    dispatch({
      type: TORIM_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: TORIM_LIST_MY_FAIL,
      payload: message,
    })
  }
}

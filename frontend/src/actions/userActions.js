import axios from 'axios'

import {
  SUGEI_TIPULIM_LIST_REQUEST,
  SUGEI_TIPULIM_LIST_SUCCESS,
  SUGEI_TIPULIM_LIST_FAIL,
  MONTHLY_REPORTS_LIST_REQUEST,
  MONTHLY_REPORTS_LIST_SUCCESS,
  MONTHLY_REPORTS_LIST_FAIL,
  Weekly_REPORTS_LIST_REQUEST,
  Weekly_REPORTS_LIST_SUCCESS,
  Weekly_REPORTS_LIST_FAIL,
  DAILY_REPORTS_LIST_REQUEST,
  DAILY_REPORTS_LIST_SUCCESS,
  DAILY_REPORTS_LIST_FAIL,
  ADMIN_CREATE_REPORT_FOR_MONTH_REQUEST,
  ADMIN_CREATE_REPORT_FOR_MONTH_SUCCESS,
  ADMIN_CREATE_REPORT_FOR_MONTH_FAIL,
  ADMIN_CREATE_REPORT_REQUEST,
  ADMIN_CREATE_REPORT_SUCCESS,
  ADMIN_CREATE_REPORT_FAIL,
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
  WORKING_DAY_DELETE_RESET,
  CLOCK_DELETE_RESET,
  SEND_SMS_TOR_REQUEST,
  SEND_SMS_TOR_SUCCESS,
  SEND_SMS_TOR_FAIL,
  SEND_NotificationSMS_REQUEST,
  SEND_NotificationSMS_SUCCESS,
  SEND_NotificationSMS_FAIL,
  BookMEonGoogleCalender_REQUEST,
  BookMEonGoogleCalender_SUCCESS,
  BookMEonGoogleCalender_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  SEND_Cancel_SMS_TOR_REQUEST,
  SEND_Cancel_SMS_TOR_SUCCESS,
  SEND_Cancel_SMS_TOR_FAIL,
  ONE_WORKING_DAY_REQUEST,
  ONE_WORKING_DAY_SUCCESS,
  ONE_WORKING_DAY_FAIL,
  LIST_WORKING_DAYS_FOR_THIS_WEEK_REQUEST,
  LIST_WORKING_DAYS_FOR_THIS_WEEK_SUCCESS,
  LIST_WORKING_DAYS_FOR_THIS_WEEK_FAIL,
  CLOCK_LIST_FOR_TODAY_REQUEST,
  CLOCK_LIST_FOR_TODAY_SUCCESS,
  CLOCK_LIST_FOR_TODAY_FAIL,
  CLOCK_LIST_FOR_THIS_WEEK_REQUEST,
  CLOCK_LIST_FOR_THIS_WEEK_SUCCESS,
  CLOCK_LIST_FOR_THIS_WEEK_FAIL,
  CLOCK_LIST_FOR_THIS_MONTH_REQUEST,
  CLOCK_LIST_FOR_THIS_MONTH_SUCCESS,
  CLOCK_LIST_FOR_THIS_MONTH_FAIL,
  CLOCK_LIST_FOR_THIS_WORK_DAY_REQUEST,
  CLOCK_LIST_FOR_THIS_WORK_DAY_SUCCESS,
  CLOCK_LIST_FOR_THIS_WORK_DAY_FAIL,
  ADMIN_CREATE_REPORT_FOR_WEEK_REQUEST,
  ADMIN_CREATE_REPORT_FOR_WEEK_SUCCESS,
  ADMIN_CREATE_REPORT_FOR_WEEK_FAIL,
  GET_REPORT_DEETS_BY_ID_REQUEST,
  GET_REPORT_DEETS_BY_ID_SUCCESS,
  GET_REPORT_DEETS_BY_ID_FAIL,
  CREATE_NEW_TIPUL_REQUEST,
  CREATE_NEW_TIPUL_SUCCESS,
  CREATE_NEW_TIPUL_FAIL,
  GET_TIPUL_DEETS_REQUEST,
  GET_TIPUL_DEETS_SUCCESS,
  GET_TIPUL_DEETS_FAIL,
  ONE_USER_SEARCH_REQUEST,
  ONE_USER_SEARCH_SUCCESS,
  ONE_USER_SEARCH_FAIL,
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { useState } from 'react'

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

export const Googlelogin = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GOOGLE_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/googlelogin',
      { email },
      config
    )

    dispatch({
      type: USER_GOOGLE_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_GOOGLE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch, req, res) => {
  document.location.href = '/login'

  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: TORIM_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET }) //**להוסיף את כל הריסטים בעת התנתקות */
  await axios.post('/logout')
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
  (dateData, day, id, Dateday, Datemonth, Dateyear) =>
  async (dispatch, getState) => {
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
        { dateData, day, id, Dateday, Datemonth, Dateyear },
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
  dispatch({ type: WORKING_DAY_DELETE_RESET })

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

export const listWorkingDaysFORthisWEEK = () => async (dispatch, getState) => {
  dispatch({ type: WORKING_DAY_DELETE_RESET })

  try {
    dispatch({
      type: LIST_WORKING_DAYS_FOR_THIS_WEEK_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/workingday/thisweek`, config)

    dispatch({
      type: LIST_WORKING_DAYS_FOR_THIS_WEEK_SUCCESS,
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
      type: LIST_WORKING_DAYS_FOR_THIS_WEEK_FAIL,
      payload: message,
    })
  }
}

export const listOneWorkingDay = () => async (dispatch, getState) => {
  dispatch({ type: WORKING_DAY_DELETE_RESET })

  try {
    dispatch({
      type: ONE_WORKING_DAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/workingday/thisday`, config)

    dispatch({
      type: ONE_WORKING_DAY_SUCCESS,
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
      type: ONE_WORKING_DAY_FAIL,
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

export const confirmTor = (id, uid, Tipulid) => async (dispatch, getState) => {
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
      { Tipulid },
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

export const PayMyTor =
  (id, paymentMethod, creditLastDigits, ReciptNumber, tipulId) =>
  async (dispatch, getState) => {
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
      const { data } = await axios.put(
        `/api/maketor/${id}`,
        { id, paymentMethod, creditLastDigits, ReciptNumber, tipulId },
        config
      )
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
    dispatch({ type: CLOCK_DELETE_RESET })

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

export const ReciptForThisWorkingDay = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOCK_LIST_FOR_THIS_WORK_DAY_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/workingday/recipt/${id}`, config)

    dispatch({
      type: CLOCK_LIST_FOR_THIS_WORK_DAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CLOCK_LIST_FOR_THIS_WORK_DAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const getCLOCKSForTodayReciptAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: CLOCK_LIST_FOR_TODAY_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/workingday/reciptoneday`, config)

      dispatch({
        type: CLOCK_LIST_FOR_TODAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CLOCK_LIST_FOR_TODAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getCLOCKSForThisWeekReciptAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: CLOCK_LIST_FOR_THIS_WEEK_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(`/api/workingday/recipt_week`, config)

      dispatch({
        type: CLOCK_LIST_FOR_THIS_WEEK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CLOCK_LIST_FOR_THIS_WEEK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getCLOCKSForThisMonthReciptAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: CLOCK_LIST_FOR_THIS_MONTH_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/workingday/recipt_month`, config)

      dispatch({
        type: CLOCK_LIST_FOR_THIS_MONTH_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CLOCK_LIST_FOR_THIS_MONTH_FAIL,
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

export const SendTorSMS = (id, uid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_SMS_TOR_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    }

    const { data } = await axios.post(`/api/messages/${id}/${uid}`, config)
    dispatch({
      type: SEND_SMS_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEND_SMS_TOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const SendCancelTorSMS = (id, uid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_Cancel_SMS_TOR_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    }

    const { data } = await axios.put(`/api/messages/${id}/${uid}`, config)
    dispatch({
      type: SEND_Cancel_SMS_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEND_Cancel_SMS_TOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const SendNotificationSMS = (id, uid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEND_NotificationSMS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Access-Control-Allow-Origin': '*',
      },
    }

    const { data } = await axios.post(`/api/appointments/${id}/${uid}`, config)
    dispatch({
      type: SEND_NotificationSMS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEND_NotificationSMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const BookMEonGoogleCalenderAction =
  (id, uid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BookMEonGoogleCalender_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
          'Access-Control-Allow-Origin': '*',
        },
      }

      const { data } = await axios.post(
        `/api/appointments/bookmeongooglecalender/${id}/${uid}`,
        config
      )
      dispatch({
        type: BookMEonGoogleCalender_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: BookMEonGoogleCalender_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createReport =
  (
    id,
    type,
    date,
    afterdate,
    numAllTorim,
    numAvilableTorim,
    numNOTAvilableTorim,
    num_canceled_torim,
    moneyCount,
    dayClocks,
    createatDate,
    createdAtTime
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_CREATE_REPORT_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/reports',
        {
          id,
          type,
          date,
          afterdate,
          numAllTorim,
          numAvilableTorim,
          numNOTAvilableTorim,
          num_canceled_torim,
          moneyCount,
          dayClocks,
          createatDate,
          createdAtTime,
        },
        config
      )

      dispatch({
        type: ADMIN_CREATE_REPORT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_CREATE_REPORT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const createReportForWeek =
  (
    id,
    type,
    date,
    afterdate,
    numOfWorkDays,
    numAllTorim,
    numAvilableTorim,
    numNOTAvilableTorim,
    num_canceled_torim,
    moneyCount,
    weekClocks,
    createatDate,
    createdAtTime
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_CREATE_REPORT_FOR_WEEK_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/reports/weeks',
        {
          id,
          type,
          date,
          afterdate,
          numOfWorkDays,
          numAllTorim,
          numAvilableTorim,
          numNOTAvilableTorim,
          num_canceled_torim,
          moneyCount,
          weekClocks,
          createatDate,
          createdAtTime,
        },
        config
      )

      dispatch({
        type: ADMIN_CREATE_REPORT_FOR_WEEK_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_CREATE_REPORT_FOR_WEEK_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const createReportForMonth =
  (
    id,
    type,
    date,
    afterdate,
    numOfWorkDays,
    numAllTorim,
    numAvilableTorim,
    numNOTAvilableTorim,
    num_canceled_torim,
    moneyCount,
    MonthClocks,
    createatDate,
    createdAtTime
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_CREATE_REPORT_FOR_MONTH_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/reports/months',
        {
          id,
          type,
          date,
          afterdate,
          numOfWorkDays,
          numAllTorim,
          numAvilableTorim,
          numNOTAvilableTorim,
          num_canceled_torim,
          moneyCount,
          MonthClocks,
          createatDate,
          createdAtTime,
        },
        config
      )

      dispatch({
        type: ADMIN_CREATE_REPORT_FOR_MONTH_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_CREATE_REPORT_FOR_MONTH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listDailyReports = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DAILY_REPORTS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/reports/${id}`, config)

    dispatch({
      type: DAILY_REPORTS_LIST_SUCCESS,
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
      type: DAILY_REPORTS_LIST_FAIL,
      payload: message,
    })
  }
}
export const listWeeklyReports = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Weekly_REPORTS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/reports/weeks/${id}`, config)

    dispatch({
      type: Weekly_REPORTS_LIST_SUCCESS,
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
      type: Weekly_REPORTS_LIST_FAIL,
      payload: message,
    })
  }
}

export const listMonthlyReports = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MONTHLY_REPORTS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/reports/months/${id}`, config)

    dispatch({
      type: MONTHLY_REPORTS_LIST_SUCCESS,
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
      type: MONTHLY_REPORTS_LIST_FAIL,
      payload: message,
    })
  }
}

export const getReportDeetsById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_REPORT_DEETS_BY_ID_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/reports/single/${id}`, config)

    dispatch({
      type: GET_REPORT_DEETS_BY_ID_SUCCESS,
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
      type: GET_REPORT_DEETS_BY_ID_FAIL,
      payload: message,
    })
  }
}

export const registerNewTipul =
  (name, time, cost, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_NEW_TIPUL_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        '/api/users/tipulim',
        { name, time, cost, image },
        config
      )

      dispatch({
        type: CREATE_NEW_TIPUL_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_NEW_TIPUL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const SugeiTipulimAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUGEI_TIPULIM_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/maketor/picktipul/`, config)

    dispatch({
      type: SUGEI_TIPULIM_LIST_SUCCESS,
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
      type: SUGEI_TIPULIM_LIST_FAIL,
      payload: message,
    })
  }
}

export const SpecificTipulDeetsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TIPUL_DEETS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/maketor/picktipul/${id}`, config)

    dispatch({
      type: GET_TIPUL_DEETS_SUCCESS,
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
      type: GET_TIPUL_DEETS_FAIL,
      payload: message,
    })
  }
}

export const SearchOneUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ONE_USER_SEARCH_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/search/users/${id}`, config)

    dispatch({
      type: ONE_USER_SEARCH_SUCCESS,
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
      type: ONE_USER_SEARCH_FAIL,
      payload: message,
    })
  }
}

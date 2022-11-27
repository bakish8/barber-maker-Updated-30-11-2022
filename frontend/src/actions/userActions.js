import axios from 'axios'

import {
  SEND_WHATSAPP_TOR_REQUEST,
  SEND_WHATSAPP_TOR_SUCCESS,
  SEND_WHATSAPP_TOR_FAIL,
  SEND_RESET_SMS_TOR_REQUEST,
  SEND_RESET_SMS_TOR_SUCCESS,
  SEND_RESET_SMS_TOR_FAIL,
  RESET_PASSWORD_WITH_PHONE_PAGE_REQUEST,
  RESET_PASSWORD_WITH_PHONE_PAGE_SUCCESS,
  RESET_PASSWORD_WITH_PHONE_PAGE_FAIL,
  RESET_MY_PASSWORD_REQUEST,
  RESET_MY_PASSWORD_SUCCESS,
  RESET_MY_PASSWORD_FAIL,
  RESET_PASSWORD_PAGE_GET_REQUEST,
  RESET_PASSWORD_PAGE_GET_SUCCESS,
  RESET_PASSWORD_PAGE_GET_FAIL,
  RESET_PASSWORD_PAGE_REQUEST,
  RESET_PASSWORD_PAGE_SUCCESS,
  RESET_PASSWORD_PAGE_FAIL,
  ONE_USER_SEARCH_BY_EMAIL_REQUEST,
  ONE_USER_SEARCH_BY_EMAIL_SUCCESS,
  ONE_USER_SEARCH_BY_EMAIL_FAIL,
  USER_LOGIN_EMAIL_REQUEST,
  USER_LOGIN_EMAIL_SUCCESS,
  USER_LOGIN_EMAIL_FAIL,
  MAKE_ALL_BE_WATCH_REQUEST,
  MAKE_ALL_BE_WATCH_SUCCESS,
  MAKE_ALL_BE_WATCH_FAIL,
  CANCEL_NOTI_LIST_REQUEST,
  CANCEL_NOTI_LIST_SUCCESS,
  CANCEL_NOTI_LIST_FAIL,
  CREATE_CANCEL_NOTI_REQUEST,
  CREATE_CANCEL_NOTI_SUCCESS,
  CREATE_CANCEL_NOTI_FAIL,
  POTENTIAL_USERS_REQUEST,
  POTENTIAL_USERS_SUCCESS,
  POTENTIAL_USERS_FAIL,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_REQUEST,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_SUCCESS,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_FAIL,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_REQUEST,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_SUCCESS,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_FAIL,
  TOMORROW_WORKING_DAY_REQUEST,
  TOMORROW_WORKING_DAY_SUCCESS,
  TOMORROW_WORKING_DAY_FAIL,
  AVILABLE_WORKINGDAY_TORS_FOR_3_HOURS_TIPUL_LIST_REQUEST,
  AVILABLE_WORKINGDAY_TORS_FOR_3_HOURS_TIPUL_LIST_SUCCESS,
  AVILABLE_WORKINGDAY_TORS_FOR_3_HOUR_TIPUL_LIST_FAIL,
  AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_REQUEST,
  AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_SUCCESS,
  AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_FAIL,
  AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_REQUEST,
  AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_SUCCESS,
  AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_FAIL,
  AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_REQUEST,
  AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_SUCCESS,
  AAVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_FAIL,
  AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_REQUEST,
  AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_SUCCESS,
  AAVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_FAIL,
  CLOCK_DELETE_SELECTED_REQUEST,
  CLOCK_DELETE_SELECTED_SUCCESS,
  CLOCK_DELETE_SELECTED_FAIL,
  CLOCK_DELETE_AVILABLE_REQUEST,
  CLOCK_DELETE_AVILABLE_SUCCESS,
  CLOCK_DELETE_AVILABLE_FAIL,
  CLOCK_DELETE_ALL_REQUEST,
  CLOCK_DELETE_ALL_SUCCESS,
  CLOCK_DELETE_ALL_FAIL,
  CLOCK_DELETE_ALL_RESET,
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
  CONFIRM_TOR_RESET,
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
  USER_UPDATE_COMMENTS_FOR_TIPUL_REQUEST,
  USER_UPDATE_COMMENTS_FOR_TIPUL_SUCCESS,
  USER_DETAILS_COMMENTS_FOR_TIPUL_SUCCESS,
  USER_DETAILS_COMMENTS_FOR_TIPUL_RESET,
  USER_UPDATE_COMMENTS_FOR_TIPUL_FAIL,
  INITIAL_PASSWORD_REQUEST,
  INITIAL_PASSWORD_SUCCESS,
  INITIAL_PASSWORD_FAIL,
  TIPUL_DELETE_REQUEST,
  TIPUL_DELETE_SUCCESS,
  TIPUL_DELETE_FAIL,
  TIPUL_UPDATE_FAIL,
  TIPUL_UPDATE_SUCCESS,
  TIPUL_UPDATE_REQUEST,
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
export const emailLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_EMAIL_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users/emaillogin',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_EMAIL_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = (Bid) => async (dispatch, req, res) => {
  if (Bid) {
    document.location.href = `/business/${Bid}/login`
  } else {
    document.location.href = '/login'
  }
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_LIST_MY_RESET })
  dispatch({ type: TORIM_LIST_MY_RESET })
  dispatch({ type: USER_LIST_RESET }) //**להוסיף את כל הריסטים בעת התנתקות */
  await axios.get('/logout')
}

export const registerByADMIN =
  (name, email, phone, password, image, businessid) => async (dispatch) => {
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
        { name, email, phone, password, image, businessid },
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
  (name, email, phone, password, image, businessid) => async (dispatch) => {
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
        { name, email, phone, password, image, businessid },
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
export const updateCommentsForTipul = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_COMMENTS_FOR_TIPUL_REQUEST,
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
      `/api/users/updatecomments/${user._id}`,
      user,
      config
    )
    dispatch({ type: USER_UPDATE_COMMENTS_FOR_TIPUL_SUCCESS })
    dispatch({ type: USER_DETAILS_COMMENTS_FOR_TIPUL_SUCCESS, payload: data })
    dispatch({ type: USER_DETAILS_COMMENTS_FOR_TIPUL_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_COMMENTS_FOR_TIPUL_FAIL,
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
export const nextSevenDays = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/workingday/next7days`, config)
    dispatch({
      type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_SUCCESS,
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
      type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_FAIL,
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

export const getTomorrowWorkday = () => async (dispatch, getState) => {
  dispatch({ type: WORKING_DAY_DELETE_RESET })
  try {
    dispatch({
      type: TOMORROW_WORKING_DAY_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/workingday/tomorrow`, config)
    dispatch({
      type: TOMORROW_WORKING_DAY_SUCCESS,
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
      type: TOMORROW_WORKING_DAY_FAIL,
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
    dispatch({ type: CLOCK_DELETE_ALL_RESET })
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
export const deleteAllClocks = (id, cid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLOCK_DELETE_ALL_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/workingday/deleteallclocks/${id}/${cid}`, config)

    dispatch({
      type: CLOCK_DELETE_ALL_SUCCESS,
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
      type: CLOCK_DELETE_ALL_FAIL,
      payload: message,
    })
  }
}
export const deleteSelectedClocks = (id, cid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLOCK_DELETE_SELECTED_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(
      `/api/workingday/deleteselectedclocks/${id}/${cid}`,
      config
    )

    dispatch({
      type: CLOCK_DELETE_SELECTED_SUCCESS,
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
      type: CLOCK_DELETE_SELECTED_FAIL,
      payload: message,
    })
  }
}
export const deleteAvilableClocks = (id, cid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLOCK_DELETE_AVILABLE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cancel/${id}/${cid}`, config)

    dispatch({
      type: CLOCK_DELETE_AVILABLE_SUCCESS,
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
      type: CLOCK_DELETE_AVILABLE_FAIL,
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

export const confirmTor =
  (id, uid, Tipulid, BussinesID) => async (dispatch, getState) => {
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
        { Tipulid, BussinesID },
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
export const AvilableWorkingDayTorsForOneHourTipul =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/maketor/getavilableforonehour/${id}`,
        config
      )

      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AAVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const AvilableWorkingDayTorsForOneHourHALFTipul =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/maketor/getavilableforonehourandhalf/${id}`,
        config
      )

      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AAVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const AvilableWorkingDayTorsFor2horsTipul =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/maketor/getavilablefortwohours/${id}`,
        config
      )

      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const AvilableWorkingDayTorsFor2horsHALFTipul =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/maketor/getavilablefortwohoursandhalf/${id}`,
        config
      )

      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const AvilableWorkingDayTorsFor3hours =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_3_HOURS_TIPUL_LIST_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/maketor/getavilableforthreehours/${id}`,
        config
      )

      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_3_HOURS_TIPUL_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: AVILABLE_WORKINGDAY_TORS_FOR_3_HOUR_TIPUL_LIST_FAIL,
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

export const SendTorSMS =
  (id, uid, BusinessId) => async (dispatch, getState) => {
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
      const { data } = await axios.post(
        `/api/messages/${id}/${uid}`,
        { BusinessId },
        config
      )
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
export const SendTorWhatsapp =
  (id, uid, BusinessId) => async (dispatch, getState) => {
    //export const SendTorWhatsapp = (id, uid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEND_WHATSAPP_TOR_REQUEST,
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
        `/api/messages/whatsapp`,
        //{ id, uid },
        { id, uid, BusinessId },
        config
      )
      dispatch({
        type: SEND_WHATSAPP_TOR_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: SEND_WHATSAPP_TOR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const Send_RESET_PASS_SMS = (phone) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_RESET_SMS_TOR_REQUEST,
    })

    const { data } = await axios.post(`/api/messages/${phone}`)
    dispatch({
      type: SEND_RESET_SMS_TOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SEND_RESET_SMS_TOR_FAIL,
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

export const SendNotificationSMS =
  (id, uid, type, notificationsTime) => async (dispatch, getState) => {
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

      const { data } = await axios.post(
        `/api/appointments/${id}/${uid}`,
        { type, notificationsTime },
        config
      )
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
  //(name, time, cost, image,BussinesId) => async (dispatch, getState) => {
  (name, time, cost, image, BussinesId) => async (dispatch, getState) => {
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
        //'/api/users/tipulim',
        '/api/business/tipulim' /*********** */,
        { name, time, cost, image, BussinesId },
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

export const updateTipul =
  (TipulID, TipulName, TipulCost, TipulImage, TipulTime) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TIPUL_UPDATE_REQUEST,
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
        `/api/maketor/picktipul/${TipulID}`,
        {
          TipulID,
          TipulName,
          TipulCost,
          TipulImage,
          TipulTime,
        },
        config
      )

      dispatch({
        type: TIPUL_UPDATE_SUCCESS,
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
        type: TIPUL_UPDATE_FAIL,
        payload: message,
      })
    }
  }

export const deleteTipul = (id, bid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TIPUL_DELETE_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/maketor/picktipul/${id}/${bid}`, config)

    dispatch({
      type: TIPUL_DELETE_SUCCESS,
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
      type: TIPUL_DELETE_FAIL,
      payload: message,
    })
  }
}

export const SearchOneUserAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ONE_USER_SEARCH_REQUEST,
    })

    const { data } = await axios.get(`/api/search/users/${id}`)

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
export const SearchOneUserBYEMAIL = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ONE_USER_SEARCH_BY_EMAIL_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/search/email/${email}`, config)

    dispatch({
      type: ONE_USER_SEARCH_BY_EMAIL_SUCCESS,
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
      type: ONE_USER_SEARCH_BY_EMAIL_FAIL,
      payload: message,
    })
  }
}
export const Create15PortForResetPASSWORD = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_PAGE_REQUEST,
    })

    const { data } = await axios.post('/api/forgot-password', { email })
    dispatch({
      type: RESET_PASSWORD_PAGE_SUCCESS,
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
      type: RESET_PASSWORD_PAGE_FAIL,
      payload: message,
    })
  }
}

export const Create15PortForResetPASSWORD_withPhone =
  (phone) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_WITH_PHONE_PAGE_REQUEST,
      })

      const { data } = await axios.put('/api/forgot-password', { phone })
      dispatch({
        type: RESET_PASSWORD_WITH_PHONE_PAGE_SUCCESS,
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
        type: RESET_PASSWORD_WITH_PHONE_PAGE_FAIL,
        payload: message,
      })
    }
  }

export const Next7Daysss = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/workingday/next7days`, config)
    dispatch({
      type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_SUCCESS,
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
      type: LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_FAIL,
      payload: message,
    })
  }
}

export const FindClockByWorkID_and_time =
  (id, time) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/search/clocks/${id}/${time}`,
        config
      )

      dispatch({
        type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_SUCCESS,
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
        type: FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_FAIL,
        payload: message,
      })
    }
  }

export const List_of_Potential_Users_By_FirstNameActionSearch =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: POTENTIAL_USERS_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/search/userslistbyfirst/${id}`,
        config
      )

      dispatch({
        type: POTENTIAL_USERS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: POTENTIAL_USERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const RESET_PASSWORD_PAGE_ACTION =
  (id, token) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESET_PASSWORD_PAGE_GET_REQUEST,
      })

      const { data } = await axios.get(`/api/forgot-password/${id}/${token}`)

      dispatch({
        type: RESET_PASSWORD_PAGE_GET_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_PAGE_GET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const RESET_MY_PASSWORD_ACTION =
  (id, token, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RESET_MY_PASSWORD_REQUEST,
      })

      const { data } = await axios.put(`/api/forgot-password/${id}/${token}`, {
        password,
      })

      dispatch({
        type: RESET_MY_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: RESET_MY_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const INITIAL_PASSWORD_ACTION =
  (id, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INITIAL_PASSWORD_REQUEST,
      })

      const { data } = await axios.put(`/api/forgot-password/${id}`, {
        password,
      })

      dispatch({
        type: INITIAL_PASSWORD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: INITIAL_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const CreatelNotifications =
  (id, date, time, dayInWeek, adminid, userid, sapar_id, type, now) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CREATE_CANCEL_NOTI_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `/api/notifications/${sapar_id}`,
        { id, date, time, dayInWeek, adminid, userid, type, now },
        config
      )
      dispatch({
        type: CREATE_CANCEL_NOTI_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: CREATE_CANCEL_NOTI_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const GetNotifications = (admin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CANCEL_NOTI_LIST_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/notifications/${admin}`, config)

    dispatch({
      type: CANCEL_NOTI_LIST_SUCCESS,
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
      type: CANCEL_NOTI_LIST_FAIL,
      payload: message,
    })
  }
}

export const Watch_All_Notifications =
  (admin) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MAKE_ALL_BE_WATCH_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.put(`/api/notifications/${admin}`, config)

      dispatch({
        type: MAKE_ALL_BE_WATCH_SUCCESS,
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
        type: MAKE_ALL_BE_WATCH_FAIL,
        payload: message,
      })
    }
  }

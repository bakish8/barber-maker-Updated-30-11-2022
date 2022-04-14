import axios from 'axios'

import {
  BUSINESS_DETAILS_REQUEST,
  BUSINESS_DETAILS_SUCCESS,
  BUSINESS_DETAILS_FAIL,
  BUSINESS_DETAILS_FORNAV_REQUEST,
  BUSINESS_DETAILS_FORNAV_SUCCESS,
  BUSINESS_DETAILS_FORNAV_FAIL,
  WORKERS_LIST_REQUEST,
  WORKERS_LIST_SUCCESS,
  WORKERS_LIST_FAIL,
  TREATMENTS_LIST_REQUEST,
  TREATMENTS_LIST_SUCCESS,
  TREATMENTS_LIST_FAIL,
  BUSINESS_USER_REGISTER_REQUEST,
  BUSINESS_USER_REGISTER_SUCCESS,
  BUSINESS_USER_REGISTER_FAIL,
  BUSINESS_USER_LOGIN_REQUEST,
  BUSINESS_USER_LOGIN_SUCCESS,
  BUSINESS_USER_LOGIN_FAIL,
  BUSINESS_USER_LIST_REQUEST,
  BUSINESS_USER_LIST_SUCCESS,
  BUSINESS_USER_LIST_FAIL,
  ADMIN_SIDE_REGISTER_REQUEST,
  ADMIN_SIDE_REGISTER_SUCCESS,
  ADMIN_SIDE_REGISTER_FAIL,
  BUSINESS_SETTINGS_REQUEST,
  BUSINESS_SETTINGS_SUCCESS,
  BUSINESS_SETTINGS_FAIL,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_FAIL,
  BUSINESS_DETAILS_FOR_DESIGN_REQUEST,
  BUSINESS_DETAILS_FOR_DESIGN_SUCCESS,
  BUSINESS_DETAILS_FOR_DESIGN_FAIL,
  UPDATE_DESIGN_SETTINGS_REQUEST,
  UPDATE_DESIGN_SETTINGS_SUCCESS,
  UPDATE_DESIGN_SETTINGS_FAIL,
  GET_LOCATION_GEO_REQUEST,
  GET_LOCATION_GEO_SUCCESS,
  GET_LOCATION_GEO_FAIL,
} from '../../constants/Business/Business_user_Consts'
import { logout } from '../userActions'

export const getBuissnesDetails = (id) => async (dispatch, getState) => {
  console.log(`getting ${id} buissness details... `)
  try {
    dispatch({
      type: BUSINESS_DETAILS_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/business/${id}`, config)

    dispatch({
      type: BUSINESS_DETAILS_SUCCESS,
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
      type: BUSINESS_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getBuissnesDetailsfornav = (id) => async (dispatch) => {
  console.log(`getBuissnesDetailsfornav`)
  try {
    dispatch({
      type: BUSINESS_DETAILS_FORNAV_REQUEST,
    })
    // const {
    //   userLogin: { userInfo },
    // } = getState()

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // }

    const { data } = await axios.get(`/api/business/${id}/fornav`)

    dispatch({
      type: BUSINESS_DETAILS_FORNAV_SUCCESS,
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
      type: BUSINESS_DETAILS_FORNAV_FAIL,
      payload: message,
    })
  }
}
export const getBuissnesDetailsforDesign = (id) => async (dispatch) => {
  console.log(`getBuissnesDetailsforDesign`)
  try {
    dispatch({
      type: BUSINESS_DETAILS_FOR_DESIGN_REQUEST,
    })
    // const {
    //   userLogin: { userInfo },
    // } = getState()

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // } //Fix

    const { data } = await axios.get(`/api/business/${id}/design`)

    dispatch({
      type: BUSINESS_DETAILS_FOR_DESIGN_SUCCESS,
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
      type: BUSINESS_DETAILS_FOR_DESIGN_FAIL,
      payload: message,
    })
  }
}

export const getBuissnesSettings = (id) => async (dispatch) => {
  console.log(`getBuissnesDetailsfornav`)
  try {
    dispatch({
      type: BUSINESS_SETTINGS_REQUEST,
    })

    const { data } = await axios.get(`/api/business/${id}/settings`)

    dispatch({
      type: BUSINESS_SETTINGS_SUCCESS,
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
      type: BUSINESS_SETTINGS_FAIL,
      payload: message,
    })
  }
}
export const updateSettings =
  (
    sendSMSClientSide_CheckBox_state,
    sendWhatsappClientSide_CheckBox_state,
    sendSMSAdminSide_CheckBox_state,
    sendWhatsappAdminSide_CheckBox_state,
    sendSMSClientSideCancel_CheckBox_state,
    sendWhatsappClientSideCancel_CheckBox_state,
    sendSMSAdminSideCancel_CheckBox_state,
    sendWhatsappAdminSideCancel_CheckBox_state,
    sendSMSClientSideReminder_CheckBox_state,
    sendWhatsappClientSideReminder_CheckBox_state,
    sendSMSAdminSideReminder_CheckBox_state,
    sendWhatsappAdminSideReminder_CheckBox_state,
    BookUSERSongooglCalender,
    BusinessNotificationsTime,
    BussinesID
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SETTINGS_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `/api/business/${BussinesID}/settings`,
        {
          sendSMSClientSide_CheckBox_state,
          sendWhatsappClientSide_CheckBox_state,
          sendSMSAdminSide_CheckBox_state,
          sendWhatsappAdminSide_CheckBox_state,
          sendSMSClientSideCancel_CheckBox_state,
          sendWhatsappClientSideCancel_CheckBox_state,
          sendSMSAdminSideCancel_CheckBox_state,
          sendWhatsappAdminSideCancel_CheckBox_state,
          sendSMSClientSideReminder_CheckBox_state,
          sendWhatsappClientSideReminder_CheckBox_state,
          sendSMSAdminSideReminder_CheckBox_state,
          sendWhatsappAdminSideReminder_CheckBox_state,
          BookUSERSongooglCalender,
          BusinessNotificationsTime,
          BussinesID,
        },
        config
      )
      dispatch({
        type: UPDATE_SETTINGS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_SETTINGS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateDesignSettings =
  (
    id,
    name,
    location,
    lat,
    lng,
    businessNameOnNavState,
    colors,
    logo,
    MainPic
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DESIGN_SETTINGS_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `/api/business/${id}/design`,

        {
          name,
          location,
          lat,
          lng,
          businessNameOnNavState,
          colors,
          logo,
          MainPic,
        },
        config
      )
      dispatch({
        type: UPDATE_DESIGN_SETTINGS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: UPDATE_DESIGN_SETTINGS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
export const FindGeoLocationByName = (name) => async (dispatch) => {
  console.log(name)
  try {
    dispatch({
      type: GET_LOCATION_GEO_REQUEST,
    })

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: name,
          key: 'AIzaSyBynh_gUEZiSiiqejzH8BkbxtUUx5dR4Jw', //**Fix env */
        },
      }
    )
    dispatch({
      type: GET_LOCATION_GEO_SUCCESS,
      payload: data,
    }).then(console.log(data))
  } catch (error) {
    dispatch({
      type: GET_LOCATION_GEO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/*****get a list of workers for a spesific buissness */

export const listOfWorkers = (id) => async (dispatch, getState) => {
  console.log(`listOfWorkers Action Dispached`)
  try {
    dispatch({
      type: WORKERS_LIST_REQUEST,
    })
    /*** * dispatch({ type: PICK_WORKINGDAY_RESET }) /*********** */ /****NEED TO FIX */

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(
      `/api/business/${id}/workers`,
      config
    ) /******* */ /****NEED TO FIX */

    dispatch({
      type: WORKERS_LIST_SUCCESS,
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
      type: WORKERS_LIST_FAIL,
      payload: message,
    })
  }
}

export const TREATMENTSListAction = (id) => async (dispatch, getState) => {
  console.log(`TREATMENTS List Action`)
  console.log(`TREATMENTS List Action`)
  console.log(`TREATMENTS List Action`)
  try {
    dispatch({
      type: TREATMENTS_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/business/${id}/getreatments`, config)

    dispatch({
      type: TREATMENTS_LIST_SUCCESS,
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
      type: TREATMENTS_LIST_FAIL,
      payload: message,
    })
  }
}

export const register_client =
  (name, email, phone, password, image, businessid) => async (dispatch) => {
    try {
      dispatch({
        type: BUSINESS_USER_REGISTER_REQUEST,
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
        type: BUSINESS_USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: BUSINESS_USER_LOGIN_SUCCESS,
        payload: data,
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: BUSINESS_USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const BussineslistUsers = (businessid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BUSINESS_USER_LIST_REQUEST,
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
      `/api/business/${businessid}/users`,
      config
    )

    dispatch({
      type: BUSINESS_USER_LIST_SUCCESS,
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
      type: BUSINESS_USER_LIST_FAIL,
      payload: message,
    })
  }
}

export const AdminSideRegisterAction =
  (name, email, phone, password, businessid) => async (dispatch) => {
    try {
      dispatch({
        type: ADMIN_SIDE_REGISTER_REQUEST,
      })
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        //  '/api/users',
        `/api/business/${businessid}/users`,
        { name, email, phone, password, businessid },
        config
      )
      dispatch({
        type: ADMIN_SIDE_REGISTER_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ADMIN_SIDE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

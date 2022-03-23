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

export const getBuissnesDetailsfornav = (id) => async (dispatch, getState) => {
  console.log(`getBuissnesDetailsfornav`)
  try {
    dispatch({
      type: BUSINESS_DETAILS_FORNAV_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/business/${id}/fornav`, config)

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

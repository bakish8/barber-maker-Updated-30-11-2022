import {
  BUSINESS_DETAILS_FAIL,
  BUSINESS_DETAILS_REQUEST,
  BUSINESS_DETAILS_SUCCESS,
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
} from '../../constants/Business/Business_user_Consts'
import { USER_LOGOUT } from '../../constants/userConstants'

export const GetBusinessDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BUSINESS_DETAILS_REQUEST:
      return { loading: true }
    case BUSINESS_DETAILS_SUCCESS:
      return {
        loading: false,
        business: action.payload,
        success: true,
      }
    case BUSINESS_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const GetBusinessDetailsReducerfornav = (state = {}, action) => {
  switch (action.type) {
    case BUSINESS_DETAILS_FORNAV_REQUEST:
      return { loading: true }
    case BUSINESS_DETAILS_FORNAV_SUCCESS:
      return {
        loading: false,
        business: action.payload,
        success: true,
      }
    case BUSINESS_DETAILS_FORNAV_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const BusinessWorkersListReducer = (state = { workers: [] }, action) => {
  switch (action.type) {
    case WORKERS_LIST_REQUEST:
      return { workersloading: true }
    case WORKERS_LIST_SUCCESS:
      return { workersloading: false, workers: action.payload }
    case WORKERS_LIST_FAIL:
      return { workersloading: false, workerserror: action.payload }
    default:
      return state
  }
}

export const BusinessTreatmentsListReducer = (
  state = { tipulim: [] },
  action
) => {
  switch (action.type) {
    case TREATMENTS_LIST_REQUEST:
      return { tipulimloading: true }
    case TREATMENTS_LIST_SUCCESS:
      return { tipulimloading: false, tipulim: action.payload }
    case TREATMENTS_LIST_FAIL:
      return { tipulimloading: false, tipulimerror: action.payload }
    default:
      return state
  }
}

export const ClientRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case BUSINESS_USER_REGISTER_REQUEST:
      return { loading: true }
    case BUSINESS_USER_REGISTER_SUCCESS:
      return { success: true, loading: false, userInfo: action.payload }
    case BUSINESS_USER_REGISTER_FAIL:
      return { success: false, loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

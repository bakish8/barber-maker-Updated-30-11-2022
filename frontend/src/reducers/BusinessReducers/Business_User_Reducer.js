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
  BUSINESS_USER_LIST_REQUEST,
  BUSINESS_USER_LIST_SUCCESS,
  BUSINESS_USER_LIST_FAIL,
  BUSINESS_USER_LIST_RESET,
  ADMIN_SIDE_REGISTER_REQUEST,
  ADMIN_SIDE_REGISTER_SUCCESS,
  ADMIN_SIDE_REGISTER_FAIL,
  ADMIN_SIDE_REGISTER_RESET,
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
import { USER_LOGOUT } from '../../constants/userConstants'

export const GetBusinessGeoReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LOCATION_GEO_REQUEST:
      return { loading: true }
    case GET_LOCATION_GEO_SUCCESS:
      return {
        loadingGeo: false,
        businessGeo: action.payload,
        successGeo: true,
      }
    case GET_LOCATION_GEO_FAIL:
      return { loadingGeo: false, errorGeo: action.payload }
    default:
      return state
  }
}

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

export const GetBusinessSETTINGSReducer = (state = {}, action) => {
  switch (action.type) {
    case BUSINESS_SETTINGS_REQUEST:
      return { loading: true }
    case BUSINESS_SETTINGS_SUCCESS:
      return {
        loading: false,
        business: action.payload,
        success: true,
      }
    case BUSINESS_SETTINGS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const UpdateBusinessSETTINGSReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS_REQUEST:
      return { loading_update: true }
    case UPDATE_SETTINGS_SUCCESS:
      return {
        loading_update: false,
        settings: action.payload,
        success_settings: true,
      }
    case UPDATE_SETTINGS_FAIL:
      return { loading_update: false, error: action.payload }
    default:
      return state
  }
}

export const UpdateBusinessDesignSettingsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DESIGN_SETTINGS_REQUEST:
      return { loading_update_design_settings: true }
    case UPDATE_DESIGN_SETTINGS_SUCCESS:
      return {
        loading_update_design_settings: false,
        design_settings: action.payload,
        success_design_settings: true,
      }
    case UPDATE_DESIGN_SETTINGS_FAIL:
      return {
        loading_update_design_settings: false,
        error_design_settings: action.payload,
      }
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

export const GetBusinessDetailsReducerfordesign = (state = {}, action) => {
  switch (action.type) {
    case BUSINESS_DETAILS_FOR_DESIGN_REQUEST:
      return { loading: true }
    case BUSINESS_DETAILS_FOR_DESIGN_SUCCESS:
      return {
        loading: false,
        business: action.payload,
        success: true,
      }
    case BUSINESS_DETAILS_FOR_DESIGN_FAIL:
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

export const BussinesuserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case BUSINESS_USER_LIST_REQUEST:
      return { loading: true }
    case BUSINESS_USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case BUSINESS_USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case BUSINESS_USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const AdminSideRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_SIDE_REGISTER_REQUEST:
      return { loading: true }
    case ADMIN_SIDE_REGISTER_SUCCESS:
      return { success: true, loading: false, userInfo: action.payload }
    case ADMIN_SIDE_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    case ADMIN_SIDE_REGISTER_RESET:
      return { success: false }
    default:
      return state
  }
}

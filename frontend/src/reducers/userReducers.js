import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
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
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
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
  CLOCK_LIST_REQUEST,
  CLOCK_LIST_SUCCESS,
  CLOCK_LIST_FAIL,
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
  TORIM_LIST_MY_REQUEST,
  TORIM_LIST_MY_SUCCESS,
  TORIM_LIST_MY_FAIL,
  TORIM_LIST_MY_RESET,
  MAKE_CLOCK_SUCSSES_RESET,
  MAKE_CLOCKS_SUCSSES_RESET,
  CANCEL_TOR_REQUEST,
  CANCEL_TOR_SUCCESS,
  CANCEL_TOR_FAIL,
  CANCEL_TOR_RESET,
  PAY_TOR_REQUEST,
  PAY_TOR_SUCCESS,
  PAY_TOR_FAIL,
  PAY_TOR_RESET,
  UNPAY_TOR_REQUEST,
  UNPAY_TOR_SUCCESS,
  UNPAY_TOR_FAIL,
  UNPAY_TOR_RESET,
  USER_REGISTERByADMIN_REQUEST,
  USER_REGISTERByADMIN_SUCCESS,
  USER_REGISTERByADMIN_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { success: true, loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterBY_ADMINReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTERByADMIN_REQUEST:
      return { loading: true }
    case USER_REGISTERByADMIN_SUCCESS:
      return { success: true, loading: false, userInfo: action.payload }
    case USER_REGISTERByADMIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loadingNewTor: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loadingNewTor: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loadingNewTor: false, errorNewTor: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}
export const confirmTorReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_TOR_REQUEST:
      return { loadingConfirm: true }
    case CONFIRM_TOR_SUCCESS:
      return { loadingConfirm: false, success: true, confirm: action.payload }
    case CONFIRM_TOR_FAIL:
      return { loadingConfirm: false, errorConfirm: action.payload }
    case CONFIRM_TOR_RESET:
      return { confirm: {}, success: false }
    default:
      return state
  }
}
export const cancelTorReducer = (state = {}, action) => {
  switch (action.type) {
    case CANCEL_TOR_REQUEST:
      return { loadingConfirm: true }
    case CANCEL_TOR_SUCCESS:
      return { loadingConfirm: false, success: true, cancel: action.payload }
    case CANCEL_TOR_FAIL:
      return { loadingConfirm: false, errorConfirm: action.payload }
    case CONFIRM_TOR_RESET:
      return { cancel: {}, success: false }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const saparListReducer = (state = { sapars: [] }, action) => {
  switch (action.type) {
    case SAPAR_LIST_REQUEST:
      return { saparsloading: true }
    case SAPAR_LIST_SUCCESS:
      return { saparsloading: false, sapars: action.payload }
    case SAPAR_LIST_FAIL:
      return { saparsloading: false, saparserror: action.payload }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const PayTorReducer = (state = { clock: {} }, action) => {
  switch (action.type) {
    case PAY_TOR_REQUEST:
      return { loading: true }
    case PAY_TOR_SUCCESS:
      return { loading: false, success: true }
    case PAY_TOR_FAIL:
      return { loading: false, error: action.payload }
    case PAY_TOR_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const UNPayTorReducer = (state = { clock: {} }, action) => {
  switch (action.type) {
    case UNPAY_TOR_REQUEST:
      return { loading: true }
    case UNPAY_TOR_SUCCESS:
      return { loading: false, success: true }
    case UNPAY_TOR_FAIL:
      return { loading: false, error: action.payload }
    case UNPAY_TOR_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const userMakeWorkingDayReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_WORKINGDAY_REQUEST:
      return { NewWorkDayloading: true }
    case MAKE_WORKINGDAY_SUCCESS:
      return {
        NewWorkDayloading: false,
        success: true,
        workingDayInfo: action.payload,
      }
    case MAKE_WORKINGDAY_RESET:
      return { workingDayInfo: {}, success: false }

    case MAKE_WORKINGDAY_FAIL:
      return { NewWorkDayloading: false, NewWorkDayerror: action.payload }
    default:
      return state
  }
}

export const PickWorkingDateReducer = (state = {}, action) => {
  switch (action.type) {
    case PICK_WORKINGDAY_REQUEST:
      return { foundWorkdayloading: true, success: false }
    case PICK_WORKINGDAY_SUCCESS:
      return {
        foundWorkdayloading: false,
        success: true,
        foundWorkdayInfo: action.payload,
      }
    case PICK_WORKINGDAY_RESET:
      return { foundWorkdayInfo: {}, success: false }

    case PICK_WORKINGDAY_FAIL:
      return { foundWorkdayloading: false, foundWorkdayerror: action.payload }
    default:
      return state
  }
}

export const workingDayListReducer = (state = { workingdays: [] }, action) => {
  switch (action.type) {
    case WORKING_DAYS_REQUEST:
      return { loading: true }
    case WORKING_DAYS_SUCCESS:
      return { loading: false, workingdays: action.payload }
    case WORKING_DAYS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const DeleteworkingDayListReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKING_DAY_DELETE_REQUEST:
      return { loading: true }
    case WORKING_DAY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case WORKING_DAY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const workingDaySingleReducer = (
  state = { workingDay: { torim: [] } },
  action
) => {
  switch (action.type) {
    case WORKING_DAY_DETAILS_REQUEST:
      return { loadingSingle: true }
    case WORKING_DAY_DETAILS_SUCCESS:
      return { loadingSingle: false, workingDay: action.payload }
    case WORKING_DAY_DETAILS_FAIL:
      return { loadingSingle: false, errorSingle: action.payload }
    default:
      return state
  }
}

export const avilableTorsReducer = (state = { clockList: [] }, action) => {
  switch (action.type) {
    case AVILABLE_WORKINGDAY_TORS_REQUEST:
      return { loading: true }
    case AVILABLE_WORKINGDAY_TORS_SUCCESS:
      return { loading: false, clockList: action.payload }
    case AVILABLE_WORKINGDAY_TORS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const MakeClockReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_CLOCK_REQUEST:
      return { NewClockloading: true }
    case MAKE_CLOCK_SUCCESS:
      return { NewClockloading: false, success: true, clock: action.payload }
    case MAKE_CLOCK_FAIL:
      return { NewClockloading: false, NewClockerror: action.payload }
    case MAKE_CLOCK_SUCSSES_RESET:
      return { success: false }
    default:
      return state
  }
}

export const MakeClocksReducer = (state = {}, action) => {
  switch (action.type) {
    case MAKE_CLOCKS_REQUEST:
      return { NewClocksloading: true }
    case MAKE_CLOCKS_SUCCESS:
      return {
        NewClocksloading: false,
        success: true,
        clock: action.payload,
      }
    case MAKE_CLOCKS_FAIL:
      return { NewClocksloading: false, NewClockserror: action.payload }
    case MAKE_CLOCKS_SUCSSES_RESET:
      return { success: false }
    default:
      return state
  }
}

export const TorsReducer = (state = { clockList: [] }, action) => {
  switch (action.type) {
    case CLOCK_LIST_REQUEST:
      return { loading: true }
    case CLOCK_LIST_SUCCESS:
      return { loading: false, clockList: action.payload }
    case CLOCK_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const DeleteClockReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_DELETE_REQUEST:
      return { loading: true }
    case CLOCK_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CLOCK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

/***מה שמסדר את התורים של משתמש ספציפי */

export const MyTorimListMyReducer = (state = { clocks: [] }, action) => {
  switch (action.type) {
    case TORIM_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case TORIM_LIST_MY_SUCCESS:
      return {
        loading: false,
        clocks: action.payload,
      }
    case TORIM_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TORIM_LIST_MY_RESET:
      return { clocks: [] }
    default:
      return state
  }
}

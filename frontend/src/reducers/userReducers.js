import {
  POTENTIAL_USERS_REQUEST,
  POTENTIAL_USERS_SUCCESS,
  POTENTIAL_USERS_FAIL,
  POTENTIAL_USERS_RESET,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_REQUEST,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_SUCCESS,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_FAIL,
  LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_RESET,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_REQUEST,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_SUCCESS,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_FAIL,
  FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET,
  TOMORROW_WORKING_DAY_REQUEST,
  TOMORROW_WORKING_DAY_SUCCESS,
  TOMORROW_WORKING_DAY_FAIL,
  TOMORROW_WORKING_DAY_RESET,
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
  ADMIN_CREATE_REPORT_FOR_WEEK_REQUEST,
  ADMIN_CREATE_REPORT_FOR_WEEK_SUCCESS,
  ADMIN_CREATE_REPORT_FOR_WEEK_FAIL,
  ADMIN_CREATE_REPORT_REQUEST,
  ADMIN_CREATE_REPORT_SUCCESS,
  ADMIN_CREATE_REPORT_FAIL,
  ADD_MONEY_FOR_THIS_DAY_REQUEST,
  ADD_MONEY_FOR_THIS_DAY_SUCCESS,
  ADD_MONEY_FOR_THIS_DAY_FAIL,
  OPEN_CUPA_REQUEST,
  OPEN_CUPA_SUCCESS,
  OPEN_CUPA_FAIL,
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
  USER_REGISTERByADMIN_RESET,
  WORKING_DAY_DELETE_RESET,
  CLOCK_DELETE_RESET,
  SEND_SMS_TOR_REQUEST,
  SEND_SMS_TOR_SUCCESS,
  SEND_SMS_TOR_FAIL,
  SEND_SMS_TOR_RESET,
  SEND_NotificationSMS_REQUEST,
  SEND_NotificationSMS_SUCCESS,
  SEND_NotificationSMS_FAIL,
  BookMEonGoogleCalender_REQUEST,
  BookMEonGoogleCalender_SUCCESS,
  BookMEonGoogleCalender_FAIL,
  USER_GOOGLE_LOGIN_REQUEST,
  USER_GOOGLE_LOGIN_SUCCESS,
  USER_GOOGLE_LOGIN_FAIL,
  USER_GOOGLE_LOGIN_RESET,
  SEND_Cancel_SMS_TOR_REQUEST,
  SEND_Cancel_SMS_TOR_SUCCESS,
  SEND_Cancel_SMS_TOR_FAIL,
  SEND_Cancel_SMS_TOR_RESET,
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
  ONE_USER_SEARCH_RESET,
  USER_UPDATE_COMMENTS_FOR_TIPUL_REQUEST,
  USER_UPDATE_COMMENTS_FOR_TIPUL_SUCCESS,
  USER_DETAILS_COMMENTS_FOR_TIPUL_SUCCESS,
  USER_DETAILS_COMMENTS_FOR_TIPUL_RESET,
  USER_UPDATE_COMMENTS_FOR_TIPUL_FAIL,
  ONE_WORKING_DAY_RESET,
  List_of_Potential_Users_By_FirstName_RESET,
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

export const userGoogleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_GOOGLE_LOGIN_REQUEST:
      return { Gloading: true }
    case USER_GOOGLE_LOGIN_SUCCESS:
      return { Gsuccess: true, Gloading: false, userGoogleInfo: action.payload }
    case USER_GOOGLE_LOGIN_FAIL:
      return { Gloading: false, Gerror: action.payload }
    case USER_LOGOUT:
      return {}
    case USER_GOOGLE_LOGIN_RESET:
      return { Gsuccess: false }
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
      return { success: false, loading: false, error: action.payload }
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
    case USER_REGISTERByADMIN_RESET:
      return { success: false }
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
      return {
        loadingConfirm: false,
        CONFIRM_TORsuccess: true,
        confirm: action.payload,
      }
    case CONFIRM_TOR_FAIL:
      return { loadingConfirm: false, errorConfirm: action.payload }
    case CONFIRM_TOR_RESET:
      return { confirm: {}, CONFIRM_TORsuccess: false }
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

export const userUpdateCoomentsForTipulReducer = (
  state = { user: {} },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_COMMENTS_FOR_TIPUL_REQUEST:
      return { updade_comments_for_tipul_loading: true }
    case USER_UPDATE_COMMENTS_FOR_TIPUL_SUCCESS:
      return {
        updade_comments_for_tipul_loading: false,
        updade_comments_for_tipul_success: true,
      }
    case USER_UPDATE_COMMENTS_FOR_TIPUL_FAIL:
      return {
        updade_comments_for_tipul_loading: false,
        updade_comments_for_tipul_error: action.payload,
      }
    case USER_DETAILS_COMMENTS_FOR_TIPUL_RESET:
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

export const Potential_Users_By_FirstNameReducer = (
  state = { list: [] },
  action
) => {
  switch (action.type) {
    case POTENTIAL_USERS_REQUEST:
      return { listloading: true }
    case POTENTIAL_USERS_SUCCESS:
      return {
        listloading: false,
        list: action.payload,
        listsuccess: true,
      }
    case POTENTIAL_USERS_FAIL:
      return { listloading: false, listerror: action.payload }

    case POTENTIAL_USERS_RESET:
      return { listsuccess: false, list: {} }
    default:
      return state
  }
}

export const OneworkingDayReducer = (state = { workingdays: [] }, action) => {
  switch (action.type) {
    case ONE_WORKING_DAY_REQUEST:
      return { oneloading: true }
    case ONE_WORKING_DAY_SUCCESS:
      return {
        oneloading: false,
        oneworkingdays: action.payload,
        onesuccess: true,
      }
    case ONE_WORKING_DAY_FAIL:
      return { oneloading: false, oneerror: action.payload }

    case ONE_WORKING_DAY_RESET:
      return { onesuccess: false, oneworkingdays: {} }
    default:
      return state
  }
}

export const TomorrowworkingDayReducer = (
  state = { tomorrowworkingdays: [] },
  action
) => {
  switch (action.type) {
    case TOMORROW_WORKING_DAY_REQUEST:
      return { tomorrowloading: true }
    case TOMORROW_WORKING_DAY_SUCCESS:
      return {
        tomorrowloading: false,
        tomorrowworkingdays: action.payload,
        tomorrowsuccess: true,
      }
    case TOMORROW_WORKING_DAY_FAIL:
      return { tomorrowloading: false, tomorrowerror: action.payload }

    case TOMORROW_WORKING_DAY_RESET:
      return { tomorrowsuccess: false, tomorrowworkingdays: {} }
    default:
      return state
  }
}

export const ListworkingDayReducerForThisWeek = (
  state = { workingdays: [] },
  action
) => {
  switch (action.type) {
    case LIST_WORKING_DAYS_FOR_THIS_WEEK_REQUEST:
      return { weekloading: true }
    case LIST_WORKING_DAYS_FOR_THIS_WEEK_SUCCESS:
      return {
        weekloading: false,
        weekworkingdays: action.payload,
        weeksuccess: true,
      }
    case LIST_WORKING_DAYS_FOR_THIS_WEEK_FAIL:
      return { weekloading: false, weekerror: action.payload }
    default:
      return state
  }
}

export const ListworkingDayReducerForNEXT7days = (
  state = { workingdays: [] },
  action
) => {
  switch (action.type) {
    case LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_REQUEST:
      return { sevendaysloading: true }
    case LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_SUCCESS:
      return {
        sevendaysloading: false,
        sevendaysworkingdays: action.payload,
        sevendayssuccess: true,
      }
    case LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_FAIL:
      return { sevendaysloading: false, sevendayserror: action.payload }
    case LIST_WORKING_DAYS_FOR_NEXT_7_DAYS_RESET:
      return { sevendayssuccess: false }

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
    case WORKING_DAY_DELETE_RESET:
      return { success: false }
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
export const avilableTorsReducerForOneHour = (
  state = { clockList: [] },
  action
) => {
  switch (action.type) {
    case AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_REQUEST:
      return { loadingForOneHour: true }
    case AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_SUCCESS:
      return { loadingForOneHour: false, clockListForOneHour: action.payload }
    case AAVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_TIPUL_LIST_FAIL:
      return { loadingForOneHour: false, errorForOneHour: action.payload }
    default:
      return state
  }
}

export const avilableTorsReducerForOneHourHALF = (
  state = { clockList: [] },
  action
) => {
  switch (action.type) {
    case AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_REQUEST:
      return { loadingForOneHALFHour: true }
    case AVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_SUCCESS:
      return {
        loadingForOneHALFHour: false,
        clockListForOneHALFHour: action.payload,
      }
    case AAVILABLE_WORKINGDAY_TORS_FOR_ONE_HOUR_HALF_TIPUL_LIST_FAIL:
      return {
        loadingForOneHALFHour: false,
        errorForOneHALFHour: action.payload,
      }
    default:
      return state
  }
}

export const avilableTorsReducerFor2Hours = (
  state = { clockList: [] },
  action
) => {
  switch (action.type) {
    case AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_REQUEST:
      return { loadingFor2Hour: true }
    case AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_SUCCESS:
      return {
        loadingFor2Hour: false,
        clockListFor2Hour: action.payload,
      }
    case AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_TIPUL_LIST_FAIL:
      return {
        loadingFor2Hour: false,
        errorFor2Hour: action.payload,
      }
    default:
      return state
  }
}

export const avilableTorsReducerFor2Hourshalf = (
  state = { clockList: [] },
  action
) => {
  switch (action.type) {
    case AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_REQUEST:
      return { loadingFor2HourandHALF: true }
    case AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_SUCCESS:
      return {
        loadingFor2HourandHALF: false,
        clockListFor2HourandHALF: action.payload,
      }
    case AVILABLE_WORKINGDAY_TORS_FOR_2_HOURS_HALF_TIPUL_LIST_FAIL:
      return {
        loadingFor2HourandHALF: false,
        errorFor2HourandHALF: action.payload,
      }
    default:
      return state
  }
}

export const avilableTorsReducerFor3Hours = (
  state = { clockList: [] },
  action
) => {
  switch (action.type) {
    case AVILABLE_WORKINGDAY_TORS_FOR_3_HOURS_TIPUL_LIST_REQUEST:
      return { loadingFor3Hours: true }
    case AVILABLE_WORKINGDAY_TORS_FOR_3_HOURS_TIPUL_LIST_SUCCESS:
      return {
        loadingFor3Hours: false,
        clockListFor3Hours: action.payload,
      }
    case AVILABLE_WORKINGDAY_TORS_FOR_3_HOUR_TIPUL_LIST_FAIL:
      return {
        loadingFor3Hours: false,
        errorFor3Hours: action.payload,
      }
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
      return { loading: false, clockList: action.payload, Torssuccess: true }
    case CLOCK_LIST_FAIL:
      return { loading: false, error: action.payload, Torssuccess: false }
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
    case CLOCK_DELETE_RESET:
      return { success: false }
    default:
      return state
  }
}
export const DeleteSELECTEDClockReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_DELETE_SELECTED_REQUEST:
      return { loading: true }
    case CLOCK_DELETE_SELECTED_SUCCESS:
      return { loading: false, success: true }
    case CLOCK_DELETE_SELECTED_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const DeleteAllClocksReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_DELETE_ALL_REQUEST:
      return { loading: true }
    case CLOCK_DELETE_ALL_SUCCESS:
      return { loading: false, success: true }
    case CLOCK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case CLOCK_DELETE_ALL_FAIL:
      return { success: false }
    case CLOCK_DELETE_ALL_RESET:
      return { success: false }
    default:
      return state
  }
}
export const DeleteAVILABLEClocksReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_DELETE_AVILABLE_REQUEST:
      return { loading: true }
    case CLOCK_DELETE_AVILABLE_SUCCESS:
      return { loading: false, success: true }
    case CLOCK_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case CLOCK_DELETE_AVILABLE_FAIL:
      return { success: false }
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

export const SendTorSMSReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_SMS_TOR_REQUEST:
      return { loadingSendSMS: true }
    case SEND_SMS_TOR_SUCCESS:
      return { loadingSendSMS: false, successSend: true, send: action.payload }
    case SEND_SMS_TOR_FAIL:
      return { loadingSendSMS: false, errorSendSMS: action.payload }
    case SEND_SMS_TOR_RESET:
      return { send: {}, successSend: false }
    default:
      return state
  }
}

export const SendCancelSMSReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_Cancel_SMS_TOR_REQUEST:
      return { loadingSendSMS: true }
    case SEND_Cancel_SMS_TOR_SUCCESS:
      return { loadingSendSMS: false, successSend: true, send: action.payload }
    case SEND_Cancel_SMS_TOR_FAIL:
      return { loadingSendSMS: false, errorSendSMS: action.payload }
    case SEND_Cancel_SMS_TOR_RESET:
      return { send: {}, successSend: false }
    default:
      return state
  }
}

export const SendNotificationSMSReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_NotificationSMS_REQUEST:
      return { loadingNotificationSMS: true }
    case SEND_NotificationSMS_SUCCESS:
      return {
        loadingNotificationSMS: false,
        successNotificationSMS: true,
        sendNotificationSMS: action.payload,
      }
    case SEND_NotificationSMS_FAIL:
      return {
        loadingNotificationSMS: false,
        errorNotificationSMS: action.payload,
      }
    default:
      return state
  }
}

export const SendBookMEonGoogleCalender = (state = {}, action) => {
  switch (action.type) {
    case BookMEonGoogleCalender_REQUEST:
      return { loadingNotificationSMS: true }
    case BookMEonGoogleCalender_SUCCESS:
      return {
        loadingBookMEonGoogleCalender: false,
        successBookMEonGoogleCalender: true,
        sendBookMEonGoogleCalender: action.payload,
      }
    case BookMEonGoogleCalender_FAIL:
      return {
        loadingBookMEonGoogleCalender: false,
        errorBookMEonGoogleCalender: action.payload,
      }
    default:
      return state
  }
}

export const ClocksReciptOneDayReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_LIST_FOR_TODAY_REQUEST:
      return { loadingClocksReciptOneDay: true }
    case CLOCK_LIST_FOR_TODAY_SUCCESS:
      return {
        loadingClocksReciptOneDay: false,
        successClocksReciptOneDay: true,
        result1day: action.payload,
      }
    case CLOCK_LIST_FOR_TODAY_FAIL:
      return {
        loadingClocksReciptOneDay: false,
        errorClocksReciptOneDay: action.payload,
      }
    default:
      return state
  }
}

export const ClocksReciptWEEKReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_LIST_FOR_THIS_WEEK_REQUEST:
      return { loadingClocksReciptWeek: true }
    case CLOCK_LIST_FOR_THIS_WEEK_SUCCESS:
      return {
        loadingClocksReciptWeek: false,
        successClocksReciptWeek: true,
        resultWEEK: action.payload,
      }
    case CLOCK_LIST_FOR_THIS_WEEK_FAIL:
      return {
        loadingClocksReciptWeek: false,
        errorClocksReciptWeek: action.payload,
      }
    default:
      return state
  }
}

export const ClocksReciptMonthReducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_LIST_FOR_THIS_MONTH_REQUEST:
      return { loadingClocksReciptMonth: true }
    case CLOCK_LIST_FOR_THIS_MONTH_SUCCESS:
      return {
        loadingClocksReciptMonth: false,
        successClocksReciptMonth: true,
        resultMonth: action.payload,
      }
    case CLOCK_LIST_FOR_THIS_MONTH_FAIL:
      return {
        loadingClocksReciptMonth: false,
        errorClocksReciptMonth: action.payload,
      }
    default:
      return state
  }
}

export const CLOCK_LIST_FOR_THIS_WORK_DAY_Reducer = (state = {}, action) => {
  switch (action.type) {
    case CLOCK_LIST_FOR_THIS_WORK_DAY_REQUEST:
      return { loadingClocksReciptForThisWorkDay: true }
    case CLOCK_LIST_FOR_THIS_WORK_DAY_SUCCESS:
      return {
        loadingClocksReciptForThisWorkDay: false,
        successClocksReciptForThisWorkDay: true,
        resultForThisWorkDay: action.payload,
      }
    case CLOCK_LIST_FOR_THIS_WORK_DAY_FAIL:
      return {
        loadingClocksReciptForThisWorkDay: false,
        errorClocksReciptForThisWorkDay: action.payload,
      }
    default:
      return state
  }
}

export const ADMIN_CREATE_REPORT_Reducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REPORT_REQUEST:
      return { loading: true }
    case ADMIN_CREATE_REPORT_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      }
    case ADMIN_CREATE_REPORT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const ADMIN_CREATE_REPORT_FOR_WEEK_Reducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REPORT_FOR_WEEK_REQUEST:
      return { loading: true }
    case ADMIN_CREATE_REPORT_FOR_WEEK_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      }
    case ADMIN_CREATE_REPORT_FOR_WEEK_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const ADMIN_CREATE_REPORT_FOR_MONTH_Reducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REPORT_FOR_MONTH_REQUEST:
      return { loading: true }
    case ADMIN_CREATE_REPORT_FOR_MONTH_SUCCESS:
      return {
        loading: false,
        success: true,
        result: action.payload,
      }
    case ADMIN_CREATE_REPORT_FOR_MONTH_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const DAILY_REPORTS_LIST_Reducer = (state = {}, action) => {
  switch (action.type) {
    case DAILY_REPORTS_LIST_REQUEST:
      return { loading: true }
    case DAILY_REPORTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        result_list_daily_Reports: action.payload,
      }
    case DAILY_REPORTS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const Weekly_REPORTS_LIST_Reducer = (state = {}, action) => {
  switch (action.type) {
    case Weekly_REPORTS_LIST_REQUEST:
      return { loading: true }
    case Weekly_REPORTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        result_list_WEEKLY_Reports: action.payload,
      }
    case Weekly_REPORTS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const MONTHLY_REPORTS_LIST_Reducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHLY_REPORTS_LIST_REQUEST:
      return { loading: true }
    case MONTHLY_REPORTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        resultReportsMonth: action.payload,
      }
    case MONTHLY_REPORTS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const GET_REPORT_DEETS_BY_ID_Reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REPORT_DEETS_BY_ID_REQUEST:
      return { loading: true }
    case GET_REPORT_DEETS_BY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        Reportresult: action.payload,
      }
    case GET_REPORT_DEETS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const RegisterNewTipulReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_TIPUL_REQUEST:
      return { loading: true }
    case CREATE_NEW_TIPUL_SUCCESS:
      return { success: true, loading: false, userInfo: action.payload }
    case CREATE_NEW_TIPUL_FAIL:
      return { success: false, loading: false, error: action.payload }
    default:
      return state
  }
}

export const TipulimListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case SUGEI_TIPULIM_LIST_REQUEST:
      return { loading: true }
    case SUGEI_TIPULIM_LIST_SUCCESS:
      return { loading: false, tipulimList: action.payload }
    case SUGEI_TIPULIM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const TipulDeetsReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_TIPUL_DEETS_REQUEST:
      return { loadingDeets: true }
    case GET_TIPUL_DEETS_SUCCESS:
      return { loadingDeets: false, tipulimDeets: action.payload }
    case GET_TIPUL_DEETS_FAIL:
      return { loadingDeets: false, errorDeets: action.payload }
    default:
      return state
  }
}

export const SearchOneUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ONE_USER_SEARCH_REQUEST:
      return { loadinguserfound: true }
    case ONE_USER_SEARCH_SUCCESS:
      return {
        loadinguserfound: false,
        userfound: action.payload,
        successuserfound: true,
      }
    case ONE_USER_SEARCH_FAIL:
      return {
        loadinguserfound: false,
        erroruserfound: action.payload,
        successuserfound: false,
      }
    case ONE_USER_SEARCH_RESET:
      return { successuserfound: false }
    default:
      return state
  }
}
export const FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_Reducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_REQUEST:
      return { loadingclockFound: true }
    case FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCKTIME_SUCCESS:
      return {
        loadingclockFound: false,
        clockFound: action.payload,
        successclockFound: true,
      }
    case FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_FAIL:
      return {
        loadingclockFound: false,
        errorclockFound: action.payload,
        successclockFound: false,
      }
    case FIND_CLOCK_BY_WORKDAY_ID_AND_CLOCK_TIME_RESET:
      return {
        successclockFound: false,
        clockFound: {},
      }
    default:
      return state
  }
}

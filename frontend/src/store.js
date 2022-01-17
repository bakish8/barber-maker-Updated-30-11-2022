import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  workingDayListReducer,
  DeleteworkingDayListReducer,
  workingDaySingleReducer,
  MakeClockReducer,
  MakeClocksReducer,
  DeleteClockReducer,
  userMakeWorkingDayReducer,
  saparListReducer,
  PickWorkingDateReducer,
  confirmTorReducer,
  avilableTorsReducer,
  TorsReducer,
  MyTorimListMyReducer,
  cancelTorReducer,
  PayTorReducer,
  UNPayTorReducer,
  userRegisterBY_ADMINReducer,
  SendTorSMSReducer,
  SendNotificationSMSReducer,
  SendBookMEonGoogleCalender,
  userGoogleLoginReducer,
  SendCancelSMSReducer,
  OneworkingDayReducer,
  ListworkingDayReducerForThisWeek,
  ClocksReciptOneDayReducer,
  ClocksReciptWEEKReducer,
  ClocksReciptMonthReducer,
  CLOCK_LIST_FOR_THIS_WORK_DAY_Reducer,
  ADMIN_CREATE_REPORT_Reducer,
  ADMIN_CREATE_REPORT_FOR_WEEK_Reducer,
  ADMIN_CREATE_REPORT_FOR_MONTH_Reducer,
  DAILY_REPORTS_LIST_Reducer,
  Weekly_REPORTS_LIST_Reducer,
  MONTHLY_REPORTS_LIST_Reducer,
  GET_REPORT_DEETS_BY_ID_Reducer,
  RegisterNewTipulReducer,
  TipulimListReducer,
  SearchOneUserReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  saparList: saparListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  workingDayList: workingDayListReducer,
  DeleteworkingDay: DeleteworkingDayListReducer,
  workingDaySingle: workingDaySingleReducer,
  MakeClock: MakeClockReducer,
  MakeClocks: MakeClocksReducer,
  DeleteClock: DeleteClockReducer,
  MakeWorkDay: userMakeWorkingDayReducer,
  PickWorkingDate: PickWorkingDateReducer,
  confirmMyTor: confirmTorReducer,
  AvilableTors: avilableTorsReducer,
  Tors: TorsReducer,
  MyTorim: MyTorimListMyReducer,
  CancelTor: cancelTorReducer,
  Payment: PayTorReducer,
  UNPayment: UNPayTorReducer,
  AdminRegister: userRegisterBY_ADMINReducer,
  SEND_SMS: SendTorSMSReducer,
  SEND_CANCEL_SMS: SendCancelSMSReducer,
  SEND_Notification_SMS: SendNotificationSMSReducer,
  BookMEonGoogleCalender: SendBookMEonGoogleCalender,
  userGoogleLogin: userGoogleLoginReducer,
  ONE_WORKING_DAY: OneworkingDayReducer,
  LIST_WORK_DAYS_WEEK: ListworkingDayReducerForThisWeek,
  ClocksReciptOneDay: ClocksReciptOneDayReducer,
  ClocksReciptWEEK: ClocksReciptWEEKReducer,
  ClocksReciptMonth: ClocksReciptMonthReducer,
  CLOCK_LIST_FOR_THIS_WORK_DAY: CLOCK_LIST_FOR_THIS_WORK_DAY_Reducer,
  ADMIN_CREATE_REPORT: ADMIN_CREATE_REPORT_Reducer,
  ADMIN_CREATE_REPORT_FOR_WEEK: ADMIN_CREATE_REPORT_FOR_WEEK_Reducer,
  ADMIN_CREATE_REPORT_FOR_MONTH: ADMIN_CREATE_REPORT_FOR_MONTH_Reducer,
  DAILY_REPORTS_LIST: DAILY_REPORTS_LIST_Reducer,
  Weekly_REPORTS_LIST: Weekly_REPORTS_LIST_Reducer,
  MONTHLY_REPORTS_LIST: MONTHLY_REPORTS_LIST_Reducer,
  GET_REPORT_DEETS_BY_ID: GET_REPORT_DEETS_BY_ID_Reducer,
  RegisterNewTipul: RegisterNewTipulReducer,
  TipulimList: TipulimListReducer,
  SearchOneUser: SearchOneUserReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

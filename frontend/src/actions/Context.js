import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Googlelogin, googleuserResponse, login } from './userActions'
import axios from 'axios'
import { GOOGLE_USER_LOGIN_EMAIL_RESET } from '../constants/userConstants'
export const myContext = createContext({})

export default function Context(props) {
  const [userObject, setuserObject] = useState()
  const googleuserResponses = useSelector((state) => state.googleuserResponses)
  const { RuserGoogleInfo, GRsuccess } = googleuserResponses
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(googleuserResponse)
    // axios.get('/getgoogleuser', { withCredentials: true }).then((res) => {
    //   dispatch(Googlelogin(res.data.email))
    if (GRsuccess && RuserGoogleInfo) {
      dispatch({
        type: GOOGLE_USER_LOGIN_EMAIL_RESET,
      })
      dispatch(Googlelogin(RuserGoogleInfo.data.email))
    }
  }, [GRsuccess])

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  )
}

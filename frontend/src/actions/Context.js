import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Googlelogin, login } from './userActions'
import axios from 'axios'
export const myContext = createContext({})

export default function Context(props) {
  const userGoogleLogin = useSelector((state) => state.userGoogleLogin)
  const { userGoogleInfo, Gsuccess } = userGoogleLogin
  const [userObject, setuserObject] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (Gsuccess) {
      axios.get('/getgoogleuser', { withCredentials: true }).then((res) => {
        if (res.data.email) {
          dispatch(Googlelogin(res.data.email))
        }
      })
    }
  }, [Gsuccess])

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  )
}
/////TRY TO CREATE A REDUCER +STORE ACTION AND USE EFFECT FOR DISPACHING G

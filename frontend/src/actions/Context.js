import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Googlelogin, login } from './userActions'
import axios from 'axios'

export const myContext = createContext({})

export default function Context(props) {
  const [userObject, setuserObject] = useState()
  const dispatch = useDispatch()
  /////TRY TO CREATE A REDUCER +STORE ACTION AND USE EFFECT FOR DISPACHING G

  useEffect(() => {
    axios.get('/getgoogleuser', { withCredentials: true }).then((res) => {
      console.log(res)
      if (res.data) {
        // dispatch(Googlelogin(res.data.email))
        setuserObject(res.data)
      }
    })
  }, [])

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  )
}

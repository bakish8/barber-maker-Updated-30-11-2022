import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Googlelogin, login } from './userActions'
import axios from 'axios'

export const myContext = createContext({})

export default function Context(props) {
  const dispatch = useDispatch()
  /////TRY TO CREATE A REDUCER +STORE ACTION AND USE EFFECT FOR DISPACHING G

  useEffect(() => {
    axios.get('/getgoogleuser', { withCredentials: true }).then((res) => {
      console.log(res)
      if (res.data.email) {
        dispatch(Googlelogin(res.data.email))
      }
    })
  }, [dispatch])

  return <myContext.Provider>{props.children}</myContext.Provider>
}

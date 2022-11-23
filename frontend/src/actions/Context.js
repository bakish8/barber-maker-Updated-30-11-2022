import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Googlelogin, login } from './userActions'
import axios from 'axios'
export const myContext = createContext({})

export default function Context(props) {
  const [userObject, setuserObject] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/getgoogleuser', { withCredentials: true }).then((res) => {
      console.log(res.data)
      setuserObject(res.data)
    })
  }, [])

  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  )
}

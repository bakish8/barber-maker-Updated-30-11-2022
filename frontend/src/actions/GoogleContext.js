import React, { createContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const myContext_2 = createContext({})

export default function GoogleContext(props) {
  const [bussinesGoogleID, setBussinesGoogleID] = useState('')

  return (
    <myContext_2.Provider value={{ bussinesGoogleID, setBussinesGoogleID }}>
      {props.children}
    </myContext_2.Provider>
  )
}

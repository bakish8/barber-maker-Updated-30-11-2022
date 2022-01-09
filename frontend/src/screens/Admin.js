import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { listProducts } from '../actions/productActions' //ייבוא של האקשן עצמו שמביא את אמוצרים.
import { Route } from 'react-router-dom'
import ImageAdmin from '../components/HomePage/ImageAdmin'
const AdminScreen = ({}) => {
  useEffect(() => {}, [])

  return (
    <>
      <ImageAdmin />
    </>
  )
}

export default AdminScreen

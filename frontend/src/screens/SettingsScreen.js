import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { listProducts } from '../actions/productActions' //ייבוא של האקשן עצמו שמביא את אמוצרים.
import { Route } from 'react-router-dom'
import SettingsImage from '../components/SettingsImage.js'
//const AdminScreen = ({}) => {
const AdminScreen = ({ history, match }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const BussinessId = match.params.id
  useEffect(() => {}, [])

  useEffect(() => {
    if (!userInfo.isAdmin || userInfo.WorkingIn != BussinessId) {
      history.push(`/business/${BussinessId}`)
    }
  }, [userInfo])

  return (
    <>
      {userInfo.isAdmin && userInfo.WorkingIn != BussinessId && (
        <SettingsImage BussinessId={BussinessId} />
      )}
    </>
  )
}

export default AdminScreen

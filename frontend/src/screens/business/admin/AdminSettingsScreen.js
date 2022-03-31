import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { listProducts } from '../../../actions/productActions' //ייבוא של האקשן עצמו שמביא את אמוצרים.
import { Route } from 'react-router-dom'
import SettingsImage from '../../../components/SettingsImage'

const AdminSettingsScreen = ({ history, match }) => {
  const [Administrate, setAdministrate] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const BussinessId = match.params.id

  useEffect(() => {
    if (!userInfo.isAdmin || userInfo.workingIn != BussinessId) {
      history.push(`/business/${BussinessId}`)
    }
  }, [userInfo])

  return (
    <>
      {userInfo.isAdmin && userInfo.WorkingIn != BussinessId && (
        <SettingsImage BussinessId={BussinessId} OwnerId={userInfo._id} />
      )}
    </>
  )
}

export default AdminSettingsScreen

import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux' //מה שישחליט מה לשגר
import DesignSettingsImage from '../../../components/DesignSettingsImage'

const AdminDesignSettingsScreen = ({ history, match }) => {
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
        <DesignSettingsImage BussinessId={BussinessId} OwnerId={userInfo._id} />
      )}
    </>
  )
}

export default AdminDesignSettingsScreen

import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { getBuissnesDetails } from '../../actions/BuissnesActions/Buissnes_User_Actions'
import MakeAppointmentBG from '../../components/Business_Components/BusinessHomePage/MakeAppointmentBG'

const BarberShop = ({ history, match }) => {
  const barberid = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const GetBusinessDetails = useSelector((state) => state.GetBusinessDetails)
  const { loading, business, success, error } = GetBusinessDetails

  useEffect(() => {
    dispatch(getBuissnesDetails(barberid))
  }, [dispatch])

  useEffect(() => {
    if (!userInfo) {
      history.push('/login') ///Fix to be login page for spesific
    }
    if (business) {
      console.log(business)
      console.log(business.image)
    } else {
      console.log(`error`)
    }
  }, [history, userInfo, business])

  return (
    <>
      {business && success && (
        <div>
          <MakeAppointmentBG
            businessImage={business.image}
            businessID={business._id}
          />
        </div>
      )}
    </>
  )
}

export default BarberShop

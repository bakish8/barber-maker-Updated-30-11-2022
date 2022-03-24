import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { getBuissnesDetails } from '../../actions/BuissnesActions/Buissnes_User_Actions'
import MakeAppointmentBG from '../../components/Business_Components/BusinessHomePage/MakeAppointmentBG'
import ImageTWO from '../../components/HomePage/ImageTWO'
import Aos from 'aos'
import 'aos/dist/aos.css' ////add AOS effects
//add nav bar only spesific barber cab make actions
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
  useEffect(() => {
    Aos.init({ duration: 700 })
  }, [])
  return (
    <>
      {business && success && (
        <div>
          <div>
            <MakeAppointmentBG
              businessImage={business.image}
              businessID={business._id}
              websiteColors={business.websiteColors}
            />
          </div>

          <ImageTWO />
        </div>
      )}
    </>
  )
}

export default BarberShop

import React, { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' //מה שישחליט מה לשגר
import { getBuissnesDetails } from '../../actions/BuissnesActions/Buissnes_User_Actions'
import MakeAppointmentBG from '../../components/Business_Components/BusinessHomePage/MakeAppointmentBG'
import ImageTWO from '../../components/HomePage/ImageTWO'
import Aos from 'aos'
import 'aos/dist/aos.css' ////add AOS effects
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
//add nav bar only spesific barber cab make actions
const BarberShop = ({ history, match }) => {
  const BussinesID = match.params.id
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const GetBusinessDetails = useSelector((state) => state.GetBusinessDetails)
  const { loading, business, success, error } = GetBusinessDetails
  const UpdateBusinessDesignSettings = useSelector(
    (state) => state.UpdateBusinessDesignSettings
  )
  const {
    design_settings,
    success_design_settings,
    loading_update_design_settings,
    error_design_settings,
  } = UpdateBusinessDesignSettings

  useEffect(() => {
    dispatch(getBuissnesDetails(BussinesID))
  }, [dispatch])

  useEffect(() => {
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

  useEffect(() => {
    if (success_design_settings) {
      console.log(' Update Made succsessfully ! ! !')
      window.location.reload()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        html: `ההגדרות עודכנו בהצלחה`,
        showConfirmButton: false,
        timerProgressBar: true,
        backdrop: `rgba(0,0,0,0.0)`,
        allowOutsideClick: true,
        timer: 4500,
        toast: true,
      })
    }
  }, [success_design_settings])

  return (
    <>
      <Link to={`/business/${BussinesID}/picksapar`} className='call-to-us'>
        <div className='call-to-us__label'>
          <div className='callTousFIXED2'>
            <span id='callTousFIXED'> קבע </span>
            <span id='callTousFIXED'> תור </span>
          </div>
        </div>
      </Link>
      {business && success && (
        <div>
          <div>
            <MakeAppointmentBG
              businessImage={business.image}
              businessID={business._id}
              websiteColors={business.websiteColors}
            />
          </div>

          <ImageTWO
            location={business.location}
            websiteColors={business.websiteColors}
          />
        </div>
      )}
    </>
  )
}

export default BarberShop

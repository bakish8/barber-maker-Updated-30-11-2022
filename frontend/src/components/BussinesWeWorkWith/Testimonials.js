import React from 'react'
import './testimonials.css'
import { Link } from 'react-router-dom'

// import Swiper core and required modules
import { Pagination } from 'swiper'
import { useDispatch, useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { getBuissnesDetailsfornav } from '../../actions/BuissnesActions/Buissnes_User_Actions'
// Import Swiper styles

const Testimonials = (props) => {
  const dispatch = useDispatch()

  const data = [
    {
      avatar: props.Bussiness1.B_logo,
      id: props.Bussiness1.B_id,
    },
    // {
    //   avatar: props.Bussiness2.B_logo,
    //   id: props.Bussiness2.B_id,
    // },
    //fix by getting res jason array that ready and then convert hem to this data var
  ]

  const HistortPush = async (id) => {
    dispatch(getBuissnesDetailsfornav(id)).then(
      props.history.push(`/business/${id}`)
    )
  }
  return (
    <>
      <section id='testimonials' className='sectionmargin'>
        <h2 id='OurMisparot'>המספרות שלנו</h2>

        <Swiper
          className='container testimonials__container'
          // install Swiper modules
          modules={[Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {data.map(({ avatar, id, review }, index) => {
            return (
              <SwiperSlide key={index} className='testimonial'>
                <img
                  className='BusinessTesto'
                  src={avatar}
                  onClick={() => HistortPush(id)}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
    </>
  )
}

export default Testimonials

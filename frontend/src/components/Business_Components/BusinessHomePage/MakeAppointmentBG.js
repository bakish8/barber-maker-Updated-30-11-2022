import React, { useEffect, useState } from 'react'
import MakeAppointmentBTN from './MakeAppointmentBTN'
import { Parallax } from 'react-parallax'

const MakeAppointmentBG = (props) => {
  useEffect(() => {
    if (props) {
      console.log(props)
    }
  }, [props])

  return (
    <Parallax
      className='imageParalax'
      bgImage={props.businessImage}
      strength={400}
    >
      <div className='contentImage1'>
        <MakeAppointmentBTN businessID={props.businessID} />
      </div>{' '}
    </Parallax>
  )
}

export default MakeAppointmentBG

import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import React from 'react'
const MakeAppointmentBG = (props) => {
  return (
    <>
      <LinkContainer to={`/business/${props.businessID}/picksapar`}>
        <div className='button_container'>
          <i
            id={
              props.websiteColors === 'black+blue'
                ? 'arrowleft'
                : props.websiteColors === 'black+white'
                ? 'arrowleftblackandwhite'
                : 'dontdisplay'
            }
            className='fas fa-long-arrow-alt-right'
          ></i>

          <button
            className={
              props.websiteColors === 'black+blue'
                ? 'maketorbtn'
                : props.websiteColors === 'black+white'
                ? 'maketorbtnblackwhite'
                : 'maketorbtn'
            }
          >
            <span>קבע תור</span>
          </button>
          <i
            id={
              props.websiteColors === 'black+blue'
                ? 'arrowright'
                : props.websiteColors === 'black+white'
                ? 'arrowrightblackandwhite'
                : 'dontdisplay'
            }
            className='fas fa-long-arrow-alt-left'
          ></i>
        </div>
      </LinkContainer>
    </>
  )
}
export default MakeAppointmentBG

import { LinkContainer } from 'react-router-bootstrap'

import React from 'react'
const MakeTorBtn = () => {
  return (
    <>
      <LinkContainer to={`/picksapar`}>
        <div className='button_container'>
          <i id='arrowleft' className='fas fa-long-arrow-alt-right'></i>

          <button className='maketorbtn'>
            <span>קבע תור</span>
          </button>
          <i id='arrowright' className='fas fa-long-arrow-alt-left'></i>
        </div>
      </LinkContainer>
    </>
  )
}
export default MakeTorBtn

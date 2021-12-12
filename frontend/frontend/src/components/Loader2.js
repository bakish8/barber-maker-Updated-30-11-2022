import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader2 = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        width: '20px',
        height: '20px',
        margin: '0 ,4px',
        display: 'inline-block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader2

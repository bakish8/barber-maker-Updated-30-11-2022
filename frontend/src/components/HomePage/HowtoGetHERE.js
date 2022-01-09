import React from 'react'

import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 31.6659,
  lng: 34.56352,
}
const position = {
  lat: 31.6659,
  lng: 34.56352,
}
const onLoad = (marker) => {
  console.log('marker: ', marker)
}

const HowtoGetHERE = () => {
  return (
    <>
      <h1 id='ourproducts' className='whiteme'>
        ?איך להגיע{' '}
      </h1>
      <div id='googleMap'>
        <LoadScript googleMapsApiKey='AIzaSyBynh_gUEZiSiiqejzH8BkbxtUUx5dR4Jw'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            {' '}
            <Marker onLoad={onLoad} position={position} />
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
}

export default React.memo(HowtoGetHERE)

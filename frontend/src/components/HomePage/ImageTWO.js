import React from 'react'
import mistaper1 from '../../shared/images/mistaper1.jpg'
import { Parallax } from 'react-parallax'
import HowtoGetHERE from './HowtoGetHERE'

const ImageTWO = (props) => {
  console.log(`props.location`)
  console.log(props.location)
  return (
    <Parallax className='imageParalax2' bgImage={mistaper1} strength={800}>
      <HowtoGetHERE
        location={props.location}
        websiteColors={props.websiteColors}
      />
    </Parallax>
  )
}
export default ImageTWO

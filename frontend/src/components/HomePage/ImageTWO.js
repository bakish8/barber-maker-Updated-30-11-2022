import React from 'react'
import mistaper1 from '../../shared/images/mistaper1.jpg'
import { Parallax } from 'react-parallax'
import HowtoGetHERE from './HowtoGetHERE'

const ImageTWO = () => (
  <Parallax className='imageParalax' bgImage={mistaper1} strength={800}>
    <HowtoGetHERE />
  </Parallax>
)

export default ImageTWO

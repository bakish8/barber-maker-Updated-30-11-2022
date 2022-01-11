import React from 'react'
import poll from '../../shared/images/poll.jpg'
import { Parallax } from 'react-parallax'

const ImageFour = () => (
  <Parallax
    className='imageParalxSystemHeadNEIMAGE'
    bgImage={poll}
    strength={500}
  >
    <h1 id='barbermaker-system-headline' className='whiteme'>
      מערכת ברבר מייקר
    </h1>
  </Parallax>
)

export default ImageFour

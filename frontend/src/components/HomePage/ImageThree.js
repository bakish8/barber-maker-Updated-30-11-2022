import React from 'react'
import poll from '../../shared/images/poll.jpg'
import { Parallax } from 'react-parallax'
const ImageThree = () => (
  <Parallax className='imageParalaxPRODUCTS' bgImage={poll} strength={500}>
    <h1 id='ourproducts2' className='whiteme'>
      המוצרים שלנו
    </h1>
  </Parallax>
)
export default ImageThree

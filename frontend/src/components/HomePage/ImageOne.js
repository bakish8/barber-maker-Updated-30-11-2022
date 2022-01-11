import React from 'react'
import mistaper2 from '../../shared/images/mistaper2.jpg'
import MakeTorBtn from './makeTorBtn'
import { Parallax } from 'react-parallax'

const ImageOne = () => (
  <Parallax className='imageParalax' bgImage={mistaper2} strength={400}>
    <div className='contentImage1'>
      <MakeTorBtn />
    </div>{' '}
  </Parallax>
)

export default ImageOne

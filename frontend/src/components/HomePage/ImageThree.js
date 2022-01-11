import React from 'react'

import poll from '../../shared/images/poll.jpg'
import MakeTorBtn from './makeTorBtn'
import { Parallax } from 'react-parallax'
import { Row, Col } from 'react-bootstrap'

import { Route } from 'react-router-dom'

import SearchBox from '../SearchBox'

const ImageThree = () => (
  <Parallax className='imageParalaxPRODUCTS' bgImage={poll} strength={500}>
    <div className='contentImagePRODUCTS'>
      <Route render={({ history }) => <SearchBox history={history} />} />
    </div>{' '}
    <h1 id='ourproducts2' className='whiteme'>
      המוצרים שלנו
    </h1>
  </Parallax>
)

export default ImageThree

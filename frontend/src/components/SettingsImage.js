import React, { useState } from 'react'
import Admin from '../shared/images/Admin.jpg'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SettingsImage = () => (
  <>
    <h1 id='managerOptionsPageHeadLine' className='whiteme'>
      הגדרות{' '}
    </h1>
    <Parallax className='imageParalaxAdmin' bgImage={Admin} strength={800}>
      <div>
        <Link style={{ textDecoration: 'none' }} to='/admin/settings/newtipul'>
          <button id='centermeAndBlock1' class='maketorbtn'>
            <span>הוסף טיפול חדש</span>
          </button>
        </Link>

        <Link style={{ textDecoration: 'none' }} to='/admin/reports/'>
          <button id='centermeAndBlock1' class='maketorbtn'>
            <span>הגדר יום חופש</span>
          </button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/admin/userlist/'>
          <button id='centermeAndBlock1' class='maketorbtn'>
            <span>הגדר ספר חדש</span>
          </button>
        </Link>
      </div>
    </Parallax>
  </>
)

export default SettingsImage

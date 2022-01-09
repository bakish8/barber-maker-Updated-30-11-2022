import React, { useState } from 'react'
import Admin from '../../shared/images/Admin.jpg'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ImageAdmin = () => (
  <>
    <h1 id='managerOptionsPageHeadLine' className='whiteme'>
      אפשרויות מנהל
    </h1>
    <Parallax className='imageParalaxAdmin' bgImage={Admin} strength={800}>
      <div>
        <Link style={{ textDecoration: 'none' }} to='/admin/torim/'>
          <button id='centermeAndBlock' class='maketorbtn'>
            <span>תורים</span>
          </button>
        </Link>

        <Link style={{ textDecoration: 'none' }} to='/admin/reports/'>
          <button id='centermeAndBlock' class='maketorbtn'>
            <span>סיכומים</span>
          </button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/admin/userlist/'>
          <button id='centermeAndBlock' class='maketorbtn'>
            <span>לקוחות</span>
          </button>
        </Link>

        <Link style={{ textDecoration: 'none' }} to='/admin/productlist/'>
          <button id='centermeAndBlock' class='maketorbtn'>
            <span>מוצרים</span>
          </button>
        </Link>

        <Link style={{ textDecoration: 'none' }} to='/admin/orderlist/'>
          <button id='centermeAndBlock' class='maketorbtn'>
            <span>הזמנות</span>
          </button>
        </Link>

        <Link style={{ textDecoration: 'none' }} to='/admin/settings/'>
          <button id='centermeAndBlock' class='maketorbtn'>
            <span>הגדרות</span>
          </button>
        </Link>
      </div>
    </Parallax>
  </>
)

export default ImageAdmin

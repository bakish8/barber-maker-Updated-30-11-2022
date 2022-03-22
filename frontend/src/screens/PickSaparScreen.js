import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSaparim } from '../actions/userActions'
import { Link } from 'react-router-dom'
import SaparItem from '../components/sapar/SaparItem'
import { updateUserProfile } from '../actions/userActions'
import Swal from 'sweetalert2'

const PickSaparScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)

  const saparList = useSelector((state) => state.saparList)
  const { sapars, saparsloading, saparserror } = saparList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      console.log(`there is no user!!!`)
      history.push('/login')
    } else if (!userInfo.phone) {
      Swal.fire({
        title: `פרטי התקשרות חסרים`,
        text: `שלום ${userInfo.name}, לפני שאתה בוחר ספר עליך להזין את מספר הנייד שלך במערכת`,

        input: 'tel',
        inputAttributes: {
          autocapitalize: 'off',
        },
        confirmButtonText: 'אשר',
        showLoaderOnConfirm: true,
        imageUrl: 'https://i.ibb.co/9y19ZqL/icons8-missed-call.gif',

        preConfirm: (phone) => {
          if (phone.length === 10 && phone.substring(0, 2) === '05') {
            dispatch(
              updateUserProfile({ id: userInfo.id, phone, password: phone })
            )
          } else {
            console.log(phone.substring(0, 3))
            Swal.fire({
              allowOutsideClick: false,
              confirmButtonText: 'אוקי, הבנתי',
              icon: 'error',
              title: 'המספר אינו תקין',
              text: 'נסה שנית להזין את מספר הנייד שלך',
              footer: 'מספר עם קידומת ישראלית הכולל 10 ספרות לפחות',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              }
            })
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('המספר הוזן בהצלחה')
        } else if (result.dismiss === Swal.DismissReason.backdrop) {
          history.push('/')
        }
      })
    } else {
      dispatch(listSaparim())
    }
  }, [dispatch, history, userInfo])

  return (
    <Row>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <Col md={12}>
        <h2 id='headlineme'>
          {' '}
          <img src='https://i.ibb.co/wwKrdtx/man.png' id='miniICON' />
          בחר ספר
        </h2>
        {saparsloading ? (
          <Loader />
        ) : saparserror ? (
          <Message variant='danger'>{saparserror}</Message>
        ) : (
          <>
            {' '}
            <ul id='noBullets'>
              {sapars.map((sapar) => (
                <div id='centermeAndBlock' className='scaleAbit'>
                  <SaparItem
                    key={sapar._id}
                    id={sapar._id}
                    phone={sapar.phone}
                    name={sapar.name}
                    image={sapar.image}
                  ></SaparItem>
                </div>
              ))}
            </ul>
          </>
        )}
      </Col>
    </Row>
  )
}

export default PickSaparScreen

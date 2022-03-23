import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { listSaparim, updateUserProfile } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import WorkerItem from '../../components/Business_Components/Worker/WorkerItem'
import Swal from 'sweetalert2'
import { listOfWorkers } from '../../actions/BuissnesActions/Buissnes_User_Actions'

const PickSapar = ({ history, match }) => {
  const businessid = match.params.id
  console.log(`businessid: ${businessid}`)
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)

  const BusinessWorkersList = useSelector((state) => state.BusinessWorkersList)
  const { workers, workerserror, workersloading } = BusinessWorkersList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
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
      dispatch(listOfWorkers(businessid))
      //dispatch(listSaparim())
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
        {workersloading ? (
          <Loader />
        ) : workerserror ? (
          <Message variant='danger'>{workerserror}</Message>
        ) : (
          <>
            {' '}
            <ul id='noBullets'>
              {workers.map((worker) => (
                <div id='centermeAndBlock' className='scaleAbit'>
                  <WorkerItem
                    key={worker._id}
                    BusinessID={businessid}
                    id={worker._id}
                    phone={worker.phone}
                    name={worker.name}
                    image={worker.image}
                  ></WorkerItem>
                </div>
              ))}
            </ul>
          </>
        )}
      </Col>
    </Row>
  )
}

export default PickSapar

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Button, Row, Col, Select } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { registerNewTipul } from '../../../actions/userActions'

const AdminNewTipulScreen = ({ location, history, match }) => {
  let BussinesId = match.params.id
  const [TipulName, setTipulName] = useState('')
  const [TipulTime, setTipulTime] = useState('')
  const [TipulCost, setTipulCost] = useState('')
  const [TipulImage, setTipulImage] = useState('')

  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { success, loading, error, userInfo } = userLogin
  const RegisterNewTipulStore = useSelector(
    (state) => state.RegisterNewTipulStore
  )
  const { newTipulsuccess, newTipulloading, newTipul, newTipulerror } =
    RegisterNewTipulStore

  const redirect = `/business/${BussinesId}`

  useEffect(() => {
    if ((userInfo.isAdmin = false)) {
      history.push(redirect)
    }

    if (error || newTipulerror) {
      console.log(error)
      Swal.fire({
        title: 'משהו השתבש',
        text: newTipulerror,
        icon: 'error',
        focusConfirm: true,
        confirmButtonText: 'אוקי, הבנתי',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
    }
    if (newTipul || newTipulsuccess) {
      Swal.fire({
        title: 'הטיפול שביקשת נוצר בהצלחה',
        text: success,
        icon: 'success',
        focusConfirm: true,
        confirmButtonText: 'תודה',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      }).then(history.push(redirect))
    }
  }, [
    history,
    userInfo,
    redirect,
    message,
    newTipulerror,
    newTipul,
    newTipulsuccess,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!TipulName || !TipulTime || !TipulCost || !TipulImage) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
      })
      Toast.fire({
        icon: 'error',
        title: 'לא מילאת את כל השדות',
        text: 'אנא נסה שנית',
      })
    } else {
      console.log(TipulName)
      console.log(TipulTime)
      console.log(TipulCost)
      console.log(TipulImage)
      dispatch(
        registerNewTipul(
          TipulName,
          TipulTime,
          TipulCost,
          TipulImage,
          BussinesId
        )
      )
      //dispatch(registerNewTipul(TipulName, TipulTime, TipulCost, TipulImage))
    }
  }

  return (
    <>
      <div class='login-box'>
        <FormContainer>
          <h2 id='headlineme'>צור טיפול חדש</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <div id='centerme'>
            <Form onSubmit={submitHandler} className='whitemeandblackbg'>
              <div class='user-box'>
                <Form.Group controlId='TipulName'>
                  <Form.Control
                    type='TipulName'
                    placeholder='הכנס את שם הטיפול'
                    value={TipulName}
                    onChange={(e) => setTipulName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </div>

              <div class='user-box'>
                <Form.Group controlId='TipulTime'>
                  <Form.Control
                    as='select'
                    type='TipulTime'
                    value={TipulTime}
                    onChange={(e) => setTipulTime(e.target.value)}
                  >
                    <option>בחר זמן למשך הטיפול</option>

                    <option value='30'>חצי שעה</option>
                    <option value='60'>שעה</option>
                    <option value='90'>שעה וחצי</option>
                    <option value='120'>שעתיים</option>
                    <option value='150'>שעתיים וחצי</option>
                    <option value='180'>שלוש שעות</option>
                  </Form.Control>
                </Form.Group>
              </div>

              <div class='user-box'>
                <Form.Group controlId='TipulCost'>
                  <Form.Control
                    type='phone'
                    placeholder='הכנס מחיר'
                    value={TipulCost}
                    onChange={(e) => setTipulCost(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>
              <div class='user-box'>
                <Form.Group controlId='TipulImage'>
                  <Form.Control
                    type='TipulImage'
                    placeholder='הכנס כתובת תמונה'
                    value={TipulImage}
                    onChange={(e) => setTipulImage(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </div>

              <Button type='submit' id='centermebtnlogin'>
                צור טיפול חדש
              </Button>
            </Form>
          </div>
        </FormContainer>
      </div>
    </>
  )
}

export default AdminNewTipulScreen

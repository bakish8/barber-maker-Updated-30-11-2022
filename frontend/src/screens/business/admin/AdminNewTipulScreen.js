import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Button, Row, Col, Select, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import { registerNewTipul } from '../../../actions/userActions'
import { TREATMENTSListAction } from '../../../actions/BuissnesActions/Buissnes_User_Actions'
import './AdminNewTipulScreen.css'
import { Box, Modal } from '@material-ui/core'

const AdminNewTipulScreen = ({ location, history, match }) => {
  let BussinesId = match.params.id
  const [ShowNewTipulDialog, setShowNewTipulDialog] = useState(false)
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

  const BusinessTreatmentsList = useSelector(
    (state) => state.BusinessTreatmentsList
  )
  const {
    tipulim: tipulimList,
    tipulimloading,
    tipulimerror,
  } = BusinessTreatmentsList

  const redirect = `/business/${BussinesId}`

  useEffect(() => {
    if ((userInfo.isAdmin = false)) {
      history.push(redirect)
    } else {
      dispatch(TREATMENTSListAction(BussinesId))
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
      <button onClick={() => setShowNewTipulDialog(!ShowNewTipulDialog)}>
        צור טיפול חדש
      </button>
      {tipulimList ? (
        <Col md={12}>
          <div>
            <Table bordered>
              <thead id='centertext'>
                <tr>
                  <th id='tableheadlines' className='Payd_TH'>
                    תמונה
                  </th>

                  <th id='tableheadlines' className='TIPUL_TH'>
                    מחיר
                  </th>
                  <th id='tableheadlines' className='hour_TH'>
                    זמן
                  </th>
                  <th id='tableheadlines' className='CLIENT_TH'>
                    שם
                  </th>
                </tr>
              </thead>

              <tbody id='centertext'>
                {tipulimList.map((tipul) => (
                  <tr className='tableGGG' key={tipul._id}>
                    <td>
                      <img className='imgTreatmentSmall' src={tipul.image} />
                    </td>
                    <td>{tipul.cost}</td>
                    <td>{tipul.time}</td>
                    <td>{tipul.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      ) : (
        <></>
      )}
      {ShowNewTipulDialog ? (
        <Modal
          id='ModalStyle2'
          open={() => setShowNewTipulDialog(true)}
          close={() => setShowNewTipulDialog(false)}
        >
          <Box id='BOXlStyleForChooseTipul2'>
            <div id='reciptcloseNav'>
              <button
                onClick={() => setShowNewTipulDialog(false)}
                id='reciptcloseNavX'
              >
                X
              </button>
            </div>
            <Col md={12}>
              <h1 id='h1SugTipul'>צור טיפול חדש</h1>
            </Col>

            <Col md={12}>
              <Form onSubmit={submitHandler} id='centeForm'>
                <div className='CosaCosa'>
                  <Form.Group controlId='TipulName' id='tipulimCooseOptions2'>
                    <Form.Control
                      type='TipulName'
                      placeholder='הכנס את שם הטיפול'
                      value={TipulName}
                      onChange={(e) => setTipulName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <label className='CosaCosaLabels' for='tipul_name'>
                    שם
                  </label>
                </div>
                <div className='CosaCosa'>
                  <Form.Group controlId='TipulTime' id='tipulimCooseOptions2'>
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
                  <label className='CosaCosaLabels' for='tipul'>
                    זמן
                  </label>
                </div>

                <div className='CosaCosa'>
                  <Form.Group controlId='TipulCost' id='tipulimCooseOptions'>
                    <Form.Control
                      type='phone'
                      placeholder='הכנס מחיר'
                      value={TipulCost}
                      onChange={(e) => setTipulCost(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <label className='CosaCosaLabels' for='tipul_cost'>
                    מחיר
                  </label>
                </div>
                <div className='CosaCosa'>
                  <Form.Group controlId='TipulImage' id='tipulimCooseOptions'>
                    <Form.Control
                      type='TipulImage'
                      placeholder='הכנס כתובת תמונה'
                      value={TipulImage}
                      onChange={(e) => setTipulImage(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <label className='CosaCosaLabels' for='tipul_img'>
                    תמונה
                  </label>
                </div>
                <Button className='ChhoseTipuliBTN' type='submit'>
                  צור טיפול חדש
                </Button>
              </Form>
            </Col>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
    </>
  )
}

export default AdminNewTipulScreen

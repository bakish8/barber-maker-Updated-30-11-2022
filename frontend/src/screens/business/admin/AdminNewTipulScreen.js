import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Form, Button, Row, Col, Select, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import FormContainer from '../../../components/FormContainer'
import {
  deleteTipul,
  registerNewTipul,
  updateTipul,
} from '../../../actions/userActions'
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
  const [TipulID, setTipulID] = useState('')
  const [ShowEdditOrDeleteTipulDialog, setShowEdditOrDeleteTipulDialog] =
    useState(false)

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
  const TipulDelete = useSelector((state) => state.TipulDelete)
  const {
    loading: TipulDeleteloading,
    successTipulDelete,
    error: TipulDeleteerror,
  } = TipulDelete
  const TipulUpdate = useSelector((state) => state.TipulUpdate)
  const {
    loadingTipulUpdate,
    successTipulUpdate,
    TipulUpdated,
    errorTipulUpdate,
  } = TipulUpdate

  const redirect = `/business/${BussinesId}`

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push(redirect)
    } else {
      dispatch(TREATMENTSListAction(BussinesId))
    }

    if (error || newTipulerror) {
      Swal.fire({
        title: '???????? ??????????',
        text: newTipulerror,
        icon: 'error',
        focusConfirm: true,
        confirmButtonText: '????????, ??????????',
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
        title: '???????????? ???????????? ???????? ????????????',
        text: success,
        icon: 'success',
        focusConfirm: true,
        confirmButtonText: '????????',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
    }
    if (successTipulDelete) {
      Swal.fire({
        title: '???????????? ???????????? ???????? ????????????',
        text: success,
        icon: 'success',
        focusConfirm: true,
        confirmButtonText: '????????',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
    }
    if (successTipulUpdate) {
      Swal.fire({
        title: '???????????? ???????????? ?????????? ????????????',
        text: success,
        icon: 'success',
        focusConfirm: true,
        confirmButtonText: '????????',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      })
    }
  }, [
    history,
    userInfo,
    redirect,
    message,
    newTipulerror,
    newTipul,
    newTipulsuccess,
    successTipulDelete,
    successTipulUpdate,
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
        title: '???? ?????????? ???? ???? ??????????',
        text: '?????? ?????? ????????',
      })
    } else {
      setShowNewTipulDialog(false)

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
  const ClickOnTipulHandler = (tipul) => {
    setTipulName(tipul.name)
    setTipulTime(tipul.time)
    setTipulCost(tipul.cost)
    setTipulImage(tipul.image)
    setTipulID(tipul._id)
    setShowEdditOrDeleteTipulDialog(true)
  }
  {
  }

  const UpdateTipulHandler = () => {
    setShowEdditOrDeleteTipulDialog(false)

    Swal.fire({
      title: '??????? ????????',
      text: `:?????? ?????? ???????? ?????????????? ?????????? ???? ???????????????? ????????????  ${TipulName}  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '??????????',
      confirmButtonText: '???? ?????? ????????',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          updateTipul(TipulID, TipulName, TipulCost, TipulImage, TipulTime)
        )
      }
    })
  }
  const DeleteTipulHandler = () => {
    setShowEdditOrDeleteTipulDialog(false)
    Swal.fire({
      title: '??????? ????????',
      text: `?????? ?????? ???????? ?????????????? ?????????? ???? ???????????? : ${TipulName}  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '??????????',
      confirmButtonText: '???? ?????? ????????',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTipul(TipulID, BussinesId))
      }
    })
  }

  const setShowNewTipulDialog_Function = () => {
    setShowEdditOrDeleteTipulDialog(false)
    setShowNewTipulDialog(!ShowNewTipulDialog)
  }
  const setShowEdditOrDeleteTipulDialog_Function = () => {
    setShowNewTipulDialog(false)
    setShowEdditOrDeleteTipulDialog(true)
  }
  return (
    <>
      <button
        onClick={() => setShowNewTipulDialog_Function()}
        className='call-to-us2'
      >
        <div className='call-to-us__label'>
          <div className='callTousFIXED2'>
            <span id='callTousFIXED'> ?????? </span>
            <span id='callTousFIXED'> ?????????? </span>
          </div>
        </div>
      </button>

      {tipulimList ? (
        <Col md={12}>
          <div>
            <Table bordered>
              <thead id='centertext'>
                <tr>
                  <th id='tableheadlines' className='Payd_TH'>
                    ??????????
                  </th>

                  <th id='tableheadlines' className='TIPUL_TH'>
                    ????????
                  </th>
                  <th id='tableheadlines' className='hour_TH'>
                    ??????
                  </th>
                  <th id='tableheadlines' className='CLIENT_TH'>
                    ????
                  </th>
                </tr>
              </thead>

              <tbody id='centertext'>
                {tipulimList.map((tipul) => (
                  <tr
                    onClick={() => ClickOnTipulHandler(tipul)}
                    className='tableGGG'
                    key={tipul._id}
                  >
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
              <h1 id='h1SugTipul'>?????? ?????????? ??????</h1>
            </Col>

            <Col md={12}>
              <Form onSubmit={submitHandler} id='centeForm'>
                <div className='CosaCosa'>
                  <Form.Group controlId='TipulName' id='tipulimCooseOptions2'>
                    <Form.Control
                      type='TipulName'
                      placeholder='???????? ???? ???? ????????????'
                      onChange={(e) => setTipulName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <label className='CosaCosaLabels' for='tipul_name'>
                    ????
                  </label>
                </div>
                <div className='CosaCosa'>
                  <Form.Group controlId='TipulTime' id='tipulimCooseOptions2'>
                    <Form.Control
                      as='select'
                      type='TipulTime'
                      onChange={(e) => setTipulTime(e.target.value)}
                    >
                      <option>?????? ?????? ???????? ????????????</option>

                      <option value='30'>?????? ??????</option>
                      <option value='60'>??????</option>
                      <option value='90'>?????? ????????</option>
                      <option value='120'>????????????</option>
                      <option value='150'>???????????? ????????</option>
                      <option value='180'>???????? ????????</option>
                    </Form.Control>
                  </Form.Group>
                  <label className='CosaCosaLabels' for='tipul'>
                    ??????
                  </label>
                </div>

                <div className='CosaCosa'>
                  <Form.Group controlId='TipulCost' id='tipulimCooseOptions'>
                    <Form.Control
                      type='phone'
                      placeholder='???????? ????????'
                      onChange={(e) => setTipulCost(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <label className='CosaCosaLabels' for='tipul_cost'>
                    ????????
                  </label>
                </div>
                <div className='CosaCosa'>
                  <Form.Group controlId='TipulImage' id='tipulimCooseOptions'>
                    <Form.Control
                      type='TipulImage'
                      placeholder='???????? ?????????? ??????????'
                      onChange={(e) => setTipulImage(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <label className='CosaCosaLabels' for='tipul_img'>
                    ??????????
                  </label>
                </div>
                <Button className='ChhoseTipuliBTN' type='submit'>
                  ?????? ?????????? ??????
                </Button>
              </Form>
            </Col>
          </Box>
        </Modal>
      ) : (
        <></>
      )}

      {ShowEdditOrDeleteTipulDialog ? (
        <>
          <Modal
            id='ModalStyle2'
            open={() => setShowEdditOrDeleteTipulDialog_Function()}
            close={() => setShowEdditOrDeleteTipulDialog(false)}
          >
            <Box id='BOXlStyleForChooseTipul2'>
              <div id='reciptcloseNav'>
                <button
                  onClick={() => setShowEdditOrDeleteTipulDialog(false)}
                  id='reciptcloseNavX'
                >
                  X
                </button>
              </div>
              <Col md={12}>
                <h1 id='h1SugTipul'>???????? ???? ?????? ?????????? ????</h1>
              </Col>

              <Col md={12}>
                <Form id='centeForm'>
                  <div className='CosaCosa'>
                    <Form.Group controlId='TipulName' id='tipulimCooseOptions2'>
                      <Form.Control
                        type='TipulName'
                        placeholder='???????? ???? ???? ????????????'
                        value={TipulName}
                        onChange={(e) => setTipulName(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>

                    <label className='CosaCosaLabels' for='tipul_name'>
                      ????
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
                        <option>?????? ?????? ???????? ????????????</option>

                        <option value='30'>?????? ??????</option>
                        <option value='60'>??????</option>
                        <option value='90'>?????? ????????</option>
                        <option value='120'>????????????</option>
                        <option value='150'>???????????? ????????</option>
                        <option value='180'>???????? ????????</option>
                      </Form.Control>
                    </Form.Group>
                    <label className='CosaCosaLabels' for='tipul'>
                      ??????
                    </label>
                  </div>

                  <div className='CosaCosa'>
                    <Form.Group controlId='TipulCost' id='tipulimCooseOptions'>
                      <Form.Control
                        type='phone'
                        placeholder='???????? ????????'
                        value={TipulCost}
                        onChange={(e) => setTipulCost(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <label className='CosaCosaLabels' for='tipul_cost'>
                      ????????
                    </label>
                  </div>
                  <div className='CosaCosa'>
                    <Form.Group controlId='TipulImage' id='tipulimCooseOptions'>
                      <Form.Control
                        type='TipulImage'
                        placeholder='???????? ?????????? ??????????'
                        value={TipulImage}
                        onChange={(e) => setTipulImage(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <label className='CosaCosaLabels' for='tipul_img'>
                      ??????????
                    </label>
                  </div>
                  <Button
                    onClick={() => UpdateTipulHandler()}
                    className='ChhoseTipuliBTN'
                  >
                    ????????
                  </Button>
                  <Button
                    onClick={() => DeleteTipulHandler()}
                    className='DELETETipuliBTN'
                  >
                    ??????{' '}
                  </Button>
                </Form>
              </Col>
            </Box>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default AdminNewTipulScreen

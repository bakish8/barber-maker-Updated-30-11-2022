import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { Modal } from '@material-ui/core'
import Swal from 'sweetalert2'
import './ChangeBusinessImage.css'

const ChangeBusinessImage = (props) => {
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)
  const [imageAdress, setimageAdress] = useState('')
  const [Show, setShow] = useState(false)
  //changing color and close model function

  const functionChangeImage = (newImage) => {
    props.change(newImage)
    props.close()
  }
  return (
    <>
      {stateFORshowingModal ? (
        <Modal id='ModalStyle' open={setShow} onClose={() => props.close()}>
          <div className='image_CHANGE_Container'>
            <h5 className='changeImagenOW'>שנה תמונה</h5>
            <img className='Imagesquad' src={props.image} />

            <div className='changeImageInputAdressPlace'>
              <Form.Group controlId='name'>
                <Form.Control
                  value={imageAdress} //***set as state */
                  onChange={(e) => setimageAdress(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </div>

            <Button
              onClick={() => functionChangeImage(imageAdress)}
              id='updateProfileBTN'
            >
              עדכן
            </Button>
            <Form />
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default ChangeBusinessImage

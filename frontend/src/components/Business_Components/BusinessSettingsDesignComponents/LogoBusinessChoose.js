import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { Modal } from '@material-ui/core'
import Swal from 'sweetalert2'
import './LogoBusinessChoose.css'
const LogoBusinessChoose = (props) => {
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)
  const [LogoAdress, setLogoAdress] = useState('')
  const [Show, setShow] = useState(false)
  //changing color and close model function

  const functionChangeLogo = (newLogo) => {
    props.change(newLogo)
    props.close()
  }
  return (
    <>
      {stateFORshowingModal ? (
        <Modal id='ModalStyle' open={setShow} onClose={() => props.close()}>
          <div className='Logo_CHANGE_Container'>
            <h5 className='changelOGOnOW'>שנה לוגו</h5>
            <img className='LogoCircle' src={props.logo} />

            <div className='changeLogoInputAdressPlace'>
              <Form.Group controlId='name'>
                <Form.Control
                  value={LogoAdress} //***set as state */
                  onChange={(e) => setLogoAdress(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </div>

            <Button
              onClick={() => functionChangeLogo(LogoAdress)}
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
export default LogoBusinessChoose

import React, { useState, useEffect } from 'react'
import Admin from '../shared/images/Admin.jpg'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Table, Button, Form } from 'react-bootstrap'
import {
  FindGeoLocationByName,
  getBuissnesDetailsforDesign,
  updateDesignSettings,
} from '../actions/BuissnesActions/Buissnes_User_Actions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import './DesignSettingsImage.css'
import { Modal } from '@material-ui/core'
import TDcolorBinder from './Business_Components/BusinessSettingsDesignComponents/TDcolorBinder'
import LogoBusinessChoose from './Business_Components/BusinessSettingsDesignComponents/LogoBusinessChoose'
import ChangeBusinessImage from './Business_Components/BusinessSettingsDesignComponents/ChangeBusinessImage'
import Swal from 'sweetalert2'

const DesignSettingsImage = (props, match) => {
  const dispatch = useDispatch()

  const GetBusinessDetailsfordesign = useSelector(
    (state) => state.GetBusinessDetailsfordesign
  )
  const { loading, business, success, error } = GetBusinessDetailsfordesign

  const GetBusinessGeo = useSelector((state) => state.GetBusinessGeo)
  const { loadingGeo, businessGeo, successGeo, errorGeo } = GetBusinessGeo

  const UpdateBusinessDesignSettings = useSelector(
    (state) => state.UpdateBusinessDesignSettings
  )
  const {
    design_settings,
    success_design_settings,
    loading_update_design_settings,
    error_design_settings,
  } = UpdateBusinessDesignSettings

  const [ShowTDcolorBinder, setShowTDcolorBinder] = useState(false)
  const [ShowChangeLogoModal, setShowChangeLogoModal] = useState(false)
  const [ShowChangeBusinessPic, setShowChangeBusinessPic] = useState(false)
  const [BusinessOnNavigationBar, setBusinessOnNavigationBar] = useState(false)
  const [BusinessLocationName, setBusinessLocationName] = useState(false)
  const [BusinessName, setBusinessName] = useState(false)

  const [word, setWord] = useState('')
  const [logo, setLogo] = useState('')
  const [image, setImage] = useState('')

  const BusinessId = window.location.pathname.split('/')[2]
  let Firstlocation = window.location.pathname.split('/')[1]

  useEffect(() => {
    if (
      !window.location.host === 'barber-maker.com:3000' ||
      Firstlocation === 'business'
    ) {
      console.log(
        ' we are in Barber-Maker.com or localHost 3000 dispatching   getBuissnesDetailsforDesign ! ! !'
      )
      dispatch(getBuissnesDetailsforDesign(BusinessId))
    }
  }, [])

  useEffect(() => {
    if (business && business.logoNameOnNav == true) {
      setBusinessOnNavigationBar(true)
    } else {
      setBusinessOnNavigationBar(false)
    }

    if (business && business.name) {
      setBusinessName(business.name)
    }

    if (business && business.location.name) {
      setBusinessLocationName(business.location.name)
    }
    if (business && business.websiteColors) {
      setWord(business.websiteColors)
    }
    if (business && business.logo) {
      setLogo(business.logo)
    }
    if (business && business.image) {
      setImage(business.image)
    }
  }, [business])

  useEffect(() => {
    if (word != '' || word != word) {
      console.log(
        ' we are Going to display previewe for website colors here ! ! !'
      )
    }
  }, [word])

  useEffect(() => {
    if (success_design_settings) {
      console.log(' Back to home page + refresh ! ! !')
      props.history.push(`/business/${props.BussinessId}`)
    }
  }, [success_design_settings])

  useEffect(() => {
    if (businessGeo) {
      console.log(
        ` the business Geo lat is ${businessGeo.results[0].geometry.location.lat}! ! !`
      )
      console.log(
        ` the business Geo lng is ${businessGeo.results[0].geometry.location.lng}! ! !`
      )

      /****setting update action with lat and lng for location */

      dispatch(
        updateDesignSettings(
          props.BussinessId,
          BusinessName,
          BusinessLocationName,
          businessGeo.results[0].geometry.location.lat,
          businessGeo.results[0].geometry.location.lng,
          BusinessOnNavigationBar,
          word,
          logo,
          image
        )
      )
    }
    if (errorGeo) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        html: `שגיאה-המיקום שהזנת אינו נמצא`,
        showConfirmButton: false,
        timerProgressBar: true,
        backdrop: `rgba(0,0,0,0.0)`,
        allowOutsideClick: true,
        timer: 4500,
        toast: true,
      })
    }
  }, [businessGeo])

  const openSwal = () => {
    Swal.fire({
      title: '?האם אתה בטוח שברצונך לבצע שינויים אלו',
      text: `ברגע שתבצע את שינויים אלו בעיצוב ,הן יחלו לפעול באופן מיידי על האתר שלך`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'ביטול',
      confirmButtonText: 'אישור',
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Confirmed dispatching update business Design Details')
        console.log(` GETTING BUSINESS GEO! ! !`)

        dispatch(FindGeoLocationByName(BusinessLocationName))

        /***here was updateDesignsettings */
      } else {
        console.log('CANCELATION !!')
      }
    })
  }

  return (
    <>
      {business && ShowTDcolorBinder && (
        <TDcolorBinder
          close={() => setShowTDcolorBinder(false)}
          change={(word) => setWord(word)}
          color={business.websiteColors}
        />
      )}
      {business && ShowChangeLogoModal && (
        <LogoBusinessChoose
          close={() => setShowChangeLogoModal(false)}
          change={(logo) => setLogo(logo)}
          logo={logo != '' ? logo : business.logo}
        />
      )}
      {business && ShowChangeBusinessPic && (
        <ChangeBusinessImage
          close={() => setShowChangeBusinessPic(false)}
          change={(image) => setImage(image)}
          image={image != '' ? image : business.image}
        />
      )}
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {business && (
        <>
          <Row>
            {' '}
            <Col md={12}>
              {' '}
              <h1 id='managerOptionsPageHeadLine' className='whiteme'>
                הגדרות עיצוב{' '}
              </h1>
            </Col>
            <Col>
              <Table
                bordered
                responsive
                className='whiteme'
                id='tablewhiteUserLIST_table'
              >
                <thead>
                  <tr id='tableheadlines'>
                    <th>תכונות</th>
                    <th>מאפיינים</th>
                  </tr>
                </thead>

                <tbody id='centertext'>
                  <td>
                    <Form.Group className='SettingsInputs'>
                      <Form.Control
                        className='SettingsInputsInput'
                        type='name'
                        value={
                          BusinessName != '' ? BusinessName : business.name
                        }
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </td>

                  <td>שם העסק</td>
                </tbody>
                <tbody id='centertext'>
                  <td>
                    {' '}
                    <Form.Group className='SettingsInputs'>
                      <Form.Control
                        className='SettingsInputsInput'
                        type='name'
                        value={BusinessLocationName}
                        onChange={(e) =>
                          setBusinessLocationName(e.target.value)
                        }
                        required
                      ></Form.Control>
                    </Form.Group>
                  </td>

                  <td>מיקום העסק</td>
                </tbody>
                <tbody id='centertext'>
                  <td>
                    <Form>
                      <Form.Check
                        checked={BusinessOnNavigationBar ? true : false}
                        type='switch'
                        id='custom-switch'
                        onChange={() =>
                          setBusinessOnNavigationBar(!BusinessOnNavigationBar)
                        }
                        label={BusinessOnNavigationBar ? 'כן' : 'לא'}
                      />
                    </Form>
                  </td>
                  <td>הופעת שם העסק בתפריט הניווט</td>
                </tbody>
                <tbody id='centertext'>
                  <td
                    className='TDcolorsBinders'
                    onClick={() => setShowTDcolorBinder(true)}
                  >
                    {word == '' && business.websiteColors === 'black+white' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/xStDV11/black-white.png'
                      ></img>
                    ) : word == '' &&
                      business.websiteColors === 'black+blue' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/yFgpbXz/black-blue.png'
                      ></img>
                    ) : (
                      <></>
                    )}
                    {word != '' && word == 'pink+white' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/GvhN5C1/pink-white.png'
                      ></img>
                    ) : word == 'black+white' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/xStDV11/black-white.png'
                      ></img>
                    ) : word == 'black+blue' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/yFgpbXz/black-blue.png'
                      ></img>
                    ) : word == 'black+orange' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/RyKtPSw/black-orange.png'
                      ></img>
                    ) : word == 'yellow+black' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/bKQHbkR/yellow-black.png'
                      ></img>
                    ) : word == 'strongrey+white' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/02TGyHM/grey-white.png'
                      ></img>
                    ) : word == 'white+blue' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/Dffy1tP/blue-white.png'
                      ></img>
                    ) : word == 'white+pink' ? (
                      <img
                        id='businessColooors'
                        src='https://i.ibb.co/nP3TPYm/white-pink.png'
                      ></img>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>צבעים</td>
                </tbody>
                <tbody id='centertext'>
                  <td onClick={() => setShowChangeLogoModal(true)}>
                    <img
                      id='businessLogoDesignSettings'
                      src={logo != '' ? logo : business.logo}
                    ></img>
                  </td>
                  <td>לוגו</td>
                </tbody>

                <tbody id='centertext'>
                  <td onClick={() => setShowChangeBusinessPic(true)}>
                    {' '}
                    <img
                      id='businessMakeTorBGimage'
                      src={image != '' ? image : business.image}
                    ></img>
                  </td>

                  <td>תמונת כפתור "קבע תור" בעמוד הראשי </td>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Button onClick={() => openSwal()} id='updateProfileBTN'>
            עדכן
          </Button>
        </>
      )}
    </>
  )
}

export default DesignSettingsImage
//***** Fix add to line with business.location.name function with google api thats find location by name and update cootdinates*/
//Fix add Bg for business application
//Fix **** adding Preview color model befpre update ons ettings page  */
//need to continue on acceepting website  colors show templete -FINISH WITH CHANGEing coprfrom there
//NEED to add navbar previrew
//NEED to add background image costumization

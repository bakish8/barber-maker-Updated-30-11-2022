//***Need TO add Google Calender Settings Fix */
///need to reset swal when loading page
import React, { useEffect, useState } from 'react'
import { Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
  getBuissnesSettings,
  updateSettings,
} from '../../../actions/BuissnesActions/Buissnes_User_Actions'

const AdminNotificationsSettings = ({ history, match }) => {
  const dispatch = useDispatch()
  const BussinesID = match.params.id
  //states
  let Ranger = document.getElementById('BusinessNotificationsTimeInput')

  const [BookUSERSongooglCalender, setBookUSERSongooglCalender] =
    useState(false)

  const [
    sendSMSClientSide_CheckBox_state,
    setsendSMSClientSide_CheckBox_state,
  ] = useState(false)

  const [
    sendWhatsappClientSide_CheckBox_state,
    setsendWhatsappClientSide_CheckBox_state,
  ] = useState(false)
  const [sendSMSAdminSide_CheckBox_state, setsendSMSAdminSide_CheckBox_state] =
    useState(false)
  const [
    sendWhatsappAdminSide_CheckBox_state,
    setsendWhatsappAdminSide_CheckBox_state,
  ] = useState(false)
  const [
    sendSMSClientSideCancel_CheckBox_state,
    setsendSMSClientSideCancel_CheckBox_state,
  ] = useState(false)
  const [
    sendWhatsappClientSideCancel_CheckBox_state,
    setsendWhatsappClientSideCancel_CheckBox_state,
  ] = useState(false)
  const [
    sendSMSAdminSideCancel_CheckBox_state,
    setsendSMSAdminSideCancel_CheckBox_state,
  ] = useState(false)
  const [
    sendWhatsappAdminSideCancel_CheckBox_state,
    setsendWhatsappAdminSideCancel_CheckBox_state,
  ] = useState(false)
  const [
    sendSMSClientSideReminder_CheckBox_state,
    setsendSMSClientSideReminder_CheckBox_state,
  ] = useState(false)
  const [
    sendWhatsappClientSideReminder_CheckBox_state,
    setsendWhatsappClientSideReminder_CheckBox_state,
  ] = useState(false)
  const [
    sendSMSAdminSideReminder_CheckBox_state,
    setsendSMSAdminSideReminder_CheckBox_state,
  ] = useState(false)
  const [
    sendWhatsappAdminSideReminder_CheckBox_state,
    setsendWhatsappAdminSideReminder_CheckBox_state,
  ] = useState(false)

  const [BusinessNotificationsTime, setBusinessNotificationsTime] = useState('')
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const UpdateBusinessSETTINGS = useSelector(
    (state) => state.UpdateBusinessSETTINGS
  )
  const { success_settings } = UpdateBusinessSETTINGS
  const GetBusinessSETTINGS = useSelector((state) => state.GetBusinessSETTINGS)
  const { loading, business, success, error } = GetBusinessSETTINGS

  //useEffect
  useEffect(() => {
    if (success_settings) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        html: `ההגדרות עודכנו בהצלחה`,
        showConfirmButton: false,
        timerProgressBar: true,
        backdrop: `rgba(0,0,0,0.0)`,
        allowOutsideClick: true,
        timer: 4500,
        toast: true,
      })
    }
  }, [success_settings])

  //useEffect
  useEffect(() => {
    if (Ranger) {
      console.log('Ranger')
      console.log(Ranger.value)
    }
  }, [Ranger])

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getBuissnesSettings(BussinesID))
    } else {
      history.push(`/business/${BussinesID}`)
    }
  }, [dispatch, history, userInfo])
  //useEffect
  useEffect(() => {
    if (business && success) {
      console.log(`________________________________________`)
      console.log(`______________________BUSINESS__________________`)
      console.log(`______________________BUSINESS__________________`)
      console.log(`______________________BUSINESS__________________`)
      console.log(`________________________________________`)

      if (business.settings.sendSMSClientSide) {
        setsendSMSClientSide_CheckBox_state(true)
      }

      if (business.settings.sendWhatsappClientSide) {
        setsendWhatsappClientSide_CheckBox_state(true)
      }
      if (business.settings.sendSMSAdminSide) {
        setsendSMSAdminSide_CheckBox_state(true)
      }
      if (business.settings.sendWhatsappAdminSide) {
        setsendWhatsappAdminSide_CheckBox_state(true)
      }
      if (business.settings.sendSMSClientSideCancel) {
        setsendSMSClientSideCancel_CheckBox_state(true)
      }
      if (business.settings.sendWhatsappClientSideCancel) {
        setsendWhatsappClientSideCancel_CheckBox_state(true)
      }
      if (business.settings.sendSMSAdminSideCancel) {
        setsendSMSAdminSideCancel_CheckBox_state(true)
      }
      if (business.settings.sendWhatsappAdminSideCancel) {
        setsendWhatsappAdminSideCancel_CheckBox_state(true)
      }
      if (business.settings.sendSMSClientSideReminder) {
        setsendSMSClientSideReminder_CheckBox_state(true)
      }
      if (business.settings.sendWhatsappClientSideReminder) {
        setsendWhatsappClientSideReminder_CheckBox_state(true)
      }
      if (business.settings.sendSMSAdminSideReminder) {
        setsendSMSAdminSideReminder_CheckBox_state(true)
      }
      if (business.settings.sendWhatsappAdminSideReminder) {
        setsendWhatsappAdminSideReminder_CheckBox_state(true)
      }
      if (business.settings.bookingooglecalender) {
        setBookUSERSongooglCalender(true)
      }
      if (business.settings.notificationsTime) {
        setBusinessNotificationsTime(business.settings.notificationsTime)
      }
    } else {
      console.log('error No business found in admin notification screen')
    }
  }, [dispatch, business, success])

  //Return

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <h1 id='headlineme'>הודעות ותזכורות </h1>{' '}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : business ? (
        <>
          <Table
            bordered
            responsive
            className='whiteme'
            id='tablewhiteUserLIST_table'
          >
            <thead>
              <tr id='tableheadlines'>
                <th id='widthforUserListDelete'>SMS</th>
                <th id='widthforUserListDelete'>Whatsapp</th>

                <th>פעולות</th>
              </tr>
            </thead>
            <tbody id='centertext'>
              <td>
                {' '}
                <input
                  onClick={() =>
                    setsendSMSClientSide_CheckBox_state(
                      !sendSMSClientSide_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendSMSClientSide_CheckBox_state}
                />
              </td>
              <td>
                <input
                  onClick={() =>
                    setsendWhatsappClientSide_CheckBox_state(
                      !sendWhatsappClientSide_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendWhatsappClientSide_CheckBox_state}
                />
              </td>
              <td>הודעת אישור תור לנייד של הלקוח בעת קביעת תור ע"י הלקוח</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                {' '}
                <input
                  onClick={() =>
                    setsendSMSAdminSide_CheckBox_state(
                      !sendSMSAdminSide_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendSMSAdminSide_CheckBox_state}
                />
              </td>
              <td>
                <input
                  onClick={() =>
                    setsendWhatsappAdminSide_CheckBox_state(
                      !sendWhatsappAdminSide_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendWhatsappAdminSide_CheckBox_state}
                />
              </td>
              <td>הודעת אישור תור לנייד של הלקוח בעת קביעת תור ע"י המנהל</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                {' '}
                <input
                  onClick={() =>
                    setsendSMSClientSideCancel_CheckBox_state(
                      !sendSMSClientSideCancel_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendSMSClientSideCancel_CheckBox_state}
                />
              </td>
              <td>
                <input
                  onClick={() =>
                    setsendWhatsappClientSideCancel_CheckBox_state(
                      !sendWhatsappClientSideCancel_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendWhatsappClientSideCancel_CheckBox_state}
                />
              </td>
              <td>הודעת ביטול תור לנייד של הלקוח בעת ביטול תור ע"י הלקוח</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                {' '}
                <input
                  onClick={() =>
                    setsendSMSAdminSideCancel_CheckBox_state(
                      !sendSMSAdminSideCancel_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendSMSAdminSideCancel_CheckBox_state}
                />
              </td>
              <td>
                <input
                  onClick={() =>
                    setsendWhatsappAdminSideCancel_CheckBox_state(
                      !sendWhatsappAdminSideCancel_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendWhatsappAdminSideCancel_CheckBox_state}
                />
              </td>
              <td>הודעת ביטול תור לנייד של הלקוח בעת ביטול תור ע"י המנהל</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                {' '}
                <input
                  onClick={() =>
                    setsendSMSClientSideReminder_CheckBox_state(
                      !sendSMSClientSideReminder_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendSMSClientSideReminder_CheckBox_state}
                />
              </td>
              <td>
                <input
                  onClick={() =>
                    setsendWhatsappClientSideReminder_CheckBox_state(
                      !sendWhatsappClientSideReminder_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendWhatsappClientSideReminder_CheckBox_state}
                />
              </td>
              <td>התראת תזכורת לנייד של הלקוח לאחר קביעת תור ע"י הלקוח</td>
            </tbody>
            <tbody id='centertext'>
              <td>
                {' '}
                <input
                  onClick={() =>
                    setsendSMSAdminSideReminder_CheckBox_state(
                      !sendSMSAdminSideReminder_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendSMSAdminSideReminder_CheckBox_state}
                />
              </td>
              <td>
                <input
                  onClick={() =>
                    setsendWhatsappAdminSideReminder_CheckBox_state(
                      !sendWhatsappAdminSideReminder_CheckBox_state
                    )
                  }
                  type='checkbox'
                  checked={sendWhatsappAdminSideReminder_CheckBox_state}
                />
              </td>
              <td>התראת תזכורת לנייד של הלקוח לאחר קביעת תור ע"י מנהל</td>
            </tbody>

            <tbody id='centertext'>
              <td className='BigcheckboxInput'>
                {' '}
                <input
                  onClick={() =>
                    setBookUSERSongooglCalender(!BookUSERSongooglCalender)
                  }
                  type='checkbox'
                  checked={BookUSERSongooglCalender}
                />
              </td>
              <td></td>
              <td>במידה וקיימת הרשאה -שיבוץ ביומן גוגל של הלקוח</td>
            </tbody>

            <tbody id='centertext'>
              <td>
                <input
                  id='BusinessNotificationsTimeInput'
                  onChange={() => setBusinessNotificationsTime(Ranger.value)}
                  type='range'
                  min={0}
                  max={120}
                  step={10}
                  value={BusinessNotificationsTime}
                />
              </td>
              <td>{BusinessNotificationsTime} דקות</td>

              <td>זמן ההתראה לפני התור</td>
            </tbody>
          </Table>
          <Button
            id='updateProfileBTN'
            onClick={() =>
              dispatch(
                updateSettings(
                  sendSMSClientSide_CheckBox_state,
                  sendWhatsappClientSide_CheckBox_state,
                  sendSMSAdminSide_CheckBox_state,
                  sendWhatsappAdminSide_CheckBox_state,
                  sendSMSClientSideCancel_CheckBox_state,
                  sendWhatsappClientSideCancel_CheckBox_state,
                  sendSMSAdminSideCancel_CheckBox_state,
                  sendWhatsappAdminSideCancel_CheckBox_state,
                  sendSMSClientSideReminder_CheckBox_state,
                  sendWhatsappClientSideReminder_CheckBox_state,
                  sendSMSAdminSideReminder_CheckBox_state,
                  sendWhatsappAdminSideReminder_CheckBox_state,
                  BookUSERSongooglCalender,
                  BusinessNotificationsTime,
                  BussinesID
                )
              )
            }
          >
            עדכן
          </Button>
        </>
      ) : (
        <div />
      )}
    </>
  )
}

export default AdminNotificationsSettings

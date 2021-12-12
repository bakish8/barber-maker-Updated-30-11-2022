import swal from 'sweetalert'
import Swal from 'sweetalert2'
import { CancelMyTor, registerByADMIN } from '../actions/userActions.js' //***למחוק לשנות לקוניפירם מחיקה */
import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Loader2 from '../components/Loader2'
import {
  deleteClock,
  createClocks,
  createClock,
  WorkingDayTors,
  PayMyTor,
  UNPayMyTor,
  confirmTor,
  workingDayDetails,
} from '../actions/userActions'
import { Link } from 'react-router-dom'

var date,
  array = []
date = new Date()
while (date.getMinutes() % 15 !== 0) {
  date.setMinutes(date.getMinutes() + 1)
}

const SingleWorkDayScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [time, setTime] = useState('')
  const [time2, setTime2] = useState('')

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      cancelButton: 'btn btn-outline-primary btn-md btn-block',
      confirmButton: 'btn btn-outline-primary btn-md btn-block',
      denyButton: 'btn btn-outline-primary btn-md btn-block',
    },
  })

  const AdminRegister = useSelector((state) => state.AdminRegister)
  const { success: RegisterUserBySaparsuccess } = AdminRegister

  const DeleteClock = useSelector((state) => state.DeleteClock)
  const { success: Deletesuccess } = DeleteClock

  const Tors = useSelector((state) => state.Tors)
  const { loading, error, clockList } = Tors

  const WorkDayid = match.params.id

  const CancelTor = useSelector((state) => state.CancelTor)
  const { cancel } = CancelTor

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [showForm, setShowForm] = useState(false)
  const showFormNow = () => {
    setShowForm(!showForm)
    if (showForm2) {
      setShowForm2(!showForm2)
    }
  }

  const [showForm2, setShowForm2] = useState(false)
  const showFormNow2 = () => {
    setShowForm2(!showForm2)
    if (showForm) {
      setShowForm(!showForm)
    }
  }

  const Payment = useSelector((state) => state.Payment)
  const { success: Paymentsuccess } = Payment

  const workingDaySingle = useSelector((state) => state.workingDaySingle)
  const { workingDay, loadingSingle, errorSingle } = workingDaySingle

  const UNPayment = useSelector((state) => state.UNPayment)
  const { success: UNPaymentsuccess } = UNPayment

  const MakeClock = useSelector((state) => state.MakeClock)
  const {
    success: ClockMADEsuccess,
    NewClockloading,
    NewClockerror,
  } = MakeClock

  const MakeClocks = useSelector((state) => state.MakeClocks)
  const {
    success: clockssuccess,
    NewClocksloading,
    NewClockserror,
  } = MakeClocks

  const confirmMyTor = useSelector((state) => state.confirmMyTor)
  const {
    success: confirmsuccess,
    confirm,
    loadingConfirm,
    errorConfirm,
  } = confirmMyTor

  const sapar = userInfo.name

  /*אחד מהם שולח שעה אחת והשני שולח טווח שעות */
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(WorkDayid)
    console.log(time)
    console.log(sapar)
    Swal.fire({
      text: 'מוסיף תור למערכת אנא המתן',

      imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      timer: 2000,
      background: '#68b4ff00',
      showConfirmButton: false,
      backdrop: 'rgba(0, 0, 0,0.8)',

      color: 'rgba(255, 255, 255)',
    })
    dispatch(createClock(WorkDayid, time, sapar))
  }

  const submitHandler2 = (e) => {
    e.preventDefault()
    console.log(WorkDayid)
    console.log(time)
    console.log(time2)
    dispatch(createClocks(WorkDayid, time, time2, sapar)).then(
      Swal.fire({
        text: 'מוסיף תורים למערכת אנא המתן',

        imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
        imageWidth: 400,
        imageHeight: 400,
        imageAlt: 'Custom image',
        timer: 5000,
        background: '#68b4ff00',
        showConfirmButton: false,
        backdrop: 'rgba(0, 0, 0,0.8)',

        color: 'rgba(255, 255, 255)',
      })
    )
  }

  const submitHandler3 = (e) => {
    e.preventDefault()
    Swal.fire({
      text: 'מוסיף תורים למערכת אנא המתן',

      imageUrl: 'https://i.ibb.co/qgNLgcf/BM-SVG-gif-ready.gif',
      imageWidth: 400,
      imageHeight: 400,
      imageAlt: 'Custom image',
      timer: 8000,
      background: '#68b4ff00',
      backdrop: 'rgba(0, 0, 0,0.8)',
      color: 'rgba(255, 255, 255)',
      showConfirmButton: false,
    })
    dispatch(createClocks(WorkDayid, '10:00', '19:00', sapar))
  }
  /*מחיקת תורים*/
  const deleteHandler = (id) => {
    swal({
      title: '?אתה בטוח',
      text: 'ברגע שתמחק את שעה זו מהמערכת לא יהיה ניתן להשיבה, במידה ויש לקוח בשעה זו התקשר כדי להודיע לו על ביטול התור לפני המחיקה',
      icon: 'warning',
      buttons: ['ביטול', 'מחק שעה זו'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('שעה זו נמחקה בהצלחה מהמערכת', {
          icon: 'success',
        }).then(dispatch(deleteClock(WorkDayid, id)))
      } else {
        console.log('your clock is safe')
      }
    })
  }

  const makeClockUnpaidHandler = (id, time, date) => {
    if (id && time && date) {
      swal({
        title: '?אתה בטוח',
        text: `תור זה מוגדר כמשולם במערכת,שינוי סטאטוס התשלום ישונה ל-לא שולם, עבור לקוח זה בתור בשעה ${time} בתאריך ${date}`,
        icon: 'warning',
        buttons: ['ביטול', 'שנה סטאטוס ל-לא שולם'],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('תור זה הוגדר כלא שולם בהצלחה', {
            icon: 'success',
          }).then(dispatch(UNPayMyTor(id)))
        } else {
          console.log('your payment is safe')
        }
      })
    }
  }
  const makeClockPAIDHandler = async (id, time, date, avilable) => {
    if (!avilable) {
      if (id && time && date) {
        const { value: payment } = await Swal.fire({
          title: 'בחר דרך תשלום',
          input: 'select',
          inputOptions: {
            אשראי: 'אשראי',
            מזומן: 'מזומן',
            ביט: 'ביט',
          },
          inputPlaceholder: 'מהי הדרך שבה הלקוח שילם',
          showCancelButton: true,
          cancelButtonText: 'ביטול',
          cancelButtonColor: 'rgb(194, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          confirmButtonText: 'אישור תשלום',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === 'אשראי' || value === 'מזומן' || value === 'ביט') {
                resolve()
              } else {
                resolve(' אתה צריך לבחור אחת מאפשרויות התשלום)')
              }
            })
          },
        })

        if (payment) {
          Swal.fire(`הלקוח שילם ב: ${payment}`).then(dispatch(PayMyTor(id)))
        }
      }
    }
  }

  const confirmNewUser = async (phone, name, time, id) => {
    Swal.fire({
      icon: 'success',
      title: `${name} נרשם בהצלחה `,
      text: ` בלחיצה על כפתור האישור תכניס את המשתמש  ${name} לשעה ${time} `,
      showCancelButton: true,
      cancelButtonText: 'ביטול',
      confirmButtonText: 'אישור',
      preConfirm: () => {
        return fetch(`/api/search/phones/${phone}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`)
          })
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(confirmTor(id, result.value._id)).then(
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `שובץ בהצלחה`,
            text: ` התור לשעה ${time} שובץ בהצלחה`,
            showConfirmButton: false,
            timer: 8000,
          })
        )
      }
    })
  }

  const showTorHandler = (time, date, avilable, mistaper, id, WorkDayid) => {
    const uid = userInfo._id

    if (avilable === false) {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: `${mistaper.name}--${time}`,
          text: `התור בשעה ${time} בתאריך  ${date} תפוס על ידי ${mistaper.name}`,
          imageUrl: 'https://i.ibb.co/M9HkNWs/greenuser.jpg',
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'לקוח',
          color: 'green',
          showDenyButton: true,
          denyButtonColor: 'rgb(194, 0, 0)',
          denyButtonText: `פנה תור`,

          showCancelButton: true,
          cancelButtonText: 'צא',
          cancelButtonColor: 'rgb(0, 0, 0)',

          confirmButtonColor: 'rgb(3, 148, 39)',
          confirmButtonText: 'תשלום',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const { value: payment } = await Swal.fire({
              title: 'בחר דרך תשלום',
              showCancelButton: true,
              cancelButtonText: 'ביטול',
              cancelButtonColor: 'rgb(194, 0, 0)',
              confirmButtonColor: 'rgb(3, 148, 39)',
              confirmButtonText: 'אישור תשלום',

              input: 'select',
              inputOptions: {
                אשראי: 'אשראי',
                מזומן: 'מזומן',
                ביט: 'ביט',
              },
              inputPlaceholder: 'מהי הדרך שבה הלקוח שילם',
              inputValidator: (value) => {
                return new Promise((resolve) => {
                  if (
                    value === 'אשראי' ||
                    value === 'מזומן' ||
                    value === 'ביט'
                  ) {
                    resolve()
                  } else {
                    resolve(' אתה צריך לבחור אחת מאפשרויות התשלום)')
                  }
                })
              },
            })

            if (payment) {
              Swal.fire(`הלקוח שילם ב: ${payment}`).then(dispatch(PayMyTor(id)))
            }
          } else if (result.isDenied) {
            Swal.fire({
              title: '?אתה בטוח',
              text: `ברגע שתהפוך את התור בשעה ${time} זה לזמין לא תהיה לך את האפשרות להחזיר את פרטי המשתמש שסגר את התור בשעה זו`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'ביטול',
              confirmButtonText: 'כן אני בטוח',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(CancelMyTor(id, uid)).then(
                  Swal.fire({
                    position: 'top-end',
                    cancelButtonColor: 'rgb(194, 0, 0)',
                    confirmButtonColor: 'rgb(3, 148, 39)',
                    icon: 'success',
                    title: `התור בשעה ${time} פנוי כעת`,
                    text: `שינוי סטאטוס התור בוצע בהצלחה`,
                    showConfirmButton: false,
                    timer: 8000,
                  })
                )
              }
            })
          }
        })
    } else {
      swalWithBootstrapButtons
        .fire({
          scrollbarPadding: true,
          title: 'תור פנוי',
          text: `התור בשעה ${time} בתאריך  ${date}  פנוי כרגע`,
          imageUrl: 'https://i.ibb.co/wNZnS8m/reduser.jpg',
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'לקוח',
          color: 'red',
          showDenyButton: true,
          denyButtonColor: 'rgb(194, 0, 0)',
          denyButtonText: `מחק תור זה`,
          showCancelButton: true,
          cancelButtonText: ' צא',
          cancelButtonColor: 'rgb(0, 0, 0)',
          confirmButtonColor: 'rgb(3, 148, 39)',
          confirmButtonText: 'שבץ תור',
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons
              .fire({
                title: 'בחר דרך חיפוש',
                text: `תוכל לחפש משתמשים קיימים לפי מספר נייד או שם,תוכל גם ליצור משתמש חדש שיקבל את תור זה`,
                imageUrl: 'https://i.ibb.co/5jDpS2J/icons8-search-100.png',
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: 'חיפוש',
                color: 'black',
                showCancelButton: true,
                showDenyButton: true,
                denyButtonText: `חפש לפי נייד`,
                denyButtonColor: 'rgb(0, 132, 255)',

                cancelButtonText: 'הוסף משתמש חדש לתור זה',
                cancelButtonColor: 'rgb(3, 148, 39)',
                confirmButtonColor: 'rgb(0, 132, 255)',
                confirmButtonText: 'חפש לפי שם',
              })
              .then(async (result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: `חפש משתמש שאותו תרצה להכניס לתור זה בשעה ${time}`,

                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'חפש',
                    cancelButtonText: 'ביטול',
                    showLoaderOnConfirm: true,

                    preConfirm: (user) => {
                      return fetch(`/api/search/users/${user}`)
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(response.statusText)
                          }
                          return response.json()
                        })
                        .catch((error) => {
                          Swal.showValidationMessage(`Request failed: ${error}`)
                        })
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        icon: 'success',
                        title: `${result.value.name} נמצא בהצלחה  `,
                        text: ` בלחיצה על כפתור האישור תכניס את המשתמש  ${result.value.name} לשעה ${time} `,
                        showCancelButton: true,
                        cancelButtonText: 'ביטול',
                        confirmButtonText: 'אישור',
                        footer: `<a href="">התקשר לנייד של ${result.value.name} בנייד 0${result.value.phone}</a>`,

                        preConfirm: () => {
                          dispatch(confirmTor(id, result.value._id))
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `שובץ בהצלחה`,
                            text: ` התור לשעה ${time} שובץ בהצלחה`,
                            showConfirmButton: false,
                            timer: 8000,
                          })
                        }
                      })
                    }
                  })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  const { value: formValues } = await Swal.fire({
                    imageUrl: 'https://i.ibb.co/NC57M5v/blackkkk.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    title: 'הוסף משתמש חדש לתור זה',
                    footer: `הססמא שהונפקה ללקוח זה מספר הנייד שהזנת`,

                    html:
                      '<input id="swal-input1" class="swal2-input">' +
                      '<label for="swal-input1">שם</label>' +
                      '<input id="swal-input2" class="swal2-input">' +
                      '<label for="swal-input2">אימייל</label>' +
                      '<input id="swal-input3" class="swal2-input">' +
                      '<label for="swal-input3">נייד</label>',

                    focusConfirm: false,
                    preConfirm: async () => {
                      return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value,
                      ]
                    },
                  })

                  if (formValues) {
                    const name = formValues[0]
                    const email = formValues[1]
                    const phone = formValues[2]
                    const password = formValues[2]
                    const image = formValues[2]
                    await dispatch(
                      registerByADMIN(name, email, phone, password, image)
                    )
                    await confirmNewUser(phone, name, time, id)
                  }
                } else if (result.isDenied) {
                  Swal.fire({
                    title: `חפש את הלקוח שתרצה להכניס בשעה ${time} לפי הנייד שלו`,
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'חפש',
                    cancelButtonText: 'ביטול',
                    showLoaderOnConfirm: true,
                    imageUrl: 'https://i.ibb.co/Sxn1K2t/icons8-phone-100.png',

                    preConfirm: (phone) => {
                      return fetch(`/api/search/phones/${phone}`) //****לאחר שנאחסן את הניידים ביחד עם ה0 הראשון נוסיף ךפני הפון כדי שנוכל למצא אתא הנייד הנכון */
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(response.statusText)
                          }
                          return response.json()
                        })
                        .catch((error) => {
                          Swal.showValidationMessage(`Request failed: ${error}`)
                        })
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        icon: 'success',
                        title: `${result.value.name} נמצא בהצלחה  `,
                        text: ` בלחיצה על כפתור האישור תכניס את המשתמש  ${result.value.name} לשעה ${time} `,
                        showCancelButton: true,
                        cancelButtonText: 'ביטול',
                        confirmButtonText: 'אישור',
                        footer: `<a href="">התקשר לנייד של ${result.value.name} בנייד 0${result.value.phone}</a>`,

                        preConfirm: () => {
                          dispatch(confirmTor(id, result.value._id))
                        },
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `שובץ בהצלחה`,
                            text: ` התור לשעה ${time} שובץ בהצלחה`,
                            showConfirmButton: false,
                            timer: 8000,
                          })
                        }
                      })
                    }
                  })
                }
              })
          } else if (result.isDenied) {
            Swal.fire({
              title: '?אתה בטוח',
              text: `האם אתה בטוח שברצונך למחוק את השעה  ${time}  `,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'ביטול',
              confirmButtonText: 'כן אני בטוח',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteClock(WorkDayid, id)).then(
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `התור בשעה ${time} נמחק בהצלחה`,
                    text: `התור נמחק בהצלחה מהמערכת`,
                    showConfirmButton: false,
                    timer: 8000,
                  })
                )
              }
            })
          }
        })
    }
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(workingDayDetails(WorkDayid))

      dispatch(WorkingDayTors(WorkDayid))

      if (ClockMADEsuccess === true || clockssuccess === true) {
        swal(
          'הפעולה התבצעה בהצלחה',
          '  התור/ים שביקשת להוסיף נכנסו למערכת בהצלחה!',
          'success'
        )
      }
    } else {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
    Deletesuccess,
    ClockMADEsuccess,
    clockssuccess,
    cancel,
    Paymentsuccess,
    UNPaymentsuccess,
    confirmsuccess,
    confirm,
  ])

  return (
    <Row>
      <Col md={12}>
        <Link id='goback' to='/admin/torim'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>

      {loadingSingle ? (
        <Loader />
      ) : errorSingle ? (
        <Message variant='danger'>{errorSingle}</Message>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Col md={12}>
            <h2 id='headlineme'>יום {workingDay.dayInWeek}</h2>
            <h2 id='dayinWeek'> {workingDay.date}</h2>
          </Col>

          <Col md={3} id='singlewirkingdayoptionsbgwhite'>
            <div>
              <h4 id='centerme'>
                <span id='torimAndHahnasot'>פעולות</span>
              </h4>
              <div id='centerme'>
                <Row>
                  <Col md={12}>
                    <Button
                      className='link buzz-out-on-hover'
                      onClick={submitHandler3}
                      id='HOSAFAmehiraBtn'
                    >
                      <i class='fas fa-bolt'></i> הוספה מהירה
                    </Button>
                  </Col>

                  <Col md={12}>
                    <Button
                      onClick={showFormNow2}
                      id='centermebtnActions'
                      className='my-1'
                    >
                      <i className='fas fa-plus'></i> הוסף תורים
                    </Button>
                  </Col>
                  <Col md={12}>
                    <Button
                      onClick={showFormNow}
                      id='centermebtnActions'
                      className='my-1'
                    >
                      <i className='fas fa-plus'></i> הוסף תור
                    </Button>{' '}
                  </Col>
                </Row>
              </div>

              {showForm && (
                <div id='sizeme'>
                  <div id='blueme'>
                    <Form onSubmit={submitHandler}>
                      <Form.Group
                        controlId='time'
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <Form.Control as='select' id='formSelect'>
                          <option id='custom-select1'>בחר שעה</option>
                          <option id='custom-select'>10:00</option>
                          <option id='custom-select'>10:30</option>
                          <option id='custom-select'>11:00</option>
                          <option id='custom-select'>11:30</option>
                          <option id='custom-select'>12:00</option>
                          <option id='custom-select'>12:30</option>
                          <option id='custom-select'>13:00</option>
                          <option id='custom-select'>13:30</option>
                          <option id='custom-select'>14:00</option>
                          <option id='custom-select'>14:30</option>
                          <option id='custom-select'>15:00</option>
                          <option id='custom-select'>15:30</option>
                          <option id='custom-select'>16:00</option>
                          <option id='custom-select'>16:30</option>
                          <option id='custom-select'>17:00</option>
                          <option id='custom-select'>17:30</option>
                          <option id='custom-select'>18:00</option>
                          <option id='custom-select'>18:30</option>
                          <option id='custom-select'>19:00</option>
                          <option id='custom-select'>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Button
                        className='link buzz-out-on-hover'
                        id='centermebtnHOsef'
                        type='submit'
                      >
                        <i className='fas fa-plus'></i> הוסף
                        {NewClockloading ? (
                          <Loader2 />
                        ) : NewClockerror ? (
                          <Message variant='danger'>{error}</Message>
                        ) : (
                          <div></div>
                        )}
                      </Button>
                    </Form>
                  </div>
                </div>
              )}

              {showForm2 && (
                <div id='sizeme'>
                  <div id='blueme'>
                    <Form onSubmit={submitHandler2}>
                      <Form.Group
                        controlId='time'
                        type='time'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <Form.Control as='select' id='formSelect'>
                          <option id='custom-select1'>משעה</option>
                          <option id='custom-select'>10:00</option>
                          <option id='custom-select'>10:30</option>
                          <option id='custom-select'>11:00</option>
                          <option id='custom-select'>11:30</option>
                          <option id='custom-select'>12:00</option>
                          <option id='custom-select'>12:30</option>
                          <option id='custom-select'>13:00</option>
                          <option id='custom-select'>13:30</option>
                          <option id='custom-select'>14:00</option>
                          <option id='custom-select'>14:30</option>
                          <option id='custom-select'>15:00</option>
                          <option id='custom-select'>15:30</option>
                          <option id='custom-select'>16:00</option>
                          <option id='custom-select'>16:30</option>
                          <option id='custom-select'>17:00</option>
                          <option id='custom-select'>17:30</option>
                          <option id='custom-select'>18:00</option>
                          <option id='custom-select'>18:30</option>
                          <option id='custom-select'>19:00</option>
                          <option id='custom-select'>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        controlId='time2'
                        type='time2'
                        value={time2}
                        onChange={(e) => setTime2(e.target.value)}
                      >
                        <Form.Control as='select' id='formSelect'>
                          <option id='custom-select1'>עד שעה</option>
                          <option id='custom-select'>10:30</option>
                          <option id='custom-select'>11:00</option>
                          <option id='custom-select'>11:30</option>
                          <option id='custom-select'>12:00</option>
                          <option id='custom-select'>12:30</option>
                          <option id='custom-select'>13:00</option>
                          <option id='custom-select'>13:30</option>
                          <option id='custom-select'>14:00</option>
                          <option id='custom-select'>14:30</option>
                          <option id='custom-select'>15:00</option>
                          <option id='custom-select'>15:30</option>
                          <option id='custom-select'>16:00</option>
                          <option id='custom-select'>16:30</option>
                          <option id='custom-select'>17:00</option>
                          <option id='custom-select'>17:30</option>
                          <option id='custom-select'>18:00</option>
                          <option id='custom-select'>18:30</option>
                          <option id='custom-select'>19:00</option>
                          <option id='custom-select'>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Button
                        className='link buzz-out-on-hover'
                        id='centermebtnHOsef'
                        type='submit'
                      >
                        <i className='fas fa-plus'></i> הוסף
                        {NewClocksloading ? (
                          <Loader2 />
                        ) : NewClockserror ? (
                          <Message variant='danger'>{error}</Message>
                        ) : (
                          <div></div>
                        )}
                      </Button>
                    </Form>
                  </div>
                </div>
              )}

              <div id='centerme'>
                <div id='block'>
                  <h4 id='centerme'>
                    <span id='torimAndHahnasot'>סיכום תורים</span>
                  </h4>
                  <h5 id='block' className='whitemeandrightaligen'>
                    {' '}
                    סה"כ <span id='boldme'>{clockList.length}</span>
                    תורים
                  </h5>

                  <h5 id='block' className='whitemeandrightaligen'>
                    {' '}
                    מתוכם{' '}
                    <span id='boldmered'>
                      {
                        clockList.filter((clock) => clock.avilable === true)
                          .length
                      }
                    </span>{' '}
                    תורים פנויים
                  </h5>
                  <h4 id='centerme'>
                    <span id='torimAndHahnasot'>סיכום הכנסות</span>
                  </h4>
                  <h5 id='block' className='whitemeandrightaligen'>
                    הכנסה יומית צפויה{' '}
                    <span id='boldme'>
                      {' '}
                      {(clockList.length -
                        clockList.filter((clock) => clock.avilable === true)
                          .length) *
                        50}
                      ₪
                    </span>{' '}
                  </h5>
                  <h5 id='block' className='whitemeandrightaligen'>
                    הכנסה בפועל{' '}
                    <span id='boldme'>
                      {clockList.filter((clock) => clock.isPaid === true)
                        .length * 50}
                      ₪
                    </span>{' '}
                  </h5>
                </div>
              </div>
            </div>
          </Col>

          <Col md={9}>
            <div>
              <Table bordered hover responsive id='tablewhite'>
                <thead id='centertext'>
                  <tr>
                    <th id='tableheadlines'>?שולם</th>
                    <th id='tableheadlines'>מחיר</th>
                    <th id='tableheadlines'>טיפול</th>
                    <th id='tableheadlines'>נייד</th>
                    <th id='tableheadlines'>לקוח/ה</th>
                    <th id='tableheadlines'>שעה</th>
                    <th id='tableheadlines'>פעולות</th>
                  </tr>
                </thead>

                <tbody id='centertext'>
                  {clockList

                    .sort((a, b) => {
                      const TimeA = ` ${a.time}`.valueOf()
                      const TimeB = ` ${b.time}`.valueOf()
                      if (TimeA > TimeB) {
                        return 1 // return -1 here for DESC order
                      }
                      return -1 // return 1 here for DESC Order
                    })

                    .map((clock) => (
                      <tr
                        key={clock._id}
                        className={clock.avilable ? 'red' : 'green'}
                      >
                        <td>
                          {clock.isPaid ? (
                            <button
                              id='unshowme'
                              onClick={() =>
                                makeClockUnpaidHandler(
                                  clock._id,
                                  clock.time,
                                  clock.date,
                                  clock.avilable
                                )
                              }
                            >
                              <i
                                className='fas fa-check-circle'
                                style={{ color: 'rgb(0, 97, 24)' }}
                              ></i>
                            </button>
                          ) : (
                            !clock.isPaid &&
                            !clock.avilable && (
                              <button
                                id='Xunshowme'
                                onClick={() =>
                                  makeClockPAIDHandler(
                                    clock._id,
                                    clock.time,
                                    clock.date
                                  )
                                }
                              >
                                <i
                                  className='fas fa-times'
                                  style={{ color: 'red' }}
                                ></i>
                              </button>
                            )
                          )}
                        </td>
                        <td>50</td>
                        <td>תספורת גבר</td>
                        <td>{clock.mistaper && '0' + clock.mistaper.phone}</td>

                        <td>{clock.mistaper && clock.mistaper.name}</td>
                        <td>{clock.time}</td>
                        <td id='optionsBlack'>
                          <Button
                            id='displaynone'
                            variant='light'
                            className='btn-sm'
                            onClick={() =>
                              showTorHandler(
                                clock.time,
                                clock.date,
                                clock.avilable,
                                clock.mistaper,
                                clock._id,
                                WorkDayid
                              )
                            }
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                          <Button
                            id='displaynone'
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(clock._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </>
      )}
    </Row>
  )
}

export default SingleWorkDayScreen

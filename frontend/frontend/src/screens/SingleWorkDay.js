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
  workingDayDetails,
} from '../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
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

  const DeleteClock = useSelector((state) => state.DeleteClock)
  const { success: Deletesuccess } = DeleteClock

  const ClockList = useSelector((state) => state.ClockList)
  const { loading, error } = ClockList

  const WorkDayid = match.params.id

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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const workingDaySingle = useSelector((state) => state.workingDaySingle)
  const { workingDay, loadingSingle, errorSingle } = workingDaySingle

  const MakeWorkDay = useSelector((state) => state.MakeWorkDay)
  const { workingDayInfo } = MakeWorkDay

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

  /*אחד מהם שולח שעה אחת והשני שולח טווח שעות */
  const submitHandler = (e) => {
    e.preventDefault()
    console.log(WorkDayid)
    console.log(time)
    dispatch(createClock(WorkDayid, time))
  }
  const submitHandler2 = (e) => {
    e.preventDefault()
    console.log(WorkDayid)
    console.log(time)
    console.log(time2)
    dispatch(createClocks(WorkDayid, time, time2))
  }
  /*מחיקת תורים*/
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteClock(WorkDayid, id))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(workingDayDetails(WorkDayid))
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
  ])

  return (
    <Row>
      {loadingSingle ? (
        <Loader />
      ) : errorSingle ? (
        <Message variant='danger'>{error}</Message>
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Col md={12}>
            <h2 id='headlineme'> {workingDay.dayInWeek}</h2>
            <h2 id='dayinWeek'> {workingDay.date}</h2>
          </Col>

          <Col md={3}>
            <div>
              <div id='centermeANDGREYBACKGROUND'>
                <Button
                  onClick={showFormNow}
                  id='centermebtnActions'
                  className='my-3'
                >
                  <i className='fas fa-plus'></i> הוסף תור
                </Button>
                <Button
                  onClick={showFormNow2}
                  id='centermebtnActions'
                  className='my-3'
                >
                  <i className='fas fa-plus'></i> הוסף תורים
                </Button>
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
                        <Form.Control as='select'>
                          <option>בחר שעה</option>
                          <option>10:00</option>
                          <option>10:30</option>
                          <option>11:00</option>
                          <option>11:30</option>
                          <option>12:00</option>
                          <option>12:30</option>
                          <option>13:00</option>
                          <option>13:30</option>
                          <option>14:00</option>
                          <option>14:30</option>
                          <option>15:00</option>
                          <option>15:30</option>
                          <option>16:00</option>
                          <option>16:30</option>
                          <option>17:00</option>
                          <option>17:30</option>
                          <option>18:00</option>
                          <option>18:30</option>
                          <option>19:00</option>
                          <option>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Button
                        className='link buzz-out-on-hover'
                        id='centermebtn'
                        type='submit'
                      >
                        <i className='fas fa-plus'></i> הוסף שעה זו ליום העבודה
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
                        <Form.Control as='select'>
                          <option>משעה</option>
                          <option>10:00</option>
                          <option>10:30</option>
                          <option>11:00</option>
                          <option>11:30</option>
                          <option>12:00</option>
                          <option>12:30</option>
                          <option>13:00</option>
                          <option>13:30</option>
                          <option>14:00</option>
                          <option>14:30</option>
                          <option>15:00</option>
                          <option>15:30</option>
                          <option>16:00</option>
                          <option>16:30</option>
                          <option>17:00</option>
                          <option>17:30</option>
                          <option>18:00</option>
                          <option>18:30</option>
                          <option>19:00</option>
                          <option>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        controlId='time2'
                        type='time2'
                        value={time2}
                        onChange={(e) => setTime2(e.target.value)}
                      >
                        <Form.Control as='select'>
                          <option>עד שעה</option>
                          <option>10:30</option>
                          <option>11:00</option>
                          <option>11:30</option>
                          <option>12:00</option>
                          <option>12:30</option>
                          <option>13:00</option>
                          <option>13:30</option>
                          <option>14:00</option>
                          <option>14:30</option>
                          <option>15:00</option>
                          <option>15:30</option>
                          <option>16:00</option>
                          <option>16:30</option>
                          <option>17:00</option>
                          <option>17:30</option>
                          <option>18:00</option>
                          <option>18:30</option>
                          <option>19:00</option>
                          <option>19:30</option>
                        </Form.Control>
                      </Form.Group>

                      <Button
                        className='link buzz-out-on-hover'
                        id='centermebtn'
                        type='submit'
                      >
                        <i className='fas fa-plus'></i> הוסף שעות אלה ליום
                        העבודה
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
                  <h5 id='block'>
                    סה"כ <span id='boldme'>{workingDay.numTorim}</span>
                    תורים
                  </h5>
                  <h5 id='block'>
                    מתוכם <span id='boldme'>{workingDay.numAvilableTorim}</span>{' '}
                    תורים פנויים
                  </h5>
                  <h4 id='centerme'>
                    <span id='torimAndHahnasot'>סיכום הכנסות</span>
                  </h4>
                  <h5 id='block'>
                    הכנסה יומית צפויה{' '}
                    <span id='boldme'>{workingDay.numTorim * 50}₪</span>{' '}
                  </h5>
                  <h5 id='block'>
                    הכנסה בפועל{' '}
                    <span id='boldme'>
                      {(workingDay.numTorim - workingDay.numAvilableTorim) * 50}
                      ₪
                    </span>{' '}
                  </h5>
                </div>
              </div>
            </div>
          </Col>

          <Col md={9}>
            <div>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>שולם</th>
                    <th>מחיר</th>
                    <th>טיפול</th>
                    <th>נייד</th>
                    <th>לקוח/ה</th>
                    <th>שעה</th>
                    <th>תאריך</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {workingDay.torim

                    .sort((a, b) => {
                      const dateA = new Date(`${a.date} ${a.time}`).valueOf()
                      const dateB = new Date(`${b.date} ${b.time}`).valueOf()
                      if (dateA > dateB) {
                        return 1 // return -1 here for DESC order
                      }
                      return -1 // return 1 here for DESC Order
                    })

                    .map((clock) => (
                      <tr key={clock._id}>
                        <td>{clock.isPaid ? 'v' : 'x'}</td>
                        <td>50</td>
                        <td>תספורת גבר</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{clock.time}</td>
                        <td>{clock.date}</td>
                        <td>
                          <LinkContainer to={`/`}>
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
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
            <Link className='btn btn-light' id='centerme1' to='/admin/torim'>
              חזור
            </Link>
          </Col>
        </>
      )}
    </Row>
  )
}

export default SingleWorkDayScreen

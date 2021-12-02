import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listWorkingDays,
  makeWorkingDay,
  deleteWorkingday,
  workingDayDetails,
} from '../actions/userActions'

import { Calendar, DateObject } from 'react-multi-date-picker'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import gregorian_ar from 'react-date-object/locales/gregorian_ar'
import { addDays } from 'date-fns'

const WorkingDaysScreen = ({ history }) => {
  const dispatch = useDispatch()

  const workingDayList = useSelector((state) => state.workingDayList)
  const { loading, error, workingdays } = workingDayList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const DeleteworkingDay = useSelector((state) => state.DeleteworkingDay)
  const { success: Deletesuccess } = DeleteworkingDay

  const MakeWorkDay = useSelector((state) => state.MakeWorkDay)
  const {
    success: CreateSuccses,
    NewWorkDayloading,
    NewWorkDayerror,
    workingDayInfo,
  } = MakeWorkDay

  const [message, setMessage] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const weekDays = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'שבת']
  const months = [
    'ינואר',
    'פבואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ]
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const [state, setState] = useState({ format: 'DD/MM/YYYY' })

  const convert = (date, format = state.format) => {
    let object = { date, format }
    setState({
      gregorian: new DateObject(object).format(),
      jsDate: date.toDate(),
      ...object,
    })
    let day = `${date.weekDay.number}`
    if (day == 1) {
      day = 'ראשון'
    } else if (day == 2) {
      day = 'שני'
    } else if (day == 3) {
      day = 'שלישי'
    } else if (day == 4) {
      day = 'רביעי'
    } else if (day == 5) {
      day = 'חמישי'
    } else if (day == 6) {
      day = 'שישי'
    } else if (day == 7) {
      day = 'שבת'
    }
    let dateData = `${date.day}/${date.month.number}/${date.year}`
    let id = userInfo._id
    WorkingDaySubmitHandler(dateData, day, id)
  }

  const WorkingDaySubmitHandler = (dateData, day, id) => {
    if (!dateData) {
      setMessage('יום זה לא קיים')
    } else {
      dispatch(makeWorkingDay(dateData, day, id))
    }
  }
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteWorkingday(id))
    }
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listWorkingDays())
      if (workingDayInfo && CreateSuccses) {
        history.push(`/admin/workingday/${workingDayInfo._id}`)
      }
    } else {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
    Deletesuccess,
    CreateSuccses,
    workingDayInfo,
  ])

  return (
    <>
      <h1 id='headlineme'>יומן עבודה</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <div id='centerme1'>
            <Calendar
              value={state.date}
              onChange={convert}
              className='bg-dark'
              format='DD/MM/YYYY'
              weekDays={weekDays}
              months={months}
              minDate={startDate}
              maxDate={addDays(new Date(), 30)}
              locale={gregorian_ar}
              digits={digits}
              mapDays={({ date, today }) => {
                let isWeekend = [6].includes(date.weekDay.index)
                let props = {}
                let result = date.toDays() - today.toDays()

                if (isWeekend)
                  return {
                    disabled: true,
                    style: { color: '#6c757d' },
                  }
                if (result === -1) props.title = 'אתמול'
                if (result === 0) props.title = 'היום'
                if (result === 1) props.title = 'מחר'

                return props
              }}
            />
          </div>
          <Col md={9}>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>הכנסות</th>
                  <th>סה"כ תורים</th>
                  <th>תורים פנויים</th>
                  <th>תאריך</th>
                  <th>יום</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workingdays.length === 0 ? (
                  <Message>
                    {' '}
                    אין תורים במערכת לחץ על התאריך המבוקש ביומן העבודה על מנת
                    ליצור יום עבודה
                  </Message>
                ) : (
                  workingdays.map((workingday) => (
                    <tr key={workingday._id}>
                      <td>{workingday.moneyCount}</td>
                      <td>{workingday.numTorim}</td>
                      <td>{workingday.numAvilableTorim}</td>
                      <td>{workingday.date}</td>
                      <td>{workingday.dayInWeek}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/workingday/${workingday._id}`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(workingday._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            {NewWorkDayloading ? (
              <Loader />
            ) : NewWorkDayerror ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <div></div>
            )}
          </Col>
        </Row>
      )}
    </>
  )
}

export default WorkingDaysScreen

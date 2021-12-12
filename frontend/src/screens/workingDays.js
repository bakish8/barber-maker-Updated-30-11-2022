import swal from 'sweetalert'
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
} from '../actions/userActions'
import { Link } from 'react-router-dom'
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
    swal({
      title: '?אתה בטוח',
      text: 'ברגע שתמחק את יום זה כל התורים בתוכו יעלמו ולא יהיה ניתן להשיבם',
      icon: 'warning',
      buttons: ['ביטול', 'מחק יום עבודה'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteWorkingday(id)).then(
          swal('יום עבודה זה נמחק בהצלחה מהמערכת', {
            icon: 'success',
          })
        )
      } else {
        console.log('your workingday is safe')
      }
    })
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
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
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
            <Table
              bordered
              hover
              responsive
              className='whiteme'
              id='tablewhite'
            >
              <thead id='centertext'>
                <tr id='tableheadlines'>
                  <th>הכנסות</th>
                  <th>סה"כ תורים</th>
                  <th>תורים פנויים</th>
                  <th>יום</th>
                  <th>תאריך</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody id='centertext'>
                {workingdays.length === 0 ? (
                  <Message>
                    {' '}
                    אין תורים במערכת לחץ על התאריך המבוקש ביומן העבודה על מנת
                    ליצור יום עבודה
                  </Message>
                ) : (
                  workingdays
                    .sort(
                      (a, b) =>
                        Date.parse(
                          new Date(a.date.split('/').reverse().join('-'))
                        ) -
                        Date.parse(
                          new Date(b.date.split('/').reverse().join('-'))
                        )
                    )
                    .map((workingday) => (
                      <tr key={workingday._id} id='hoverandblue'>
                        <td>{workingday.moneyCount}</td>
                        <td>{workingday.numTorim}</td>
                        <td>{workingday.numAvilableTorim}</td>
                        <td>{workingday.dayInWeek}</td>
                        <td>{workingday.date}</td>
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

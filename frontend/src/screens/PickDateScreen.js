import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, DateObject } from 'react-multi-date-picker'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import gregorian_ar from 'react-date-object/locales/gregorian_ar'
import { addDays } from 'date-fns'
import { PICKWorkingDay } from '../actions/userActions'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Swal from 'sweetalert2'

const PickDateScreen = ({ location, history, match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const PickWorkingDate = useSelector((state) => state.PickWorkingDate) //* was MakeWorkDay in working days screen** */
  const {
    success: FINDSuccses,
    foundWorkdayloading,
    foundWorkdayerror,
    foundWorkdayInfo,
  } = PickWorkingDate //** */

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
    //let id = userInfo._id
    const id = match.params.id

    WorkingDaySubmitHandler(dateData, day, id)
  }

  const WorkingDaySubmitHandler = (dateData, day, id) => {
    if (!dateData) {
      setMessage('תאריך לא תקין')
    } else {
      dispatch(PICKWorkingDay(dateData, day, id)) //*** */
      console.log(dateData)
      console.log(day)
      console.log(id)
    }
  }
  useEffect(() => {
    if (foundWorkdayInfo && FINDSuccses === true && userInfo) {
      //history.push(`/maketor/${foundWorkdayInfo._id}`) //directly to pick hour
      history.push(`/maketor/${foundWorkdayInfo._id}/picktipul`) //pick tipul
    } else if (foundWorkdayerror) {
      Swal.fire({
        imageUrl: 'https://i.ibb.co/R2f5Yzs/calendar-1-1s-200px.gif',
        title: 'הכל תפוס',
        text: ' בחר תאריך אחר כדי לקבוע תור ',
        confirmButtonText: 'אוקי תודה',
      })
    }
  }, [dispatch, history, FINDSuccses, match, foundWorkdayInfo])

  return (
    <>
      {foundWorkdayloading ? (
        <Loader />
      ) : (
        <Row id=''>
          <Col md={12}>
            <Link id='goback' to='/picksapar'>
              <i class='fas fa-angle-double-right'></i>
            </Link>
          </Col>
          <Col id='z-index-back' md={12}>
            <h2 id='headlineme'>
              {' '}
              <img
                src='https://i.ibb.co/Dk7MrTF/appointment.png'
                id='miniICON'
              />
              בחר תאריך
            </h2>
            <div id=''>
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
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default PickDateScreen

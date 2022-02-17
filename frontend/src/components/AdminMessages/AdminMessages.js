import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect, useRef } from 'react'
import './AdminMessages.css'
import { Modal } from '@material-ui/core'
import { MakeAllMessagesBeWatch } from '../../actions/userActions'
import moment from 'moment-timezone'

const AdminMessages = (props) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [DisplayME, setDisplayME] = useState(false)
  const [DisplayMessages, setDisplayMessages] = useState(false)
  const [date, setdate] = useState('')
  const [PropsListLength, setPropsListLength] = useState('')

  const DisplayMessagesHandler = () => {
    setDisplayMessages(!DisplayMessages)
  }
  const DisplayMessagesHandler2 = () => {
    setDisplayMessages(false)
    dispatch(MakeAllMessagesBeWatch(userInfo._id))
  }
  const TimeConfigraotr = (time) => {
    const calculateMonth = time.substring(0, 4)
    const month = calculateMonth.slice(3)
    const day = time.substring(0, 2)
    const calculateMonth1 = date.substring(0, 4)
    const month1 = calculateMonth1.slice(3)
    const day1 = date.substring(0, 2)
    if (time === date) {
      return 'היום'
    } else {
      const dayPlus1 = parseInt(day) + 1
      const dayPlus2 = parseInt(day) + 2
      console.log(dayPlus1)
      if (month == month1 && dayPlus1 == day1) {
        return 'אתמול'
      } else if (month == month1 && dayPlus2 == day1) {
        return 'שלשום'
      } else {
        return time
      }
    }
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      setDisplayME(true)
      const searchDate = new Date()
      const FormatedSearchDate = moment(searchDate).format()
      const CalculateMonthmonth = FormatedSearchDate.substring(0, 7)
      const month = parseInt(CalculateMonthmonth.slice(-2))
      const CalculateDay = FormatedSearchDate.substring(0, 10)
      const day = CalculateDay.slice(8)
      const year = FormatedSearchDate.substring(0, 4)
      const Dateush = `${day}/${month}/${year}`
      console.log(Dateush)
      console.log(Dateush)
      setdate(Dateush)
    }
    if (!props.list || !props.list.length) {
      setDisplayME(false)
    } else {
      console.log(props.list)
    }
    if (props.list) {
      if (props.list.length) {
        let i = 0
        for (let prop of props.list) {
          if (!prop.watch) {
            i++
          }
        }
        setPropsListLength(i)
      }
      if (PropsListLength === 0) {
        setDisplayME(false)
      }
    }
  }, [userInfo, props.list, PropsListLength])

  return (
    <>
      {DisplayMessages && (
        <div id='yellowbox'>
          <div id='yellowheadete'>הודעות מערכת</div>
          <div id='line123122'></div>
          <div id='messages101'>
            {props.list
              .reverse()

              .map((message) => (
                <>
                  <div
                    className={
                      !message.watch
                        ? 'singlemessage101'
                        : 'singlemessage101Unwatch'
                    }
                  >
                    {message.user.name}
                    <span id='redMeBitel'>
                      {' '}
                      {(message.type = 'cancel' && 'ביטל ')}
                    </span>
                    <span>{`את התור שלו בשעה `}</span>
                    <span id='redMeBitel'> {message.time}</span>
                    <span>{` ביום`}</span>
                    <span id='redMeBitel'> {message.dayinweek}</span>
                    <div id='BefoteThatandThat'>
                      {TimeConfigraotr(message.date)}
                    </div>
                  </div>
                  <div className='notification177UnderLine'></div>
                </>
              ))}
          </div>{' '}
          <button
            onClick={() => DisplayMessagesHandler2()}
            className='MeButton'
          >
            סמן הכל כנקרא
          </button>{' '}
        </div>
      )}
      {DisplayME && (
        <div
          onClick={() => DisplayMessagesHandler()}
          className={
            DisplayMessages ? 'redRoundCircle1202' : 'redRoundCircle12'
          }
        >
          {PropsListLength}
        </div>
      )}
      {!DisplayME && (
        <div
          id={DisplayMessages ? 'transperentBox202' : 'transperentBox'}
          onClick={() => DisplayMessagesHandler()}
        ></div>
      )}
    </>
  )
}
export default AdminMessages

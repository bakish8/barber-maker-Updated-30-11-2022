import React, { useEffect, useState } from 'react'
import './AvilableBox.css'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@material-ui/core'

const AvilableBox = (props) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleCloseShowUserFilter = () => {
    console.log('closing!')
  }

  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)

  const functiondeLaRoma = (id) => {
    console.log(id)
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      console.log('u ar  an admin')
    } else {
      console.log('u ar enot an admin')
    }

    if (props.list) {
      console.log(props.list)
    }
  }, [dispatch, userInfo, props.list])

  return (
    <>
      {stateFORshowingModal ? (
        <Modal
          id='ModalStyle'
          open={setShowUserFilter}
          onClose={() => props.close()}
        >
          <>
            <div className='UserFiltercontainer'>
              {' '}
              <header className='ClockFilterheader'>
                <h4 className='UserFilterTitle'>
                  התורים הפנויים <b id='bidSHaotHaiom'>להיום</b>
                </h4>
              </header>
              <ul id='Clock-Filter' className='ClockClock-list'>
                {props.list &&
                  props.list.map((clock) => (
                    <li>
                      {' '}
                      <div
                        onClick={() => functiondeLaRoma(clock._id)}
                        className='Clock_Zone'
                      >
                        <h4 id='clock-time'>{clock.time}</h4>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  )
}
export default AvilableBox

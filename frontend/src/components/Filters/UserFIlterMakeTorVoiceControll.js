import React, { useEffect, useState } from 'react'
import './UserFilter.css'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import { Modal } from '@material-ui/core'

const UserFIlterMakeTorVoiceControll = (props) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleCloseShowUserFilter = () => {
    console.log('closing!')
  }

  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)

  const functiondeLaRoma = (user, name, phone, image) => {
    props.changeWord(user)
    props.changeName(name)
    props.changePhone(phone)
    props.changeImage(image)
    props.changeStateForShowingConfirmAfterListUser()
  }

  const functiondeLaRoma2 = () => {
    props.changeStateForNewUserWindow(true)
    props.ChangeusertoRegister(props.nameNotFound)
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
            {' '}
            <div onClick={() => functiondeLaRoma2()} id='addNewUser101'>
              <i id='leftttt' class='fas fa-user-plus'></i>
            </div>
            <text id='before'>
              הוסף משתמש חדש <br />
              בשם {props.nameNotFound}
            </text>
            <div className='UserFiltercontainer'>
              {' '}
              <header className='UserFilterheader'>
                <h4 className='UserFilterTitle'>?למי התכוונת</h4>
              </header>
              <ul id='UserFilterresult' className='user-list'>
                {props.list &&
                  props.list.map((user) => (
                    <li>
                      {' '}
                      <div
                        onClick={() =>
                          functiondeLaRoma(
                            user._id,
                            user.name,
                            user.phone,
                            user.image
                          )
                        }
                        className='UserFilterUserInfo'
                      >
                        <h4 id='user-name'>{user.name}</h4>
                        <h5 id='user-phone'>{user.phone}</h5>
                      </div>
                      <img src={user.image} />{' '}
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

export default UserFIlterMakeTorVoiceControll

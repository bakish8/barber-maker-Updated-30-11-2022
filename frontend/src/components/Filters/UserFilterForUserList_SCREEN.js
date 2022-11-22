import React, { useEffect, useState } from 'react'
import './UserFilter.css'
import { listUsers } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import { Modal } from '@material-ui/core'

const UserFilterForUserList_SCREEN = (props) => {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleCloseShowUserFilter = () => {
    console.log('closing!')
  }

  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)

  const result = document.getElementById('UserFilterresult')
  const filter = document.getElementById('UserFilterfilter')
  const listItems = []

  const functiondeLaRoma = (user) => {
    props.changeWord(user)
  }

  const getData = () => {
    const usersList = users
    if (usersList) {
      for (let user of usersList) {
        const li = document.createElement('li')
        li.addEventListener('onclick', console.log('ddddddddddd'))
        li.onclick = function (e) {
          console.log(user._id)
          functiondeLaRoma(user._id)
        }
        listItems.push(li)
        li.innerHTML = `
    <div className='UserFilterUserInfo'>
      <h4 id='user-name'>${user.name}</h4>
<h5 id='user-phone'>0${user.phone}</h5>
    </div>
    <img src=${user.image} /> `
        if (result) {
          result.appendChild(li)
        }
      }
    }
  }

  getData()

  const filterData = (searchValue) => {
    listItems.forEach((user) => {
      if (user.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
        user.classList.remove('hide')
      } else {
        user.classList.add('hide')
      }
    })
  }

  if (filter) {
    filter.addEventListener('input', (e) => filterData(e.target.value))
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      console.log('u ar enot an admin')
    }
  }, [dispatch, userInfo])

  return (
    <>
      {stateFORshowingModal ? (
        <Modal
          id='ModalStyle'
          open={setShowUserFilter}
          onClose={() => props.close()}
        >
          <div className='UserFiltercontainer'>
            <header className='UserFilterheader'>
              <h4 className='UserFilterTitle'>חיפוש משתמשים</h4>
              <small className='UserFilterSubTitle'>
                חפש את המשתמש לפי השם או לפי הנייד שלו{' '}
              </small>
              <input
                type='text'
                id='UserFilterfilter'
                placeholder='חפש'
              ></input>
            </header>

            <ul id='UserFilterresult' className='user-list'>
              {loading ? (
                <div>
                  <h3 id='loadingUSERFILTER'>...טוען</h3>
                  <li>
                    <Loader />
                  </li>
                </div>
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <div></div>
              )}
            </ul>
          </div>
        </Modal>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default UserFilterForUserList_SCREEN

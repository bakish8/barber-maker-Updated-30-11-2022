import React, { useEffect, useState } from 'react'
import './UserFilter.css'
import { listUsers } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { List, ListItem, ListItemSecondaryAction } from '@material-ui/core'
import confirmTor from '../../actions/userActions'
import Swal from 'sweetalert2'
import { Modal } from '@material-ui/core'

const UserFilter = (props) => {
  console.log(props.ChoosenClock)
  console.log(props.selectV)
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const handleCloseShowUserFilter = () => {
    setShowUserFilter(false)
  }
  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [stateFORshowingModal, setstateFORshowingModal] = useState(true)

  const result = document.getElementById('UserFilterresult')
  const filter = document.getElementById('UserFilterfilter')
  const listItems = []

  const functiondeLaRoma = (user, username, userphone, image) => {
    props.changeWordname(username)
    props.changeWordphone(userphone)
    props.changeWordImage(image)

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
          functiondeLaRoma(user._id, user.name, user.phone, user.image)
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
    console.log(searchValue)
    console.log(users)
    console.log(listItems)

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
          close={handleCloseShowUserFilter}
        >
          <div className='UserFiltercontainer'>
            <header className='UserFilterheader'>
              <h4 className='UserFilterTitle'>חיפוש משתמשים</h4>
              <small className='UserFilterSubTitle'>
                חפש את המשתמש אותו תרצה להכניס לתור{' '}
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

export default UserFilter

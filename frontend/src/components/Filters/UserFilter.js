import React, { useEffect, useState } from 'react'
import './UserFilter.css'
import { listUsers } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message'
import Loader from '../Loader'
import { Modal } from '@material-ui/core'
import { BussineslistUsers } from '../../actions/BuissnesActions/Buissnes_User_Actions'

const UserFilter = (props) => {
  const dispatch = useDispatch()

  const BussinesuserList = useSelector((state) => state.BussinesuserList)
  const { loading, error, users } = BussinesuserList

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
      dispatch(BussineslistUsers(props.Bussines_ID))
      //dispatch(listUsers())
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
              <h4 className='UserFilterTitle'>?????????? ??????????????</h4>
              <small className='UserFilterSubTitle'>
                ?????? ???? ???????????? ???????? ???????? ???????????? ????????{' '}
              </small>
              <input
                type='text'
                id='UserFilterfilter'
                placeholder='??????'
              ></input>
            </header>

            <ul id='UserFilterresult' className='user-list'>
              {loading ? (
                <div>
                  <h3 id='loadingUSERFILTER'>...????????</h3>
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

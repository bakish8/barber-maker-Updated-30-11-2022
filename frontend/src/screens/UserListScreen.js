import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    swal({
      title: '?אתה בטוח',
      text: 'ברגע שתמחק את משתמש זה לא יהיה ניתן להשיבו למערכת',
      icon: 'warning',
      buttons: ['ביטול', 'מחק משתמש'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('משתמש זה  נמחק בהצלחה מהמערכת', {
          icon: 'success',
        }).then(dispatch(deleteUser(id)))
      } else {
        console.log('your user is safe')
      }
    })
  }

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>

      <h1 id='headlineme'>משתמשים</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          bordered
          responsive
          className='whiteme'
          id='tablewhiteUserLIST_table'
        >
          <thead>
            <tr id='tableheadlines'>
              <th>אימייל</th>
              <th>נייד</th> <th>שם</th>
              <th></th>
            </tr>
          </thead>
          <tbody id='centertext'>
            {users.map((user) => (
              <tr key={user._id} id='hoverandblue'>
                <td>{user.name}</td>
                <td>
                  <a id='notextdecoration' href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </td>
                <td>{user.phone}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen

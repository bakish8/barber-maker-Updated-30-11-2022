import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser, registerByADMIN } from '../actions/userActions'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import UserFilterForUserList_SCREEN from '../components/Filters/UserFilterForUserList_SCREEN'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [word, setWord] = useState('') /****סטייט שמתקבל מקומפוננט שהוא ילד* */

  const AdminRegister = useSelector((state) => state.AdminRegister)
  const { success } = AdminRegister

  const send_ME_to_User_Page_Function = (id) => {
    history.push(`/admin/user/${id}/edit`)
  }

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      cancelButton: 'btn btn-outline-primary btn-md btn-block',
      confirmButton: 'btn btn-outline-primary btn-md btn-block',
      denyButton: 'btn btn-outline-primary btn-md btn-block',
    },
  })

  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || success) {
      dispatch(listUsers())
    } else {
      history.push('/')
    }

    if (word != '') {
      setShowUserFilter(false)
      history.push(`/admin/user/${word}/edit`)
      setWord('')
    }
  }, [dispatch, history, successDelete, userInfo, success, word])

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
  const CreateClientHandler = async () => {
    const { value: formValues } = await Swal.fire({
      imageUrl: 'https://i.ibb.co/k5YCM8z/animation-200-kyobojkk.gif',
      imageWidth: 100,
      imageHeight: 100,
      title: 'הוסף משתמש חדש ',
      footer: `הססמא שהונפקה ללקוח זה מספר הנייד שהזנת`,
      confirmButtonText: 'רשום משתמש חדש',

      html:
        '<input id="swal-input1" class="swal2-input">' +
        `<label for="swal-input1">${'  '}שם</label>` +
        '<input id="swal-input2" class="swal2-input">' +
        '<label for="swal-input2">אימייל</label>' +
        '<input id="swal-input3" class="swal2-input">' +
        `<label for="swal-input3">${'  '} נייד</label>`,

      focusConfirm: false,
      preConfirm: async () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
        ]
      },
    })

    if (formValues) {
      const name = formValues[0]
      const email = formValues[1]
      const phone = formValues[2]
      const password = formValues[2]
      const image = 'https://i.ibb.co/HN0g1wx/animation-200-kyoiyjcb.gif'
      await dispatch(registerByADMIN(name, email, phone, password, image))
    }
  }
  const Search_Swal_Function = () => {
    swalWithBootstrapButtons
      .fire({
        title: 'בחר דרך חיפוש',
        text: `תוכל לחפש משתמשים קיימים לפי מספר נייד או שם,תוכל גם ליצור משתמש חדש שיקבל את תור זה`,
        imageUrl: 'https://i.ibb.co/hYWCLW3/output-onlinegiftools-1.gif',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'חיפוש',
        color: 'black',
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: `חפש לפי נייד`,
        denyButtonColor: 'rgb(0, 132, 255)',

        cancelButtonText: '(בפיתוח)Siri חפש באמצעות ',
        cancelButtonColor: 'rgb(0, 180, 255)',
        confirmButtonColor: 'rgb(0, 132, 255)',
        confirmButtonText: 'חפש לפי שם',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setShowUserFilter(true)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log('כאן נשים את הלוגיק של החיפוש לפי אימייל או משהו')
          Swal.fire({
            title: 'בפיתוח',
            text: `רכיב זה נמצא בפיתוח`,
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'אוקי,תודה',
          })
        } else if (result.isDenied) {
          setShowUserFilter(true)
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
      <h1 id='headlineme'>לקוחות</h1>{' '}
      <Col className='text-right'>
        <Button id='centermebtnwidh100' onClick={CreateClientHandler}>
          <i className='fas fa-plus'></i> הכנס לקוח חדש
        </Button>
      </Col>
      <Col className='text-right'>
        <Button id='centermebtnwidh100' onClick={Search_Swal_Function}>
          <i class='fas fa-search'></i> חפש לקוח קיים
        </Button>
      </Col>
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
              <th id='widthforUserListDelete'>פעולות</th>
              <th>נייד</th>

              <th>שם</th>
            </tr>
          </thead>
          <tbody id='centertext'>
            {users.map((user) => (
              <tr key={user._id} id='hoverandblue' className='TR_CLASS'>
                <td>
                  {' '}
                  <Button
                    id='sizemefortable3Options'
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i id='IupNow' className='fas fa-trash'></i>
                  </Button>
                  <Button
                    variant='success'
                    id='sizemefortable3Options'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i id='IupNow' class='fas fa-phone-alt'></i>
                  </Button>
                  <Button
                    variant='info'
                    id='sizemefortable3Options'
                    className='btn-sm'
                    onClick={() => send_ME_to_User_Page_Function(user._id)}
                  >
                    <i id='IupNow' class='fas fa-user-edit'></i>
                  </Button>
                </td>

                <td
                  onClick={() => send_ME_to_User_Page_Function(user._id)}
                  id='PhoneTD'
                >
                  0{user.phone}
                </td>

                <td onClick={() => send_ME_to_User_Page_Function(user._id)}>
                  {user.name}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {ShowUserFilter && (
        <UserFilterForUserList_SCREEN
          close={() => setShowUserFilter(false)}
          changeWord={(word) => setWord(word)}
        />
      )}
    </>
  )
}

export default UserListScreen

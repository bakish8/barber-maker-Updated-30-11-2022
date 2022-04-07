import React, { useEffect, useState } from 'react'
import { Table, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../components/Message'
import Loader from '../../../components/Loader'
import {
  listUsers,
  deleteUser,
  registerByADMIN,
} from '../../../actions/userActions'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import {
  AdminSideRegisterAction,
  BussineslistUsers,
} from '../../../actions/BuissnesActions/Buissnes_User_Actions'
import UserListFilter from '../../../components/Business_Components/Filters/UserListFilter'

const AdminNotificationsSettings = ({ history, match }) => {
  const dispatch = useDispatch()
  const BussinesID = match.params.id
  //states
  const [ShowUserFilter, setShowUserFilter] = useState(false)
  const [word, setWord] = useState('') /****chiled state* */
  const AdminSideRegister = useSelector((state) => state.AdminSideRegister)
  const { success } = AdminSideRegister
  const send_ME_to_User_Page_Function = (id) => {
    history.push(`/business/${BussinesID}/admin/user/${id}/edit`)
  }
  const BussinesuserList = useSelector((state) => state.BussinesuserList)
  const { loading, error, users } = BussinesuserList
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

  //useEffect
  useEffect(() => {
    if ((userInfo && userInfo.isAdmin) || success) {
      dispatch(BussineslistUsers(BussinesID))
      //dispatch(listUsers())
    } else {
      history.push(`/business/${BussinesID}`)
    }

    if (word != '') {
      setShowUserFilter(false)
      history.push(`/business/${BussinesID}/admin/user/${word}/edit`)
      setWord('')
    }
  }, [dispatch, history, successDelete, userInfo, success, word])

  //Functions
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
      await dispatch(
        AdminSideRegisterAction(name, email, phone, password, image, BussinesID)
      )
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

  //Return

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <h1 id='headlineme'>הודעות ותזכורות </h1>{' '}
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
              <th id='widthforUserListDelete'>SMS</th>
              <th id='widthforUserListDelete'>Whatsapp</th>

              <th>פעולות</th>
            </tr>
          </thead>
          <tbody id='centertext'>
            {users.map((user) => (
              <tr key={user._id} id='hoverandblue' className='TR_CLASS'>
                <td>
                  {' '}
                  <form>
                    <input type='checkbox' />
                  </form>
                </td>

                <td>
                  <input type='checkbox' />
                </td>

                <td onClick={() => send_ME_to_User_Page_Function(user._id)}>
                  הודעת אישור לנייד של הלקוח בעת קביעת תור ע"י הלקוח
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {ShowUserFilter && (
        <UserListFilter
          close={() => setShowUserFilter(false)}
          changeWord={(word) => setWord(word)}
          BussinesID={BussinesID}
        />
      )}
    </>
  )
}

export default AdminNotificationsSettings

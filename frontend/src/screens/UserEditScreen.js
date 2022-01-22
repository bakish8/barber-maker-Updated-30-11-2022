import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  getUserDetails,
  updateUser,
  updateCommentsForTipul,
} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { TextField } from '@material-ui/core'
import Swal from 'sweetalert2'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [phone, setPhone] = useState('')
  const [commentsForTipul, setcommentsForTipul] = useState('')

  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdateCoomentsForTipul = useSelector(
    (state) => state.userUpdateCoomentsForTipul
  )
  const {
    updade_comments_for_tipul_loading,
    updade_comments_for_tipul_success,
    updade_comments_for_tipul_error,
  } = userUpdateCoomentsForTipul

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setImage(user.image)
        setPhone(user.phone)
        setIsAdmin(user.isAdmin)
        setcommentsForTipul(user.commentsForTipul)
      }

      if (updade_comments_for_tipul_success) {
        dispatch(getUserDetails(userId))

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          },
        })

        Toast.fire({
          icon: 'success',
          title: 'ההערות שהוספת עודכנו בהצלחה',
        })
      }
    }
  }, [
    dispatch,
    history,
    userId,
    user,
    successUpdate,
    updade_comments_for_tipul_success,
  ])

  const submitHandlerForUpdatingComments_For_Tipul = (e) => {
    e.preventDefault()
    dispatch(updateCommentsForTipul({ _id: userId, commentsForTipul }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin, image, phone }))
  }

  return (
    <>
      <Col md={12}>
        <Link id='goback' to='/admin/userlist'>
          <i class='fas fa-angle-double-right'></i>
        </Link>
      </Col>
      <FormContainer>
        <h1 id='headlineme'>{name}</h1>
        <div id='boxforimageDIv'>
          {' '}
          <img id='imageForEditScreen' src={image} />
          <br />
        </div>
        {isAdmin ? (
          <span id='ISadminBlue'>ספר</span>
        ) : (
          <>
            {' '}
            <span id='spaNForEditScreenEXPLAIN'>:הערות הספר</span>
            <Form onChange={(e) => setcommentsForTipul(e.target.value)}>
              <TextField
                multiline
                fullWidth
                id='filled-basic'
                variant='filled'
                value={commentsForTipul}
              />
              <Button
                onClick={submitHandlerForUpdatingComments_For_Tipul}
                type='submit'
                id='centermebtn'
              >
                +הוסף
              </Button>
            </Form>
          </>
        )}

        <span id='spaNForEditScreenEXPLAIN'>:עדכון פרטים</span>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form
            id='formlabelBigger'
            className='whiteme'
            onSubmit={submitHandler}
          >
            <Form.Group controlId='name'>
              <Form.Label>שם</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>כתובת אימייל</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>נייד</Form.Label>
              <Form.Control
                type='phone'
                placeholder='הכנס נייד'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>תמונה </Form.Label>
              <Form.Control
                type='string'
                placeholder='העלה כתובת תמונה (לא חובה)'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='?מנהל'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' id='centermebtn'>
              עדכן
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen

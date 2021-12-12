import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Button type='submit' variant='outline-light' id='tineme'>
        חפש
      </Button>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='חפש מוצרים'
        className=''
      ></Form.Control>
      <Button type='submit' variant='outline-light' id='tineme2'>
        חפש
      </Button>
    </Form>
  )
}

export default SearchBox

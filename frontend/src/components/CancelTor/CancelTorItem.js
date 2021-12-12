import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import './CancelTorItem.css'
import { Button } from 'react-bootstrap'

const CancelTorItem = (props) => {
  return (
    <li>
      <Card className='user-item2__content'>
        <button className='btncancel' onClick={props.onClick}>
          <div className='user-item__image'>
            {props.image ? (
              <Avatar image={props.image} alt={props.name} />
            ) : (
              <i id='userIMGifNotimage' class='fas fa-user-clock'></i>
            )}
          </div>
          <div className='user-item__info'>
            <h2>{props.date} בתאריך</h2>
            <h1>ביום {props.dayInWeek}</h1>
            <h1>{props.time} בשעה</h1>
            <h2 id='saparnamush'> אצל {props.sapar}</h2>
          </div>
        </button>
      </Card>
    </li>
  )
}

export default CancelTorItem

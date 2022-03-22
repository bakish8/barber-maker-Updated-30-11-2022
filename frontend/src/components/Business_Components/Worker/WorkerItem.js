import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../../shared/components/UIElements/Avatar'
import Card from '../../../shared/components/UIElements/Card'
import './WorkerItem.css'

const WorkerItem = (props) => {
  return (
    <li className='user-item1'>
      <Card className='user-item1__content'>
        <Link to={`/business/${props.BusinessID}/maketor/${props.id}`}>
          <div className='user-item1__image'>
            {props.image ? (
              <Avatar image={props.image} alt={props.name} />
            ) : (
              <i id='userIMGifNotimage1' class='fas fa-user-clock'></i>
            )}
          </div>
          <div className='user-item1__info'>
            <h2>{props.name}</h2>
            <h3>0{props.phone}</h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default WorkerItem

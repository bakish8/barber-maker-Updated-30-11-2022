import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import './TipulItem.css'

const TipulItem = (props) => {
  return (
    <li className='user-item1'>
      <Card className='user-item1__content'>
        <Link to={`/maketorr/${props.id}/${props.tipulID}`}>
          <div className='user-item1__image'>
            {props.image ? (
              <Avatar image={props.image} alt={props.name} />
            ) : (
              <i id='userIMGifNotimage1' class='fas fa-user-clock'></i>
            )}
          </div>
          <div className='user-item1__info'>
            <h3>{props.name}</h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}

export default TipulItem

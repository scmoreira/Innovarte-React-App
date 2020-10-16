import React from 'react'

import avatar from './avatar-default.png'

import Media from 'react-bootstrap/Media'

const InfoCard = props => {
    return (
        <>
          <Media id='cardInfo'>
                 {props.userInfo.avatar ? 
                 <img className="mr-3" src={props.userInfo.avatar} alt='ups!' />
                 :
                 <img className="mr-3" src={avatar} alt='ups!' />
                 }
                 <Media.Body className='userInfo'>
                     <h1>Hola {props.userInfo.username}!</h1>
                     <p><span className='text-muted'>{props.userInfo.role}</span> | {props.userInfo.email}</p>
                 </Media.Body>
             </Media>
        </>  
    )
}

export default InfoCard
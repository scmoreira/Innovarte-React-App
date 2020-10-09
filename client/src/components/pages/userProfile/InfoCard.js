import React from 'react'

import avatar from './avatar-default.png'

import Media from 'react-bootstrap/Media'

const InfoCard = ({ loggedInUser }) => {
    return (
        <>
        <Media id='cardInfo'>
            {loggedInUser.avatar ? 
            <img className="mr-3" src={loggedInUser.avatar} alt='ups!' />
            :
            <img className="mr-3" src={avatar} alt='ups!' />
            }
            <Media.Body className='userInfo'>
                <h1>Hola {loggedInUser.username}!</h1>
                <p><small className='text-muted'>{loggedInUser.role}</small> | {loggedInUser.email}</p>
            </Media.Body>
        </Media>
        </>
    )
}

export default InfoCard
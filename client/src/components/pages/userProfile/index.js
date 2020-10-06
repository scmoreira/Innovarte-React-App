import React from 'react'

import './UserProfile.css'

const UserProfile = props => {
    return (
        <div className='container user-profile'>
            <h1>Hello {props.loggedInUser.username}</h1>
        </div>
    )
}

export default UserProfile
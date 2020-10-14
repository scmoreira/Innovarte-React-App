import React, { Component } from 'react'

import avatar from './avatar-default.png'

import Media from 'react-bootstrap/Media'

// class InfoCard extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             name: this.props.userInfo.username,
//             email: this.props.userInfo.email,
//             role: this.props.userInfo.role,
//             avatar: this.props.userInfo.avatar
//         }
//     }

//     render() {
//         return (
//             <>
//             <Media id='cardInfo'>
//                 {this.state.avatar ? 
//                 <img className="mr-3" src={this.state.avatar} alt='ups!' />
//                 :
//                 <img className="mr-3" src={avatar} alt='ups!' />
//                 }
//                 <Media.Body className='userInfo'>
//                     <h1>Hola {this.state.name}!</h1>
//                     <p><small className='text-muted'>{this.state.role}</small> | {this.state.email}</p>
//                 </Media.Body>
//             </Media>
//             </>
//         )
//     }
// }

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
                     <h1>Hola {props.userInfo.name}!</h1>
                     <p><small className='text-muted'>{props.userInfo.role}</small> | {props.userInfo.email}</p>
                 </Media.Body>
             </Media>
        </>  
    )
}

export default InfoCard
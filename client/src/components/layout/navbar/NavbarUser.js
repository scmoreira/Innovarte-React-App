import React from 'react'
import { NavLink } from 'react-router-dom'

import cart from './cart.png'

const NavbarUser = props => {
    return ( 
        <>
            <NavLink to='/perfil' className='nav-link'>Mi cuenta</NavLink>
            <NavLink to='/carrito'><img src={cart} alt='Carrito' className='logo cart'></img></NavLink> 
        </>
    )
}

export default NavbarUser
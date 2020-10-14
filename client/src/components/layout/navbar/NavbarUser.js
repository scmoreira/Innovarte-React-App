import React from 'react'
import { NavLink } from 'react-router-dom'

import Badge from 'react-bootstrap/Badge'

import { CgShoppingCart } from 'react-icons/cg'

const NavbarUser = props => {

    return ( 
        <>
            <NavLink to='/perfil' className='nav-link'>Mi cuenta</NavLink>
            <NavLink to='/carrito'><CgShoppingCart alt='Carrito' className='logo cart' /><Badge style={{color: 'white'}}>{props.cartItems}</Badge></NavLink> 
        </>
    )
}

export default NavbarUser
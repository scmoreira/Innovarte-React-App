import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarGuest = () => {
    return (
        <>
            <NavLink to='/signup' className='nav-link'>Registro</NavLink>
            <NavLink to='/login' className='nav-link'>Inicio sesión</NavLink>
        </>
    )
}

export default NavbarGuest
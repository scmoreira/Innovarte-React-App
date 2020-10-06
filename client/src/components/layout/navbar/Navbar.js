import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import logout from './logout.png'
import cart from './cart.png'
import './Navbar.css'


const Navigation = () => {

    return (

        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' fixed='top' className='navbar'>
            <Link to='/'>
                <Navbar.Brand className='brand'>
                    <img alt='' src='' width='30' height='30' className='d-inline-block align-top' />
                    {' '} Innovarte!
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='ml-auto'>
                    <NavLink to='/obras' className='nav-link' style={{ textDecoration: 'none' }}>Obras</NavLink>
                    <NavLink to='/signup' className='nav-link' style={{ textDecoration: 'none' }}>Signup</NavLink>
                    <NavLink to='/login' className='nav-link' style={{ textDecoration: 'none' }}>Login</NavLink>
                    <NavLink to='/perfil' className='nav-link' style={{ textDecoration: 'none' }}>Mi cuenta</NavLink>
                    <NavLink to='/'><img src={cart} alt='cart' className='logo'></img></NavLink>
                    <NavLink to='/carrito'><img src={logout} alt='logout' className='logo'></img></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )

}

export default Navigation
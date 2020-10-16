import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import authService from './../../../service/auth.service'

import NavbarGuest from './NavbarGuest'
import NavbarUser from './NavbarUser'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { AiOutlinePoweroff } from 'react-icons/ai'
import logo from './Mi_preferido.jpg'

import './Navbar.css'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.authService = new authService()
    }

    logoutUser = () => {
        this.authService
            .logout()
            .then(() => this.props.setTheUser(null))
            .catch(err => console.log(err))
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' fixed='top' className='navbar'>
                <Link to='/'>
                    <Navbar.Brand className='brand'>
                        <img alt='Brand logo' src={logo} width='30' height='30' className='d-inline-block align-top' />
                        {' '} Innovarte!
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ml-auto'>
                        <NavLink to='/obras' className='nav-link'>Obras</NavLink>
                        {!this.props.loggedInUser && <NavbarGuest />}
                        {this.props.loggedInUser && <NavbarUser loggedInUser={this.props.loggedInUser} cartItems={this.props.cartItems}/>}
                        {this.props.loggedInUser && <NavLink to='/' className='nav-link' onClick={this.logoutUser}><AiOutlinePoweroff alt='Cerrar sesión' className='logo logout' /></NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation
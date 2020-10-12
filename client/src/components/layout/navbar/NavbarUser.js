import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Badge from 'react-bootstrap/Badge'

import { CgShoppingCart } from 'react-icons/cg'

//import cart from './cart.png'

class NavbarUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cartCount: 0
        }
    }

    componentDidMount = () => this.setState({ cartCount: this.props.cartCount})

    render() {
        return ( 
            <>
                <NavLink to='/perfil' className='nav-link'>Mi cuenta</NavLink>
                <NavLink to='/carrito'><CgShoppingCart alt='Carrito' className='logo cart' /><Badge style={{color: 'white'}}>{this.state.cartCount}</Badge></NavLink> 
            </>
        )
    }
}

export default NavbarUser
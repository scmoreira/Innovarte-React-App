import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import Badge from 'react-bootstrap/Badge'

import { CgShoppingCart } from 'react-icons/cg'

class NavbarUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userCart: this.props.loggedInUser.cart,
            cartItems: this.props.cartItems
        }
    }

    // componentDidMount = () => this.setNumOfItems()
        
    // setNumOfItems = () => {
        
    //     if (this.props.loggedInUser) {
    //         this.setState({ cartItems: this.state.userCart.length })
    //     } else {
    //         this.setState({ cartItems: this.state.cartItems })
    //     } 
    // } 



    render() {
        console.log('Estado del navbar', this.state.cartItems)
        console.log('Props del navbar',this.props.cartItems)
        
        return ( 
            <>
                <NavLink to='/perfil' className='nav-link'>Mi cuenta</NavLink>
                <NavLink to='/carrito'><CgShoppingCart alt='Carrito' className='logo cart' /><Badge style={{color: 'white'}}>{this.props.cartItems}</Badge></NavLink> 
            </>
        )
    }
}

export default NavbarUser
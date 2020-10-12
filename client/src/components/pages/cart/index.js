import React, { Component } from 'react'



import './Cart.css'

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cart: this.props,
            totalPrice: 0    
        }
    }

    render() {

        return (
            <h1>Carrito</h1>
        )
    }
}

export default Cart
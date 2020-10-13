import React, { Component } from 'react'

import artworksService from '../../../service/artworks.service'
import userService from '../../../service/user.service'

import { MdEuroSymbol } from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'

import './Cart.css'

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cartItemsId: this.props.loggedInUser.cart,
            cartItemsInfo: [],
            totalPrice: 0    
        }

        this.artworksService = new artworksService()
        this.userService = new userService()

    }

    componentDidMount = () => this.loadCart()

    loadCart = () => {
        this.ResetCart()
        this.printCartItems()
    }

    printCartItems = () => {
        let cartItemsCopy =  [...this.state.cartItemsInfo] 
        let totalPriceCopy = 0
        this.state.cartItemsId.forEach(item => {
            this.artworksService
                .getOneArtwork(item)
                .then(response => {
                    cartItemsCopy.push(response.data)
                    totalPriceCopy += response.data.price
                })
                .then(() => {
                    this.setState({ cartItemsInfo: cartItemsCopy })
                    this.setState({ totalPrice: totalPriceCopy })
                })
                .catch(err => console.log({ err }))
        })
    }

    handleOnClick = e => {
        
        this.userService
            .deleteItemFromCart(this.state.user._id, e.target.id)
            .then((response) =>
            {
                this.props.setTheUser(response.data)
                this.props.fetchUser()
                this.UpdateProperties()
                this.loadCart()
            })
            .catch(err => console.log(err))
    }

    UpdateProperties()
    {
        this.setState({ user: this.props.loggedInUser })
        this.setState({ cartItemsId: this.props.loggedInUser.cart })
    }

    ResetCart()
    {
        this.setState({ cartItemsInfo: [] })
        this.setState({ totalPrice: 0 })
    }

    render() {

        return (
            <>
                <h1>Carrito</h1>
                <section>
                    <ul >
                    {this.state.cartItemsInfo.map((item, index) => 
                        
                        <li key={index}>{item.title} | {item.price} {item.currency} | <AiOutlineDelete id={item._id} onClick={this.handleOnClick}><button  /></AiOutlineDelete> </li>
                       
                    )}
                    </ul>
                    <h5>Total: {this.state.totalPrice} <MdEuroSymbol /></h5>
                </section>
            </>
        )
    }
}

export default Cart
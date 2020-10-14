import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import artworksService from '../../../service/artworks.service'
import userService from '../../../service/user.service'

import Payment from '../../pages/payment'
import ItemCard from './ItemCard'

import { MdEuroSymbol } from 'react-icons/md'

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
        this.resetCart()
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

    updateProperties = () => {
        this.setState({ user: this.props.loggedInUser })
        this.setState({ cartItemsId: this.props.loggedInUser.cart })
    }

    resetCart = () => {
        this.setState({ cartItemsInfo: [] })
        this.setState({ totalPrice: 0 })
    }

    handleDelete = (itemId) => {
        this.userService
            .deleteItemFromCart(this.state.user._id, itemId)
            .then((response) =>
            {
                this.props.setTheUser(response.data)
                this.props.fetchUser()
                this.updateProperties()
                this.loadCart()
            })
            .catch(err => console.log(err))
    }

    onClickConfirmPayment = () => {
        this.changeArtworkState()
        this.addBuyedArtworks()
        this.props.history.push('/perfil')
    }

    changeArtworkState = () => {
        this.state.cartItemsId.forEach(item => {
            this.artworksService
                .updateArtworkState(item)
                .then(response => console.log('updateArtworkState', response.data))
                .catch(err => console.log(err))
        })
    }

    addBuyedArtworks = () => {
        console.log('Antes de comprar', this.state.user)
        this.props.loggedInUser.cart.forEach(item => {
            this.userService
                .updateBuyedArtworks(this.state.user._id, item)
                .then(response => {
                    this.props.setTheUser(response.data)
                    this.props.fetchUser()
                    this.resetCart()
                                   })
                .catch(err => console.log(err))
        })
    }

    render() {

        console.log('después de comprar', this.state.user)
        console.log('después de comprar', this.props.fetchUser)

        return (
            <>
            <main id='cart'>
                <section className='container-fluid'>
                    <h1>Hola {this.state.user.username} </h1>
                    {this.state.cartItemsInfo.length === 0 && <h3>Tu cesta está vacía! <Link to='/obras'>Comprar</Link></h3>}
                </section>

                <section className='row cart-body'> 
                    <div className='col-md-7'>
                        <Payment />
                    </div>
                    <div className='col-md-5 items'>
                        <ul >
                            {this.state.cartItemsInfo.map(item => 
                                <ItemCard key={item._id} item={{...item}} handleDelete={this.handleDelete} />
                            )}
                            <div className='payconfirm'>
                                <h5>Total a pagar: {this.state.totalPrice} <MdEuroSymbol /></h5>
                                <button onClick={this.onClickConfirmPayment} className='btn btn-dark'>Confirmar pago</button>
                            </div>
                        </ul>
                        
                    </div>
                 </section>
             </main>
            </>
        )
    }
}

export default Cart
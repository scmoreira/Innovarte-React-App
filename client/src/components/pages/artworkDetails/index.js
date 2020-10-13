import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import artworkService from '../../../service/artworks.service'
import userService from './../../../service/user.service'

import { CgShoppingCart } from 'react-icons/cg'

import Alert from './../../shared/Alert'
import EditArtwork from './../editArtwork'

import Modal from 'react-bootstrap/Modal'

import './ArtworkDetails.css'

class ArtworkDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artwork: {},
            showModal: false,
            showAlert: false
       }

        this.loggedInUser = props.loggedInUser

        this.artworkService = new artworkService()
        this.userService = new userService()
    }

    componentDidMount = () => this.loadArtwork()

    loadArtwork = () => {
        this.artworkService
            .getOneArtwork(this.props.match.params.obra_id)
            .then(response => this.setState({ artwork: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = showModal => this.setState({ showModal })
    handleAlert = showAlert => this.setState({ showAlert })

    finishActions = () => {
        this.handleModal(false)
        this.loadArtwork()
    }

    handleDelete = e => {
        
        e.preventDefault()

        this.artworkService
            .deleteArtwork(this.state.artwork._id)
            .then(() => this.goBack())
            .catch(err => console.log('Error ', {err}))
    }

    handleToCart = () => {
        
        this.userService
            .addItemToCart(this.loggedInUser._id, this.state.artwork._id)
            .then(() => {
                this.props.setCart(this.loggedInUser)
                this.props.fetchUser()
            }
            )
            .catch(err => console.log(err))

    }

    showBuyButton = () => {
        if (this.loggedInUser && this.loggedInUser._id !== this.state.artwork.owner) {
            return true
        } else {
            return false
        }
    }

    showUserButtons = () => {
        if (this.loggedInUser && this.loggedInUser._id === this.state.artwork.owner && this.state.artwork.available === true) {
            return true
        } else {
            return false
        }
    }

    goBack = () => {
        if (this.loggedInUser && this.loggedInUser._id === this.state.artwork.owner) {
            this.props.history.push('/perfil')                // Investigar otro modo de volver hacia atrás, cuando son componentes reusables
            return                                            // y tiene que volver a la página desde donde se ha dirigido a ese componente. 
        } else {
            this.props.history.push('/obras')
            return
        }                                      
    
    }                                           
    
    render() {
        return (
            <section className='container-details'>
                <div className='card container-fluid'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={this.state.artwork.image} className='card-img' alt={this.state.title} thumbnail='true' />
                        </div>
                        <div className='col-md-6 details'>
                            <div className='card-body'>
                                <h5 className='card-title'>{this.state.artwork.title}</h5>
                                <p className='card-text'>de <span className='title'>{this.state.artwork.artist}</span></p>
                                <p className='card-text'>{this.state.artwork.description}</p>
                                <p className='card-text'><small className='text-muted'>Materiales: {this.state.artwork.materials} |
                                Medidas: {this.state.artwork.size} cm.</small></p>
                                <p>Precio: {this.state.artwork.price} {this.state.artwork.currency}</p>

                                {this.showBuyButton() &&
                                    <>
                                    <Link to='/carrito' ><button onClick={this.handleToCart} className='btn btn-dark'>Comprar</button></Link>
                                    <button className='btn btn-dark' onClick={this.handleToCart}><CgShoppingCart className='add-to-cart'/></button> 
                                    </>
                                } 
                                
                                {this.showUserButtons() &&
                                    <>
                                    <button onMouseEnter={()=> this.handleAlert(true)} onClick={this.handleDelete} className='btn btn-danger'>Eliminar</button>
                                    {this.state.showAlert === true && <Alert title="Aviso!" text="Si borras esta obra no podrás recuperarla. Cierra para continuar." />}
                                    <button onClick={() => this.handleModal(true)} className='btn btn-dark'>Editar</button>
                                    </>
                                }
                                <button onClick={this.goBack} className='btn btn-dark'>Atrás</button>
                                {!this.loggedInUser && <p>Regístrate para comprar! <Link to='/signup'>Registro</Link></p>}
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edita tu obra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditArtwork artwork={this.state.artwork} loggedInUser={this.loggedInUser} finishActions={this.finishActions} /> 
                    </Modal.Body>
                </Modal>
            </section>
        )
    }

}

export default ArtworkDetails

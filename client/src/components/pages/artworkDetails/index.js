import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import artworkService from '../../../service/artworks.service'

import EditArtwork from './../editArtwork'

import Modal from 'react-bootstrap/Modal'

import './ArtworkDetails.css'

class ArtworkDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artwork: {},
            showModal: false
        }
        this.loggedInUser = props.loggedInUser
        this.artworkService = new artworkService()
    }

    componentDidMount = () => this.loadArtwork()

    loadArtwork = () => {
        this.artworkService
            .getOneArtwork(this.props.match.params.obra_id)
            .then(response => this.setState({ artwork: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = showModal => this.setState(({ showModal }))

    handleDelete = e => {
        
        e.preventDefault()

        this.artworkService
            .deleteArtwork(this.state.artwork._id)
            .then(response => console.log(response.data))
            .catch(err => console.log('Error ', {err}))
    }

    showBuyButton = () => {
        if (!this.loggedInUser || this.loggedInUser._id != this.state.artwork.owner) {
            return true
        } else {
            return false
        }
    }

    showUserButtons = () => {
        if (this.loggedInUser && this.loggedInUser._id === this.state.artwork.owner) {
            return true
        } else {
            return false
        }
    }

    render() {
        return (
            <section className='container-details'>
                <div className='card'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={this.state.artwork.image} className='card-img' alt={this.state.title} />
                        </div>
                        <div className='col-md-8 details'>
                            <div className='card-body'>
                                <h5 className='card-title'>{this.state.artwork.title}</h5>
                                <p className='card-text'>de <span className='title'>{this.state.artwork.artist}</span></p>
                                <p className='card-text'>{this.state.artwork.description}</p>
                                <p className='card-text'><small className='text-muted'>Materiales: {this.state.artwork.materials} |
                                Medidas: {this.state.artwork.size} cm.</small></p>
                                <p>Precio: {this.state.artwork.price} {this.state.artwork.currency}</p>

                                { this.showBuyButton() && <Link to='/carrito'><button className='btn btn-dark'>Comprar</button></Link> } 
                                
                                {this.showUserButtons() &&
                                    <>
                                    <button onClick={this.handleDelete} className='btn btn-danger'>Eliminar</button>
                                    <button onClick={() => this.handleModal(true)} className='btn btn-dark'>Editar</button>
                                    </>
                                }
                                <Link to='/obras'><button className='btn btn-dark'>Atrás</button></Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edita tu obra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditArtwork artwork={this.state.artwork} loggedInUser={this.loggedInUser} closeModal={() => this.handleModal(false)} refreshList={this.loadArtwork} /> 
                    </Modal.Body>
                </Modal>
            </section>
        )
    }

}

export default ArtworkDetails

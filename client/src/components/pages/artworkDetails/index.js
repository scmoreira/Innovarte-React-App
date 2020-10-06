import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import artworkService from '../../../service/artworks.service'

import './ArtworkDetails.css'


class ArtworkDetails extends Component {
    constructor() {
        super()
        this.state = {}
        this.artworkService = new artworkService()
    }

    componentDidMount = () => {
        this.artworkService
            .getOneArtwork(this.props.match.params.obra_id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <section className='container-details'>
                <div className='card'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={this.state.image} className='card-img' alt={this.state.title} />
                        </div>
                        <div className='col-md-8 details'>
                            <div className='card-body'>
                                <h5 className='card-title'>{this.state.title}</h5>
                                <p className='card-text'>de <span className='title'>{this.state.artist}</span></p>
                                <p className='card-text'>{this.state.description}</p>
                                <p className='card-text'><small className='text-muted'>Materiales: {this.state.materials} | Medidas: {this.state.size} cm.</small></p>
                                <Link to='/carrito'><button className='btn btn-dark'>Comprar</button></Link>
                                <Link to='/obras'><button className='btn btn-dark'>Atrás</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default ArtworkDetails

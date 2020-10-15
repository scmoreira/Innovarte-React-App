import React, { Component } from 'react'

import artworkService from '../../../service/artworks.service'
import ArtworkCard from './ArtworkCard'

import Container from 'react-bootstrap/Container'

import './ArtworksList.css'

class ArtworksList extends Component {

    constructor() {
        super()
        this.state = {
            artworks: []
        }

        this.artworkService = new artworkService()
        this.tagsValues = ['Artesanía', 'Dibujo', 'Escultura', 'Fotografía', 'Pintura', 'Otros', 'Todos']
    }

    componentDidMount = () => this.loadArtworks()

    loadArtworks = () => {
        this.artworkService
            .getAvailableArtworks()
            .then(response => this.setState({ artworks: response.data }))
            .catch(err => console.log('Error:', err))
    }

    handleChange = event => {

        let tag = event.target.value

        if (tag === 'Todos') {

            this.loadArtworks()
            console.log(this.state.artworks)

        } else {
            this.artworkService
                .getArtworksByTag(tag)
                .then(response => this.setState({ artworks: response.data }))
                .catch(err => console.log({err}))
        }
    }

    render() {

        return (
            <>
                <Container fluid id='artList' className='list-container'>
                    <div className='nav-filter container'>
                        <div className='row'>
                            <div className='col-8'>
                                <h1>Todas las obras</h1>
                            </div>
                            <div className='col-4'>
                                <form>
                                    <label>Filtra por</label>
                                    <select onChange={this.handleChange}>
                                        <option>Seleccionar</option>
                                        {this.tagsValues.map((tag, index) => <option key={index} name='tags' value={tag}>{tag}</option>)}
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='container-fluid'>
                        <div className='row'>
                            {this.state.artworks.length >= 1 ? this.state.artworks.map(elm => <ArtworkCard key={elm._id} {...elm} />) : <h5>No hay obras disponibles...<br></br><br></br>Realiza una nueva búsqueda.</h5>}
                        </div>
                    </div>
                </Container>
            </>
        )
    }

}

export default ArtworksList
import React, { Component } from 'react'

import artworkService from './../../../service/artworks.service'
import ArtworkCard from './ArtworkCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import './ArtworksList.css'

class ArtworksList extends Component {

    constructor() {
        super()
        this.state = {
            artworks: []
        }
        this.artworkService = new artworkService()
    }

    componentDidMount = () => this.loadArtworks()

    loadArtworks = () => {
        this.artworkService
            .getAllArtworks()
            .then(response => this.setState({ artworks: response.data }))
            .catch(err => console.log('Error:', err))
    }

    render() {
        return (
            <>
                <Container fluid className='list-container'>
                    <div className='nav-filter'>
                        <h1>Todas las obras</h1>
                        <form>
                            <label>Filtra por</label>
                            <select>
                                <option name='tags' value='Artista'>Artista</option>
                                <option name='tags' value='Pintura'>Pintura</option>
                                <option name='tags' value='Dibujo'>Dibujo</option>
                                <option name='tags' value='Escultura'>Escultura</option>
                                <option name='tags' value='Artesanía'>Artesanía</option>
                                <option name='tags' value='Fotografía'>Fotografía</option>
                                <option name='tags' value='Otros'>Otros</option>
                            </select>
                        </form>
                    </div>
                    <div>
                        <Row>
                            {this.state.artworks.map(elm => <ArtworkCard key={elm._id} {...elm} />)}
                        </Row>
                    </div>
                </Container>
            </>
        )
    }

}




export default ArtworksList
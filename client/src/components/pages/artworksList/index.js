import React, { Component } from 'react'

import artworkService from '../../../service/artworks.service'
import ArtworkCard from './ArtworkCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './ArtworksList.css'

class ArtworksList extends Component {

    constructor() {
        super()
        this.state = {
            artworks: []
        }
        this.artworkService = new artworkService()
        this.tagsValues = ['Pintura', 'Escultura', 'Dibujo', 'Artesanía', 'Fotografía', 'Otros']
    }

    componentDidMount = () => this.loadArtworks()

    loadArtworks = () => {
        this.artworkService
            .getAvailableArtworks()
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
                                <option>Selecciona</option>
                                {this.tagsValues.map((tag, index) => <option key={index} name='tags' value={tag}>{tag} </option>)}
                            </select>
                        </form>
                    </div>
                    <div>
                        <Row>
                            {this.state.artworks && this.state.artworks.map(elm => <ArtworkCard key={elm._id} {...elm} />)}
                        </Row>
                    </div>
                </Container>
            </>
        )
    }

}

export default ArtworksList
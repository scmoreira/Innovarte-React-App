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
            artworks: [],
            //filteredArtworks: [],
            //isFilterCall: false
        }

        this.artworkService = new artworkService()
        this.tagsValues = ['Artesanía', 'Dibujo', 'Escultura', 'Fotografía', 'Pintura', 'Otros']
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
        //let artworksCopy = [...this.state.artworks]

        if (tag === 'todos') {
            this.loadArtworks()

        } else {
            // let isFiltered = artworksCopy.filter(artwork => artwork.tags === tag)
            // this.setState( { artworks: isFiltered })
            this.artworkService
                .getArtworksByTag(tag)
                .then(response => this.setState({ artworks: response.data }))
                .catch(err => console.log({err}))
        }
    }

    render() {

        return (
            <>
                <Container fluid className='list-container'>
                    <div className='nav-filter'>
                        <h1>Todas las obras</h1>
                        <form>
                            <label>Filtra por</label>
                            <select value={this.state.selectedFilter} onChange={this.handleChange}>
                                <option value='todos'>Todos</option>
                                {this.tagsValues.map((tag, index) => <option key={index} name='tags' value={tag}>{tag}</option>)}
                            </select>
                        </form>
                    </div>
                    <div>
                        <Row>
                            {this.state.artworks.length >= 1 ? this.state.artworks.map(elm => <ArtworkCard key={elm._id} {...elm} />) : <h5>No hay obras disponibles...<br></br><br></br>Realiza una nueva búsqueda.</h5>}
                        </Row>
                    </div>
                </Container>
            </>
        )
    }

}

export default ArtworksList
import React, { Component } from 'react'

import artworksService from '../../../service/artworks.service'

import FormsInputs from './../../shared/FormsInputs'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class EditArtwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            update: {
            title: this.props.artwork.title,
            image: this.props.artwork.image,
            description: this.props.artwork.description,
            size: this.props.artwork.size,
            materials: this.props.artwork.materials,
            currency: this.props.artwork.currency,
            price: this.props.artwork.price,
            tags: this.props.artwork.tags,
            artist: this.props.artwork.artist,
            owner: this.props.loggedInUser._id
            }
        }

        this.tagsValues = ['Pintura', 'Escultura', 'Dibujo', 'Artesanía', 'Fotografía', 'Otros']
        this.currenciesValues = ['EUR', 'USD']

        this.artworksService = new artworksService()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ update: { ...this.state.update, [name]: value }})
    }

    handleFormSubmit = e => {
        
        e.preventDefault()
        
        this.artworksService
            .updateArtwork(this.props.artwork._id, this.state.update)
            .then(() => this.props.finishActions())
            .catch(err => console.log('Error!', { err }))
    }

    render() {

        const { title, description, size, materials, price, currency, tags, artist } = this.state.update

        return (

            <Form onSubmit={this.handleFormSubmit}>
                
                <FormsInputs label='Título de la obra' type="text" name="title" value={title} onChange={this.handleChange} />
                <FormsInputs label='Descripción' type="text" name="description" value={description} onChange={this.handleChange} />
                <FormsInputs label='Medidas (en centímetros)' type="text" name="size" value={size} onChange={this.handleChange} placeholder='Ej: 30x50' />
                <FormsInputs label='Materiales' type="text" name="materials" value={materials} onChange={this.handleChange} />
                <FormsInputs label='Precio' type="number" name="price" value={price} onChange={this.handleChange} />
                <Form.Group>
                    <Form.Label>Moneda</Form.Label>
                    <select name='currency' value={currency} onChange={this.handleChange}>
                            <option>Selecciona</option>
                            {this.currenciesValues.map((currency, index) => <option key={index} value={currency}>{currency}</option>)}
                        </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de obra de arte</Form.Label>
                        <select name='tags' value={tags} onChange={this.handleChange}>
                            <option>Selecciona</option>
                            {this.tagsValues.map((tag, index) => <option key={index} value={tag}>{tag}</option>)}
                        </select>
                </Form.Group>
                <FormsInputs label='Nombre de artista' type="text" name="artist" value={artist} onChange={this.handleChange} />
                <Button onClick={() => this.props.finishActions()} variant="dark">Cancelar</Button>
                <Button variant="dark" type="submit">Confirmar</Button>
            </Form>
        )
    }
}

export default EditArtwork
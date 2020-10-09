import React, { Component } from 'react'

import artworksService from '../../../service/artworks.service'

import FormsInputs from './../forms/FormsInputs'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class EditArtwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        this.artworksService = new artworksService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.artworksService
            .updateArtwork(this.props.artwork._id, this.state)
            .then(() => {
                this.props.finishActions()
            })
            .catch(err => console.log('Error!', { err }))
    }

    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>
                
                <FormsInputs label='Título de la obra' type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                <FormsInputs label='Descripción' type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                <FormsInputs label='Imagen' type='text' name='image' value={this.state.image} onChange={this.handleInputChange} />
                <FormsInputs label='Medidas<small>en centímetros</small>' type="text" name="size" value={this.state.size} onChange={this.handleInputChange} placeholder='Ej: 30x50' />
                <FormsInputs label='Materiales' type="text" name="materials" value={this.state.materials} onChange={this.handleInputChange} />
                <FormsInputs label='Precio' type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
                <Form.Group>
                    <Form.Label>Moneda</Form.Label>
                        <select name='currency' value={this.state.currency} onChange={this.handleInputChange}>
                            <option>Selecciona</option>
                            <option value='EUR'>EURO</option>
                            <option value='USD'>DÓLAR</option>
                        </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de obra de arte</Form.Label>
                        <select name='tags' value={this.state.tags} onChange={this.handleInputChange}>
                            <option>Selecciona</option>
                            <option value='Pintura'>Pintura</option>
                            <option value='Escultura'>Escultura</option>
                            <option value='Dibujo'>Dibujo</option>
                            <option value='Artesanía'>Artesanía</option>
                            <option value='Fotografía'>Fotografía</option>
                            <option value='Otros'>Otros</option>
                        </select>
                </Form.Group>
                <FormsInputs label='Nombre de artista' type="text" name="artist" value={this.state.artist} onChange={this.handleInputChange} />
                <Button onClick={() => this.props.finishActions()} variant="dark">Cancelar</Button>
                <Button variant="dark" type="submit">Confirmar</Button>
            </Form>
        )
    }
}

export default EditArtwork
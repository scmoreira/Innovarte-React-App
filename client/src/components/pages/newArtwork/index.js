  
import React, { Component } from 'react'

import artworksService from '../../../service/artworks.service'
import fileUploadService from './../../../service/file-upload.service'

import FormsInputs from './../forms/FormsInputs'
import Alert from './../../shared/Alert'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class NewArtwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            artwork: {
                title: '',
                image: '',
                description: '',
                size: '',
                materials: '',
                currency: 'EUR',
                price: 0,
                tags: 'Otros',
                artist: '',
                owner: this.props.loggedInUser._id
            },
            uploadingImage: false,
            showAlert: false
        }

        this.tagsValues = ['Pintura', 'Escultura', 'Dibujo', 'Artesanía', 'Fotografía', 'Otros']
        this.currenciesValues = ['EUR', 'USD']

        this.artworksService = new artworksService()
        this.fileUploadService = new fileUploadService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ artwork: { ...this.state.artwork, [name]: value } })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.artworksService
            .createArtwork(this.state.artwork)
            .then(() => {
                this.props.finishAction()
                this.props.handleAlert()
            })
            .catch(err => console.log('Error!', { err }))
    }

    // handleImageUpload = e => {

    //     this.setState({ uploadingImage: true })

    //     const uploadData = new FormData()
    //     uploadData.append('image', e.target.files[0])
        
    //     this.fileUploadService
    //         .uploadImage(uploadData)
    //         .then(response => {
    //             this.setState({
    //                 artwork: { ...this.state.artwork, image: response.data.secure_url },
    //                 uploadingImage: null
    //             })
    //         })
    //         .catch(err => console.log('Error', {err}))
    // }

    handleAlert = showAlert => this.setState({ showAlert })

    render() {

        return (

            <Form onSubmit={this.handleFormSubmit}>
                
                <FormsInputs label='Título de la obra' type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                <FormsInputs label='Nombre de artista' type="text" name="artist" value={this.state.artist} onChange={this.handleInputChange} />
                <FormsInputs label='Descripción' type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                <FormsInputs label='Medidas<small>en centímetros</small>' type="text" name="size" value={this.state.size} onChange={this.handleInputChange} placeholder='Ej: 30x50' />
                <FormsInputs label='Materiales' type="text" name="materials" value={this.state.materials} onChange={this.handleInputChange} />
                <FormsInputs label='Precio' type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
                <Form.Group>
                    <Form.Label>Moneda</Form.Label>
                        <select name='currency' value={this.state.currency} onChange={this.handleInputChange}>
                            <option>Selecciona</option>
                            {this.currenciesValues.map((currency, index) => <option key={index} value={currency}>{currency}</option>)}
                        </select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de obra de arte</Form.Label>
                        <select name='tags' value={this.state.tags} onChange={this.handleInputChange}>
                            <option>Selecciona</option>
                            {this.tagsValues.map((tag, index) => <option key={index} value={tag}>{tag}</option>)}
                        </select>
                </Form.Group>
                <FormsInputs label='Imagen' type='text' name='image' onChange={this.handleInputChange} />
                {/* <FormsInputs label='Imagen' type='file' name='image' onChange={this.handleImageUpload} /> */}
                <Button onClick={() => this.props.finishAction()} variant="dark" >Cancelar</Button>
                <Button variant="dark" type="submit" disabled={this.state.uploadingImage}>{this.state.uploadingImage ? 'Subiendo...' : 'Confirmar'}</Button>
                {this.state.uploadingImage === null && <Alert title="Archivo subido" text="Confirma para terminar." />}
            </Form>
        )
    }
}

export default NewArtwork
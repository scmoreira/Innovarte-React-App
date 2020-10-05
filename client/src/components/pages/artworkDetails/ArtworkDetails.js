import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import artworkService from './../../../service/artworks.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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

{/* <Card className='art-details'>
                    <Row>
                        <Col md={4}>
                            <img className='img-details' variant='top' src={this.state.image} alt={this.state.title} />
                        </Col>
                        <Col md={{ span: 6, offset: 1 }}>
                            <Card.Body>
                                <Card.Title>{this.state.title}</Card.Title>
                                <Card.Text>de {this.state.artist}</Card.Text>
                                <Card.Text>{this.state.price} {this.state.currency}</Card.Text>
                                <Card.Text>Materiales: {this.state.materials} | Medidas: {this.state.size} cm.</Card.Text>
                                <Link to='/carrito'><Button variant='dark'>Comprar</Button></Link>
                                <Link to='/obras'><Button variant='dark'>Atrás</Button></Link>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card> */}
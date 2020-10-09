import React, { Component } from 'react'

import artworksService from './../../../service/artworks.service'

import NewArtwork from '../newArtwork'
import InfoCard from './InfoCard'
import ArtworkCard from './../artworksList/ArtworkCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './UserProfile.css'

class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userArtworks: [],
            role: this.props.loggedInUser.role,
            showModal: false
        }
        this.artworksService = new artworksService()
    }

    componentDidMount = () => this.loadArtworks()

    loadArtworks = () => {
        this.artworksService
            .getArtworksUser(this.props.loggedInUser._id)
            .then(response => this.setState({ userArtworks: response.data }))
            .catch(err => console.log('Error', {err}))
    }

    handleModal = showModal => this.setState(({ showModal }))

    finishAction = () => {
        this.handleModal(false)
        this.loadArtworks()
    }

    render() {
        return (
            <>
                <Container className='container user-profile'>
                    <main>
                        <section id='user-details'>
                            <InfoCard loggedInUser={this.props.loggedInUser} />
                            <button onClick={() => this.handleModal(true)} className='btn btn-dark'>Editar perfil</button>
                        </section>
                        <section>
                            <h3>Obras compradas</h3>
                        </section>
                        {this.state.role === 'artista' && <section>
                            <h3>Tus obras</h3>
                            <div className='container-fluid row'>
                                {this.state.userArtworks.map(artwork => <div className='col-sm-12 col-md-4 col-lg-3' key={artwork._id}><ArtworkCard {...artwork} /></div>)}
                            </div>
                            <Button onClick={() => this.handleModal(true)} style={{ marginBottom: '20px' }} variant="dark" size="md">Agregar obra</Button>
                        </section>}
                    </main>
                </Container>

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añade tu obra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewArtwork loggedInUser={this.props.loggedInUser} finishAction={this.finishAction} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UserProfile
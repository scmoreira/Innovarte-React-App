import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import userService from './../../../service/user.service'
import artworksService from '../../../service/artworks.service'

import InfoCard from './InfoCard'
import EditUserProfile from '../editUserProfile'
import NewArtwork from '../newArtwork'
import ProfileArtwork from './ProfileArtwork'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


import './UserProfile.css'

class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            info: {
                username: this.props.loggedInUser.username,
                email: this.props.loggedInUser.email,
                role: this.props.loggedInUser.role,
                password: this.props.loggedInUser.password,
                avatar: this.props.loggedInUser.avatar,
                buyed: this.props.loggedInUser.buyed
            },
            buyedArtworks: [],
            artworksOnSell: [],
            soldArtworks: [],
            showModal: false
        }
        this.userService = new userService()
        this.artworksService = new artworksService()
        
        this.RequestedModalType = undefined

        this.ModalTypes = {
            edit: 'edit',
            create: 'create'
        }
    }

    componentDidMount = () => this.loadArtworks()

    componentDidUpdate(prevProps) {
        if (this.props.loggedInUser.buyed !== prevProps.loggedInUser.buyed) {
            this.setState({ buyedArtworks: [] })
            this.loadBuyedArtworks()
        }
    }

    loadInfo = newInfo => this.setState({ info: newInfo })

    loadArtworks = () => {
        this.loadBuyedArtworks()
        this.loadArtworksOnSell()
        this.loadSoldArtworks()
    }

    loadBuyedArtworks = () => {

        let buyedArtworksCopy = []

        this.props.loggedInUser.buyed.forEach(item => {
            this.artworksService
                .getOneArtwork(item)
                .then(response => {
                    buyedArtworksCopy.push(response.data)
                    this.setState({ buyedArtworks: buyedArtworksCopy })
                })
                .catch(err => console.log({ err }))
        })
    
    }

    loadArtworksOnSell = () => {

        this.userService
            .getOnSellArtworks(this.props.loggedInUser._id)
            .then(response => this.setState({ artworksOnSell: response.data }))
            .catch(err => console.log('Error', {err}))
    }

    loadSoldArtworks = () => {

        this.userService
            .getSoldArtworks(this.props.loggedInUser._id)  
            .then(response => this.setState({ soldArtworks: response.data }))
            .catch(err => console.log('Error', {err}))
    }

    handleModal = (pShowModal, pModalTypes) => this.setState(({ showModal: pShowModal,  RequestedModalType: pModalTypes}))

    finishActions = () => {
        this.handleModal(false)
        this.loadArtworks()
    }

    render() {

        return (
            <>
                <Container fluid id='user-profile'>
                    <main>
                        <section id='user-details'>
                            <div className='container-fluid profile-head'>
                                <div className='col-8'>
                                    <InfoCard userInfo={this.props.loggedInUser} />
                                </div>
                                <div className='col-4 btn-group'>
                                    <Button onClick={() => this.handleModal(true, this.ModalTypes.edit )} variant="dark" size="md">Editar perfil</Button>
                                    {this.state.info.role === 'artista' && <Button onClick={() => this.handleModal(true, this.ModalTypes.create)} variant="dark" size="md">Agregar obra</Button>}
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section className='profile-artworks'>
                            <h3>Obras compradas</h3>
                            <div className='container-fluid row'>
                                {this.state.buyedArtworks.length > 0 ?
                                    this.state.buyedArtworks.map(artwork => <div key={artwork._id} className='col-sm-12 col-md-4 col-lg-3'><ProfileArtwork key={artwork._id} {...artwork} /></div>)
                                    : <h5 className='text-muted no-art-msg'>No tienes obras adquiridas...<Link to='/obras'> Comprar</Link></h5>}
                            </div>
                        </section>
                        <hr />
                            {this.state.info.role === 'artista' &&
                        <>
                        <section>
                            <div>
                                <h3>Tus obras en venta</h3>
                                <div className='container-fluid row'>
                                    {this.state.artworksOnSell.length > 0 ?
                                        this.state.artworksOnSell.map(artwork => <div className='col-sm-12 col-md-4 col-lg-3' key={artwork._id}><ProfileArtwork {...artwork} /></div>)
                                        : <h5 className='text-muted no-art-msg'>No tienes obras en venta...</h5>}
                                </div> 
                            </div>
                        </section>
                        <hr />
                        <section>
                            <div>
                                <h3>Tus obras vendidas</h3>
                                <div className='container-fluid row'>
                                    {this.state.soldArtworks.length > 0 ?
                                        this.state.soldArtworks.map(artwork => <div className='col-sm-12 col-md-4 col-lg-3' key={artwork._id}><ProfileArtwork {...artwork} /></div>)
                                        : <h5 className='text-muted last no-art-msg'>No tienes obras vendidas...</h5>}
                                </div> 
                            </div>
                        </section>
                        </>}
                    </main>
                </Container>

{/*           ******************************************** Modals **********************************************                 */}

                <Modal show={this.state.showModal && this.state.RequestedModalType === this.ModalTypes.edit} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edita tu perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditUserProfile loggedInUser={this.props.loggedInUser} setTheUser={this.props.setTheUser} loadInfo={this.loadInfo} finishActions={this.finishActions} handleModal={this.handleModal} />
                    </Modal.Body>
                </Modal> 

                <Modal show={this.state.showModal && this.state.RequestedModalType === this.ModalTypes.create} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Añade tu obra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <NewArtwork loggedInUser={this.props.loggedInUser} finishActions={this.finishActions} handleModal={this.handleModal}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UserProfile

import React, { Component } from 'react'

import userService from './../../../service/user.service'
import FormsInputs from './../../shared/FormsInputs'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class EditUserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: this.props.loggedInUser.username,
                password: '',
                email: this.props.loggedInUser.email,
                //avatar: this.props.loggedInUser.avatar,
                role: this.props.loggedInUser.role
            }
        }
        this.userService = new userService()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ user: {...this.state.user, [name]: value }})
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.userService
            .updateProfile(this.props.loggedInUser._id, this.state.user)
            .then(() => {
                this.props.loadInfo(this.state.user)
                this.props.finishAction()
            })   
            .catch(err => console.log('Error!', { err }))
    }

    render() {

        const { username, email, password, avatar, role } = this.state.user
        
        return (
            <Container>
                <main>
                    <Row className='justify-content-center'>
                        <Col md={{ span: 5 }}>
                            <h1>Tus datos actuales</h1>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormsInputs label='Nombre de usuario' type='text' name='username' value={username} onChange={this.handleChange} />
                                <FormsInputs label='Email' type='email' name='email' value={email} onChange={this.handleChange} />
                                <FormsInputs label='Contraseña' type='password' name='password' placeholder='*****' value={password} onChange={this.handleChange} />
                                <Form.Group>
                                    <Form.Label>Tipo de obra de arte</Form.Label>
                                        <select name='role' value={role} onChange={this.handleChange}>
                                            <option>Selecciona</option>
                                            <option value='usuario'>Usuario</option>
                                            <option value='artista'>Artista</option>
                                        </select>
                                </Form.Group>
                                <Button variant='dark' type='submit'>Confirmar</Button>
                            </Form>
                        </Col>
                    </Row>
                </main>
            </Container>
        )
    }
}

export default EditUserProfile
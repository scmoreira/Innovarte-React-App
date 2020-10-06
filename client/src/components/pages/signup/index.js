import React, { Component } from 'react'

import authService from './../../../service/auth.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Signup.css'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            avatar: '',
            role: ''
        }
        this.authService = new authService()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(response => { console.log(response.data)
            })
            .catch(err => console.log('Error: ', {err}))
    }

    render() {

        return (
            <Container className='signup-form'>
                <main>
                    <Row className='justify-content-center'>
                        <Col md={{ span: 5 }}>
                            <h1>Registro de usuario</h1>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>* Nombre de usuario</Form.Label>
                                    <Form.Control type='text' name='username' value={this.state.username} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>* Email</Form.Label>
                                    <Form.Control type='email' name='email' value={this.state.email} onChange={this.handleChange} />
                                </Form.Group>
                                    <Form.Label>* Contraseña</Form.Label>
                                    <Form.Control type='password' name='password' placeholder='********' value={this.state.password} onChange={this.handleChange} />
                                <Form.Group>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Imagen de perfil</Form.Label>
                                    <input name='avatar' value={this.state.avatar} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>* Registro como: </Form.Label>
                                    <select name='role'value={this.state.role} onChange={this.handleChange}>
                                        <option>Selecciona</option>
                                        <option value='usuario'>USUARIO</option>
                                        <option value='artista'>ARTISTA</option>
                                    </select>
                                </Form.Group>
                                <Button variant='dark' type='submit'>Registrarme</Button>
                            </Form>
                        </Col>
                    </Row>
                </main>
            </Container>
        )
    }
}

export default Signup
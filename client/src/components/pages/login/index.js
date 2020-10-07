import React, { Component } from 'react'

import authService from './../../../service/auth.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => console.log('Error: ', {err}))
    }

    render() {
        return (
            <Container className='signup-form'>
                <main>
                    <Row className='justify-content-center'>
                        <Col md={{ span: 5 }}>
                            <h1>Inicio de sesión</h1>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type='text' name='username' value={this.state.username} onChange={this.handleChange} placeholder='Tu nombre de usuario' />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type='password' name='password' placeholder='********' value={this.state.password} onChange={this.handleChange} />
                                </Form.Group>
                                <Button variant='dark' type='submit'>Iniciar sesión</Button>
                            </Form>
                        </Col>
                    </Row>
                </main>
            </Container>
        )
    }
}

export default Login
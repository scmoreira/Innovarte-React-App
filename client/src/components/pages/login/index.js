import React, { Component } from 'react'

import authService from './../../../service/auth.service'

import FormsInputs from './../../shared/FormsInputs'

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
                this.props.history.goBack()
            })
            .catch(err => console.log('Error: ', {err}))
    }

    render() {
        return (
            <Container className='login-form'>
                <h1>Inicio de sesión</h1>
                <Form onSubmit={this.handleFormSubmit}>
                    <FormsInputs label='Tu nombre de usuario' type='text' name='username' value={this.state.username} onChange={this.handleChange} placeholder='Tu nombre de usuario' /> 
                    <FormsInputs label='Contraseña' type='password' name='password' placeholder='********' value={this.state.password} onChange={this.handleChange} />
                    <Button variant='dark' type='submit'>Iniciar sesión</Button>
                </Form>
            </Container>
        )
    }
}

export default Login

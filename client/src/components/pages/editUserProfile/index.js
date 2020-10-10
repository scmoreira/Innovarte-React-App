import React, { Component } from 'react'

import authService from './../../../service/auth.service'
import FormsInputs from './../forms/FormsInputs'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './../signup/Signup.css'

class EditUserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: this.props.loggedInUser.username,
            password: '',
            email: this.props.loggedInUser.email,
            avatar: this.props.loggedInUser.avatar,
            role: this.props.loggedInUser.role
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
            .then(response => { 
                this.props.setTheUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => console.log('Error: ', {err}))
    }

    render() {

        const { username, email, password, avatar, role } = this.state
        
        return (
            <Container className='signup-form'>
                <main>
                    <Row className='justify-content-center'>
                        <Col md={{ span: 5 }}>
                            <h1>Tus datos actuales</h1>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormsInputs label='Nombre de usuario' type='text' name='username' value={username} onChange={this.handleChange} placeholder='Tu nombre de usuario' />
                                <FormsInputs label='Email' type='email' name='email' value={email} onChange={this.handleChange} placeholder='Tu email' />
                                <FormsInputs label='Contraseña' type='password' name='password' placeholder='*****' value={password} onChange={this.handleChange} />
                                <FormsInputs label='Imagen de perfil' type='file' name='avatar' value={avatar} onChange={this.handleChange} placeholder='Opcional'  />
                                <Form.Group>
                                    <label>Usuario<input type='radio' name='role' value='usuario' onChange={this.handleChange} /></label>
                                    <label>Artista<input type='radio' name='role' value='artista' onChange={this.handleChange} /></label>
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
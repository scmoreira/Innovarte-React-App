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
                password: this.props.loggedInUser.password,
                email: this.props.loggedInUser.email,
                avatar: this.props.loggedInUser.avatar,
                role: this.props.loggedInUser.role
            }
        }
        this.userService = new userService()
    }

    handleChange = e => {
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value 
        this.setState({ user: { ...this.state.user, [e.target.name]: value } })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        const uploadData = new FormData()

        Object.keys(this.state.user).forEach(key => {
            uploadData.append(key, this.state.user[key])
        })

        this.userService
            .updateProfile(this.props.loggedInUser._id, uploadData)
            .then(response => {
                //this.props.setTheUser(response.data)
                this.props.loadInfo(this.state.user)
                this.props.finishActions(this.state.user)
            }) 
            .catch(err => console.log('Error!', { err }))
            //this.props.fetchUser()
    }

    render() {
        console.log('LoggedInUser' ,this.props.loggedInUser )
        const { username, email, role } = this.state.user
        
        return (
            <Container>
                <main>
                    <Row className='justify-content-center'>
                        <Col md={{ span: 5 }}>
                            <h1>Tus datos actuales</h1>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormsInputs label='Nombre de usuario' type='text' name='username' value={username} onChange={this.handleChange} />
                                <FormsInputs label='Email' type='email' name='email' value={email} onChange={this.handleChange} />
                                <Form.Group>
                                    <Form.Label>Eres: </Form.Label>
                                        <select name='role' value={role} onChange={this.handleChange}>
                                            <option>Selecciona</option>
                                            <option value='usuario'>Usuario</option>
                                            <option value='artista'>Artista</option>
                                        </select>
                                </Form.Group>
                                <FormsInputs label='Imagen' type="file" name="avatar" onChange={this.handleChange} />
                                <Button variant='dark' type='submit' onClick={() => this.props.finishActions()}>Cancelar</Button>
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
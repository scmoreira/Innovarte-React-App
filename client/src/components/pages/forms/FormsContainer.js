import React from 'react'

import Signup from '../signup'
import Login from '../login'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const FormsContainer = props => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm={12} md={6}>
                        <Signup setTheUser={props.setTheUser} {...props} />
                    </Col>    
                    <Col sm={12} md={6}>
                        <Login setTheUser={props.setTheUser} {...props} />
                    </Col>
                </Row>
            </Container>
        </>
   )
}

export default FormsContainer
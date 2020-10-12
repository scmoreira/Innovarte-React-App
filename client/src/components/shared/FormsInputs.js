import React from 'react'

import Form from 'react-bootstrap/Form'

const FormsInputs = props => {
    return (
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
        </Form.Group>
    )
}

export default FormsInputs
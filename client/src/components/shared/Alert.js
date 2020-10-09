import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'

 class Alert extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: true
        }
    }

    render() {

        return (

            <Toast
                onClose={() => this.setState({ visible: false })} show={this.state.visible} delay={3000}
                style={{ position: 'fixed', top:'auto', right: 'auto',  minWidth: 100, color:'red', fontSize: 16}}
            >
                <Toast.Header>
                    <img src="" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">{this.props.title}</strong>
                </Toast.Header>
                <Toast.Body>{this.props.text}</Toast.Body>
            </Toast>
        )
    }
}

export default Alert
import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const ArtworkCard = ({_id, title, artist, currency, price, image, tags}) => {
    return (
        <div >
            <Card className="artwork-card">
                <Image variant="top" src={image} thumbnail/>
                <Card.Body>
                    <h4>{title}</h4>
                    <h5>{tags}<span className='text-muted'> de </span>{artist}</h5>
                    <p>{price} {currency}</p>
                    <Link to={`/obras/detalles/${_id}`} style={{textDecoration: 'none'}}>
                        <Button variant="dark" size="sm" block>Detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ArtworkCard
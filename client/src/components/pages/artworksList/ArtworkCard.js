import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const ArtworkCard = ({_id, title, artist, currency, price, image, tags}) => {
    return (
        <div className=' col-md-6 col-lg-3'>
            <Card className="artwork-card">
                <Image variant="top" src={image} thumbnail/>
                <Card.Body>
                    <h5>{title}</h5>
                    <h6>{tags}<span className='text-muted'> de </span><span className='artist-name'> {artist}</span></h6>
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
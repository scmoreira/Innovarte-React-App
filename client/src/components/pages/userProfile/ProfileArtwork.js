import React from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const ProfileArtwork = ({_id, title, artist, currency, price, image, tags}) => {

    return (
    
        <div>
            <Card id='profile-artwork' className="artwork-card">
                <Image variant="top" src={image} thumbnail/>
                <Card.Body>
                    <h5>{title}</h5>
                    <h6>{tags}<span className='text-muted'> de </span><span className='artist-name'> {artist}</span></h6>
                    <Link to={`/obras/detalles/${_id}`} style={{textDecoration: 'none'}}>
                        <Button variant="dark" size="sm" block>Detalles</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
        
    )
}    
    
export default ProfileArtwork

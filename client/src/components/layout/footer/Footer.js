import React from 'react'

import './Footer.css'

const Footer = () => {

    return (
        <footer bg='dark'>
            <div className='container'>
                <span className='text-muted'><p>{new Date().getFullYear()} Todos los derechos reservados</p></span>
            </div>
            
        </footer>
    )

}

export default Footer
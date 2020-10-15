import React from 'react'

import { CgCopyright } from 'react-icons/cg'

import './Footer.css'

const Footer = () => {

    return (
        <footer bg='dark'>
            <div className='container'>
                <span className='text-muted'><p><CgCopyright className='copyright' />  {new Date().getFullYear()} Todos los derechos reservados</p></span>
            </div>
            
        </footer>
    )

}

export default Footer
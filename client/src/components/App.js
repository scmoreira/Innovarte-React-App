import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import authService from './../service/auth.service'

import Navigation from './layout/navbar/Navbar'
import Home from './pages/home'
import Signup from './pages/signup'
import ArtworksList from './pages/artworksList'
import ArtworkDetails from './pages/artworkDetails'
import Footer from './layout/footer/Footer'

import './App.css'

function App() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route path='/' exact render={() => <Home />} />

          <Route path='/signup' render={props => <Signup {...props} />} />

          <Route path='/obras' exact render={() => <ArtworksList />} />
          <Route path='/obras/detalles/:obra_id' render={props => <ArtworkDetails {...props} />} />
        </Switch>
        <Footer />
    </>
    )
  }
  //}
//}

export default App


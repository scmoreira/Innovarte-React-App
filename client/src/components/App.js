import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navigation from './layout/navbar/Navbar'
import Home from './pages/home/Home'
import ArtworksList from './pages/artworksList/ArtworksList'
import ArtworkDetails from './pages/artworkDetails/ArtworkDetails'
import Footer from './layout/footer/Footer'

import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path='/' exact render={() => <Home />} />
        <Route path='/obras' exact render={() => <ArtworksList />} />
        <Route path='/obras/detalles/:obra_id' render={props => <ArtworkDetails {...props}/>} />
      </Switch>
      <Footer />
   </>
  )
}

export default App

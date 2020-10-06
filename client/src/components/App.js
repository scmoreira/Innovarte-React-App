import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import authService from './../service/auth.service'

import Navigation from './layout/navbar'
import Footer from './layout/footer'

import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import ArtworksList from './pages/artworksList'
import ArtworkDetails from './pages/artworkDetails'
import UserProfile from './pages/userProfile'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
  }

  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({loggedInUser: user}, () => console.log('el usuario es ', this.state.loggedInUser))

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))
  }
  
  render() {
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route path='/' exact render={() => <Home />} />

          <Route path='/signup' render={props => <Signup setTheUser={this.setTheUser} {...props} />} />
          <Route path='/login' render={props => <Login setTheUser={this.setTheUser} {...props} />} />

          <Route path='/obras' exact render={() => <ArtworksList />} />
          <Route path='/obras/detalles/:obra_id' render={props => <ArtworkDetails {...props} />} />
          <Route path='/perfil' render={() => this.state.loggedInUser ? <UserProfile loggedInUser={this.state.loggedInUser} /> : <Redirect to='/login' /> } />
        </Switch>
        <Footer />
    </>
    )
  }
}


export default App


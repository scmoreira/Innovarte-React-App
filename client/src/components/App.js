import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import authService from './../service/auth.service'
import userService from './../service/user.service'

import Navigation from './layout/navbar'
import Footer from './layout/footer'

import Home from './pages/home'
import AuthForms from './pages/authForms/FormsContainer'
import ArtworksList from './pages/artworksList'
import ArtworkDetails from './pages/artworkDetails'
import UserProfile from './pages/userProfile'
import Cart from './pages/cart'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined,
    }
    this.authService = new authService()
    this.userService = new userService()
  }

  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({loggedInUser: user})

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))
  }

  // addToCart = (artwork, user) => {
    
  //   //console.log('id the obra', artwork, 'id de usuario ', user)
  //   let 
  //   this.userService
  //     .updateProfile(user, )
  // }
 

  render() {
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser}  />
        <Switch>
          <Route path='/' exact render={() => <Home />} />

          <Route path='/signup' render={props => <AuthForms setTheUser={this.setTheUser} {...props} />} />
          <Route path='/login' render={props => <AuthForms setTheUser={this.setTheUser} {...props} />} /> 

          <Route path='/obras' exact render={() => <ArtworksList />} />
          <Route path='/obras/detalles/:obra_id' render={props => <ArtworkDetails loggedInUser={this.state.loggedInUser} addToCart={this.addToCart} {...props} />} />
          <Route path='/perfil' render={() => this.state.loggedInUser ? <UserProfile loggedInUser={this.state.loggedInUser}  /> : <Redirect to='/login' /> } />
          <Route path='/carrito' render={props => <Cart loggedInUser={this.state.loggedInUser} {...props} />} />
        </Switch>
        <Footer />
    </>
    )
  }
}

export default App


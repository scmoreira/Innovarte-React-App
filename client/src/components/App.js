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
      cartItems: 0
    }

    this.authService = new authService()
    this.userService = new userService()
    
  }

  componentDidMount = () => { 
    this.fetchUser() }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.loggedInUser !== this.state.loggedInUser) {
      console.log('Entró a update')
      //this.fetchUser()
    }
  }

  setTheUser = user => this.setState({loggedInUser: user})

  fetchUser = () => {

    // if(this.state.loggedInUser == null) {
    this.authService
      .isLoggedIn()
      .then(response => {
        console.log('Response.data' ,response.data)
        this.setState({ loggedInUser: response.data, cartItems: response.data.cart.length })
        this.setNumOfItems()
      })
      .catch(err => this.setState({ loggedInUser: null }))
  }//}

  setCart = user => {
    if (user) {
        this.setState({ loggedInUser: user })
    }   
  }
     
  setNumOfItems = () => {
      
    if (this.state.loggedInUser) {
        console.log('Entro')
          this.setState({ cartItems: this.state.loggedInUser.cart.length })
      } else {
          this.setState({ cartItems: this.state.cartItems })
      } 
  } 
  
  render() {
    console.log('Cartitems de App', this.state.cartItems)
    console.log('LoggedInUser de App', this.state.loggedInUser)
    //this.fetchUser()

    return (
      <>
        <Navigation setTheUser={this.setTheUser} cartItems={this.state.cartItems} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route path='/' exact render={() => <Home />} />

          <Route path='/signup' render={props => <AuthForms setTheUser={this.setTheUser} {...props} />} />
          <Route path='/login' render={props => <AuthForms setTheUser={this.setTheUser} {...props} />} /> 

          <Route path='/obras' exact render={() => <ArtworksList />} />
          <Route path='/obras/detalles/:obra_id' render={props => <ArtworkDetails loggedInUser={this.state.loggedInUser} setCart={this.setCart} fetchUser={this.fetchUser} {...props} />} />
          <Route path='/perfil' render={() => this.state.loggedInUser ? <UserProfile loggedInUser={this.state.loggedInUser}  /> : <Redirect to='/login' /> } />
          <Route path='/carrito' render={props => this.state.loggedInUser ? <Cart loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} fetchUser={this.fetchUser} {...props} /> : <Redirect to='/login' />} />
        </Switch>
        <Footer />
    </>
    )
  }
}

export default App
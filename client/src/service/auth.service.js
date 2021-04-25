import axios from 'axios'

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL ,
            withCredentials: true
        })
    }

    signup = user => this.api.post('/api/signup', user)
    login = user => this.api.post('/api/login', user)
    logout = () => this.api.post('/api/logout')
    isLoggedIn = () => this.api.get('/api/loggedin')

}

export default AuthService
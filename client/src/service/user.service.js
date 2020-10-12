import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    //Methods
    updateProfile = (id, data) => this.api.put(`/editProfile/${id}`, data)
    uploadProfileImage = (id, avatar) => this.api.put(`editProfileImage/${id}`, avatar)

    getAllArtworks = id => this.api.get(`/allUserArtworks/${id}`)
    getBuyedArtworks = id => this.api.get(`/buyedArtworks/${id}`)
    getSoldArtworks = id => this.api.get(`/soldArtworks/${id}`)
    getOnSellArtworks = id => this.api.get(`onSellArtworks/${id}`)

    getCart = id => this.api.get(`/cart/${id}`)
    
}

export default UserService
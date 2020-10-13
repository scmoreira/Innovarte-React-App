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

    getAllArtworks = id => this.api.get(`/allUserArtworks/${id}`)
    getBuyedArtworks = id => this.api.get(`/buyedArtworks/${id}`)
    getSoldArtworks = id => this.api.get(`/soldArtworks/${id}`)
    getOnSellArtworks = id => this.api.get(`onSellArtworks/${id}`)

    getCart = id => this.api.get(`/cart/${id}`)
    addItemToCart = (userId, artworkId) => this.api.put(`/addToCart/${userId}/${artworkId}`)
    deleteItemFromCart = (userId, artworkId) => this.api.put(`deleteFromCart/${userId}/${artworkId}`)
}

export default UserService
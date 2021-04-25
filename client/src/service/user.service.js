import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL ,
            withCredentials: true
        })
    }

    //Methods
    updateProfile = (id, data) => this.api.put(`/api/editProfile/${id}`, data)

    getAllArtworks = id => this.api.get(`/api/allUserArtworks/${id}`)
    getSoldArtworks = id => this.api.get(`/api/soldArtworks/${id}`)
    getOnSellArtworks = id => this.api.get(`/api/onSellArtworks/${id}`)

    getCart = id => this.api.get(`/api/cart/${id}`)
    addItemToCart = (userId, artworkId) => this.api.put(`/api/addToCart/${userId}/${artworkId}`)
    deleteItemFromCart = (userId, artworkId) => this.api.put(`/api/deleteFromCart/${userId}/${artworkId}`)
    updateBuyedArtworks = (userId, artworkId) => this.api.put(`/api/updateBuyedArtworks/${userId}/${artworkId}`)
}

export default UserService
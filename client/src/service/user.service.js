import axios from 'axios'

class UserService {

    constructor() {

        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
        })
    }

    //Methods
    updateProfile = (id, data) => this.api.put(`/editProfile/${id}`, data)

    getAllArtworks = id => this.api.get(`/allUserArtworks/${id}`)
    getSoldArtworks = id => this.api.get(`/soldArtworks/${id}`)
    getOnSellArtworks = id => this.api.get(`onSellArtworks/${id}`)

    getCart = id => this.api.get(`/cart/${id}`)
    addItemToCart = (userId, artworkId) => this.api.put(`/addToCart/${userId}/${artworkId}`)
    deleteItemFromCart = (userId, artworkId) => this.api.put(`deleteFromCart/${userId}/${artworkId}`)
    updateBuyedArtworks = (userId, artworkId) => this.api.put(`/updateBuyedArtworks/${userId}/${artworkId}`)
}

export default UserService
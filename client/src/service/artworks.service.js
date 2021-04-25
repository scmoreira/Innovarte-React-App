import axios from 'axios'

class ArtworkService {

    constructor() {

        this.api = axios.create({
            baseURL: 'http://localhost:5000/' || process.env.REACT_APP_API_URL ,
            withCredentials: true
        })
    }

    //Methods
    getAllArtworks = () => this.api.get('/api/getAllArtworks')
    getOneArtwork = id => this.api.get(`/api/getOneArtwork/${id}`)
    getUserArtworks = id => this.api.get(`/api/getUserArtworks/${id}`)
    getArtistArtworks = artist => this.api.get(`/api/getArtistArtworks/${artist}`)
    getArtworksByTag = tag => this.api.get(`/api/getArtworksByTag/${tag}`)
    getAvailableArtworks = () => this.api.get('/api/getAvailableArtworks')
    
    createArtwork = artwork => this.api.post('/api/newArtwork', artwork)
    updateArtwork = (id, artwork) => this.api.put(`/api/editArtwork/${id}`, artwork)
    updateArtworkState = id => this.api.put(`/api/artworkSold/${id}`)
    deleteArtwork = (id) => this.api.delete(`/api/${id}/deleteArtwork`)
}

export default ArtworkService




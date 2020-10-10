import axios from 'axios'

class ArtworkService {

    constructor() {

        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    //Methods
    getAllArtworks = () => this.api.get('/getAllArtworks')
    getOneArtwork = id => this.api.get(`/getOneArtwork/${id}`)
    getUserArtworks = id => this.api.get(`/getUserArtworks/${id}`)
    getArtistArtworks = artist => this.api.get(`/getArtistArtworks/${artist}`)
    getArtworksByTag = tag => this.api.get(`/getArtworksByTag/${tag}`)
    createArtwork = artwork => this.api.post('/newArtwork', artwork)
    updateArtwork = (id, artwork) => this.api.put(`/editArtwork/${id}`, artwork)
    deleteArtwork = (id) => this.api.delete(`/${id}/deleteArtwork`)
}

export default ArtworkService




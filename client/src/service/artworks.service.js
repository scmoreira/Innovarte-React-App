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
    createArtwork = artwork => this.api.get('/newArtwork', artwork)
    updateArtwork = (id, artwork) => this.api.get(`/editArtwork/${id}`, artwork)
    deleteArtwork = (id) => this.api.get(`/${id}/deleteArtwork`)

}

export default ArtworkService




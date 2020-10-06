# **Innovarte-React-App**

## E-commerce of artworks made with React.js

## API endpoints

### Artworks

| Method | Path   | Description |
| ------ | ------ | ----------- |
| `GET` | api/getAllArtworks | Get all the artworks |
| `GET` | api/getOneArtwork/:artwork_id | Get one artwork |
| `POST` | api/newArtwork | Add a new artwork |
| `PUT` | api/editArtwork/:artwork_id | Edit an artwork |
| `DELETE` | api/:artwork_id/deleteArtwork | Delete an artwork |

### Users

| Method | Path   | Description |
| ------ | ------ | ----------- |
| `POST` | api/signup | Signup new user |
| `POST` | api/login | Login session |
| `POST` | api/logout | Logout session |
| `GET` | api/loggedin | Maintain session opened |

## Components

- App
- Layout
  - Navbar
  - Footer
- Pages
  - Home
  - Artworks List
    - Artwork Card
  - Artwork Details
    - Artwork Card Details
  - Login
  - Signup
  - New Artwork
  - User Profile
- Shared 

## Models

- Artwork
  - Title
  - Image
  - Description
  - Size
  - Materials
  - Currency
  - Price
  - Tags (Type of artwork)
  - Artist
  - Owner (User ID)

- User
  - Username
  - Password
  - Avatar
  - Email
  - Role


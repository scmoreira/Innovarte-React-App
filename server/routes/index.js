module.exports = app => {

    // Base URLS
    app.use('/api', require('./artworks.routes.js'))
    app.use('/api', require ('./user.routes.js'))
    app.use('/api', require('./auth.routes.js'))
}
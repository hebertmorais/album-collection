
module.exports = function (app) {
    app.use('/api/', require('./routes/album.js'));
};
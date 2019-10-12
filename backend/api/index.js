
module.exports = function (app) {
    console.log("hello");
    app.use('/api/', require('./routes/album.js'));
};
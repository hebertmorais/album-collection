var express = require('express');
const router = express.Router();

var AlbumServiceClass = require('../../services/album.js')

router.get('/', function (req, res) {
    var albumService = new AlbumServiceClass();
    const getAllAlbums = albumService.getAllAlbums();
    res.json(getAllAlbums);
});

module.exports = router;

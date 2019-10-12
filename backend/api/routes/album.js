var express = require('express');

const router = express.Router();

const AlbumServiceClass = require('../../services/album.js')
const albumService = new AlbumServiceClass();

router.get('/', function (req, res) {
    let response;
    var query = req.query.q;
    if (query) {
        response = albumService.queryAlbum(query);
    } else {
        response = albumService.getAllAlbums();
    }

    res.json(response);
});

router.post('/album', function (req, res) {
    let albumDTO = req.body;
    let response = albumService.addAlbum(albumDTO);
    res.json(response);
});

router.put('/album/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let albumDTO = req.body;
    let response = albumService.editAlbum(id, albumDTO);
    res.json(response);
});

router.delete('/album/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let response = albumService.deleteAlbum(id);
    res.json(response);
});

module.exports = router;

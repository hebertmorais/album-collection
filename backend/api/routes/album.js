var express = require('express');

const router = express.Router();

const AlbumServiceClass = require('../../services/album.js')
const albumService = new AlbumServiceClass();

router.get('/', async (req, res) => {
    let response;
    var query = req.query.q;
    if (query) {
        response = albumService.queryAlbum(query);
    } else {
        response = albumService.getAllAlbums();
    }

    response.then(result => {
        res.json(result);
    });

});

router.post('/album', (req, res) => {
    let albumDTO = req.body;
    let response = albumService.addAlbum(albumDTO);

    response.then(result => {
        res.json(result);
    });
});

router.put('/album/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let albumDTO = req.body;
    let response = albumService.editAlbum(id, albumDTO);

    response.then(result => {
        res.json(result);
    });
});

router.delete('/album/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let response = albumService.deleteAlbum(id);

    response.then(result => {
        res.json(result);
    });
});

module.exports = router;

var express = require('express');
var multer = require('multer');
const variables = require('../../config/variables');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${variables.uploadsFolder}`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

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

router.post('/album', upload.single('artwork'), (req, res) => {
    let albumDTO = req;
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

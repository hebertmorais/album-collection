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
        console.log("success");
        res.json(result);
    }).catch(error => {
        console.log("fail");

        res.status(400).json({ error: error.toString() });
    });

});

router.post('/album', upload.single('image'), (req, res) => {
    let albumDTO = req;
    let response = albumService.addAlbum(albumDTO);

    response.then(result => {
        res.json(result);
    }).catch(error => {
        res.status(400);
    });
});

router.put('/album/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let albumDTO = req.body;
    let response = albumService.editAlbum(id, albumDTO);

    response.then(result => {
        res.json(result);
    }).catch(error => {
        res.status(400);
    });
});

router.delete('/album/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let response = albumService.deleteAlbum(id);

    response.then(result => {
        res.json(result);
    }).catch(error => {
        res.status(400);
    });
});

module.exports = router;

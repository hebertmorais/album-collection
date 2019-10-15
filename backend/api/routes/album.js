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

    try {
        if (query) {
            response = await albumService.queryAlbum(query);
        } else {
            response = await albumService.getAllAlbums();
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

});

router.post('/album', upload.single('image'), async (req, res) => {
    let albumDTO = req;

    try {
        const response = await albumService.addAlbum(albumDTO);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

});

router.put('/album/:id', upload.single('image'), async (req, res) => {
    let id = parseInt(req.params.id);
    let albumDTO = req;

    try {
        const response = await albumService.editAlbum(id, albumDTO);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.delete('/album/:id', async (req, res) => {
    let id = parseInt(req.params.id);

    try {
        const response = await albumService.deleteAlbum(id);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;

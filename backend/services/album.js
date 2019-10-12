var AlbumModelClass = require('../models/album');
var albumModel = new AlbumModelClass();

module.exports = function () {
    function addAlbum() {
        return albumModel.addAlbum();
    }

    function editAlbum() {
        return albumModel.editAlbum();
    }

     this.getAllAlbums = function () {
        return albumModel.getAllAlbums();
    }

    function removeAlbum() {
        return albumModel.removeAlbum();
    }

    function queryAlbum() {
        return albumModel.queryAlbum();
    }
}
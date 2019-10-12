var AlbumModelClass = require('../models/album');
var albumModel = new AlbumModelClass();

module.exports = function () {
    this.addAlbum = function (album) {
        return albumModel.addAlbum(album);
    }

    this.editAlbum = function (album) {

        return albumModel.editAlbum(album);
    }

    this.getAllAlbums = function () {
        return albumModel.getAllAlbums();
    }

    this.removeAlbum = function (album) {
        return albumModel.removeAlbum();
    }

    this.queryAlbum = function (query) {
        return albumModel.queryAlbum(query);
    }

    this.deleteAlbum = function (album) {
        return albumModel.deleteAlbum(album.id);
    }
}
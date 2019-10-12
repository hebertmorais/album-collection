var AlbumModelClass = require('../models/album');
var albumModel = new AlbumModelClass();

module.exports = function () {
    this.addAlbum = function (album) {
        return albumModel.addAlbum(album);
    }

    this.editAlbum = function (id, album) {
        return albumModel.editAlbum(id, album);
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

    this.deleteAlbum = function (albumId) {
        return albumModel.deleteAlbum(albumId);
    }
}
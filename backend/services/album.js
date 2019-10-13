var AlbumModelClass = require('../models/album');
var albumModel = new AlbumModelClass();

module.exports = function () {
    this.addAlbum = async function (album) {
        return albumModel.addAlbum(album);
    }

    this.editAlbum = async function (id, album) {
        return albumModel.editAlbum(id, album);
    }

    this.getAllAlbums = async function () {
        return await albumModel.getAllAlbums();
    }

    this.removeAlbum = async function (album) {
        return albumModel.removeAlbum();
    }

    this.queryAlbum = async function (keyword) {
        return albumModel.queryAlbum(keyword);
    }

    this.deleteAlbum = async function (albumId) {
        return albumModel.deleteAlbum(albumId);
    }
}
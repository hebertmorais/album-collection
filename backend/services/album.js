var AlbumModelClass = require('../models/album');
var albumModel = new AlbumModelClass();

module.exports = function () {
    this.addAlbum = async function (album) {
        try {
            const response = await albumModel.addAlbum(album);
            return response;
        } catch (error) {
            throw error;
        }
    }

    this.editAlbum = async function (id, album) {
        try {
            const response = albumModel.editAlbum(id, album);
            return response;
        } catch (error) {
            throw error;
        }
    }

    this.getAllAlbums = async function () {
        try {
            const response = await albumModel.getAllAlbums();
            return response;
        } catch (error) {
            throw error;
        }
    }

    this.removeAlbum = async function (album) {
        try {
            const response = await albumModel.removeAlbum();
            return response;
        } catch (error) {
            throw error;
        }
    }

    this.queryAlbum = async function (keyword) {
        try {
            const response = await albumModel.queryAlbum(keyword);
            return response;
        } catch (error) {
            throw error;
        }
    }

    this.deleteAlbum = async function (albumId) {
        try {
            const response = await albumModel.deleteAlbum(albumId);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
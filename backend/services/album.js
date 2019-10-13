var AlbumModelClass = require('../models/album');
const albumModel = new AlbumModelClass();
var UtilClass = require('../utils/validation');
const utils = new UtilClass();

module.exports = function () {
    this.addAlbum = async function (album) {
        let validationError = this.validateFields(album);

        if (Object.keys(validationError).length > 0) {
            throw validationError;
        } else {
            try {
                const response = await albumModel.addAlbum(album, true);
                return response;
            } catch (error) {
                throw error;
            }
        }
    }

    this.editAlbum = async function (id, album) {
        let validationError = this.validateFields(album, false);

        if (Object.keys(validationError).length > 0) {
            throw validationError;
        } else {
            try {
                const response = albumModel.editAlbum(id, album);
                return response;
            } catch (error) {
                throw error;
            }
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
        if (!albumId)
            throw ({ id: "O id não pode ser vazio" })

        try {
            const response = await albumModel.deleteAlbum(albumId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    this.validateFields = function (album, inserting_album) {
        let error = {}
        let artist_name = album.body.artist_name;
        let album_name = album.body.album_name;
        let release_date = album.body.release_date;
        let genre = album.body.genre;

        if (Object.keys(album.body).length == 0)
            return { "empty_fields": "A requisição não contém parâmetros;" };

        let mandatory_message = "A string é obrigatória e não pode ser vazia;";

        if (inserting_album) {
            if (!artist_name)
                error["artist_name"] = mandatory_message;
            if (!album_name)
                error["album_name"] = mandatory_message;
            if (!release_date)
                error["release_date"] = mandatory_message;
            if (!genre)
                error["genre"] = mandatory_message;
        }

        if (artist_name && !(artist_name.trim().length > 0 && artist_name.trim().length < 256)) {
            error["artist_name"] = "O tamanho da string deve ser maior que 0 e menor que 256";
        }

        if (album_name && !(album_name.trim().length > 0 && album_name.trim().length < 256)) {
            error["album_name"] = "O tamanho da string deve ser maior que 0 e menor que 256";
        }
        if (genre && !(genre.trim().length > 0 && genre.trim().length < 256)) {
            error["genre"] = "O tamanho da string deve ser maior que 0 e menor que 256";
        }

        let empty = "";
        let not_valid = "";

        if (release_date && !utils.isValidDate(release_date))
            not_valid = "A data não parece ser válida";
        if (empty || not_valid)
            error["release_date"] = (empty + not_valid).trim();

        return error;


    }
}
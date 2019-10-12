//var db = require('../config/database');

module.exports = function () {

    this.addAlbum = function (album) {
        var sqlStatement = "INSERT INTO album(artist_name, album_name, release_date, genre) VALUES ?";
        var values = [
            [album.artist_name, album.album_name, album.release_date, genre]
        ]
        return { sqlStatement, values };
    }

    this.editAlbum = function (albumId) {
        var sqlStatement = "UPDATE album SET artist_name = ?, album_name = ?, release_date = ?, genre = ? where id = ?";
        var values = [
            [album.artist_name, album.album_name, album.release_date, genre]
        ]
        return { sqlStatement, values };
    }

    this.getAllAlbums = function () {
        var sqlStatement = "SELECT * FROM album"
        return { sqlStatement };
    }

    this.removeAlbum = function (albumId) {
        var sqlStatement = "DELETE FROM album where id=" += albumId;
        return { sqlStatement };


    }

    this.queryAlbum = function (query) {
        var sqlStatement = `SELECT * FROM album WHERE (artist_name LIKE %'${query}'% or album_name LIKE %'${query}'% or genre LIKE %'${query}'% )`;
        return { sqlStatement };
    }
}






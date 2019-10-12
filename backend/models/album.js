const mysql = require('mysql2/promise');
const db = require('../config/database');

module.exports = function () {

    this.addAlbum = function (album) {
        var sqlStatement = "INSERT INTO albums(artist_name, album_name, release_date, genre) VALUES ?";
        var values = [
            [album.artist_name, album.album_name, album.release_date, album.genre]
        ]
        return { sqlStatement, values };
    }

    this.editAlbum = function (albumId, album) {
        var sqlStatement = "UPDATE albums SET artist_name = ?, album_name = ?, release_date = ?, genre = ? where id = ?";
        var values = [
            [album.artist_name, album.album_name, album.release_date, album.genre, albumId]
        ]
        return { sqlStatement, values };
    }

    this.getAllAlbums = async function () {
        var sqlStatement = 'SELECT artist_name, album_name, release_date, genre FROM albums';

        const connection = await this.connect();

        const result = await connection.execute(sqlStatement);

        return result[0];


    }

    this.deleteAlbum = function (albumId) {
        var sqlStatement = "DELETE FROM albums where id=" + albumId;
        return { sqlStatement };


    }

    this.queryAlbum = function (query) {
        var sqlStatement = `SELECT * FROM albums WHERE (artist_name LIKE %'${query}'% or album_name LIKE %'${query}'% or genre LIKE %'${query}'% )`;
        return { sqlStatement };
    }

    this.connect = async function () {
        const connection = await mysql.createConnection({
            host: db.host,
            user: db.user,
            password: db.password,
            database: db.database
        });

        return connection;
    }
}






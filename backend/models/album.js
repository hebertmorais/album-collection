const mysql = require('mysql2/promise');
const db = require('../config/database');
const variables = require('../config/variables');
var UtilClass = require('../utils/validation');
const utils = new UtilClass();

let serverUrl = `${variables.protocol}://${variables.hostname}:${variables.port}/`;
module.exports = function () {
    // multipart/form-data
    this.addAlbum = async function (album) {
        var sqlStatement = "INSERT INTO albums(artist_name, album_name, release_date, genre, artwork) VALUES (?,?,STR_TO_DATE(?,'%d/%m/%Y'),?,?)";

        var values = [album.body.artist_name, album.body.album_name, album.body.release_date, album.body.genre, album.file ? `${serverUrl}${variables.uploadsFolder}/${album.file.originalname}` : ''];

        try {
            let query = await this.dbQuery(sqlStatement, values)
            return query[0];
        } catch (error) {
            throw error;
        }
    }

    // multipart/form-data
    this.editAlbum = async function (albumId, album) {
        let values = [];
        let attributes = [];

        for (let key of Object.keys(album.body)) {
            attributes.push(`${key} = ?`);
            if (key == "release_date")
                values.push(utils.formatDate(album.body[key]));

            else values.push(album.body[key]);
        }

        if (album.file) {
            let imageUrl = `${serverUrl}${variables.uploadsFolder}/${album.file.originalname}`;
            attributes.push(`artwork = ?`);
            values.push(imageUrl);
        }

        values.push(albumId);

        var sqlStatement = `UPDATE albums SET ${attributes.toString()} where id = ?`;
        try {
            let query = await this.dbQuery(sqlStatement, values)
            return query[0];
        } catch (error) {
            throw error;
        }
    }

    this.getAllAlbums = async function () {
        var sqlStatement = 'SELECT * FROM albums';

        try {
            let query = await this.dbQuery(sqlStatement)
            return query[0];
        } catch (error) {
            throw error;
        }
    }

    this.deleteAlbum = async function (albumId) {
        var sqlStatement = "DELETE FROM albums where id=" + albumId;

        try {
            let query = await this.dbQuery(sqlStatement)
            return query[0];
        } catch (error) {
            throw error;
        }


    }

    this.queryAlbum = async function (search) {
        let keyword = '%' + search + '%';

        var sqlStatement = `SELECT artist_name, album_name, release_date, genre FROM albums WHERE artist_name LIKE '${keyword}' or album_name LIKE '${keyword}' or genre LIKE '${keyword}'`;
        try {
            let query = await this.dbQuery(sqlStatement)
            return query[0];
        } catch (error) {
            throw error;
        }
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

    this.dbQuery = async function (sqlStatement, values) {
        //console.log(sqlStatement, values);
        try {
            const connection = await this.connect();
            const result = await connection.execute(sqlStatement, values || []);
            return result;
        }
        catch (error) {
            throw ({ error: error.toString() });
        }

    }
}






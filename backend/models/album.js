//var db = require('../config/database');

module.exports = function () {
    function addAlbum() {
        return "addAlbum";
    }

    function editAlbum() {
        return "editAlbum";
    }

    this.getAllAlbums = function () {
        return { 'ok': true };
    }

    function removeAlbum() {
        return "removeAlbum";
    }

    function queryAlbum() {
        return "queryAlbum";
    }
}






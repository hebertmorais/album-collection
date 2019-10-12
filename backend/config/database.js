const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'mysql.hebertmorais.com.br',
  user     : 'ragnar_lothbrok',
  password : 'Lothbr0k',
  database : 'album_collection_db'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
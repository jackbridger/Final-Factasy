const databaseConnection = require('./database/db_connection');
const getData = (cb) => {
    databaseConnection.query('SELECT * FROM users ORDER BY id', (err, res) => {
        if (err) {
            cb(err);
        }
        else {
            cb(null, res.rows);
        }
    })
}

const buyItem = cb => {
    databaseConnection.query(`UPDATE users SET gold_pieces = gold_pieces -1 WHERE name = 'Jon';`, (err, res) => {
        if (err) cb
        else (
            cb(null, res.rows)
        )
    })
}


module.exports = { getData, buyItem };


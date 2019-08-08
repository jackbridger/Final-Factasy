const databaseConnection = require('./database/db_connection');

const getData = (cb) => {
    databaseConnection.query('SELECT * FROM users', (err, res) => {
        if (err) {
            cb(err);
        }
        else {
            cb(null, res.rows);
        }
    });
};


const getItemsOwnedBy = (userId, cb) => {
  databaseConnection.query(`SELECT item_name, item_description, item_power FROM ownership INNER JOIN inventory ON ownership.item_id = inventory.id WHERE ownership.owner_id = ${userId};`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows)
    }
  });

};

module.exports = { getData, getItemsOwnedBy };


const databaseConnection = require('./database/db_connection');
const getUsers = (cb) => {
    databaseConnection.query('SELECT * FROM users ORDER BY id', (err, res) => {
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

const getInventory = (cb) => {
    databaseConnection.query('SELECT item_name,item_quantity FROM inventory ORDER BY id', (err, res) => {
        if (err) {
            cb(err);
        }
        else {
          console.log(res.rows);
            cb(null, res.rows);
        }
    })
}

const getOwnership = (cb) => {
    databaseConnection.query('SELECT * FROM ownership ORDER BY id', (err, res) => {
        if (err) {
            cb(err);
        }
        else {
            cb(null, res.rows);
        }
    })
}

const buyItem = cb => {
    databaseConnection.query(`UPDATE users SET gold_pieces = gold_pieces - 1 WHERE name = 'Jon';
      UPDATE inventory
      SET item_quantity = item_quantity - 1
      WHERE item_name = 'Cape';`, (err, res) => {
        if (err) cb(err)
        else {
            cb(null, res.rows)
        }
    })
}



const getScoreByUser = (userId, cb) => {
    databaseConnection.query(`SELECT SUM(item_power) 
    FROM ownership 
    INNER JOIN inventory 
    ON ownership.item_id = inventory.id 
    WHERE ownership.owner_id = ${userId}`, (err, res) => {
        if (err) cb(err)
        else {
            cb(null, res.rows);
        }
    });
}

const getAllScores = cb => {

}

module.exports = { getUsers, getItemsOwnedBy, getInventory, getOwnership, buyItem, getScoreByUser, getAllScores };




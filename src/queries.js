const databaseConnection = require('./database/db_connection');

const createUser = (name) => {
    databaseConnection.query(`INSERT INTO users(name) VALUES ('${name}');`, (err, res) => {
        if (err) {
            throw new Error('Enter a name')
        }

    })
}





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


const getItemsOwnedBy = (username, cb) => {
    databaseConnection.query(`
    SELECT item_name, item_description FROM users INNER JOIN ownership ON users.id = ownership.owner_id INNER JOIN
 inventory ON ownership.item_id = inventory.id
 WHERE name= $1`, [username], (err, res) => {
            if (err) {
                cb(err);
            } else {
                console.log('these are the rows', res.rows);
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
      WHERE item_name = 'Cape';
      INSERT INTO ownership(owner_id, item_id) 
      VALUES ((SELECT id FROM users WHERE name = 'Jon'), (SELECT id FROM inventory WHERE item_name = 'Cape') )
      `, (err, res) => {
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
    databaseConnection.query(`SELECT users.name, SUM(inventory.item_power) 
    FROM users 
    INNER JOIN ownership 
    ON users.id = ownership.owner_id 
    INNER JOIN inventory 
    ON inventory.id = ownership.item_id 
    GROUP BY users.id`, (err, res) => {
            if (err) cb(err)
            else {
                cb(null, res.rows);
            }
        })
}

module.exports = { getUsers, getItemsOwnedBy, getInventory, getOwnership, buyItem, getScoreByUser, getAllScores, createUser };




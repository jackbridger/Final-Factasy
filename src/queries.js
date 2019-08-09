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

const getUserData = (name, cb) => {
    databaseConnection.query(`SELECT name, gold_pieces FROM users WHERE name= $1`, [name], (err, res) => {
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
    SELECT item_name, item_description, item_power FROM users INNER JOIN ownership ON users.id = ownership.owner_id INNER JOIN
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
    databaseConnection.query('SELECT item_name,item_quantity,item_price FROM inventory ORDER BY id', (err, res) => {
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

const buyItem = (user_name, item_name, cb) => {
    item_name = decodeURI(item_name);
    console.log('inside buy item username is ' + user_name);
    console.log('inside buy item item name is ' + item_name);
    const dbQuery = `UPDATE users SET gold_pieces = gold_pieces - 1 WHERE name = '${user_name}';
    UPDATE inventory SET item_quantity = item_quantity - 1 WHERE item_name = '${item_name}';
    INSERT INTO ownership(owner_id, item_id) 
    VALUES ((SELECT id FROM users WHERE name = '${user_name}' LIMIT 1), (SELECT id FROM inventory WHERE item_name = '${item_name}' LIMIT 1));`
    databaseConnection.query(dbQuery, (err, res) => {
        if (err) cb(err)
        else {
            console.log('buy item function update worked');
            cb(null)
        }
    })
}

// UPDATE users SET gold_pieces = gold_pieces - 1 WHERE name = {1};
//       UPDATE inventory
//       SET item_quantity = item_quantity - 1
//       WHERE item_name = {2};
//       INSERT INTO ownership(owner_id, item_id) 
//       VALUES ((SELECT id FROM users WHERE name = {1}), (SELECT id FROM inventory WHERE item_name = {2}));




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

module.exports = { getUsers, getItemsOwnedBy, getInventory, getOwnership, buyItem, getScoreByUser, getAllScores, createUser, getUserData };

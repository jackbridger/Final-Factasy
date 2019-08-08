const test = require('tape');
const runDbBuild = require('../src/database/db_build');
const queries = require('../src/queries');

test('select all data from users table', (t) => {
    runDbBuild((err,res) => {
        t.error(err, 'No error');

        let expected = [ { id: 1, name: 'Jon', gold_pieces: 20 }, { id: 2, name: 'Aria', gold_pieces: 20 } ];

        queries.getData((err, result) => {
            if (err) console.log(err);
            t.deepEqual(result,expected, 'returns expected user data');
            t.end();
        })
    })
})

test('get the list of items that a user owns', (t) => {
    runDbBuild((err, res) => {
        t.error(err, 'No error');
        let expected = [{item_name:'Toothbrush', item_description:'79% of medieval dentists believe dental hygiene can keep you alive.', item_power:10},{item_name:'Toothbrush', item_description:'79% of medieval dentists believe dental hygiene can keep you alive.', item_power:10}];

        queries.getItemsOwnedBy(4, (err, result) => {
            if (err) console.log(err);
            t.deepEqual(result, expected, 'returns all items owned by user');
            t.end();
        })
    })
})
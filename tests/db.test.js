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

test('display score for specific user', (t) => {
  runDbBuild((err,res) => {
    t.error(err, 'No error');

    let expected = 40;

    queries.getScore((err, result) => {
      if (err) console.log(err);
      t.deepEqual(result,expected, 'returns score for specific user');
      t.end();
    })
  })

})

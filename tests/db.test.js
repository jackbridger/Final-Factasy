const test = require('tape');
const runDbBuild = require('../src/database/db_build');
const queries = require('../src/queries');

test('tape is working in db test', (t) => {
    runDbBuild((err,res) => {
        
    })
    
    t.end();
})
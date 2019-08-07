const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

test('testing supertest', (t) => {
    supertest(router)
    .get('/')
    .end((err, res) => {
        t.equal(1,1);
        t.end();
    })
})
const test = require('tape');
const supertest = require('supertest');


test('testing supertest', (t) => {
    supertest(router)
    .end((err, res) => {
        t.equal(1,1);
        t.end();
    })
})
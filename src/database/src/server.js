const http = require('http');
const port = (process.env.PORT || 3000);
const router = require('./router');

const server = http.createServer(router);
server.listen(port);

console.log("server up and running!"); 

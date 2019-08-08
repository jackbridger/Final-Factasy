const fs = require("fs");
const path = require("path");
const query = require("./query.js");
const querystring = require("querystring");

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");

  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("<h1>Internal Server Error</h1>");
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
};


const handlePublic = (request, response, endpoint) => {
  const extension = path.extname(endpoint);
  const extensionType = {
    ".css": "text/css",
    ".js": "application/javascript",
    ".ico": "image/x-icon",
    ".png": "image/png"
  };

  const filePath = path.join(__dirname, "..", endpoint);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/html" });
      response.end("<h1>Ooppppsssss, page ain't found</h1>");
    } else {
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    }
  });
};

const handleCall = (request, response, endpoint) => {
  parsedEnd = endpoint.substring(1, endpoint.length);
  var unfiltered = query.apiCall(parsedEnd);
  var filtered = filterResults(unfiltered);
  response.writeHead(200, { 'content-type': 'application/json' });
  response.end(JSON.stringify(filtered));
};

const filterResults = Obj => {
  let movies = Obj.results;
  let titles = [];
  for (i = 0; i < 5; i++) {
    titles.push(movies[i].title);
  }
  return titles;
};

module.exports = { handleHome, handlePublic, filterResults, handleCall };

const http = require("http");
const handlers = require("./handler");
const path = require("path");
const fs = require("fs");

const router = (request, response) => {
  const endpoint = request.url;
  if (endpoint === "/") {
    handlers.handleHome(request, response);
  } else if (endpoint.includes('public')) {
    handlers.handlePublic(request, response);
  } else {
    response.writeHead(404);
    response.end("Page not found");
  }
};

module.exports = router;

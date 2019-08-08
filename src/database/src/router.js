const fs = require("fs");
const path = require("path");
const query = require("./query.js");
const handlers = require("./handler");

const router = (request, response) => {
  const endpoint = request.url;

  if (endpoint === "/") {
    handlers.handleHome(request, response);
  } else if (endpoint.includes("public")) {
    handlers.handlePublic(request, response, endpoint);
  } else if (endpoint.includes("query")) {
    handlers.handleCall(request, response, endpoint);
  } else {
    response.writeHead(404);
    response.end("404 Page not found");
  }
};

module.exports = router;

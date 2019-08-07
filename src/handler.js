const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
  console.log(filePath);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("Something went wrong with our dragons");
    } else {
      response.writeHead(200, { "content-type": "text/html" });
      response.end(file);
    }
  });
};

const handlePublic = (request, response) => {
  const extension = path.extname(request.url).substring(1);
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon"
  }
  console.log(request.url);
  const filePath = path.join(__dirname, "..", request.url)
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { "content-type": "text/html" });
      response.end("Something went wrong with our dragons");
    } else {
      response.writeHead(200, { "content-type": extensionType[extension] });
      response.end(file);
    };
  });
};

module.exports = { handleHome, handlePublic };

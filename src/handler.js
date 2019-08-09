const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const dataStreamer = require("./helper").dataStreamer;
const queries = require('./queries');
let userName;

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");

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

const handleDbNewUser = (request, response) => {
  dataStreamer(request, (data) => {
    userName = data.split("=")[1];
    queries.createUser(userName)
    response.writeHead(301, { Location: '/public/inventory.html' })
    response.end()
  })
}

const handleGetInventory = (request, response) => {
  console.log('came into handlegetinventory');
  queries.getInventory((err, res) => {
    if (err) console.log(err);
    else{
    const inventoryArray=JSON.stringify(res);
    console.log({inventoryArray});
    response.writeHead(200, {"Content-Type":"application/json"});
    response.end(inventoryArray);
    }
  })
}

const handleGetItemsOwned = (request, response) => {
  // let userName = request
  console.log('The username is', userName);
  console.log('came into handleGetItemsOwned');
  queries.getItemsOwnedBy(userName, (err, itemsOwned) => {
    if (err) console.log(err);
    itemsOwned = JSON.stringify(itemsOwned);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(itemsOwned);
  })
}

const handleDbLogin = (request, response) => {
  dataStreamer(request, (data) => {
    response.writeHead(301, { Location: '/public/inventory.html' })
    userName = data.split("=")[1];
    response.end()
  })
}

module.exports = { handleHome, handlePublic, handleDbNewUser, handleGetInventory, handleDbLogin, handleGetItemsOwned };

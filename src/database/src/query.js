// let script = require("../public/script.js");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// var key = process.env.API_KEY;

var key = "3a9c38adfc4ba4d10d8d9b90443f949d";

let movieObj = {};

function apiCall(inputValue) {
  var url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    key +
    "&" +
    inputValue;
  console.log(url);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      movieObj = JSON.parse(xhr.responseText);
      return movieObj;
    }
  };
  xhr.open("GET", url, false);
  xhr.send();
  if (movieObj.results) {
    return movieObj;
  }
}

module.exports = { apiCall };

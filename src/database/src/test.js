const handler = require("./handler.js");
const test = require("tape");

test("Tape is working", function(t) {
  t.pass("tape is working");
  t.end();
});

test("Check filterResults returns an array", function(t) {
  const movieObj = {
    results: [
      { title: "lion king" },
      { title: "snow white" },
      { title: "shrek" }
    ]
  };
  const actual = Array.isArray(handler.filterResults(movieObj));
  const expected = true;
  t.equal(actual, expected, "Function should return an array");
  t.end();
});

test("Check filterResults returns an array of 5", function(t) {
  const movieObj = {
    results: [
      { title: "lion king" },
      { title: "snow white" },
      { title: "shrek" },
      { title: "lion king 2" },
      { title: "snow white 2" },
      { title: "shrek the Third" }
    ]
  };
  const actual = handler.filterResults(movieObj).length;
  const expected = 5;
  t.equal(actual, expected, "Function should return an array of 5");
  t.end();
});

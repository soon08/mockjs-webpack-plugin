/**
 * @file An express mock server
 * @author Marx
 */

var express = require("express");
var mockjs = require("./mock.js");

module.exports = function({ path, port = 3000 }) {
  var mockPort = port || 3000;
  var app = express();
  app.use("/", mockjs(path));

  var server = app.listen(mockPort, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Mock server listening at http://%s:%s", host, port);
  });
};

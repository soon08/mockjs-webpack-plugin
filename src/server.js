var express = require("express");
var watch = require("watch");
var {
    cleanCache
} = require("./util");

var ROUTE_PATH = "./routes.js";
var {
    mock
} = require(ROUTE_PATH);

module.exports = function ({
    path,
    port = 3000
}) {
    var mockPort = port || 3000;
    var app = express();

    app.use("/", mock(path));

    watch.watchTree(path, () => {
        cleanCache(require.resolve(ROUTE_PATH));
        try {
            mock = require(ROUTE_PATH);
            console.info("Mock module update success.");
        } catch (error) {
            console.error("Mock module update failed, please restart the application. %s", error);
        }
    });

    var server = app.listen(mockPort, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Mock server listening at http://%s:%s", host, port);
    });
};
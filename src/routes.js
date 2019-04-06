var fs = require("fs");
var path = require("path");
var Mock = require("mockjs");
var Random = Mock.Random;
var template = fs.readFileSync(path.join(__dirname, "doc.html"), "utf8");

var {
    cleanCache,
    isJavacriptFile
} = require("./util");

var parseAPIs = require("./mock");

function mock(path) {

    return function (req, res, next) {

        var apis = parseAPIs(path);

        res.set("Access-Control-Allow-Origin", "*");
        res.set("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,DELETE,PATCH");

        var allowedHeaders = req.headers["access-control-request-headers"];
        if (allowedHeaders) {
            res.set("Access-Control-Allow-Headers", allowedHeaders);
        }

        if (req.method === "OPTIONS") {
            return res.send("");
        }

        var url = req.url.split("?")[0];

        var route = apis[url] || {};

        mock.debug &&  console.log("url: " + url);
        if (url === "/") {
            var host = req.protocol + "://" + req.headers.host + req.baseUrl;
            var list = Object.keys(apis).sort().map(pathname => {
                if (isJavacriptFile(pathname)) {
                    apis[pathname].data = require(pathname);
                } else {
                    try {
                        apis[pathname].data = new Function("return (" + apis[pathname].content + ")")();
                    } catch (e) {
                        delete apis[pathname];
                        console.warn("[Mock Warn]:", e);
                    }
                }
                var route = apis[pathname];
                return {
                    title: route.describe,
                    url: host + route.url,
                    file: route.filepath
                };
            });

            return res.end(template.replace("@menuList", JSON.stringify(list)));
        }

        var data = route.data;

        if (isJavacriptFile(route.filepath)) {
            cleanCache(require.resolve(route.filepath));
            data = require(route.filepath);
        } else {
            try {
                data = new Function("return (" + route.content + ")")();
            } catch (e) {
                delete apis[pathname];
                console.warn("[Mock Warn]:", e);
            }
        }

        if (data) {
            if (typeof data === "function") {
                data = data(req, Mock, Random);
            }
            res.json(Mock.mock(data));
        } else {
            next();
        }
    };
}

mock.debug = true;

module.exports = {
    mock
};
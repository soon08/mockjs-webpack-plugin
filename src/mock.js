var fs = require("fs");

var {
    walk
} = require("./util");

var RE = /^\s*\/\*[*\s]+?([^\r\n]+)[\s\S]+?@url\s+([^\n]+)[\s\S]+?\*\//im;

function parseAPIs(dir) {
    var routes = {}; // routes list

    var files = walk(dir);

    // walkdir(dir, /\.js(on)?$/i, function (filepath) {
    (files || []).forEach(filepath => {
        var content = String(fs.readFileSync(filepath, "utf8")).trim() || "{}";

        var url = filepath;
        var describe = "no description";

        var m = content.match(RE);

        if (m) {
            url = m[2].trim();
            describe = m[1].replace(/(^[\s*]+|[\s*]+$)/g, "");
        }

        if (url[0] !== "/") {
            // fix url path
            url = "/" + url;
        }

        var pathname = url;
        if (pathname.indexOf("?") > -1) {
            pathname = pathname.split("?")[0];
        }

        if (routes[pathname]) {
            console.warn("[Mock Warn]: [" + filepath + ": " + pathname + "] already exists and has been covered with new data.");
        }

        routes[pathname] = {
            url: url,
            filepath: filepath,
            describe: describe
        };

        if (/\.json$/.test(filepath)) {
            routes[pathname].content = content;
        }
    });

    return routes;
}

module.exports = parseAPIs;
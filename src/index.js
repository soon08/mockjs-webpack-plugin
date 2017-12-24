/**
 * @file plugin entry point
 * @author Soon
 */

var server = require("./server.js");

/**
 * @class MockjsWebpackPlugin
 *
 * @param {Object} param data that plugin needs
 */
function MockjsWebpackPlugin({ path, port = 3000 }) {
  this.path = path;
  this.port = port;
}

MockjsWebpackPlugin.prototype.apply = function(compiler) {
  server({ path: this.path, port: this.port });
  compiler.plugin("emit", (compilation, callback) => {
    callback();
  });
};

module.exports = MockjsWebpackPlugin;

# MockjsWebpackPlugin
[中文readme](./readme-zh.md)

> A mockjs webpack plugin based on [mockjs](https://github.com/nuysoft/Mock)

# What is the problem this plugin solved

By using this two tools, [MarxJiao/mock-webpack-plugin](.https://github.com/MarxJiao/mock-webpack-plugin) and [52cik/express-mockjs](https://github.com/52cik/express-mockjs).

I found that `MarxJiao/mock-webpack-plugin` is very conveniently to integrating as a webpack plugin.
And `52cik/express-mockjs` based on mockjs syntax satisfies a variety of mock data structures, but integrating is troublesome.

So i combine this two repo to a new one as a webpack plugin.

# Start up

## Install

```
npm install --save-dev webpack mockjs-webpack-plugin
```

## Config

Add a `mock data storage folder` in your project.
```
.
├── app         //project folder
    ├── dist
    ├── config
    ├── src
    ├── mock    //mock data folder
    ⎪   ├── data.js
    ⎪   ├── data.json
        ...
```

config proxy and mock-webpck-plugin in `webpack.config.js`

```javascript
// import plugin
const MockjsWebpackPlugin = require("mockjs-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js"
  },
  // config plugin
  plugins: [
    new MockjsWebpackPlugin({
      // mock data folder path
      path: path.join(__dirname, "./mock"),
      // mock server port, avoid collision with application port
      port: 3000
    })
  ],
  // config proxy
  devServer: {
    // application port
    port: 5001,
    proxy: {
      // mock server url
      "/": "http://localhost:3000/"
    }
  }
};
```

_When you add a mock data file, do not need to modify the webpack config file but **restart the application**_

# OPTIONS

```javascript
new MockjsWebpackPlugin(options);
```

* options.path mock data folder path
* options.port the port of the mock server, default 3000

# Mock Data

`Mock Data` here is not a real JSON file, and more like a JS file, so you want to use the following format.

```js
/**
 * Json data file
 *
 * @url /json/data
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 *
 * Parameter description and other instructions.
 * uid: user ID
 * name: username
 * email: the email
 * etc.
 */
{
  "code": 0,
  "result|5": [
    {
      "uid|+1": 1,
      "name": "@name",
      "email": "@email"
    }
  ]
}
```

You can read the file content like this

- title： `Json data file`
- url： `/json/data`
- Description：
```
Here you can write a detailed description
of the parameters of the information.

Parameter description and other instructions.
 uid: user ID
 name: username
 email: the email
etc.
```
- data content： the rest part

Then you can access the <http://[localhost]:[3000]/json/data> through the browser.

Of course, you can also use the JS file directly,

``` js
/**
 * JS data file
 *
 * @url /js/js-data-file
 *
 * Export data by using the JS file directly.
 */

module.exports = {
    "code": function () { // simulation error code, 1/10 probability of error code 1.
        return Math.random() < 0.1 ? 1 : 0;
    },
    "list|5-10": [
        {"title": "@title", "link": "@url"}
    ]
};
```

Or export `function`.

``` js
/**
 * JS function file
 *
 * @url /js/js-func-file/user?uid=233
 *
 * GET: Request method and parameter
 *   uid This is the requested userID
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 */
module.exports = function(req) {
  var uid = req.query.uid;

  if (!uid) {
    return {
      code: -1,
      msg: "no uid"
    };
  }

  return {
    code: 0,
    data: {
      uid: +uid,
      name: "@name",
      "age|20-30": 1,
      email: "@email",
      date: "@date"
    }
  };
};
```

_All above data comes from `mockjs` syntax，you can read docs and samples from website of mockjs to get more_

mock data desciption comes from [52cik/express-mockjs](https://github.com/52cik/express-mockjs)

## Mock JSON
* [Mock.js 0.1 doc](https://github.com/nuysoft/Mock/wiki)
* [Mock samples](http://mockjs-lite.js.org/docs/examples.html)

# Support
This repo is coming from [MarxJiao/mock-webpack-plugin](.https://github.com/MarxJiao/mock-webpack-plugin) and [52cik/express-mockjs](https://github.com/52cik/express-mockjs).

Thanks this two author, [Marx(MarxJiao)](https://github.com/MarxJiao) and [楼教主(52cik)](https://github.com/52cik)
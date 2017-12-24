# MockjsWebpackPlugin
[readme EN](./readme.md)

> 基于 [mockjs](https://github.com/nuysoft/Mock) 的 mock webpack 插件

# 这个插件解决的问题

参考了[MarxJiao/mock-webpack-plugin](.https://github.com/MarxJiao/mock-webpack-plugin) 和 [52cik/express-mockjs](https://github.com/52cik/express-mockjs) 两个工具。

`MarxJiao/mock-webpack-plugin` 作为webpack插件集成方便

`52cik/express-mockjs` 集成mockjs语法可以满足丰富多样的mock数据结构，但是集成麻烦

因此做了这个插件，基于`52cik/express-mockjs`丰富多样的mock服务，做成webpack插件使用。

# 使用

## 安装

```
npm install --save-dev webpack mockjs-webpack-plugin
```

## 配置

在工程目录中增加一个 `mock 数据存放的目录`

```
.
├── app         //工程目录
    ├── dist
    ├── config
    ├── src
    ├── mock    //mock数据目录
    ⎪   ├── data.js
    ⎪   ├── data.json
        ...
```

在 `webpack.config.js` 中，配置 proxy 和 mockjs-webpck-plugin

```javascript
// 引入插件
const MockjsWebpackPlugin = require("mockjs-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js"
  },
  // 配置插件
  plugins: [
    // 插件的功能是根据配置文件，起一个指定端口的server，将接口请求指向json文件
    new MockjsWebpackPlugin({
      // mock数据的存放路径
      path: path.join(__dirname, "./mock"),
      // 配置mock服务的端口，避免与应用端口冲突
      port: 3000
    })
  ],
  // 配置代理，这里的代理为webpack自带功能
  devServer: {
    // 应用端口，避免与mock服务端口冲突
    port: 5001,
    proxy: {
      // 配置匹配服务的url规则，以及其代理的服务地址，即mock服务的地址
      "/": "http://localhost:3000/"
    }
  }
};
```

_增加 mock 数据时，在 mock 中新建文件即可，webpack 配置  无需更新，**但是需要重新启动应用**_

# 参数

```javascript
new MockjsWebpackPlugin(options);
```

* options.path mock 数据的存放路径
* options.port 代理服务器端口，默认为 3000

# Mock 数据

`Mock 数据` 并非严格的 json 格式数据文件，更像是 js 代码。示例`data.json`如下：

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

对应的文件内容可以这样理解

* 文件标题： `Json data file`
* 访问路径： `/json/data`
* 描述：
```
Here you can write a detailed description
of the parameters of the information.

Parameter description and other instructions.
 uid: user ID
 name: username
 email: the email
etc.
```
* 数据： 剩下的部分

接下来我们就可以在浏览器中访问<http://[localhost]:[3000]/json/data> 这个地址获取数据。

除此之外，我们可以直接使用js文件，

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

或者是输出一个 `function`

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

_以上mock数据的语法均来自 `mockjs`，想获取更多语法可以参阅mockjs官网文档和示例_

mock数据说明文档和功能来源于 [52cik/express-mockjs](https://github.com/52cik/express-mockjs)

## Mock JSON
* [Mock.js 0.1 官方文档](https://github.com/nuysoft/Mock/wiki)
* [Mock 示例](http://mockjs-lite.js.org/docs/examples.html)

# 支持
此插件来源于 [MarxJiao/mock-webpack-plugin](.https://github.com/MarxJiao/mock-webpack-plugin) 和 [52cik/express-mockjs](https://github.com/52cik/express-mockjs)。

感谢两位作者 [Marx(MarxJiao)](https://github.com/MarxJiao) 和 [楼教主(52cik)](https://github.com/52cik)。
'use strict'

const port = process.env.PORT || 6050
const env = process.env.NODE_ENV || 'local'
const config = require("./config.json")[env]
const srcPath = config.debug == true ? './src' : './dist'
const srcEntry = srcPath + "/app.js"

require('babel-polyfill');
require("babel-register");
require("babel-core").transform("code", {
    presets: [
        ["env", {
            targets: {
                node: "current"
            }
        }]
    ]
});

const App = require(srcEntry);
let koa = new App(config, srcPath).koa;

koa.context.models.sequelize.sync().then(function () {
    koa.listen(port, function() {
        console.log("listening on port " + port);
    });
});

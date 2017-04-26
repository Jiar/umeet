'use strict'

const port = process.env.PORT || 6010;
const env = process.env.NODE_ENV || 'local';
const config = require("./config.json")[env];
const srcPath = config.debug == true ? './src' : './dist';
const srcEntry = srcPath + "/app.js";
const md5 = require("md5");

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
let app = new App(config, srcPath);

let models = app.models();

let argv = process.argv;
if (argv.length < 5) {
    console.error("输入 email name password");
    process.exit(1);
}

models.user.destroy({
    'where': {'id': [1]}
}).then(function() {
    console.log("destroy super user success!");
}).catch(function(e){
    console.log("destroy super user fail!");
    console.log(e);
});

let name = argv[3];
let password = md5(argv[4])
let user = models.user.create({
    email: argv[2],
    password: md5(password),
    name: name,
    nick: name,
    lastLoginIp: '127.0.0.1'
}).then(function(result) {
    console.log("create super user success!");
    let id = result.dataValues.id;
    models.user.update(
        {id: 1},
        {
            where: {
                id: [id]
            }
        }
    ).then(function() {
        console.log("update super user success!");
        console.log("success! success! success!");
        console.log("enjoy it !");
    }).catch(function(e){
        console.log("update super user fail!");
        console.log(e);
    });
}).catch(function(e){
    console.log("create super user fail!");
    console.log(e);
});

// 每次改动数据库可能都会有变动
// 可以先删除数据库中所有表
// 然后执行 npm run dev 重新生成表(ctrl+c结束运行)
// 再接着导入 umeet.sql 
// 然后执行以下命令重新生成 Admin 账户用于登录后台管理系统 (ctrl+c结束运行)
// node createAdmin.js admin@admin.com admin admin123
// 最后继续运行程序 npm run dev

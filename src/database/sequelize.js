"use strict";
exports.__esModule = true;
// src/database/sequelize.ts
var sequelize_typescript_1 = require("sequelize-typescript");
var db_1 = require("../../config/db");
var sequelize = new sequelize_typescript_1.Sequelize(db_1["default"].mysql.database, db_1["default"].mysql.user, db_1["default"].mysql.password || null, {
    // 自定义主机; 默认值: localhost
    host: db_1["default"].mysql.host,
    // 自定义端口; 默认值: 3306
    port: db_1["default"].mysql.port,
    dialect: 'mysql',
    pool: {
        max: db_1["default"].mysql.connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'
});
// 测试数据库链接
sequelize
    .authenticate()
    .then(function () {
    console.log('数据库连接成功');
})["catch"](function (err) {
    // 数据库连接失败时打印输出
    console.error(err);
    throw err;
});
exports["default"] = sequelize;

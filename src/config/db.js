"use strict";
exports.__esModule = true;
// config/db.ts
var productConfig = {
    mysql: {
        port: 3306,
        host: '120.25.217.217',
        user: 'nestjs-root',
        password: 'YAEaLMNHG37GrkeX',
        database: 'nestjs-root',
        connectionLimit: 10
    }
};
var localConfig = {
    mysql: {
        port: 3306,
        host: '120.25.217.217',
        user: 'nestjs-root',
        password: 'YAEaLMNHG37GrkeX',
        database: 'nestjs-root',
        connectionLimit: 10
    }
};
// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
var config = process.env.NODE_ENV ? productConfig : localConfig;
exports["default"] = config;

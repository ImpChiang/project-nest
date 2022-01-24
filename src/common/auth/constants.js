"use strict";
exports.__esModule = true;
exports.roleConstans = exports.jwtConstants = void 0;
// 存储常量
// auth/constats.ts
exports.jwtConstants = {
    secret: 'shinobi7414' // 秘钥
};
exports.roleConstans = {
    SUPER_ADMIN: 0,
    ADMIN: 1,
    DEVELOPER: 2,
    HUMAN: 3 // 普通用户
};

"use strict";
exports.__esModule = true;
exports.encryptPassword = exports.makeSalt = void 0;
var crypto = require("crypto");
/**
 * Make salt 随机盐
 */
function makeSalt() {
    return crypto.randomBytes(3).toString('base64');
}
exports.makeSalt = makeSalt;
/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
function encryptPassword(password, salt) {
    if (!password || !salt) {
        return '';
    }
    var tempSalt = Buffer.from(salt, 'base64');
    // 10000 代表迭代次数 16代表长度
    return (crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64'));
}
exports.encryptPassword = encryptPassword;

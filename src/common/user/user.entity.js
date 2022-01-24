"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.admin_user = void 0;
var typeorm_1 = require("typeorm");
// 导出类名需要与数据库名一一对应
/**
 * @Entity装饰器，实现实体类的一个关键：
 @Column：表示数据库的字段；
 @PrimaryGeneratedColumn()：表示数据的自增主键字段；
 */
var admin_user = /** @class */ (function () {
    function admin_user() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], admin_user.prototype, "user_id");
    __decorate([
        (0, typeorm_1.Column)()
    ], admin_user.prototype, "account_name");
    admin_user = __decorate([
        (0, typeorm_1.Entity)()
    ], admin_user);
    return admin_user;
}());
exports.admin_user = admin_user;

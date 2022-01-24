"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterInfoDTO = void 0;
// 输出了一个类似于声明接口的 class，表明了参数名和类型，并且是只读的
var class_validator_1 = require("class-validator");
var RegisterInfoDTO = /** @class */ (function () {
    function RegisterInfoDTO() {
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: '用户名不能为空' })
    ], RegisterInfoDTO.prototype, "accountName");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: '真实姓名不能为空' }),
        (0, class_validator_1.IsString)({ message: '真实姓名必须是 String 类型' })
    ], RegisterInfoDTO.prototype, "realName");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: '密码不能为空' })
    ], RegisterInfoDTO.prototype, "password");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: '重复密码不能为空' })
    ], RegisterInfoDTO.prototype, "repassword");
    __decorate([
        (0, class_validator_1.IsNotEmpty)({ message: '手机号不能为空' }),
        (0, class_validator_1.IsMobilePhone)('zh-CN')
    ], RegisterInfoDTO.prototype, "mobile");
    return RegisterInfoDTO;
}());
exports.RegisterInfoDTO = RegisterInfoDTO;

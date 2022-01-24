"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RbacInterceptor = void 0;
var common_1 = require("@nestjs/common");
// CallHandler是一个包装执行流的对象,不手动调用 handle() 方法，则主处理程序根本不会进行求值
var RbacInterceptor = /** @class */ (function () {
    // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
    function RbacInterceptor(role) {
        this.role = role;
    }
    RbacInterceptor.prototype.intercept = function (context, next) {
        var req = context.getArgByIndex(1).req;
        // console.log(req,'req====',this.role)
        if (req.user.role > this.role) {
            throw new common_1.ForbiddenException('对不起，您无权操作');
        }
        return next.handle();
    };
    RbacInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], RbacInterceptor);
    return RbacInterceptor;
}());
exports.RbacInterceptor = RbacInterceptor;

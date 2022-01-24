"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppResolver = void 0;
// 在graphql中resolver叫解析器,主要包括query(查询数据)、mutation(增、删、改数据)、
// subscription(订阅，有点类型socket)，
// 在graphql项目中我们用resolver替换了之前的控制器
var graphql_1 = require("@nestjs/graphql");
var AppResolver = /** @class */ (function () {
    function AppResolver() {
    }
    AppResolver.prototype.hello = function () {
        return 'hello world';
    };
    __decorate([
        (0, graphql_1.Query)(function () { return String; })
    ], AppResolver.prototype, "hello");
    AppResolver = __decorate([
        (0, graphql_1.Resolver)()
    ], AppResolver);
    return AppResolver;
}());
exports.AppResolver = AppResolver;

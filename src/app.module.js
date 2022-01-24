"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var typeorm_1 = require("@nestjs/typeorm");
// import { Connection } from "typeorm";
// import { AppController } from './app.controller';
var app_service_1 = require("./app.service");
var user_module_1 = require("./common/user/user.module");
var auth_module_1 = require("./common/auth/auth.module");
var user_controller_1 = require("./common/user/user.controller");
var commodity_service_1 = require("./common/commodity/commodity.service");
var commodity_controller_1 = require("./common/commodity/commodity.controller");
var app_resolver_1 = require("./app.resolver");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [user_module_1.UserModule, auth_module_1.AuthModule,
                typeorm_1.TypeOrmModule.forRoot(),
                graphql_1.GraphQLModule.forRoot({
                    // 自动生成schema.graphql文件
                    autoSchemaFile: './schema.gql'
                })
            ],
            controllers: [user_controller_1.UserController, commodity_controller_1.CommodityController],
            providers: [app_service_1.AppService, commodity_service_1.CommodityService, app_resolver_1.AppResolver]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

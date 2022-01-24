"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
//  传统意义上的控制器，提供 api 接口，负责处理路由、中转、验证等一些简洁的业务；
// 不要往 Controller 里面添加乱七八糟的东西，尤其不要在里面写业务逻辑，
// Controller 就应该保持简洁、干净。很多前端刚写 Node 的时候，都喜欢在这里面写逻辑，只为了省事，殊不知这对后期的维护是个灾难
var common_1 = require("@nestjs/common");
var validation_pipe_1 = require("../../pipe/validation.pipe"); // 引入管道
var UserController = /** @class */ (function () {
    function UserController(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    UserController.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var authResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('JWT验证 - Step 1: 用户请求登录');
                        return [4 /*yield*/, this.authService.validateUser(body.username, body.password)
                            // console.log(authResult,'authResult-------------');
                        ];
                    case 1:
                        authResult = _a.sent();
                        // console.log(authResult,'authResult-------------');
                        switch (authResult.code) {
                            case 1:
                                return [2 /*return*/, this.authService.certificate(authResult.user)];
                            case 0:
                                return [2 /*return*/, {
                                        code: 500,
                                        msg: "\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF"
                                    }];
                            default:
                                return [2 /*return*/, {
                                        code: 600,
                                        msg: "\u67E5\u65E0\u6B64\u4EBA"
                                    }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // @UseGuards(AuthGuard('jwt')) //// 使用 'JWT' 进行验证
    UserController.prototype.register = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.register(body)];
                    case 1: // 指定 DTO类型
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserController.prototype.findSon = function (body) {
        return this.userService.findSon(body.username);
    };
    UserController.prototype.findOne = function (body) {
        return this.userService.findOne();
    };
    __decorate([
        (0, common_1.Post)('login'),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "login");
    __decorate([
        (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipes()) // 使用管道验证
        ,
        (0, common_1.Post)('register'),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "register");
    __decorate([
        (0, common_1.Post)('find-son'),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "findSon");
    __decorate([
        (0, common_1.Post)('find-one'),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "findOne");
    UserController = __decorate([
        (0, common_1.Controller)('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;

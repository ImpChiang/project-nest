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
exports.UserService = void 0;
// 又称为 Provider， 是一系列服务、repo、工厂方法、helper 的总称，主要负责处理具体的业务，如数据库的增删改查、事务、并发等逻辑代码；
var common_1 = require("@nestjs/common");
var Sequelize = require("sequelize"); // 引入 Sequelize 库
var sequelize_1 = require("../../database/sequelize"); // 引入 Sequelize 实例
var cryptogram_1 = require("../../utils/cryptogram"); // 引入加密函数
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./user.entity");
var UserService = /** @class */ (function () {
    function UserService(usersRepository) {
        this.usersRepository = usersRepository;
    }
    /**
     * 查询是否有该用户
     * @param username 用户名
     */
    UserService.prototype.findSon = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, res, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n      SELECT\n        user_id id,account_name username, real_name realName, passwd password,\n        passwd_salt salt, mobile, role\n      FROM\n        admin_user\n      WHERE\n        account_name = '" + username + "'    \n    ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sequelize_1["default"].query(sql, {
                                type: Sequelize.QueryTypes.SELECT,
                                raw: true,
                                logging: false // 是否将 SQL 语句打印到控制台，默认为 true
                            })];
                    case 2:
                        res = _a.sent();
                        user = res[0];
                        if (user) {
                            return [2 /*return*/, {
                                    code: 200,
                                    data: {
                                        user: user
                                    },
                                    msg: 'Success'
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    code: 201,
                                    msg: '找不到您的儿子'
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                code: 503,
                                msg: "Service error: " + error_1
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 注册
     * @param requestBody 请求体
     */
    UserService.prototype.register = function (requestBody) {
        return __awaiter(this, void 0, void 0, function () {
            var accountName, realName, password, repassword, mobile, user, salt, hashPwd, registerSql, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountName = requestBody.accountName, realName = requestBody.realName, password = requestBody.password, repassword = requestBody.repassword, mobile = requestBody.mobile;
                        if (password !== repassword) {
                            return [2 /*return*/, {
                                    code: 400,
                                    msg: '两次密码输入不一致'
                                }];
                        }
                        return [4 /*yield*/, this.findSon(accountName)];
                    case 1:
                        user = _a.sent();
                        if (user.code == 200) {
                            return [2 /*return*/, {
                                    code: 400,
                                    msg: '用户已存在,请登录'
                                }];
                        }
                        salt = (0, cryptogram_1.makeSalt)() // 制作密码盐
                        ;
                        hashPwd = (0, cryptogram_1.encryptPassword)(password, salt) // 加密密码
                        ;
                        registerSql = "\n      INSERT INTO admin_user\n        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)\n      VALUES\n        ('" + accountName + "','" + realName + "','" + hashPwd + "','" + salt + "','" + mobile + "',1,3,0)  \n    ";
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, sequelize_1["default"].query(registerSql, { logging: false })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                code: 200,
                                msg: 'Success'
                            }];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, {
                                code: 503,
                                msg: "Service error: " + error_2
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.usersRepository.find({ select: ['account_name'] })];
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.admin_user))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;

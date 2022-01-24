"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.CommodityService = void 0;
//
var common_1 = require("@nestjs/common");
var Sequelize = require("sequelize"); // 引入 Sequelize 库
var sequelize_1 = require("../../database/sequelize"); // 引入 Sequelize 实例
var CommodityService = /** @class */ (function () {
    function CommodityService() {
    }
    /**
     * 查询商品列表
     * @param {*} body
     * @param {string} username
     * @returns {Promise<any>}
     * @memberof CommodityService
     */
    CommodityService.prototype.queryCommodityList = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pageIndex, _b, pageSize, _c, keywords, currentIndex, queryCommodityListSQL, commodityList, countCommodityListSQL, count;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = body.pageIndex, pageIndex = _a === void 0 ? 1 : _a, _b = body.pageSize, pageSize = _b === void 0 ? 10 : _b, _c = body.keywords, keywords = _c === void 0 ? '' : _c;
                        currentIndex = (pageIndex - 1) * pageSize < 0 ? 0 : (pageIndex - 1) * pageSize;
                        queryCommodityListSQL = "\n      SELECT\n        id, ccolumn_id columnId, commodity_name name, commodity_desc description,\n        sale_money saleMoney, market_price marketPrice,\n        c_by createBy, DATE_FORMAT(c_time, '%Y-%m-%d %H:%i:%s') createTime,\n        u_by updateBy, DATE_FORMAT(u_time, '%Y-%m-%d %H:%i:%s') updateTime\n      FROM\n        commodity\n      WHERE\n        commodity_name LIKE '%" + keywords + "%'\n      ORDER BY\n        id DESC\n      LIMIT " + currentIndex + ", " + pageSize + "\n    ";
                        return [4 /*yield*/, sequelize_1["default"].query(queryCommodityListSQL, {
                                type: Sequelize.QueryTypes.SELECT,
                                raw: true,
                                logging: false
                            })];
                    case 1:
                        commodityList = _d.sent();
                        countCommodityListSQL = "\n      SELECT\n        COUNT(*) AS total\n      FROM\n        commodity\n      WHERE\n        commodity_name LIKE '%" + keywords + "%'\n    ";
                        return [4 /*yield*/, sequelize_1["default"].query(countCommodityListSQL, {
                                type: Sequelize.QueryTypes.SELECT,
                                raw: true,
                                logging: false
                            })];
                    case 2:
                        count = (_d.sent())[0];
                        return [2 /*return*/, {
                                code: 200,
                                data: {
                                    commodityList: commodityList,
                                    total: count.total
                                }
                            }];
                }
            });
        });
    };
    /**
     * 创建商品
     *
     * @param {*} body
     * @param {string} username
     * @returns {Promise<any>}
     * @memberof CommodityService
     */
    CommodityService.prototype.createCommodity = function (body, username) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, columnId, name, _b, description, _c, marketPrice, _d, saleMoney, createCommoditySQL;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = body.columnId, columnId = _a === void 0 ? 0 : _a, name = body.name, _b = body.description, description = _b === void 0 ? '' : _b, _c = body.marketPrice, marketPrice = _c === void 0 ? 0 : _c, _d = body.saleMoney, saleMoney = _d === void 0 ? 0 : _d;
                        createCommoditySQL = "\n      INSERT INTO commodity\n        (ccolumn_id, commodity_name, commodity_desc, market_price, sale_money, c_by)\n      VALUES\n        ('" + columnId + "', '" + name + "', '" + description + "', " + marketPrice + ", " + saleMoney + ", '" + username + "');\n    ";
                        return [4 /*yield*/, sequelize_1["default"].query(createCommoditySQL, { logging: false })];
                    case 1:
                        _e.sent();
                        return [2 /*return*/, {
                                code: 200,
                                msg: 'Success'
                            }];
                }
            });
        });
    };
    /**
     * 修改商品
     *
     * @param {*} body
     * @param {string} username
     * @returns
     * @memberof CommodityService
     */
    CommodityService.prototype.updateCommodity = function (body, username) {
        return __awaiter(this, void 0, void 0, function () {
            var id, columnId, name, description, saleMoney, marketPrice, updateCommoditySQL, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = body.id, columnId = body.columnId, name = body.name, description = body.description, saleMoney = body.saleMoney, marketPrice = body.marketPrice;
                        updateCommoditySQL = "\n      UPDATE\n        commodity\n      SET\n        ccolumn_id = " + columnId + ",\n        commodity_name = '" + name + "',\n        commodity_desc = '" + description + "',\n        market_price = " + marketPrice + ",\n        sale_money = " + saleMoney + ",\n        u_by = '" + username + "'\n      WHERE\n        id = " + id + "\n    ";
                        return [4 /*yield*/, sequelize_1["default"].transaction()];
                    case 1:
                        transaction = _a.sent();
                        return [4 /*yield*/, sequelize_1["default"].query(updateCommoditySQL, { transaction: transaction, logging: false })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                code: 200,
                                msg: 'Success'
                            }];
                }
            });
        });
    };
    /**
     * 删除商品
     *
     * @param {*} body
     * @returns
     * @memberof CommodityService
     */
    CommodityService.prototype.deleteCommodity = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteCommoditySQL;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = body.id;
                        deleteCommoditySQL = "\n      DELETE FROM\n        commodity\n      WHERE\n        id = " + id + "\n    ";
                        return [4 /*yield*/, sequelize_1["default"].query(deleteCommoditySQL, { logging: false })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                code: 200,
                                msg: 'Success'
                            }];
                }
            });
        });
    };
    CommodityService = __decorate([
        (0, common_1.Injectable)()
    ], CommodityService);
    return CommodityService;
}());
exports.CommodityService = CommodityService;

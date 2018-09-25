"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const stock_1 = require("../data/models/stock");
const stockInstockPortfolio_1 = require("../data/models/stockInstockPortfolio");
const stockHistory_1 = require("../data/models/stockHistory");
let StocksController = class StocksController {
    getAllStocks(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield stock_1.Stock.findAll();
            /*   let result: any;
               await client.query("SELECT * FROM stocks")
                   .then(res => {// TODO delete
                       result = res.rows;
                   });*/
            return response.send(result);
        });
    }
    getAllStocksInPortfolio(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield stockInstockPortfolio_1.StockInStockPortfolio.findAll();
            /*   let result: any;
               await client.query("SELECT * FROM stocks_portfolio")
                   .then(res => {// TODO delete
                       result = res.rows;
                   });*/
            return response.send(result);
        });
    }
    getAllHistory(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield stockHistory_1.StockHistory.findAll();
            /* let result: any;
             await client.query("SELECT * FROM history")
                 .then(res => {// TODO delete
                     result = res.rows;
                 });*/
            return response.send(result);
        });
    }
    getOneStock(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const stockByName = yield stock_1.Stock.find({ where: { name } });
            /*let stockByName: Stock;
            await client.query("SELECT * FROM stocks WHERE \"name\" = $1", [name])
                .then(res => { // TODO delete
                    stockByName = res.rows[0];
                });*/
            return response.send(stockByName);
        });
    }
};
__decorate([
    routing_controllers_1.Get("/stocks"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "getAllStocks", null);
__decorate([
    routing_controllers_1.Get("/stocksPortfolio"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "getAllStocksInPortfolio", null);
__decorate([
    routing_controllers_1.Get("/history"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "getAllHistory", null);
__decorate([
    routing_controllers_1.Get("/stocks/:name"),
    __param(0, routing_controllers_1.Param("name")), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "getOneStock", null);
StocksController = __decorate([
    routing_controllers_1.Controller()
], StocksController);
exports.StocksController = StocksController;
//# sourceMappingURL=stocksController.js.map
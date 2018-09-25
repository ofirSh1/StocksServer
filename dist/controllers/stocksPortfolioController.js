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
const stockInstockPortfolio_1 = require("../data/models/stockInstockPortfolio");
//import client from "../data/db.connection";
const stockHistory_1 = require("../data/models/stockHistory");
let StocksPortfolioController = class StocksPortfolioController {
    checkIfInStocksPortfolio(name, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let stockInPortfolioByName;
            stockInPortfolioByName = yield this.getStockInPortfolioDB(name);
            return response.send(stockInPortfolioByName);
        });
    }
    getStockInPortfolioDB(name) {
        let stockInPortfolioByName;
        return new Promise((resolve, reject) => {
            stockInstockPortfolio_1.StockInStockPortfolio.find({ where: { name } })
                .then(res => {
                stockInPortfolioByName = res;
                resolve(stockInPortfolioByName);
            });
            ;
            /* client.query("SELECT * FROM stocks_portfolio WHERE \"name\" = $1", [name])
                 .then(res => {
                     stockInPortfolioByName = res.rows[0];
                     resolve(stockInPortfolioByName);
                 });*/
        });
    }
    calculateGainLoss(existingStock, quantity, currentPrice) {
        let gainLossAvg = ((existingStock.buyingPrice * existingStock.quantity) + (currentPrice * quantity)) / (existingStock.quantity + quantity);
        return (existingStock.buyingPrice - gainLossAvg) / existingStock.buyingPrice;
    }
    buyStock(name, bodyJson, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let stockInPortfolioByName;
            stockInPortfolioByName = yield this.getStockInPortfolioDB(name);
            if (stockInPortfolioByName != null) {
                stockInPortfolioByName.gainLoss = this.calculateGainLoss(stockInPortfolioByName, bodyJson.stockQuantity, stockInPortfolioByName.currentPrice);
                stockInPortfolioByName.quantity += bodyJson.stockQuantity;
                stockInPortfolioByName.buyingPrice = bodyJson.stock.currentPrice;
                stockInstockPortfolio_1.StockInStockPortfolio.update({
                    currentPrice: stockInPortfolioByName.currentPrice, buyingPrice: stockInPortfolioByName.buyingPrice,
                    quantity: stockInPortfolioByName.quantity, gainLoss: stockInPortfolioByName.gainLoss
                }, { where: { name } });
                /*  await client.query("UPDATE stocks_portfolio SET \"currentPrice\" = $1, \"buyingPrice\" = $2, \"quantity\" = $3, \"gainLoss\" = $4 WHERE \"name\" = $5",
                      [stockInPortfolioByName.currentPrice, stockInPortfolioByName.buyingPrice, stockInPortfolioByName.quantity, stockInPortfolioByName.gainLoss, name])
                  await client.query("insert into history (\"name\", \"buyOrSell\", \"price\", \"quantity\", \"date\") VALUES($1, 'Buy', $2, $3, $4)", [name, stockInPortfolioByName.currentPrice, bodyJson.stockQuantity, new Date()]);
              */
            }
            else {
                stockInPortfolioByName = new stockInstockPortfolio_1.StockInStockPortfolio({ name, buyingPrice: bodyJson.stock.currentPrice, currentPrice: bodyJson.stock.currentPrice, quantity: bodyJson.stockQuantity, gainLoss: 0 });
                stockInPortfolioByName.save();
                /*stockInPortfolioByName = new StockInStockPortfolio(name, bodyJson.stock.currentPrice, bodyJson.stock.currentPrice, bodyJson.stockQuantity, 0);
                await client.query("insert into stocks_portfolio (\"name\", \"buyingPrice\", \"currentPrice\", \"quantity\", \"gainLoss\") VALUES($1, $2, $3, $4, $5)", [name, stockInPortfolioByName.buyingPrice, stockInPortfolioByName.currentPrice, stockInPortfolioByName.quantity, stockInPortfolioByName.gainLoss]);
                await client.query("insert into history (\"name\", \"buyOrSell\", \"price\", \"quantity\", \"date\") VALUES($1, 'Buy', $2, $3, $4)", [name, stockInPortfolioByName.currentPrice, stockInPortfolioByName.quantity, new Date()]);
            */
            }
            const stockInHistory = new stockHistory_1.StockHistory({ name, buyOrSell: 'Buy', price: stockInPortfolioByName.currentPrice, quantity: bodyJson.stockQuantity });
            stockInHistory.save();
            //const stockInHistory = new StockHistory(name, 'Buy', stockInPortfolioByName.currentPrice, bodyJson.stockQuantity);
            return response.send({ newStock: stockInPortfolioByName, newHistory: stockInHistory });
        });
    }
    sellStock(name, bodyJson, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let stockInPortfolioByName;
            stockInPortfolioByName = yield this.getStockInPortfolioDB(name);
            if (stockInPortfolioByName.quantity - bodyJson.stockQuantity < 0) {
                response.status(400);
                return response.send('Not enough stocks to sell');
            }
            else {
                if (stockInPortfolioByName.quantity - bodyJson.stockQuantity == 0) {
                    stockInPortfolioByName.quantity = 0;
                    stockInstockPortfolio_1.StockInStockPortfolio.destroy({ where: { name } });
                    /* await client.query("DELETE FROM stocks_portfolio WHERE \"name\" = $1", [name]);
                     await client.query("insert into history (\"name\", \"buyOrSell\", \"price\", \"quantity\", \"date\") VALUES($1, 'Sell', $2, $3, $4)", [name, stockInPortfolioByName.currentPrice, stockInPortfolioByName.quantity, new Date()]);
                 */
                }
                else {
                    stockInPortfolioByName.gainLoss = this.calculateGainLoss(stockInPortfolioByName, bodyJson.stockQuantity, stockInPortfolioByName.currentPrice);
                    stockInPortfolioByName.quantity -= bodyJson.stockQuantity;
                    stockInPortfolioByName.currentPrice = bodyJson.stock.currentPrice;
                    stockInstockPortfolio_1.StockInStockPortfolio.update({
                        currentPrice: stockInPortfolioByName.currentPrice, buyingPrice: stockInPortfolioByName.buyingPrice,
                        quantity: stockInPortfolioByName.quantity, gainLoss: stockInPortfolioByName.gainLoss
                    }, { where: { name } });
                    /*await client.query("UPDATE stocks_portfolio SET \"currentPrice\" = $1, \"buyingPrice\" = $2, \"quantity\" = $3, \"gainLoss\" = $4 WHERE \"name\" = $5",
                        [stockInPortfolioByName.currentPrice, stockInPortfolioByName.buyingPrice, stockInPortfolioByName.quantity, stockInPortfolioByName.gainLoss, name])
                    await client.query("insert into history (\"name\", \"buyOrSell\", \"price\", \"quantity\", \"date\") VALUES($1, 'Sell', $2, $3, $4)", [name, stockInPortfolioByName.currentPrice, bodyJson.stockQuantity, new Date()]);
                */
                }
                const stockInHistory = new stockHistory_1.StockHistory({ name, buyOrSell: 'Sell', price: stockInPortfolioByName.currentPrice, quantity: bodyJson.stockQuantity });
                stockInHistory.save();
                //const stockInHistory = new StockHistory(name, 'Sell', stockInPortfolioByName.currentPrice, bodyJson.stockQuantity);
                response.status(200);
                return response.send({ newStock: stockInPortfolioByName, newHistory: stockInHistory });
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get("/:name"),
    __param(0, routing_controllers_1.Param("name")), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StocksPortfolioController.prototype, "checkIfInStocksPortfolio", null);
__decorate([
    routing_controllers_1.Post("/:name"),
    __param(0, routing_controllers_1.Param("name")), __param(1, routing_controllers_1.Body()), __param(2, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StocksPortfolioController.prototype, "buyStock", null);
__decorate([
    routing_controllers_1.Put("/:name"),
    __param(0, routing_controllers_1.Param("name")), __param(1, routing_controllers_1.Body()), __param(2, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], StocksPortfolioController.prototype, "sellStock", null);
StocksPortfolioController = __decorate([
    routing_controllers_1.Controller("/stocksPortfolio")
], StocksPortfolioController);
exports.StocksPortfolioController = StocksPortfolioController;
//# sourceMappingURL=stocksPortfolioController.js.map
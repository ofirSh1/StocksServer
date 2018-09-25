"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const stocksController_1 = require("./controllers/stocksController");
const stocksPortfolioController_1 = require("./controllers/stocksPortfolioController");
const stock_1 = require("./data/models/stock");
const stockInstockPortfolio_1 = require("./data/models/stockInstockPortfolio");
const db_connection_1 = require("./data/db.connection");
const app = routing_controllers_1.createExpressServer({
    cors: true,
    controllers: [stocksController_1.StocksController, stocksPortfolioController_1.StocksPortfolioController]
});
let socket;
(() => __awaiter(this, void 0, void 0, function* () {
    yield db_connection_1.sequelize.sync({ force: true });
    console.info('Sequelize synced');
    const server = yield app.listen(process.env.PORT, 'localhost', function (err) {
        if (err)
            return err;
        console.log('Express server listening on port ' + process.env.PORT);
    });
    yield initStocks();
    const io = require('socket.io').listen(server);
    io.on('connection', x => {
        console.log('a user connected');
        socket = x;
        setInterval(newPrice, 5000);
    });
    io.on('disconnect', () => {
        console.log('user disconnected');
        socket = null;
    });
}))();
const stocksNames = ['XENE', 'TPNL', 'CDNA', 'VRS', 'SSTI'];
const initStocks = function () {
    stocksNames.forEach(name => {
        let openedPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
        let newStock = new stock_1.Stock({ name, openedPrice, currentPrice: openedPrice, change: 0 });
        newStock.save();
    });
};
const newPrice = function () {
    stocksNames.forEach(name => {
        let currentPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
        stock_1.Stock.find({ where: { name } }).then(oldStock => {
            let change = currentPrice - oldStock.openedPrice;
            stock_1.Stock.update({ currentPrice, change }, { where: { name } });
            stockInstockPortfolio_1.StockInStockPortfolio.update({ currentPrice }, { where: { name } });
            socket.emit('priceChanged', { name, currentPrice, change });
        });
    });
};
//# sourceMappingURL=app.js.map
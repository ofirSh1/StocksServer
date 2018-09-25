"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockHistory {
    constructor(_name, _buyOrSell, _price, _quantity) {
        this.name = _name;
        this.buyOrSell = _buyOrSell;
        this.price = _price;
        this.quantity = _quantity;
        this.date = new Date();
    }
}
exports.StockHistory = StockHistory;
//# sourceMappingURL=stockHistory.js.map
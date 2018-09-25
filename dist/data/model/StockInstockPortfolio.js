"use strict";
/*export class StockInStockPortfolio{
    name: string;
    currentPrice: number;
    buyingPrice: number;
    quantity: number;
    gainLoss: number;

    constructor(_name:string, _currentPrice:number, _buyingPrice:number, _quantity: number, _gainLoss:number) {
        this.name = _name;
        this.currentPrice = _currentPrice;
        this.buyingPrice = _buyingPrice;
        this.quantity = _quantity;
        this.gainLoss = _gainLoss;

    }
}*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let StockInStockPortfolio = class StockInStockPortfolio extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], StockInStockPortfolio.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], StockInStockPortfolio.prototype, "currentPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], StockInStockPortfolio.prototype, "buyingPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], StockInStockPortfolio.prototype, "quantity", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], StockInStockPortfolio.prototype, "gainLoss", void 0);
StockInStockPortfolio = __decorate([
    sequelize_typescript_1.Table
], StockInStockPortfolio);
exports.StockInStockPortfolio = StockInStockPortfolio;
exports.default = StockInStockPortfolio;
//# sourceMappingURL=stockInstockPortfolio.js.map
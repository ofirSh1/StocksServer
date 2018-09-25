"use strict";
/*export class StockHistory{
    name: string;
    buyOrSell: string;
    price: number;
    quantity: number;
    date: Date;


    constructor(_name:string, _buyOrSell:string, _price:number, _quantity: number) {
        this.name = _name;
        this.buyOrSell = _buyOrSell;
        this.price = _price;
        this.quantity = _quantity;
        this.date = new Date();
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
let StockHistory = class StockHistory extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TIME),
    __metadata("design:type", Date)
], StockHistory.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], StockHistory.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], StockHistory.prototype, "buyOrSell", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DOUBLE),
    __metadata("design:type", Number)
], StockHistory.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], StockHistory.prototype, "quantity", void 0);
StockHistory = __decorate([
    sequelize_typescript_1.Table
], StockHistory);
exports.StockHistory = StockHistory;
exports.default = StockHistory;
//# sourceMappingURL=stockHistory.js.map
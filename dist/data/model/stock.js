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
Object.defineProperty(exports, "__esModule", { value: true });
/*export class Stock{
    name: string;
    openedPrice: number;
    currentPrice: number;
    change: number;
}*/
const sequelize_typescript_1 = require("sequelize-typescript");
let Stock = class Stock extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Stock.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Stock.prototype, "openedPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Stock.prototype, "currentPrice", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Stock.prototype, "change", void 0);
Stock = __decorate([
    sequelize_typescript_1.Table
], Stock);
exports.Stock = Stock;
exports.default = Stock;
//# sourceMappingURL=stock.js.map
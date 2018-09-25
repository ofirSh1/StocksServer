import * as pg from 'pg';
import { Sequelize } from "sequelize-typescript";
import { Stock } from './models/stock';
import { StockInStockPortfolio } from './models/stockInstockPortfolio';
import { StockHistory } from './models/stockHistory';
export const sequelize = new Sequelize({
    database: 'StocksDatabase',
    dialect: 'postgres',
    username: 'StocksDatabaseUser',
    password: '12345',
    host: 'localhost',
    port: 5432,
    logging: false,
    operatorsAliases: false
});

sequelize.addModels([Stock]);
sequelize.addModels([StockInStockPortfolio]);
sequelize.addModels([StockHistory]);
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const stock_1 = require("./models/stock");
const stockInstockPortfolio_1 = require("./models/stockInstockPortfolio");
const stockHistory_1 = require("./models/stockHistory");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: 'StocksDatabase',
    dialect: 'postgres',
    username: 'StocksDatabaseUser',
    password: '12345',
    host: 'localhost',
    port: 5432,
    logging: false
});
exports.sequelize.addModels([stock_1.Stock]);
exports.sequelize.addModels([stockInstockPortfolio_1.StockInStockPortfolio]);
exports.sequelize.addModels([stockHistory_1.StockHistory]);
/*sequelize.sync()
    .then(() => {
        console.info('Sequelize synced!!!');
    })
    .catch(e => console.error(e.stack));*/
/*sequelize.authenticate().then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log("6");
    console.log(err);
})*/
//console.log("7");
//const connectionString = "postgres://StocksDatabaseUser:12345@localhost:5432/StocksDB";
//pg.defaults.poolSize = 1;
//export const sequelize = new Sequelize(connectionString);
//sequelize.addModels([__dirname + '/models']);
/*const client = new pg.Client({
    connectionString: connectionString,
});

client.connect()
    .then(() => console.log('CONNECTION ESTABLISHED'))
    .catch(err => console.log(err));

export default client;*/
/*module.exports = {
    query: (text, params) => client.query(text, params)
}*/
//# sourceMappingURL=db.connection.js.map
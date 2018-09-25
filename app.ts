import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { StocksController } from "./controllers/stocksController";
import { StocksPortfolioController } from './controllers/stocksPortfolioController';
import { sequelize } from "./data/db.connection";
import { GenerateStocks } from "./generateStocks";

let socket;
const PORT = process.env.PORT || 4040;
const HOST = process.env.HOST || 'localhost';

const app = createExpressServer({
    cors: true,
    classTransformer: false,
    controllers: [StocksController, StocksPortfolioController]
});

(async () => {
    await sequelize.sync();
    console.info('Sequelize synced');
    await GenerateStocks.initStocks();

    const server = await app.listen(PORT, HOST, function (err: any) {
        if (err) return err;
        console.log('Express server listening on port ' + PORT);
    });

    const io = require('socket.io').listen(server);
    io.on('connection', x => {
        console.log('a user connected');
        socket = x;
        setInterval(() => GenerateStocks.newPrice(socket), 5000);
    });

    io.on('disconnect', () => {
        console.log('user disconnected');
        socket = null;
    });
})()
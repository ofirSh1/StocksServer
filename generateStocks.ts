import { Stock } from "./data/models/stock";
import { StockInStockPortfolio } from "./data/models/stockInstockPortfolio";

export class GenerateStocks {
    static stocksNames = ['TEVA', 'INTEL', 'APPLE', 'GOOGLE', 'MICROSOFT'];

    static async initStocks() {
        const checkIfStockTableEmpty = await Stock.find()
        if (checkIfStockTableEmpty === null) {
            this.stocksNames.forEach(name => {
                let openedPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
                let newStock = new Stock({ name, openedPrice, currentPrice: openedPrice, change: 0 });
                newStock.save();
            });
        }
    }

    static newPrice(socket: any) {
        this.stocksNames.forEach(name => {
            let currentPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
            Stock.find({ where: { name } }).then(oldStock => {
                let change = currentPrice - oldStock.openedPrice;
                Stock.update({ currentPrice, change }, { where: { name } })
                StockInStockPortfolio.update({ currentPrice }, { where: { name } })
                socket.emit('priceChanged', { name, currentPrice, change });
            })
        });
    }
}

export default GenerateStocks;

import { StockInStockPortfolio } from "../data/models/stockInstockPortfolio";

export class ControllersHelpers {
    static getStockInPortfolioDB(name: string): Promise<StockInStockPortfolio> {
        let stockInPortfolioByName: StockInStockPortfolio;
        return new Promise<StockInStockPortfolio>((resolve, reject) => {
            StockInStockPortfolio.find({ where: { name } })
                .then(res => {
                    if (res != null)
                        res = res.toJSON();
                    stockInPortfolioByName = res;
                    resolve(stockInPortfolioByName);
                });;
        });
    }

    static calculateAvgPrice(existingStock: StockInStockPortfolio, quantity: number, currentPrice: number): number {
        return ((existingStock.buyingPrice * existingStock.quantity) + (currentPrice * quantity)) / (existingStock.quantity + quantity)
    }

    static calculateGainLoss(existingStock: StockInStockPortfolio, quantity: number, currentPrice: number): number {
        return (currentPrice - existingStock.buyingPrice) * (existingStock.quantity + quantity);
    }

    static updateStockInPortfolio(name: string, stockInPortfolioByName: StockInStockPortfolio) {
        StockInStockPortfolio.update({
            currentPrice: stockInPortfolioByName.currentPrice, buyingPrice: stockInPortfolioByName.buyingPrice,
            quantity: stockInPortfolioByName.quantity, gainLoss: stockInPortfolioByName.gainLoss
        }, { where: { name } });
    }
}

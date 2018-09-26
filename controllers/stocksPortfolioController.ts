import { Param, Body, Post, Put, Res, Controller, Get } from "routing-controllers";
import { StockInStockPortfolio } from "../data/models/stockInstockPortfolio";
import { Response } from "express";
import { StockHistory } from "../data/models/stockHistory";
import { ControllersHelpers } from "./controllersHelpers";

@Controller("/stocksPortfolio")
export class StocksPortfolioController {

    @Get("/:name")
    async checkIfInStocksPortfolio(@Param("name") name: string, @Res() response: Response) {
        let stockInPortfolioByName: StockInStockPortfolio;
        stockInPortfolioByName = await ControllersHelpers.getStockInPortfolioDB(name);
        return response.send(stockInPortfolioByName);
    }

    @Post("/:name")
    async buyStock(@Param("name") name: string, @Body() bodyJson: any, @Res() response: Response) {
        let stockInPortfolioByName: StockInStockPortfolio;
        stockInPortfolioByName = await ControllersHelpers.getStockInPortfolioDB(name);
        try {
            if (stockInPortfolioByName != null) {
                stockInPortfolioByName.buyingPrice = ControllersHelpers.calculateAvgPrice(stockInPortfolioByName, bodyJson.stockQuantity, bodyJson.stock.currentPrice);
                stockInPortfolioByName.gainLoss = ControllersHelpers.calculateGainLoss(stockInPortfolioByName, bodyJson.stockQuantity, stockInPortfolioByName.currentPrice);
                stockInPortfolioByName.quantity += bodyJson.stockQuantity;
                ControllersHelpers.updateStockInPortfolio(name, stockInPortfolioByName);
            }
            else {
                stockInPortfolioByName = new StockInStockPortfolio({ name, buyingPrice: bodyJson.stock.currentPrice, currentPrice: bodyJson.stock.currentPrice, quantity: bodyJson.stockQuantity, gainLoss: 0 });
                stockInPortfolioByName.save();
            }
            const stockInHistory = new StockHistory({ name, buyOrSell: 'Buy', price: stockInPortfolioByName.currentPrice, quantity: bodyJson.stockQuantity });
            stockInHistory.save();
            return response.send({ newStock: stockInPortfolioByName, newHistory: stockInHistory });
        } catch (e) {
            console.log(e);
            response.status(500);
            return response.send('Stock no longer exists in your stock portfolio');
        }
    }

    @Put("/:name")
    async sellStock(@Param("name") name: string, @Body() bodyJson: any, @Res() response: Response) {
        let stockInPortfolioByName: StockInStockPortfolio;
        stockInPortfolioByName = await ControllersHelpers.getStockInPortfolioDB(name);
        try {
            if (stockInPortfolioByName.quantity - bodyJson.stockQuantity < 0) {
                response.status(400);
                return response.send('Not enough stocks to sell');
            }
            else {
                if (stockInPortfolioByName.quantity - bodyJson.stockQuantity == 0) {
                    stockInPortfolioByName.quantity = 0;
                    StockInStockPortfolio.destroy({ where: { name } })
                }
                else {
                    stockInPortfolioByName.quantity -= bodyJson.stockQuantity;
                    stockInPortfolioByName.gainLoss = ControllersHelpers.calculateGainLoss(stockInPortfolioByName, bodyJson.stockQuantity, stockInPortfolioByName.currentPrice)
                    stockInPortfolioByName.currentPrice = bodyJson.stock.currentPrice;
                    ControllersHelpers.updateStockInPortfolio(name, stockInPortfolioByName);
                }
                const stockInHistory = new StockHistory({ name, buyOrSell: 'Sell', price: stockInPortfolioByName.currentPrice, quantity: bodyJson.stockQuantity });
                stockInHistory.save();
                response.status(200);
                return response.send({ newStock: stockInPortfolioByName, newHistory: stockInHistory });
            }
        } catch (e) {
            response.status(500);
            return response.send('Stock no longer exists in your stock portfolio');
        }
    }
}
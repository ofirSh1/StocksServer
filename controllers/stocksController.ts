import { Param, Get, Req, Res, Controller } from "routing-controllers";
import { Request, Response } from "express";
import { Stock } from "../data/models/stock";
import { StockInStockPortfolio } from "../data/models/stockInstockPortfolio";
import { StockHistory } from "../data/models/stockHistory";


@Controller()
export class StocksController {
    @Get("/stocks")
    async getAllStocks(@Req() request: Request, @Res() response: Response) {
        const result: Array<Stock> = await Stock.findAll();
        return response.send(result);
    }

    @Get("/stocksPortfolio")
    async getAllStocksInPortfolio(@Req() request: Request, @Res() response: Response) {
        const result: Array<StockInStockPortfolio> = await StockInStockPortfolio.findAll();
        return response.send(result);
    }

    @Get("/history")
    async getAllHistory(@Req() request: Request, @Res() response: Response) {
        const result: Array<StockHistory> = await StockHistory.findAll();
        return response.send(result);
    }

    @Get("/stocks/:name")
    async getOneStock(@Param("name") name: string, @Res() response: Response) {
        const stockByName: Stock = await Stock.find({ where: { name }});
        return response.send(stockByName);
    }
}
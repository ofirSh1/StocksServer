import {Table, Column, Model, PrimaryKey, DataType} from 'sequelize-typescript';

@Table
export class StockInStockPortfolio extends Model<StockInStockPortfolio> {
 
    @PrimaryKey
    @Column (DataType.STRING)
    name: string;
   
    @Column (DataType.DOUBLE)
    currentPrice: number;
   
    @Column (DataType.DOUBLE)
    buyingPrice: number;

    @Column (DataType.INTEGER)
    quantity: number;

    @Column (DataType.DOUBLE)
    gainLoss: number;
  }

  export default StockInStockPortfolio;
import {Table, Column, Model, PrimaryKey, CreatedAt, DataType} from 'sequelize-typescript';

@Table
export class StockHistory extends Model<StockHistory> {
 
    @PrimaryKey
    @CreatedAt
    @Column (DataType.DATE)
    date: Date;

    @Column (DataType.STRING)
    name: string;
   
    @Column (DataType.STRING)
    buyOrSell: string;
   
    @Column (DataType.DOUBLE)
    price: number;

    @Column (DataType.INTEGER)
    quantity: number;
  }

  export default StockHistory;
import {Table, Column, Model, PrimaryKey, DataType} from 'sequelize-typescript';

@Table
export class Stock extends Model<Stock> {
 
    @PrimaryKey
    @Column (DataType.STRING)
    name: string;
   
    @Column (DataType.DOUBLE)
    openedPrice: number;
   
    @Column (DataType.DOUBLE)
    currentPrice: number;

    @Column (DataType.DOUBLE)
    change: number;
  }

  export default Stock;
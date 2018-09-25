/*import client from "./data/db.connection";

const stocksNames = ['A', 'B', 'C', 'D', 'E'];
let socket;
export const newPrice = function () {
    if (socket == null) {
     socket = require('./app');
     console.info(socket);
    }
    stocksNames.forEach(name => {
        let currentPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
        client.query("SELECT * FROM stocks WHERE \"name\" = $1", [name])
            .then(res => {
                let change = currentPrice - res.rows[0].openedPrice;
                client.query("UPDATE stocks SET \"currentPrice\" = $1, \"change\" = $2 WHERE \"name\" = $3", [currentPrice, change, name])
                client.query("UPDATE stocks_portfolio SET \"currentPrice\" = $1 WHERE \"name\" = $2", [currentPrice, name])
               // console.info(socket);
                if (socket != null) {
                    console.log("emit");
                    socket.emit('priceChanged', { name: name, currentPrice: currentPrice, change: change });
                }
            })
            .catch(e => console.error(e.stack));
    });
}

const initStocks = function () {
    stocksNames.forEach(name => {
        let openedPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
        client.query("insert into stocks (\"name\", \"openedPrice\", \"currentPrice\", \"change\") VALUES($1, $2, $2, 0)", [name, openedPrice])
    });

}*/
//initStocks();
//setInterval(newPrice, 5000);
/*const newStocksAftercalculateChange = function (newStocks: Array<Stock>) {


    data.stocks.forEach(oldStock => {
        let newStock = newStocks.filter(x => x.name === oldStock.name)[0];
        let change = newStock.currentPrice - oldStock.openedPrice;
        oldStock.currentPrice = newStock.currentPrice;
        oldStock.change = change;
          if (this.checkIfInPortfolio(oldStock) != null){
            this.checkIfInPortfolio(oldStock).currentPrice = newStock.currentPrice;
            this.stocksInPortfolio$.next(this.stocksInPortfolio);
          }
    });

}*/
//const init = function () {
/*  this.stocks.forEach(s => {
      s.openedPrice = Math.random() * (1000 - 0.1 + 1) + 0.1;
      s.currentPrice = s.openedPrice;
      this.newStocksAftercalculateChange(this.stocks);
  });*/
//}
//# sourceMappingURL=generateStocks.js.map
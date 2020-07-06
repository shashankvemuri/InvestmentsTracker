import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  state = {
    stocks: [],
    ticker: {
      ticker: 'sample ticker',
      price: 20,
      quantity: 25,
    }
  }
  
  componentDidMount() {
    this.getStocks();
  }
  
  getStocks = _ => {
    fetch('http://localhost:4000/stocks')
    .then(response => response.json())
    .then(response => this.setState({ stocks: response.data }))
    .catch(err => console.error(err))
  }
  
  addStock = _ => {
    const { ticker } = this.state;
    fetch(`http://localhost:4000/stocks/add?ticker=${ticker.ticker}&price=${ticker.price}&quantity=${ticker.quantity}`)
      .then(this.getStocks)
      .catch(
        err => console.error(err))
  }

  renderTicker = ({ id, ticker }) => <div key={id}>{ticker}</div>
  renderPrice = ({ id, price }) => <div key={id}>{price}</div>
  renderQuantity = ({ id, quantity }) => <div key={id}>{quantity}</div>
  
  render() {
    const { stocks, ticker } = this.state;
    return (
      <div className="App">
        <h1>
          Keep Track of Your Investments!
        </h1>
        <table className="table">
          <tr>
            <th>Ticker</th>
            <th>Price Bought</th>
            <th>Quantity Bought</th>
          </tr>
          <tr>
              <td className="table">{stocks.map(this.renderTicker)}</td>
              <td className="table">{stocks.map(this.renderPrice)}</td>
              <td className="table">{stocks.map(this.renderQuantity)}</td>
          </tr>
        </table>
        <div className="button">
          <input 
            className="inputbox"
            placeholder="ex. AAPL"
            onChange={e => this.setState({ ticker: { ...ticker, ticker: e.target.value }})}/>
            <br></br>
          <input
            className="inputbox"
            placeholder="ex. 340.00"
            onChange={e => this.setState({ ticker: { ...ticker, price: e.target.value }})}/>
            <br></br>
            <input
            className="inputbox"
            placeholder="ex. 10"
            onChange={e => this.setState({ ticker: { ...ticker, quantity: e.target.value }})}/>
            <br></br>
          <button onClick = {this.addStock}>Add Investment!</button>
        </div>
        <div className="bottom">
        <footer>
          Created by Shashank Vemuri
        </footer>
        </div>
      </div>
    );
  }
}

export default App;

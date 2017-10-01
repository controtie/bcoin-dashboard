import React from 'react';
import { render } from 'react-dom';
import Mempool from './Mempool';
import Blockchain from './Blockchain';
import TransactionDetail from './components/TransactionDetail';
import { testTransactions } from './test/test-data';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      blockchain: [],
      blockDetail: undefined,
      transactionDetail: undefined,
      mempoolTransactions: testTransactions,
      mempoolTransactionDetail: testTransactions[0],
    };
  }
  componentDidMount() {
    this.webSocket = new WebSocket('ws://localhost:8080/');
    this.webSocket.onopen = () => {
      console.log('websocket open');
    };
    this.webSocket.onmessage = (response) => {
      const msg = JSON.parse(response.data);
      console.log('message received', msg);
      if (msg.type === 'block') {
        this.setState({ blockchain: this.state.blockchain.concat(msg.data) });
      }
      if (msg.type === 'block-detail') {
        console.log('hash', msg.data)
        this.setState({ blockDetail: msg.data });
      }
      if (msg.type === 'transaction-detail') {
        this.setState({ transactionDetail: msg.data });
      }
    }
  }
  render() {
    return (
      <div className="dashboard">
        <h1> Bcoin Dashboard </h1>
        <div className="blockchain-container">
          <Blockchain
            webSocket={this.webSocket}
            blockchain={this.state.blockchain}
            blockDetail={this.state.blockDetail} />
        </div>
        <Mempool
          transactions={this.state.mempoolTransactions}
          transactionDetail={this.state.mempoolTransactionDetail}/>
        <h2>Peers</h2>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


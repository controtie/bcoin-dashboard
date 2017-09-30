import React from 'react';
import { render } from 'react-dom';
import Mempool from './Mempool';
import Blockchain from './Blockchain';
import BlockDetail from './BlockDetail';
import TransactionDetail from './components/TransactionDetail';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      blockchain: [],
      blockDetail: undefined,
      transactionDetail: undefined,
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
        <h2> Bcoin Dashboard </h2>
        <div className="blockchain-container">
          <Blockchain
            webSocket={this.webSocket}
            blockchain={this.state.blockchain}
            blockDetail={this.state.blockDetail} />
          <BlockDetail details={this.state.blockDetail} />
        </div>
        <TransactionDetail hash={'abcd'} />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


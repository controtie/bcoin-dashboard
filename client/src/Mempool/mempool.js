import React from 'react';

class Mempool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  componentDidMount() {
    this.webSocket = new WebSocket('ws://localhost:8080');
    this.webSocket.onopen = () => {
      this.setState(
        { transactions: this.state.transactions.concat('Websocket opened') },
      );
    };
    this.webSocket.onmessage = (response) => {
      const msg = JSON.parse(response.data);
      console.log('message received');
      console.log(msg);
      if (msg.type === 'text') {
        this.setState({
          transactions: this.state.transactions.concat(msg.data),
        });
      }
      if (msg.type === 'block') {
        this.setState({
          transactions: this.state.transactions.concat(msg.data.hash),
        });
      }
      if (msg.type === 'mempool') {
        this.setState({
          transactions: this.state.transactions.concat(msg.data.hash),
        });
      }
    };
    this.webSocket.onclose = () => {
      this.setState(
        { transactions: this.state.transactions.concat('connection closed') }
      );
    }
  }
  render() {
    return (
      <div>
        <h2> Mempool </h2>
        {
          this.state.transactions.map((data, key) => <div key={key}> {data} </div>)
        }
      </div>
    );
  }
}

export default Mempool;


import React from 'react';
import Transaction from '../Transaction';

const firstTransaction = {
  "hash": "b76d9a7f1b431f3463c5261de17e548b708dce9d5ae2bbba43039ad557870f61",
  "witnessHash": "b76d9a7f1b431f3463c5261de17e548b708dce9d5ae2bbba43039ad557870f61",
  "ps": 1505948175,
  "version": 1,
  "flag": 1,
  "inputs": [
    {
      "prevout": {
        "hash": "b002f0d816c4afceda7ebd96637857db88e9f33f6ed19547c0e0f3da7c806556",
        "index": 0
      },
      "script": "483045022100bb1919a5844dcfee24f294d73233621f5553c354cfabd31d814d9e0b9ea3210402201b848651e20f877944fea1cc13a6647d8845a09516157b35373e846034a2d30101210322e56b01150fb3fe807bc47cdf54a01c048322e66aa325d49578c80de756877b",
      "witness": "00",
      "sequence": 4294967294,
      "address": "mraPAvGukMj8X2SurXUo9PZXrAuTcc2z5A"
    }
  ],
  "outputs": [
    {
      "value": 4999549,
      "script": "76a914dfc9b839d0c6cc1bac80d63d29a6ecdbe5524d0288ac",
      "address": "n1vEdZKEga6qJoNhad3iKqosJhSBdPjPBa"
    },
    {
      "value": 60000000,
      "script": "76a9142a3204276532c0eb0f5e60e76ec289e6462e163b88ac",
      "address": "mjN4bJJotcCRRiiGpWXyiE4vdRpVMQf5Wa"
    }
  ],
  "locktime": 1196712
}

class Mempool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [firstTransaction],
    };
  }
  componentDidMount() {
    /*
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
    */
  }
  render() {
    return (
      <div>
        <h2> Mempool </h2>
        {
          this.state.transactions.map((data, key) => {
            return <Transaction key={key} data={data} />;
          })
        }
      </div>
    );
  }
}

export default Mempool;


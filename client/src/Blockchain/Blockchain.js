import React from 'react';
import ChainEntry from './ChainEntry';

class Blockchain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockchain: [],
    };
    this.getBlock = this.getBlock.bind(this);
  }
  componentDidMount() {
    this.webSocket = new WebSocket('ws://localhost:8080/');
    this.webSocket.onopen = () => {
      console.log('blockchain websocket opened');
    };
    this.webSocket.onmessage = (response) => {
      const msg = JSON.parse(response.data);
      console.log('message received', msg);
      if (msg.type === 'block') {
        this.setState({ blockchain: this.state.blockchain.concat(msg.data) });
      }
    }
  }
  getBlock(hash) {
    const request = {type: 'block-hash', data: hash};
    console.log(JSON.stringify(request));
    this.webSocket.send(JSON.stringify(request));
  }
  render() {
    return (
      <div className='blockchain'>
        <div> Current Chain </div>
        {
          this.state.blockchain.map(chainEntry => {
            return <ChainEntry
              getBlock={this.getBlock.bind(this, chainEntry.hash)}
              key={chainEntry.hash}
              entry={chainEntry} />
          })
        }
      </div>
    );
  }
}

export default Blockchain;


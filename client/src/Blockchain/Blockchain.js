import React from 'react';
import ChainEntry from './ChainEntry';

class Blockchain extends React.Component {
  constructor(props) {
    super(props);
    this.getBlock = this.getBlock.bind(this);
  }
  getBlock(hash) {
    const request = {type: 'block-hash', data: hash};
    this.props.webSocket.send(JSON.stringify(request));
  }
  render() {
    const {
      blockDetail: {
        hash,
      } = {},
    } = this.props;
    return (
      <div className='blockchain'>
        <h3> Current Chain </h3>
        {
          this.props.blockchain.map(chainEntry => {
            return <ChainEntry
              selected={hash == chainEntry.hash}
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


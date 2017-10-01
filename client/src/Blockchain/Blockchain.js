import React from 'react';
import ChainEntry from './ChainEntry';
import BlockDetail from './BlockDetail';

class Blockchain extends React.Component {
  constructor(props) {
    super(props);
    this.getBlock = this.getBlock.bind(this);
  }
  getBlock(hash) {
    const request = {type: 'block-hash', data: hash};
    this.props.webSocket.send(JSON.stringify(request));
  }
  getChainTip() {
    const {
      blockchain,
    } = this.props;
    if (Array.isArray(blockchain) && blockchain.length > 0) {
      return blockchain[blockchain.length - 1].height;
    }
    return 'loading...';
  }
  render() {
    const {
      blockDetail: {
        hash,
      } = {},
    } = this.props;
    const chainTip = this.getChainTip();

    return (
      <div className='blockchain-container'>
        <div className='chain-entry-container'>
          <h3>Blockchain</h3>
          <h4>{`Current Chain Tip ${chainTip}`}</h4>
          <div className='chain-entries'>
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
        </div>
        <BlockDetail details={this.props.blockDetail} />
      </div>
    );
  }
}

export default Blockchain;


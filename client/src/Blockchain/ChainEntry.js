import React from 'react';

const ChainEntry = props => {
  const {
    entry: {
      hash,
      height,
      merkleRoot,
    } = {},
    getBlock,
  } = props || {};
  return (
    <div className='chain-entry' onClick={getBlock}>
      <div> {hash} </div>
      <div> {height} </div>
    </div>
  );
}

export default ChainEntry;


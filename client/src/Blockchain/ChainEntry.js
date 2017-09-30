import React from 'react';

const ChainEntry = props => {
  const {
    entry: {
      hash,
      height,
      merkleRoot,
    } = {},
    selected,
    getBlock,
  } = props || {};
  const shortenedHash = hash.slice(0, 32);
  return (
    <div className={`chain-entry ${selected ? 'selected' : ''}`} onClick={getBlock}>
      <div> {`${shortenedHash}...`} </div>
      <div> {height} </div>
    </div>
  );
}

export default ChainEntry;


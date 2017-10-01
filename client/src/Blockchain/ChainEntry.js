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
  const firstHashSection = hash.slice(0, 33);
  const secondHashSection = hash.slice(33, 64);
  return (
    <div className={`chain-entry ${selected ? 'selected' : ''}`} onClick={getBlock}>
      <div>{`Block Height: ${height}`}</div>
      <div> {firstHashSection}</div>
      <div> {secondHashSection}</div>
    </div>
  );
}

export default ChainEntry;


import React from 'react';
import TransactionList from '../Transaction';

const BlockDetail = (props) => {
  const {
    details,
    details: {
      hash,
      height,
      merkleRoot,
      txs,
    } = {},
  } = props || {};
  if (details === undefined) {
    return (
      <div className='block-detail'>
        <h3>Block Details</h3>
        <h3>No block selected</h3>
      </div>
    );
  }
  return (
    <div className='block-detail'>
      <h3> Block Details </h3>
      <p>Hash</p>
      <p>{hash}</p>
      <p>Merkle Root</p>
      <p>{merkleRoot}</p>
      <p>{`Height: ${height}`}</p>
      <TransactionList transactions={txs} />
    </div>
  );
};

export default BlockDetail;


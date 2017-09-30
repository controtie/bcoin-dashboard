import React from 'react';

const TransactionDetail = (props) => {
  const {
    hash,
  } = props;
  return (
    <div className="transaction-detail">
      <h3> Transaction Detail </h3>
      <p> Hash </p>
      <p> {hash} </p>
    </div>
  );
};

export default TransactionDetail;


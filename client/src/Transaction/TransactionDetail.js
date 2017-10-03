import React from 'react';

const TransactionDetail = props => {
  const {
    data: {
      hash,
      inputs,
      outputs,
    } = {},
  } = props;
  const firstHashSection = hash.slice(0, 33);
  const secondHashSection = hash.slice(33);

  return (
    <div className='transaction-detail'>
      <h3>Hash</h3>
      <p>{firstHashSection}</p>
      <p>{secondHashSection}</p>
      <p>Inputs</p>
      <p>Outputs</p>
    </div>
  );
}

export default TransactionDetail;


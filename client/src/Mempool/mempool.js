import React from 'react';
import TransactionList from '../Transaction';
import TransactionDetail from '../Transaction/TransactionDetail';

const Mempool = props => {
  const {
    transactions,
    transactionDetail,
  } = props;
  return (
    <div className='mempool-container'>
      <div className='mempool'>
        <h3>Mempool</h3>
        <TransactionList transactions={transactions} />
      </div>
      <TransactionDetail data={transactionDetail} />
    </div>
  );
}

export default Mempool;


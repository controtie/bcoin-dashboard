import React from 'react';

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.onToggleExpand = this.onToggleExpand.bind(this);
  }

  onToggleExpand() {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    const {
      transactions,
    } = this.props;
    return (
      <div className='transaction-list'>
      <h4>Transactions</h4>
        {
          transactions.map(tx => {
            const {
              hash,
            } = tx || {};
            return <div key={hash} className='transaction'>
              <p>Hash</p>
              <p>{tx.hash}</p>
            </div>
          })
        }
      </div>
    );
  }
}

export default TransactionList;


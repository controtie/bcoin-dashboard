import React from 'react';
import { render } from 'react-dom';
import Mempool from './Mempool';
import Blockchain from './Blockchain';
import TransactionDetail from './components/TransactionDetail';

class App extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h2> Bcoin Dashboard </h2>
        <div>
          <Blockchain />
          <TransactionDetail hash={'abcd'} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


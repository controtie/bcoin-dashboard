import React from 'react';
import { render } from 'react-dom';
import Mempool from './Mempool';

class App extends React.Component {
  render() {
    return (
      <div>
        <h2> Bcoin Dashboard </h2>
        <Mempool />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


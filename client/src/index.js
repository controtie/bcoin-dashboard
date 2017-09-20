import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.webSocket = new WebSocket('ws://localhost:8080');
    this.webSocket.onopen = () => {
      console.log('websocket connection opened');
    };
    this.webSocket.onmessage = (msg) => {
      console.log('message received');
      console.log(msg);
    };
  }
  render() {
    return (
      <div>
        hello worlds!!!
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));


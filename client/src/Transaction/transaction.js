import React from 'react';

class Transaction extends React.Component {
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
      hash,
    } = this.props.data;

    if (this.state.isExpanded) {
      return <div onClick={this.onToggleExpand} className="transaction">
        <p> Transaction Hash </p>
        <p> {hash} </p>
        <p> Expanded </p>
      </div>
    }
    
    return (
      <div onClick={this.onToggleExpand} className="transaction">
        <p> Transaction Hash </p>
        <p> {hash} </p>
      </div>
    );
  }
}

export default Transaction;


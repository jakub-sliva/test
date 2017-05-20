// One item in list
import React from 'react';

export default class Item extends React.Component {

  // required method
  render() {
    return <li>{this.props.text} <button onClick={this.props.removeItem}>X</button></li>
  }
};
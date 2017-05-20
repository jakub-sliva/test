// Mail app for list
import React from 'react';
import Item from './Item';
import Form from './Form';

export default class App extends React.Component {

  // method
  updateState() {
    this.setState({listItems: this.props.store.getState()});
  }
  
  // after render method
  componentWillMount() {
    this.updateState();
    this.props.store.subscribe(this.updateState.bind(this));
  }                                  

  // required method
  render() {
    var removeItem = this.props.removeItem;
    
    var items = this.state.listItems.map(function(text, id) {
      return <Item key={id} text={text} removeItem={function(){removeItem(id)}} />
    });
    
    return (<div><ul>{items}</ul><Form addItem={this.props.addItem} /></div>);
  }
};

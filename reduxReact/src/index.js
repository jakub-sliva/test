// Import
import { createStore } from 'redux';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// REDUX
var defaultValue = ['letadlo', 'stolek', 'zidle'];

function changeStatus(state = defaultValue, action) {
  var newState;
  
  switch (action.type) {
    case 'ADD':
      newState = [...state, action.text];
      break;
    case 'REMOVE':
      newState = [...state];
      newState.splice(action.id, 1);
      break;
    case 'REMOVE_ALL':
      newState = [];
      break;
    default:
      newState = state;
  }
  
  return newState;
}

// create store
var store = createStore(changeStatus);

// output to line
store.subscribe(function() {
  console.log('New state is:', store.getState());
})

// REACT
var removeItem = function(id) {
  store.dispatch({type: 'REMOVE', id: id});
}

var addItem = function(text) {
  store.dispatch({type: 'ADD', text: text});
}

ReactDOM.render(
  <App removeItem={removeItem} addItem={addItem} store={store}/>,
  document.getElementById('root')
);
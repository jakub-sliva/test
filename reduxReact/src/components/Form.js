// Form for add new item
import React from 'react';

export default class Form extends React.Component {

  // required method
  render() {
    var input;
    var addItem = this.props.addItem;
    
    // input + button
    return (
      <div>
        <input ref={function(ref) {input = ref}} />
        <button onClick={function(){
          addItem(input.value);
          input.value = "";
        }}>Paste</button>
      </div>
    );
  }
};
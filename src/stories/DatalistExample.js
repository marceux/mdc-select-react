import React, { PureComponent } from 'react';

import Textfield from '../components/Textfield';
import Datalist from '../components/Datalist';

class DatalistExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      text: '',
      matchedItems: [],
    };

    // Bind methods
    this.getMatchedItems = this.getMatchedItems.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.setDatalistRef = this.setDatalistRef.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
  }

  getMatchedItems(text) {
    const matchText = text.toLowerCase();
    const results = [];

    // Iterate over all the options, and add basically add the indices of
    // the matched options to the results array
    for (let i = 0; i < this.props.options.length; i++) {
      const optionText = this.props.options[i].text.toLowerCase();

      // We check if the option matches the match text
      if (optionText.indexOf(matchText) !== -1) {
        // We add the "index" of the matched item to the array
        results.push(i);
      }
    }

    return results;
  }

  setInputRef(node) {
    if (node !== null) {
      this.inputNode = node.inputNode;
      this.inputNode.addEventListener('keyup', this.handleInputKeyDown);
    } else {
      this.input.removeEventListener('keyup', this.handleInputKeyDown);
      this.inputNode = null;
    }
  }

  setDatalistRef(node) {
    this.datalist = node;
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleSelect(index) {
    const optionIndex = this.state.matchedItems[index];
    const { text } = this.props.options[optionIndex];

    this.setState({ open: false, text }, () => {
      // Set our input node value to the selected text value
      this.inputNode.value = text;
    });
  }

  handleInputChange(event) {
    const { target: { value } } = event;
    const matchedItems = this.getMatchedItems(value);
    const open = (matchedItems.length > 0);

    this.setState({ open, text: value, matchedItems });
  }

  handleInputKeyDown(event) {
    const { key, keyCode } = event;

    const isTab = (key === 'Tab' || keyCode === 9);
    const isNext = (key === 'ArrowDown' || keyCode === 40);

    if (this.state.open && this.datalist && (isTab || isNext)) {
      this.datalist.foundation.focusOnItemAtIndex(0);
      return false;
    }

    return true;
  }

  render() {
    const { matchedItems } = this.state;
    const byIndex = (item, itemIndex) => matchedItems.indexOf(itemIndex) !== -1;
    const items = this.props.options.filter(byIndex);

    return (
      <div>
        <Textfield onChange={this.handleInputChange} ref={this.setInputRef} />
        <Datalist
          items={items}
          onCancel={this.handleCancel}
          onSelect={this.handleSelect}
          open={this.state.open}
          ref={this.setDatalistRef}
        />
      </div>
    );
  }
}

export default DatalistExample;

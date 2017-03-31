import React, { PureComponent, PropTypes } from 'react';

// Foundation
import DatalistFoundation from '../foundations/DatalistFoundation';

// Adapter
import datalistAdapter from '../adapters/datalistAdapter';

// Component
import SimpleMenuOption from './SimpleMenuOption';

// Styles
import '../styles/datalist.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';

class Datalist extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    // Object that contains our option nodes
    this.optionNodes = [];

    // General Methods
    this.setRootRef = this.setRootRef.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.getOptionNodes = this.getOptionNodes.bind(this);
    this.renderOption = this.renderOption.bind(this);

    // Create our foundation
    this.foundation = new DatalistFoundation(datalistAdapter(this));
  }

  componentDidMount() {
    // We want to set our option nodes BEFORE we initialize the foundation
    this.optionNodes = this.getOptionNodes();

    this.foundation.init();
  }

  componentDidUpdate() {
    this.optionNodes = this.getOptionNodes();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  setRootRef(node) {
    this.rootNode = node;
  }

  setListRef(node) {
    this.listNode = node;
  }

  getOptionNodes() {
    return [].slice.call(this.rootNode.querySelectorAll('.mdc-list-item'));
  }

  renderOption(option) {
    this.optionObjects.push(option);

    // Get the id and text from the option
    const { id, text } = option;

    return (<SimpleMenuOption id={id} key={id} text={text} />);
  }

  render() {
    let value = this.state.value;

    // If the value exists, we are going to lower case it
    if (value) {
      value = value.toLowerCase();
    }

    const options = this.props.options.filter(option => {
      const text = option.text.toLowerCase();

      if (value) {
        return (text.indexOf(value) !== -1);
      }

      return false;
    });

    // We are going to store the options array in this class
    this.optionObjects = options;

    return (
      <div>
        <input
          onChange={(event) => { this.setState({ value: event.target.value }); }}
          type="text"
          ref={(node) => { this.inputNode = node; }}
        />
        <button ref={(node) => { this.btnNode = node; }} tabIndex="-1">Click Me</button>
        <div className="mdc-datalist" ref={this.setRootRef}>
          <ul
            aria-hidden="true"
            className="mdc-list mdc-datalist__items"
            ref={this.setListRef}
            role="menu"
            tabIndex="-1"
          >
            {options.map(this.renderOption)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Datalist;

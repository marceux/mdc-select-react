import React, { PureComponent, PropTypes } from 'react';

// Foundation
import DatalistFoundation from '../foundations/DatalistFoundation';

// Adapter
import datalistAdapter from '../adapters/datalistAdapter';

// Styles
import '../styles/datalist.css';
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';

class Datalist extends PureComponent {
  constructor(props) {
    super(props);

    // Object that contains our option nodes
    this.optionNodes = [];

    // General Methods
    this.setRootRef = this.setRootRef.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.getOptionNodes = this.getOptionNodes.bind(this);

    // Create our foundation
    this.foundation = new DatalistFoundation(datalistAdapter(this));
  }

  componentDidMount() {
    // We want to set our option nodes BEFORE we initialize the foundation
    this.optionNodes = this.getOptionNodes();

    this.foundation.init();
  }

  componentDidUpdate(prevProps) {
    this.optionNodes = this.getOptionNodes();

    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.foundation.open(true);
      } else {
        this.foundation.close();
      }
    }
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

  render() {
    function toRenderedItem(item) {
      const { id, text } = item;

      return (
        <li className="mdc-list-item" id={id} key={id} tabIndex="0">
          {text}
        </li>
      );
    }

    return (
      <div className="mdc-datalist" ref={this.setRootRef}>
        <ul
          aria-hidden="true"
          className="mdc-list mdc-datalist__items"
          ref={this.setListRef}
          role="menu"
          tabIndex="-1"
        >
          {this.props.items.map(toRenderedItem)}
        </ul>
      </div>
    );
  }
}

Datalist.propTypes = {
  children: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Datalist;

import React, { PureComponent, PropTypes } from 'react';

// Foundation
import { MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu';

// Adapter
import simpleMenuAdapter from '../adapters/simpleMenuAdapter';

// Component
import SimpleMenuOption from './SimpleMenuOption';

// Styles
import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';

class SimpleMenu extends PureComponent {
  constructor(props) {
    super(props);

    // Object that contains our option nodes
    this.optionNodes = [];

    // General Methods
    this.setRootRef = this.setRootRef.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.getOptionNodes = this.getOptionNodes.bind(this);
    this.renderOption = this.renderOption.bind(this);

    // Finally, create our MDC SimpleMenu Foundation
    this.foundation = new MDCSimpleMenuFoundation(simpleMenuAdapter(this));
  }

  componentDidMount() {
    // We want to set our option nodes BEFORE we initialize the foundation
    this.optionNodes = this.getOptionNodes();

    this.foundation.init();

    if (this.props.open) {
      this.foundation.open();
    }
  }

  componentDidUpdate(prevProps) {
    // Get the current props
    const { focusIndex, open, options } = this.props;

    // If our options changed...
    if (prevProps.options !== options) {
      this.optionNodes = this.getOptionNodes();
    }

    // If the open prop changed...
    if (prevProps.open !== open) {
      // check current open prop, and use that function
      if (open) {
        this.foundation.open({ focusIndex });
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

  renderOption({ id, label }) {
    return (<SimpleMenuOption id={id} key={id} label={label} />);
  }

  render() {
    const { options } = this.props;

    return (
      <div className="mdc-simple-menu" ref={this.setRootRef}>
        <ul
          aria-hidden="true"
          className="mdc-list mdc-simple-menu__items"
          ref={this.setListRef}
          role="menu"
        >
          {options.map(this.renderOption)}
        </ul>
      </div>
    );
  }
}

SimpleMenu.propTypes = {
  onCancel: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

export default SimpleMenu;

import React, { PureComponent, PropTypes } from 'react';

// Foundation
import { MDCSelectFoundation } from '@material/select/dist/mdc.select';

// Adapter
import selectAdapter from '../adapters/selectAdapter';

// Component
import SimpleMenu from './SimpleMenu';

// Styles
import '@material/select/dist/mdc.select.css';

class Select extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedText: props.placeholder || 'Select...',
    };

    // Method Binding
    this.setRootRef = this.setRootRef.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    // Lastly, create our MDComponent Foundation
    this.foundation = new MDCSelectFoundation(selectAdapter(this));
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props;

    // If the value changed, then we fire an onChange function if provided
    if (prevState.value !== this.state.value) {
      if (onChange) {
        onChange(this.state.value);
      }
    }
  }

  setRootRef(node) {
    this.rootNode = node;
  }

  setMenuRef(menuComponent) {
    // this will be null if the menuComponent is unmounting
    if (menuComponent === null) {
      this.menuNode = null;
      this.optionNodes = null;
    } else {
      this.menuNode = menuComponent.rootNode;
      this.optionNodes = menuComponent.optionNodes;
    }
  }

  handleFocus(event) {
    const { onFocus } = this.props;
    const { open } = this.state;

    if (!open && onFocus) {
      onFocus(event);
    }
  }

  handleBlur(event) {
    const { onBlur } = this.props;
    const { open } = this.state;

    if (!open && onBlur) {
      onBlur(event);
    }
  }

  handleCancel() {
    this.setState({ open: false });
  }

  render() {
    const { options } = this.props;
    const { focusIndex, open, selectedText } = this.state;

    return (
      <div
        className="mdc-select"
        ref={this.setRootRef}
        role="listbox"
        tabIndex="0"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <span className="mdc-select__selected-text">{selectedText}</span>
        <SimpleMenu
          focusIndex={focusIndex}
          onCancel={this.handleCancel}
          open={open}
          options={options}
          ref={this.setMenuRef}
        />
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Select;

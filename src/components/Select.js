import { isEmpty } from 'lodash';
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

    this.defaultText = 'Select...';

    this.state = {
      open: false,
      selectedText: props.placeholder || this.defaultText,
      disabled: props.disabled || false,
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

    // If the state is disabled, setDisabled at the foundation level
    // using Boolean, because we may not know what the value of disabled is
    if (this.state.disabled) {
      this.foundation.setDisabled(Boolean(this.state.disabled));
    }
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(nextProps) {
    const { disabled, placeholder } = nextProps;

    // Set empty state object
    const newState = {};

    // If we changed the placeholder
    if (this.props.placeholder !== placeholder) {
      // If the current value is 'undefined' then use OUR placeholder for text
      if (this.state.value === undefined) {
        newState.selectedText = placeholder;
      }
    }

    // If our disabled prop changed, then set the newState disabled as a boolean value
    if (this.props.disabled !== disabled) {
      newState.disabled = Boolean(disabled);
    }

    // If our new state is NOT empty, then set it, if it is, just end
    if (!isEmpty(newState)) {
      this.setState(newState);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { disabled, onChange } = this.props;

    // If the disabled props changed, then we call the foundation to
    // set the disabled state
    if (prevProps.disabled !== disabled) {
      this.foundation.setDisabled(Boolean(disabled));
    }

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
    const { disabled, focusIndex, open, selectedText } = this.state;

    return (
      <div
        className="mdc-select"
        ref={this.setRootRef}
        role="listbox"
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex={(disabled) ? '-1' : '0'}
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

import { isEmpty } from 'lodash';
import React, { PureComponent, PropTypes } from 'react';

// Component
import Textfield from './Textfield';
import SimpleMenu from './SimpleMenu';

class Autocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultText = 'Type Here...';

    this.state = {
      disabled: props.disabled || false,
      focused: false,
      selectedText: props.placeholder || this.defaultText,
    };

    // Method Binding
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    // If the state is disabled, setDisabled at the foundation level
    if (this.state.disabled) {
      // Set disabled state...?
    }
  }

  componentWillUnmount() {
    // destroy "foundation"
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

    // If the value changed, then we fire an onChange function if provided
    if (prevState.value !== this.state.value) {
      if (onChange) {
        onChange(this.state.value);
      }
    }
  }

  handleFocus(event) {
    const { onFocus } = this.props;
    const { focused } = this.state;

    if (!focused && onFocus) {
      this.setState({ focused: true });
      onFocus(event);
    }
  }

  handleBlur(event) {
    const { onBlur } = this.props;
    const { focused } = this.state;

    if (!focused && onBlur) {
      this.setState({ focused: false });
      onBlur(event);
    }
  }

  handleCancel() {
    this.setState({ focused: false });
  }

  render() {
    const { options } = this.props;
    const { focused, focusIndex } = this.state;

    return (
      <div
        className="mdac-autocomplete"
        onClick={this.handleFocus}
      >
        <Textfield />
        <SimpleMenu
          focusIndex={focusIndex}
          onCancel={this.handleCancel}
          open={focused}
          options={options}
        />
      </div>
    );
  }
}

Autocomplete.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Autocomplete;

import { isEmpty } from 'lodash';
import React, { PureComponent, PropTypes } from 'react';

// Component
import Textfield from './Textfield';
import AddonMenu from './AddonMenu';

class Autocomplete extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultText = 'Type Here...';

    // Default values for our node refs
    this.rootNode = null;
    this.textfieldNode = null;
    this.menuNode = null;

    this.state = {
      disabled: props.disabled || false,
      openMenu: false,
      selectedText: props.placeholder || this.defaultText,
    };

    // Method Binding
    this.getSourceNode = this.getSourceNode.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.filterOptions = this.filterOptions.bind(this);
    this.setRootRef = this.setRootRef.bind(this);
    this.setTextfieldRef = this.setTextfieldRef.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
  }

  componentDidMount() {
    // If the state is disabled, setDisabled at the foundation level
    if (this.state.disabled) {
      // Set disabled state...?
    }

    this.rootNode.addEventListener('MDCSimpleMenu:selected', () => {
      this.setState({ openMenu: false });
    });

    // We want add a click listener to our mdc-textfield__wrapper
    this.textfieldNode.addEventListener('click', () => {
      // We want to stop event propagation because it won't go
      // to the menu's cancellation listener
      event.stopPropagation();
    });
  }

  componentWillUnmount() {
    // destroy "foundation"
  }

  componentDidUpdate(prevProps, prevState) {
    const { onBlur, onChange, onFocus } = this.props;
    const { inMenu } = this.state;

    // If we are considered "inMenu" now, we are going to attempt to focus
    // on the menu root if we haven't already
    if (prevState.inMenu !== inMenu) {
      if (inMenu) {
        this.menuNode.focus();
      }
    }

    // If the value changed, then we fire an onChange function if provided
    if (prevState.value !== this.state.value) {
      if (onChange) {
        onChange(this.state.value);
      }
    }
  }

  handleInputBlur({ relatedTarget }) {
    // Create our new state object
    const newState = {};

    // We are going to use the event.relatedTarget experimental property
    // If we don't have a related target or target is NOT in our component...
    if (this.rootNode.contains(relatedTarget)) {
      newState.inMenu = true;
    } else {
      newState.openMenu = false;
      newState.inMenu = false;
    }

    newState.inInput = false;

    // Set the new state
    this.setState(newState);
  }

  handleCancel() {
    this.setState({ inInput: false, inMenu: false, openMenu: false });
  }

  handleInputFocus() {
    // Our new (baby) state!
    const newState = {};

    // If our menu is closed...
    if (!this.state.openMenu) {
      newState.openMenu = true;
    }

    // We are now focusing within the input
    newState.inInput = true;

    // Update the state
    this.setState(newState);
  }

  handleTextInput(event) {
    const { value } = event.target;

    this.setState({ filter: value });
  }

  filterOptions() {
    const { options } = this.props;
    const filterText = this.state.filter.toLowerCase();

    // We run a filter, and change the option text to lower case
    // for accurate comparisons
    return options.filter(option => {
      const text = option.text.toLowerCase();

      return text.indexOf(filterText) !== -1;
    });
  }

  setRootRef(node) {
    this.rootNode = node;
  }

  setTextfieldRef(node) {
    if (node !== null) {
      this.textfieldNode = node.rootNode;
      this.sourceNode = node.inputNode;
    } else {
      this.textfieldNode = null;
      this.sourceNode = null;
    }
  }

  setMenuRef(node) {
    if (node !== null) {
      this.menuNode = node.rootNode;
    } else {
      this.menuNode = null;
    }
  }

  getSourceNode() {
    return this.sourceNode;
  }

  render() {
    const { filter, openMenu } = this.state;

    let options;

    // If we have a filter, run our filter options func, else
    // get from the props directly
    if (filter) {
      options = this.filterOptions();
    } else {
      options = this.props.options;
    }

    return (
      <div className="mdac-autocomplete" ref={this.setRootRef}>
        <Textfield
          onBlur={this.handleInputBlur}
          onChange={this.handleTextInput}
          onFocus={this.handleInputFocus}
          ref={this.setTextfieldRef}
        />
        <AddonMenu
          extendedElement={this.getSourceNode}
          onFocus={() => console.log('Testing')}
          onCancel={this.handleCancel}
          open={openMenu}
          options={options}
          ref={this.setMenuRef}
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

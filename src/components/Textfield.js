import { isEmpty, isString } from 'lodash';
import { Set as immutableSet } from 'immutable';

import React, { PureComponent, PropTypes } from 'react';

// Foundation
import { MDCTextfieldFoundation } from '@material/textfield/dist/mdc.textfield';

// Adapter
import textfieldAdapter from '../adapters/textfieldAdapter';

// Component
import TextfieldHelptext from './TextfieldHelptext';

// Styles
import '@material/textfield/dist/mdc.textfield.css';

class Textfield extends PureComponent {
  constructor(props) {
    super(props);

    const helpClasses = this.generateHelpClasses(props);

    // Default state
    this.state = {
      disabled: this.props.disabled || false,
      valid: true,
      helpClasses,
    };

    // General Methods
    this.generateHelpClasses = this.generateHelpClasses.bind(this);
    this.setRootRef = this.setRootRef.bind(this);
    this.setLabelRef = this.setLabelRef.bind(this);
    this.setInputRef = this.setInputRef.bind(this);
    this.setHelpRef = this.setHelpRef.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.renderHelp = this.renderHelp.bind(this);

    // Finally, create our MDC Textfield Foundation
    this.foundation = new MDCTextfieldFoundation(textfieldAdapter(this));
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentWillReceiveProps(nextProps) {
    const { disabled, errorMsg, helpMsg, persistentHelp } = nextProps;

    // Set empty state object
    const newState = {};

    // If our disabled prop changed, then set the newState disabled as a boolean value
    if (this.props.disabled !== disabled) {
      newState.disabled = Boolean(disabled);
    }

    if (this.props.errorMsg !== errorMsg ||
        this.props.helpMsg !== helpMsg ||
        this.props.persistentHelp !== persistentHelp) {
      newState.helpClasses = this.generateHelpClasses(nextProps); 
    }

    // If our new state is NOT empty, then set it, if it is, just end
    if (!isEmpty(newState)) {
      this.setState(newState);
    }
  }

  componentDidUpdate(prevProps) {
    const { disabled } = this.props;

    // If the disabled props changed, then we call the foundation to
    // set the disabled state
    if (prevProps.disabled !== disabled) {
      this.foundation.setDisabled(Boolean(disabled));
    }
  }

  generateHelpClasses(props) {
    // Get our message props and persistent prop
    const { errorMsg, helpMsg, persistentHelp } = props;

    // Create a new immutable set...
    let classes = immutableSet();

    // If we have a help msg...
    if (isString(helpMsg)) {
      // add the default class
      classes = classes.add('mdc-textfield-helptext');

      // then check if we have an error message
      if (isString(errorMsg)) {
        classes = classes.add('mdc-textfield-helptext--validation-msg');
      }

      // and if we're persistent
      if (persistentHelp) {
        classes = classes.add('mdc-textfield-helptext--persistent');
      }
    }

    return classes;
  }

  setRootRef(node) {
    this.rootNode = node;
  }

  setLabelRef(node) {
    this.labelNode = node;
  }

  setInputRef(node) {
    this.inputNode = node;
  }

  setHelpRef(helptextComponent) {
    // this will be null if the helptextComponent is unmounting
    if (helptextComponent === null) {
      this.helpNode = null;
    } else {
      this.helpNode = helptextComponent.rootNode;
    }
  }

  handleBlur(event) {
    const { onBlur, checkValidity } = this.props;

    // Check if checkValidity is provided
    // We are going to call our checkValidate method on the event target value
    if (checkValidity) {
      // Update the validity in the state
      this.setState({ valid: checkValidity(event.target.value) });
    }

    if (onBlur) {
      onBlur(event);
    }
  }

  renderHelp() {
    const { helpClasses, valid } = this.state;
    const { errorMsg, helpMsg } = this.props;

    let text = helpMsg;

    // If we have help classes, move forward
    if (helpMsg) {
      if (!valid && isString(errorMsg)) {
        text = errorMsg;
      }

      return (
        <TextfieldHelptext classes={helpClasses} ref={this.setHelpRef}>
          {text}
        </TextfieldHelptext>
      );
    }

    return '';
  }

  render() {
    const { label, onChange, onFocus } = this.props;

    return (
      <div className="mdc-textfield__wrapper">
        <label className="mdc-textfield" ref={this.setRootRef}>
          <input
            className="mdc-textfield__input"
            disabled={this.state.disabled}
            onBlur={this.handleBlur}
            onChange={onChange}
            onFocus={onFocus}
            ref={this.setInputRef}
            type="text"
          />

          <span className="mdc-textfield__label" ref={this.setLabelRef}>
            {label}
          </span>
        </label>

        {this.renderHelp()}
      </div>
    );
  }
}

Textfield.propTypes = {
  checkValidity: PropTypes.func,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  label: PropTypes.string,
  persistentHelp: PropTypes.bool,
};

export default Textfield;

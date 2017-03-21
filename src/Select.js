import React, { PureComponent, PropTypes } from 'react';
import { Set as ImmutableSet } from 'immutable';

import { MDCSelectFoundation } from '@material/select/dist/mdc.select';
import { MDCSimpleMenu } from '@material/menu/dist/mdc.menu';

import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/select/dist/mdc.select.css';

class Select extends PureComponent {
  constructor(props) {
    super(props);

    const { placeholder } = props;

    this.state = {
      classes: new ImmutableSet(),
      selectedText: placeholder || 'Select...',
    };

    this.optionNodes = {};
    this.options = [];

    // Bind Methods
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.setAttr = this.setAttr.bind(this);
    this.rmAttr = this.rmAttr.bind(this);
    this.computeBoundingRect = this.computeBoundingRect.bind(this);
    this.registerInteractionHandler = this.registerInteractionHandler.bind(this);
    this.deregisterInteractionHandler = this.deregisterInteractionHandler.bind(this);
    this.focus = this.focus.bind(this);
    this.makeTabbable = this.makeTabbable.bind(this);
    this.makeUntabbable = this.makeUntabbable.bind(this);
    this.getComputedStyleValue = this.getComputedStyleValue.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.create2dRenderingContext = this.create2dRenderingContext.bind(this);
    this.setMenuElStyle = this.setMenuElStyle.bind(this);
    this.setMenuElAttr = this.setMenuElAttr.bind(this);
    this.rmMenuElAttr = this.rmMenuElAttr.bind(this);
    this.getMenuElOffsetHeight = this.getMenuElOffsetHeight.bind(this);
    this.getOffsetTopForOptionAtIndex = this.getOffsetTopForOptionAtIndex.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.isMenuOpen = this.isMenuOpen.bind(this);
    this.setSelectedTextContent = this.setSelectedTextContent.bind(this);
    this.getNumberOfOptions = this.getNumberOfOptions.bind(this);
    this.getTextForOptionAtIndex = this.getTextForOptionAtIndex.bind(this);
    this.getValueForOptionAtIndex = this.getValueForOptionAtIndex.bind(this);
    this.setAttrForOptionAtIndex = this.setAttrForOptionAtIndex.bind(this);
    this.rmAttrForOptionAtIndex = this.rmAttrForOptionAtIndex.bind(this);
    this.registerMenuInteractionHandler = this.registerMenuInteractionHandler.bind(this);
    this.deregisterMenuInteractionHandler = this.deregisterMenuInteractionHandler.bind(this);
    this.notifyChange = this.notifyChange.bind(this);
    this.getWindowInnerHeight = this.getWindowInnerHeight.bind(this);

    this.getOptionNode = this.getOptionNode.bind(this);
    this.setRootRef = this.setRootRef.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
    this.addOptionRef = this.addOptionRef.bind(this);
    this.renderOption = this.renderOption.bind(this);

    // Finally, create our MDC Select Foundation
    this.foundation = new MDCSelectFoundation({
      addClass: this.addClass,
      removeClass: this.removeClass,
      setAttr: this.setAttr,
      rmAttr: this.rmAttr,
      computeBoundingRect: this.computeBoundingRect,
      registerInteractionHandler: this.registerInteractionHandler,
      deregisterInteractionHandler: this.deregisterInteractionHandler,
      focus: this.focus,
      makeTabbable: this.makeTabbable,
      makeUntabbable: this.makeUntabbable,
      getComputedStyleValue: this.getComputedStyleValue,
      setStyle: this.setStyle,
      create2dRenderingContext: this.create2dRenderingContext,
      setMenuElStyle: this.setMenuElStyle,
      setMenuElAttr: this.setMenuElAttr,
      rmMenuElAttr: this.rmMenuElAttr,
      getMenuElOffsetHeight: this.getMenuElOffsetHeight,
      getOffsetTopForOptionAtIndex: this.getOffsetTopForOptionAtIndex,
      openMenu: this.openMenu,
      isMenuOpen: this.isMenuOpen,
      setSelectedTextContent: this.setSelectedTextContent,
      getNumberOfOptions: this.getNumberOfOptions,
      getTextForOptionAtIndex: this.getTextForOptionAtIndex,
      getValueForOptionAtIndex: this.getValueForOptionAtIndex,
      setAttrForOptionAtIndex: this.setAttrForOptionAtIndex,
      rmAttrForOptionAtIndex: this.rmAttrForOptionAtIndex,
      registerMenuInteractionHandler: this.registerMenuInteractionHandler,
      deregisterMenuInteractionHandler: this.deregisterMenuInteractionHandler,
      notifyChange: this.notifyChange,
      getWindowInnerHeight: this.getWindowInnerHeight,
    });
  }

  componentDidMount() {
    this.simpleMenu = MDCSimpleMenu.attachTo(this.menuNode);
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
    this.simpleMenu = undefined;
  }

  componentWillReceiveProps(nextProps) {
    // If our options change, reset the optionNodes
    if (nextProps.options !== this.props.options) {
      this.optionNodes = {};
      this.options = [];
    }
  }

  getOptionNode(index) {
    const { id } = this.options[index];
    return this.optionNodes[id];
  }

  addClass(className) {
    this.setState(prevState => ({
      classes: prevState.classes.add(className),
    }));
  }

  removeClass(className) {
    this.setState(prevState => ({
      classes: prevState.classes.remove(className),
    }));
  }

  setAttr(attr, value) {
    this.rootNode.setAttribute(attr, value);
  }

  rmAttr(attr) {
    this.rootNode.removeAttribute(attr);
  }

  computeBoundingRect() {
    return this.rootNode.getBoundingClientRect();
  }

  registerInteractionHandler(type, handler) {
    this.rootNode.addEventListener(type, handler);
  }

  deregisterInteractionHandler(type, handler) {
    this.rootNode.removeEventListener(type, handler);
  }

  focus() {
    this.rootNode.focus();
  }

  makeTabbable() {
    this.setState(prevState => ({
      tabbable: true,
    }));
  }

  makeUntabbable() {
    this.setState(prevState => ({
      tabbable: false,
    }));
  }

  getComputedStyleValue(propertyName) {
    return window.getComputedStyle(this.rootNode)[propertyName];
  }

  setStyle(propertyName, value) {
    this.rootNode.style.setProperty(propertyName, value);
  }

  create2dRenderingContext() {
    return document.createElement('canvas').getContext('2d');
  }

  setMenuElStyle(propertyName, value) {
    this.menuNode.style.setProperty(propertyName, value);
  }

  setMenuElAttr(attr, value) {
    this.menuNode.setAttribute(attr, value);
  }

  rmMenuElAttr(attr) {
    this.menuNode.removeAttribute(attr);
  }

  getMenuElOffsetHeight() {
    return this.menuNode.offsetHeight;
  }

  getOffsetTopForOptionAtIndex(index) {
    return this.getOptionNode(index).offsetTop;
  }

  openMenu(focusIndex) {
    // this.props.onFocus()
    this.simpleMenu.foundation_.open(focusIndex);
  }

  isMenuOpen() {
    return this.simpleMenu.foundation_.isOpen();
  }

  setSelectedTextContent(selectedTextContent) {
    this.setState(prevState => ({
      selectedText: selectedTextContent,
    }));
  }

  getNumberOfOptions() {
    return this.options.length;
  }

  getTextForOptionAtIndex(index) {
    return this.options[index].label;
  }

  getValueForOptionAtIndex(index) {
    return this.options[index].value;
  }

  setAttrForOptionAtIndex(index, attr, value) {
    this.getOptionNode(index).setAttribute(attr, value);
  }

  rmAttrForOptionAtIndex(index, attr) {
    this.getOptionNode(index).removeAttribute(attr);
  }

  registerMenuInteractionHandler(type, handler) {
    this.menuNode.addEventListener(type, handler);
  }

  deregisterMenuInteractionHandler(type, handler) {
    this.menuNode.removeEventListener(type, handler);
  }

  notifyChange() {
    // this.props.onChange()
  }

  getWindowInnerHeight() {
    return window.innerHeight;
  }

  setRootRef(node) {
    this.rootNode = node;
  }

  setMenuRef(node) {
    this.menuNode = node;
  }

  addOptionRef(id) {
    return (node) => {
      // If we receive a HTMLElement, add to our
      // option nodes object, else, delete key
      if (node) {
        this.optionNodes[id] = node;
      } else {
        delete this.optionNodes[id];
      }
    };
  }

  renderOption({ id, label }) {
    return (
      <li
        className="mdc-list-item"
        id={id}
        key={id}
        ref={this.addOptionRef(id)}
        role="option"
        tabIndex="0"
      >
        {label}
      </li>
    );
  }

  render() {
    const { options, placeholder } = this.props;
    const { classes, selectedText } = this.state;

    // Setting the option IDs array
    const renderedOptions = [];

    // Setting our default option
    const defaultOption = {
      id: 'default',
      label: placeholder || 'Select...',
      value: '',
    };

    if (options && Array.isArray(options) && options.length > 0) {
      // Have our own array of the options
      this.options = [defaultOption, ...options];
    } else {
      this.options = [defaultOption];
    }

    // Iterate over our class options array
    this.options.forEach(option => {
      // Render the option and push to our rendered array
      renderedOptions.push(this.renderOption(option));
    });

    return (
      <div
        className={`mdc-select ${classes.toJS().join(' ')}`}
        ref={this.setRootRef}
        role="listbox"
        tabIndex="0"
      >
        <span className="mdc-select__selected-text">{selectedText}</span>
        <div className="mdc-simple-menu mdc-select__menu" ref={this.setMenuRef}>
          <ul className="mdc-list mdc-simple-menu__items">
            {renderedOptions}
          </ul>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
};

export default Select;

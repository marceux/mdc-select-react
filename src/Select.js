import { find } from 'lodash';

import React, { PureComponent, PropTypes } from 'react';

import { MDCSelectFoundation } from '@material/select/dist/mdc.select';

import SimpleMenu from './SimpleMenu';

import '@material/select/dist/mdc.select.css';

class Select extends PureComponent {
  constructor(props) {
    super(props);

    const { placeholder } = props;

    this.state = {
      open: false,
      selectedText: placeholder || 'Select...',
    };

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

    this.setRootRef = this.setRootRef.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

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
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props;

    // If the value changed, then we send it up
    if (prevState.value !== this.state.value) {
      if (onChange) {
        onChange(this.state.value);
      }
    }
  }

  addClass(className) {
    this.rootNode.classList.add(className);
  }

  removeClass(className) {
    this.rootNode.classList.remove(className);
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
    return this.optionNodes[index].offsetTop;
  }

  openMenu(focusIndex) {
    this.setState({
      focusIndex,
      open: true,
    });
  }

  isMenuOpen() {
    return this.state.open;
  }

  setSelectedTextContent(selectedText) {
    // We need to get the value from the option by its label ("selectedText")
    const { value } = find(this.props.options, ['label', selectedText]);

    this.setState({ open: false, selectedText, value });
  }

  getNumberOfOptions() {
    return this.props.options.length;
  }

  getTextForOptionAtIndex(index) {
    return this.props.options[index].label;
  }

  getValueForOptionAtIndex(index) {
    return this.props.options[index].value;
  }

  setAttrForOptionAtIndex(index, attr, value) {
    this.optionNodes[index].setAttribute(attr, value);
  }

  rmAttrForOptionAtIndex(index, attr) {
    this.optionNodes[index].removeAttribute(attr);
  }

  registerMenuInteractionHandler(type, handler) {
    this.menuNode.addEventListener(type, handler);
  }

  deregisterMenuInteractionHandler(type, handler) {
    this.menuNode.removeEventListener(type, handler);
  }

  notifyChange() {}

  getWindowInnerHeight() {
    return window.innerHeight;
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

    if (!this.isMenuOpen() && onFocus) {
      onFocus(event);
    }
  }

  handleBlur(event) {
    const { onBlur } = this.props;

    if (!this.isMenuOpen() && onBlur) {
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

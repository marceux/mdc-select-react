import React, { PureComponent, PropTypes } from 'react';
import { Set as ImmutableSet } from 'immutable';

import { MDCSelectFoundation } from '@material/select/dist/mdc.select';

import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';
import '@material/select/dist/mdc.select.css';

class Select extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      classes: new ImmutableSet(),
      tabbable: false,
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
    this.getWindowInnerHeight = this.getWindowInnerHeight.bind(this);

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
      //create2dRenderingContext: this.create2dRenderingContext,
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
      getWindowInnerHeight: this.getWindowInnerHeight,
    });
  }

  componentDidMount() {
    this.foundation.init();
  }

  componentWillUnmount() {
    this.foundation.destroy();
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
    this.refs.root.setAttribute(attr, value);
  }

  rmAttr(attr) {
    this.refs.root.removeAttribute(attr);
  }

  computeBoundingRect() {
    if (this.refs.root) {
      return this.refs.root.getBoundingClientRect();
    }

    return { left: 0, top: 0 };
  }

  registerInteractionHandler(type, handler) {
    if (this.refs.root) {
      this.refs.root.addEventListener(type, handler);
    }
  }

  deregisterInteractionHandler(type, handler) {
    if (this.refs.root) {
      this.refs.root.removeEventListener(type, handler);
    }
  }

  focus() {
    if (this.refs.root) {
      this.refs.root.focus();
    }
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
    if (this.refs.root) {
      return window.getComputedStyle(this.refs.root)[propertyName];
    }
  }

  setStyle(propertyName, value) {
    if (this.refs.root) {
      this.refs.root.style.setProperty(propertyName, value);
    }
  }

  create2dRenderingContext() {
    return document.createElement('canvas').getContext('2d');
  }

  setMenuElStyle(propertyName, value) {
    if (this.refs.menu) {
      this.refs.menu.style.setProperty(propertyName, value);
    }
  }

  setMenuElAttr(attr, value) {
    if (this.refs.menu) {
      this.refs.menu.setAttribute(attr, value);
    }
  }

  rmMenuElAttr(attr) {
    if (this.refs.menu) {
      this.refs.menu.removeAttribute(attr);
    }
  }

  getMenuElOffsetHeight() {
    if (this.refs.menu) {
      return this.refs.menu.offsetHeight;
    }
  }

  getOffsetTopForOptionAtIndex(index) {
    return 0;
  }

  openMenu(focusIndex) {
    // focusIndex = string
  }

  isMenuOpen() {
    return true;
  }

  setSelectedTextContent(selectedTextContent) {
    return null;
  }

  getNumberOfOptions() {
    return 0; 
  }

  getTextForOptionAtIndex(index) {
    return '';
  }

  getValueForOptionAtIndex(index) {
    return '';
  }

  setAttrForOptionAtIndex(index, attr, value) {
    //
  }

  rmAttrForOptionAtIndex(index, attr) {
    //
  }

  registerMenuInteractionHandler(type, handler) {
    //
  }

  deregisterMenuInteractionHandler(type, handler) {
    //
  }

  getWindowInnerHeight() {
    return window.innerHeight;
  }

  render() {
    const { classes, tabbable } = this.state;

    return (
      <div
        className={`mdc-select ${classes.toJS().join(' ')}`}
        ref="root"
        role="listbox"
        tabIndex={(tabbable) ? '0' : '-1'}
      >
        <span className="mdc-select__selected-text">Pick a food group</span>
        <div
          className="mdc-simple-menu mdc-select__menu"
          ref="menu"
        >
          <ul className="mdc-list mdc-simple-menu__items">
            <li className="mdc-list-item" role="option" id="grains" tabIndex="0">
              Bread, Cereal, Rice, and Pasta
            </li>
            <li className="mdc-list-item" role="option" id="vegetables" tabIndex="0">
              Vegetables
            </li>
            <li className="mdc-list-item" role="option" id="fruit" tabIndex="0">
              Fruit
            </li>
            <li className="mdc-list-item" role="option" id="dairy" tabIndex="0">
              Milk, Yogurt, and Cheese
            </li>
            <li className="mdc-list-item" role="option" id="meat" tabIndex="0">
              Meat, Poultry, Fish, Dry Beans, Eggs, and Nuts
            </li>
            <li className="mdc-list-item" role="option" id="fats" tabIndex="0">
              Fats, Oils, and Sweets
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Select.propTypes = {

};

export default Select;

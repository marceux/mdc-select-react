import React, { PureComponent, PropTypes } from 'react';

import { MDCSimpleMenuFoundation } from '@material/menu/dist/mdc.menu';

import SimpleMenuOption from './SimpleMenuOption';

import '@material/list/dist/mdc.list.css';
import '@material/menu/dist/mdc.menu.css';

let storedTransformPropertyName;

function getTransformPropertyName(globalObj, forceRefresh = false) {
  if (storedTransformPropertyName === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = ('transform' in el.style ? 'transform' : 'webkitTransform');
    storedTransformPropertyName = transformPropertyName;
  }

  return storedTransformPropertyName;
}

class SimpleMenu extends PureComponent {
  constructor(props) {
    super(props);

    // Object that contains our option nodes
    this.optionNodes = [];

    // Bind Methods
    this.addClass = this.addClass.bind(this);
    this.removeClass = this.removeClass.bind(this);
    this.hasClass = this.hasClass.bind(this);
    this.hasNecessaryDom = this.hasNecessaryDom.bind(this);
    this.getInnerDimensions = this.getInnerDimensions.bind(this);
    this.hasAnchor = this.hasAnchor.bind(this);
    this.getAnchorDimensions = this.getAnchorDimensions.bind(this);
    this.getWindowDimensions = this.getWindowDimensions.bind(this);
    this.setScale = this.setScale.bind(this);
    this.setInnerScale = this.setInnerScale.bind(this);
    this.getNumberOfItems = this.getNumberOfItems.bind(this);
    this.registerInteractionHandler = this.registerInteractionHandler.bind(this);
    this.deregisterInteractionHandler = this.deregisterInteractionHandler.bind(this);
    this.registerDocumentClickHandler = this.registerDocumentClickHandler.bind(this);
    this.deregisterDocumentClickHandler = this.deregisterDocumentClickHandler.bind(this);
    this.getYParamsForItemAtIndex = this.getYParamsForItemAtIndex.bind(this);
    this.setTransitionDelayForItemAtIndex = this.setTransitionDelayForItemAtIndex.bind(this);
    this.getIndexForEventTarget = this.getIndexForEventTarget.bind(this);
    this.notifySelected = this.notifySelected.bind(this);
    this.notifyCancel = this.notifyCancel.bind(this);
    this.saveFocus = this.saveFocus.bind(this);
    this.restoreFocus = this.restoreFocus.bind(this);
    this.isFocused = this.isFocused.bind(this);
    this.focus = this.focus.bind(this);
    this.getFocusedItemIndex = this.getFocusedItemIndex.bind(this);
    this.focusItemAtIndex = this.focusItemAtIndex.bind(this);
    this.isRtl = this.isRtl.bind(this);
    this.setTransformOrigin = this.setTransformOrigin.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.getAccurateTime = this.getAccurateTime.bind(this);

    this.getOptionNodes = this.getOptionNodes.bind(this);
    this.setRootRef = this.setRootRef.bind(this);
    this.setListRef = this.setListRef.bind(this);
    this.renderOption = this.renderOption.bind(this);

    // Finally, create our MDC SimpleMenu Foundation
    this.foundation = new MDCSimpleMenuFoundation({
      addClass: this.addClass,
      removeClass: this.removeClass,
      hasClass: this.hasClass,
      hasNecessaryDom: this.hasNecessaryDom,
      getInnerDimensions: this.getInnerDimensions,
      hasAnchor: this.hasAnchor,
      getAnchorDimensions: this.getAnchorDimensions,
      getWindowDimensions: this.getWindowDimensions,
      setScale: this.setScale,
      setInnerScale: this.setInnerScale,
      getNumberOfItems: this.getNumberOfItems,
      registerInteractionHandler: this.registerInteractionHandler,
      deregisterInteractionHandler: this.deregisterInteractionHandler,
      registerDocumentClickHandler: this.registerDocumentClickHandler,
      deregisterDocumentClickHandler: this.deregisterDocumentClickHandler,
      getYParamsForItemAtIndex: this.getYParamsForItemAtIndex,
      setTransitionDelayForItemAtIndex: this.setTransitionDelayForItemAtIndex,
      getIndexForEventTarget: this.getIndexForEventTarget,
      notifySelected: this.notifySelected,
      notifyCancel: this.notifyCancel,
      saveFocus: this.saveFocus,
      restoreFocus: this.restoreFocus,
      isFocused: this.isFocused,
      focus: this.focus,
      getFocusedItemIndex: this.getFocusedItemIndex,
      focusItemAtIndex: this.focusItemAtIndex,
      isRtl: this.isRtl,
      setTransformOrigin: this.setTransformOrigin,
      setPosition: this.setPosition,
      getAccurateTime: this.getAccurateTime,
    });
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

    // If the open prop changed, then we'll check if it's open
    // ... if it is, open it!
    // ... if it's NOW closed, close it!
    if (prevProps.open !== open) {
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

  getOptionNodes() {
    return [].slice.call(this.rootNode.querySelectorAll('.mdc-list-item'));
  }

  addClass(className) {
    this.rootNode.classList.add(className);
  }

  removeClass(className) {
    this.rootNode.classList.remove(className);
  }

  hasClass(className) {
    return this.rootNode.classList.contains(className);
  }

  hasNecessaryDom() {
    return Boolean(this.listNode);
  }

  getInnerDimensions() {
    return {
      height: this.listNode.offsetHeight,
      width: this.listNode.offsetWidth,
    };
  }

  hasAnchor() {
    return (
      this.rootNode.parentElement &&
      this.rootNode.parentElement.classList.contains('mdc-menu-anchor')
    );
  }

  getAnchorDimensions() {
    return this.rootNode.parentElement.getBoundingClientRect();
  }

  getWindowDimensions() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  setScale(x, y) {
    this.rootNode.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
  }

  setInnerScale(x, y) {
    this.listNode.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
  }

  getNumberOfItems() {
    return this.props.options.length;
  }

  registerInteractionHandler(type, handler) {
    return this.rootNode.addEventListener(type, handler);
  }

  deregisterInteractionHandler(type, handler) {
    return this.rootNode.removeEventListener(type, handler);
  }

  registerDocumentClickHandler(type, handler) {
    return document.addEventListener(type, handler);
  }

  deregisterDocumentClickHandler(type, handler) {
    return document.removeEventListener(type, handler);
  }

  getYParamsForItemAtIndex(index) {
    const { offsetTop: top, offsetHeight: height } = this.optionNodes[index];

    return { top, height };
  }

  setTransitionDelayForItemAtIndex(index, value) {
    this.optionNodes[index].style.setProperty('transition-delay', value);
  }

  getIndexForEventTarget(target) {
    return this.optionNodes.indexOf(target);
  }

  notifySelected(detail) {
    const event = new CustomEvent('MDCSimpleMenu:selected', { detail });
    this.rootNode.dispatchEvent(event);
  }

  notifyCancel() {
    const event = new CustomEvent('MDCSimpleMenu:cancel');
    this.rootNode.dispatchEvent(event);

    // This is a little hackish, but we're going to call our onCancel func too
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  saveFocus() {
    this.previousFocus = document.activeElement;
  }

  restoreFocus() {
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  isFocused() {
    return document.activeElement === this.rootNode;
  }

  focus() {
    this.rootNode.focus();
  }

  getFocusedItemIndex() {
    return this.optionNodes.indexOf(document.activeElement);
  }

  focusItemAtIndex(index) {
    return this.optionNodes[index].focus();
  }

  isRtl() {
    return false;
  }

  setTransformOrigin(origin) {
    this.rootNode.style[`${getTransformPropertyName(window)}-origin`] = origin;
  }

  setPosition(position) {
    this.rootNode.style.left = 'left' in position ? position.left : null;
    this.rootNode.style.right = 'right' in position ? position.right : null;
    this.rootNode.style.top = 'top' in position ? position.top : null;
    this.rootNode.style.bottom = 'bottom' in position ? position.bottom : null;
  }

  getAccurateTime() {
    return window.performance.now();
  }

  setRootRef(node) {
    this.rootNode = node;
  }

  setListRef(node) {
    this.listNode = node;
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

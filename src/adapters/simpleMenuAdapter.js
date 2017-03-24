import getTransformPropertyName from '../utils/getTransformPropertyName';

/**
 * Adapter-generating function.
 *
 * Many of the methods reference properties and methods that need to be set by
 * the react component associated with the generated adapter.
 *
 * Read here for documentation: https://github.com/material-components/material-components-web/tree/master/packages/mdc-select
 *
 * @name simpleMenuAdapter
 * @param {PureComponent} component React Component
 * @returns {Object} MDC Adapter
 */
function simpleMenuAdapter(component) {
  function addClass(className) {
    component.rootNode.classList.add(className);
  }

  function removeClass(className) {
    component.rootNode.classList.remove(className);
  }

  function hasClass(className) {
    return component.rootNode.classList.contains(className);
  }

  function hasNecessaryDom() {
    return Boolean(component.listNode);
  }

  function getInnerDimensions() {
    return {
      height: component.listNode.offsetHeight,
      width: component.listNode.offsetWidth,
    };
  }

  function hasAnchor() {
    return (
      component.rootNode.parentElement &&
      component.rootNode.parentElement.classList.contains('mdc-menu-anchor')
    );
  }

  function getAnchorDimensions() {
    return component.rootNode.parentElement.getBoundingClientRect();
  }

  function getWindowDimensions() {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }

  function setScale(x, y) {
    // eslint-disable-next-line
    component.rootNode.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
  }

  function setInnerScale(x, y) {
    // eslint-disable-next-line
    component.listNode.style[getTransformPropertyName(window)] = `scale(${x}, ${y})`;
  }

  function getNumberOfItems() {
    return component.props.options.length;
  }

  function registerInteractionHandler(type, handler) {
    return component.rootNode.addEventListener(type, handler);
  }

  function deregisterInteractionHandler(type, handler) {
    return component.rootNode.removeEventListener(type, handler);
  }

  function registerDocumentClickHandler(handler) {
    return document.addEventListener('click', handler);
  }

  function deregisterDocumentClickHandler(handler) {
    return document.removeEventListener('click', handler);
  }

  function getYParamsForItemAtIndex(index) {
    const { offsetTop: top, offsetHeight: height } = component.optionNodes[index];

    return { top, height };
  }

  function setTransitionDelayForItemAtIndex(index, value) {
    component.optionNodes[index].style.setProperty('transition-delay', value);
  }

  function getIndexForEventTarget(target) {
    return component.optionNodes.indexOf(target);
  }

  function notifySelected(detail) {
    const event = new CustomEvent('MDCSimpleMenu:selected', { detail });
    component.rootNode.dispatchEvent(event);
  }

  function notifyCancel() {
    const event = new CustomEvent('MDCSimpleMenu:cancel');
    component.rootNode.dispatchEvent(event);

    // This is a little hackish, but we're going to call our onCancel func too
    if (component.props.onCancel) {
      component.props.onCancel();
    }
  }

  function saveFocus() {
    // eslint-disable-next-line
    component.previousFocus = document.activeElement;
  }

  function restoreFocus() {
    if (component.previousFocus) {
      component.previousFocus.focus();
    }
  }

  function isFocused() {
    return document.activeElement === component.rootNode;
  }

  function focus() {
    component.rootNode.focus();
  }

  function getFocusedItemIndex() {
    return component.optionNodes.indexOf(document.activeElement);
  }

  function focusItemAtIndex(index) {
    return component.optionNodes[index].focus();
  }

  function isRtl() {
    return getComputedStyle(component.rootNode).getPropertyValue('direction') === 'rtl';
  }

  function setTransformOrigin(origin) {
    // eslint-disable-next-line
    component.rootNode.style[`${getTransformPropertyName(window)}-origin`] = origin;
  }

  function setPosition(position) {
    /* eslint-disable */
    component.rootNode.style.left = 'left' in position ? position.left : null;
    component.rootNode.style.right = 'right' in position ? position.right : null;
    component.rootNode.style.top = 'top' in position ? position.top : null;
    component.rootNode.style.bottom = 'bottom' in position ? position.bottom : null;
    /* eslint-enable */
  }

  function getAccurateTime() {
    return window.performance.now();
  }

  return {
    addClass,
    removeClass,
    hasClass,
    hasNecessaryDom,
    getInnerDimensions,
    hasAnchor,
    getAnchorDimensions,
    getWindowDimensions,
    setScale,
    setInnerScale,
    getNumberOfItems,
    registerInteractionHandler,
    deregisterInteractionHandler,
    registerDocumentClickHandler,
    deregisterDocumentClickHandler,
    getYParamsForItemAtIndex,
    setTransitionDelayForItemAtIndex,
    getIndexForEventTarget,
    notifySelected,
    notifyCancel,
    saveFocus,
    restoreFocus,
    isFocused,
    focus,
    getFocusedItemIndex,
    focusItemAtIndex,
    isRtl,
    setTransformOrigin,
    setPosition,
    getAccurateTime,
  };
}

export default simpleMenuAdapter;

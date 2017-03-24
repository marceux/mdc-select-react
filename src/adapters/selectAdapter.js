/**
 * Adapter-generating function.
 *
 * Many of the methods reference properties and methods that need to be set by
 * the react component associated with the generated adapter.
 *
 * Read here for documentation: https://github.com/material-components/material-components-web/tree/master/packages/mdc-select
 *
 * @name selectAdapter
 * @param {PureComponent} component React Component
 * @returns {Object} MDC Adapter
 */
function selectAdapter(component) {
  function addClass(className) {
    component.rootNode.classList.add(className);
  }

  function removeClass(className) {
    component.rootNode.classList.remove(className);
  }

  function setAttr(attr, value) {
    component.rootNode.setAttribute(attr, value);
  }

  function rmAttr(attr) {
    component.rootNode.removeAttribute(attr);
  }

  function computeBoundingRect() {
    return component.rootNode.getBoundingClientRect();
  }

  function registerInteractionHandler(type, handler) {
    component.rootNode.addEventListener(type, handler);
  }

  function deregisterInteractionHandler(type, handler) {
    component.rootNode.removeEventListener(type, handler);
  }

  function focus() {
    component.rootNode.focus();
  }

  function makeTabbable() {
    component.setState({ tabbable: true });
  }

  function makeUntabbable() {
    component.setState({ tabbable: false });
  }

  function getComputedStyleValue(propertyName) {
    return window.getComputedStyle(component.rootNode)[propertyName];
  }

  function setStyle(propertyName, value) {
    component.rootNode.style.setProperty(propertyName, value);
  }

  function create2dRenderingContext() {
    return document.createElement('canvas').getContext('2d');
  }

  function setMenuElStyle(propertyName, value) {
    component.menuNode.style.setProperty(propertyName, value);
  }

  function setMenuElAttr(attr, value) {
    component.menuNode.setAttribute(attr, value);
  }

  function rmMenuElAttr(attr) {
    component.menuNode.removeAttribute(attr);
  }

  function getMenuElOffsetHeight() {
    return component.menuNode.offsetHeight;
  }

  function getOffsetTopForOptionAtIndex(index) {
    return component.optionNodes[index].offsetTop;
  }

  function openMenu(focusIndex) {
    component.setState({
      focusIndex,
      open: true,
    });
  }

  function isMenuOpen() {
    return component.state.open;
  }

  function setSelectedTextContent(selectedText) {
    // We need to get the value from the option by its label ("selectedText")
    const { value } = find(component.props.options, ['label', selectedText]);

    component.setState({ open: false, selectedText, value });
  }

  function getNumberOfOptions() {
    return component.props.options.length;
  }

  function getTextForOptionAtIndex(index) {
    return component.props.options[index].label;
  }

  function getValueForOptionAtIndex(index) {
    return component.props.options[index].value;
  }

  function setAttrForOptionAtIndex(index, attr, value) {
    component.optionNodes[index].setAttribute(attr, value);
  }

  function rmAttrForOptionAtIndex(index, attr) {
    component.optionNodes[index].removeAttribute(attr);
  }

  function registerMenuInteractionHandler(type, handler) {
    component.menuNode.addEventListener(type, handler);
  }

  function deregisterMenuInteractionHandler(type, handler) {
    component.menuNode.removeEventListener(type, handler);
  }

  function notifyChange() {}

  function getWindowInnerHeight() {
    return window.innerHeight;
  }

  return {
    addClass,
    removeClass,
    setAttr,
    rmAttr,
    computeBoundingRect,
    registerInteractionHandler,
    deregisterInteractionHandler,
    focus,
    makeTabbable,
    makeUntabbable,
    getComputedStyleValue,
    setStyle,
    create2dRenderingContext,
    setMenuElStyle,
    setMenuElAttr,
    rmMenuElAttr,
    getMenuElOffsetHeight,
    getOffsetTopForOptionAtIndex,
    openMenu,
    isMenuOpen,
    setSelectedTextContent,
    getNumberOfOptions,
    getTextForOptionAtIndex,
    getValueForOptionAtIndex,
    setAttrForOptionAtIndex,
    rmAttrForOptionAtIndex,
    registerMenuInteractionHandler,
    deregisterMenuInteractionHandler,
    notifyChange,
    getWindowInnerHeight,
  };
}

export default selectAdapter;

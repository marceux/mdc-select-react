/**
 * Adapter-generating function.
 *
 * Many of the methods reference properties and methods that need to be set by
 * the react component associated with the generated adapter.
 *
 * Read here for documentation: https://github.com/material-components/material-components-web/tree/master/packages/mdc-select
 *
 * @name datalistAdapter
 * @param {PureComponent} component React Component
 * @returns {Object} MDC Adapter
 */
function datalistAdapter(component) {
  function addClass(className) {
    component.rootNode.classList.add(className);
  }

  function removeClass(className) {
    component.rootNode.classList.remove(className);
  }

  function hasClass(className) {
    return component.rootNode.classList.contains(className);
  }

  function registerInputEventHandler(type, handler) {
    return component.rootNode.addEventListener(type, handler);
  }

  function deregisterInputEventHandler(type, handler) {
    return component.rootNode.removeEventListener(type, handler);
  }

  function registerBtnEventHandler(type, handler) {
    return component.rootNode.addEventListener(type, handler);
  }

  function deregisterBtnEventHandler(type, handler) {
    return component.rootNode.removeEventListener(type, handler);
  }

  function registerInteractionEventHandler(type, handler) {
    return component.rootNode.addEventListener(type, handler);
  }

  function deregisterInteractionEventHandler(type, handler) {
    return component.rootNode.removeEventListener(type, handler);
  }

  function registerDocumentEventHandler(type, handler) {
    return component.rootNode.addEventListener(type, handler);
  }

  function deregisterDocumentEventHandler(type, handler) {
    return component.rootNode.removeEventListener(type, handler);
  }

  function isInputFocused() {
    return document.activeElement === component.rootNode;
  }

  function matchExists() {}

  function focusOnElementAtIndex(index) {
    return component.optionNodes[index].focus();
  }

  function getIndexForEventTarget(target) {
    return component.optionNodes.indexOf(target);
  }

  function getNumberOfItems() {
    return;
  }

  function selectItemAtIndex() {}

  function notifyCancel() {
    const event = new CustomEvent('MDCSimpleMenu:cancel');
    component.rootNode.dispatchEvent(event);

    // This is a little hackish, but we're going to call our onCancel func too
    if (component.props.onCancel) {
      component.props.onCancel();
    }
  }

  return {
    addClass,
    removeClass,
    hasClass,
    registerInputEventHandler,
    deregisterInputEventHandler,
    registerBtnEventHandler,
    deregisterBtnEventHandler,
    registerInteractionEventHandler,
    deregisterInteractionEventHandler,
    registerDocumentEventHandler,
    deregisterDocumentEventHandler,
    isInputFocused,
    matchExists,
    focusOnElementAtIndex,
    getIndexForEventTarget,
    getNumberOfItems,
    selectItemAtIndex,
    notifyCancel,
  };
}

export default datalistAdapter;

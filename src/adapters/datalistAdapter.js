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

  function registerInteractionEventHandler(type, handler) {
    return component.listNode.addEventListener(type, handler);
  }

  function deregisterInteractionEventHandler(type, handler) {
    return component.listNode.removeEventListener(type, handler);
  }

  function registerDocumentClickHandler(handler) {
    return document.addEventListener('click', handler);
  }

  function deregisterDocumentClickHandler(handler) {
    return document.removeEventListener('click', handler);
  }

  function storeFocus() {
    // eslint-disable-next-line
    component.previousFocus = document.activeElement;
  }

  function restoreFocus() {
    component.previousFocus.focus();
  }

  function focusOnElementAtIndex(index) {
    component.optionNodes[index].focus();
  }

  function getIndexForEventTarget(target) {
    return component.optionNodes.indexOf(target);
  }

  function getNumberOfItems() {
    return component.optionNodes.length;
  }

  function selectItemAtIndex(index) {
    return component.props.onSelect(index);
  }

  function notifyCancel() {
    return component.props.onCancel();
  }

  return {
    addClass,
    removeClass,
    registerInteractionEventHandler,
    deregisterInteractionEventHandler,
    registerDocumentClickHandler,
    deregisterDocumentClickHandler,
    storeFocus,
    restoreFocus,
    focusOnElementAtIndex,
    getIndexForEventTarget,
    getNumberOfItems,
    selectItemAtIndex,
    notifyCancel,
  };
}

export default datalistAdapter;

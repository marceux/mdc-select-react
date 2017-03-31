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

  function registerInputEventHandler(type, handler) {
    return component.inputNode.addEventListener(type, handler);
  }

  function deregisterInputEventHandler(type, handler) {
    return component.inputNode.removeEventListener(type, handler);
  }

  function registerBtnClickHandler(handler) {
    return component.btnNode.addEventListener('click', handler);
  }

  function deregisterBtnClickHandler(handler) {
    return component.btnNode.removeEventListener('click', handler);
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

  function focusOnInput() {
    component.inputNode.focus();
  }

  function isInputFocused() {
    return document.activeElement === component.inputNode;
  }

  function matchExists(originalValue) {
    // We are going to lowercase our value for easier comparisons
    const value = originalValue.toLowerCase();

    for (let i = 0; i < component.props.options.length; i++) {
      // Get a lowercase version of the current option text
      const text = component.props.options[i].text.toLowerCase();

      if (text.indexOf(value) !== -1) {
        return true;
      }
    }

    return false;
  }

  function focusOnElementAtIndex(index) {
    return component.optionNodes[index].focus();
  }

  function getIndexForEventTarget(target) {
    return component.optionNodes.indexOf(target);
  }

  function getNumberOfItems() {
    return component.optionNodes.length;
  }

  function selectItemAtIndex(index) {
    const text = component.optionObjects[index].text;

    component.setState({ value: text }, () => {
      // eslint-disable-next-line
      component.inputNode.value = text;
    });
  }

  function notifyCancel() {}

  return {
    addClass,
    removeClass,
    registerInputEventHandler,
    deregisterInputEventHandler,
    registerBtnClickHandler,
    deregisterBtnClickHandler,
    registerInteractionEventHandler,
    deregisterInteractionEventHandler,
    registerDocumentClickHandler,
    deregisterDocumentClickHandler,
    focusOnInput,
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

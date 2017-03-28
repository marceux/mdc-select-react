/**
 * Adapter-generating function.
 *
 * Many of the methods reference properties and methods that need to be set by
 * the react component associated with the generated adapter.
 *
 * Read here for documentation: https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield
 *
 * @name textfieldAdapter
 * @param {PureComponent} component React Component
 * @returns {Object} MDC Adapter
 */
function textfieldAdapter(component) {
  function addClass(className) {
    component.rootNode.classList.add(className);
  }

  function removeClass(className) {
    component.rootNode.classList.remove(className);
  }

  function addClassToLabel(className) {
    component.labelNode.classList.add(className);
  }

  function removeClassFromLabel(className) {
    component.labelNode.classList.remove(className);
  }

  function addClassToHelptext(className) {
    component.setState(prevState => ({
      helpClasses: prevState.helpClasses.add(className),
    }));
  }

  function removeClassFromHelptext(className) {
    component.setState(prevState => ({
      helpClasses: prevState.helpClasses.remove(className),
    }));
  }

  function helptextHasClass(className) {
    return component.state.helpClasses.has(className);
  }

  function setHelptextAttr(attr, value) {
    if (component.helpNode) {
      component.helpNode.setAttribute(attr, value);
    }
  }

  function removeHelptextAttr(attr) {
    if (component.helpNode) {
      component.helpNode.removeAttribute(attr);
    }
  }

  function registerInputFocusHandler(handler) {
    component.inputNode.addEventListener('focus', handler);
  }

  function deregisterInputFocusHandler(handler) {
    component.inputNode.removeEventListener('focus', handler);
  }

  function registerInputBlurHandler(handler) {
    component.inputNode.addEventListener('blur', handler);
  }

  function deregisterInputBlurHandler(handler) {
    component.inputNode.removeEventListener('blur', handler);
  }

  function registerInputInputHandler(handler) {
    component.inputNode.addEventListener('input', handler);
  }

  function deregisterInputInputHandler(handler) {
    component.inputNode.removeEventListener('input', handler);
  }

  function registerInputKeydownHandler(handler) {
    component.inputNode.addEventListener('keydown', handler);
  }

  function deregisterInputKeydownHandler(handler) {
    component.inputNode.removeEventListener('keydown', handler);
  }

  function getNativeInput() {
    return {
      value: component.inputNode.value,
      disabled: component.inputNode.disabled,
      checkValidity: () => Boolean(component.state.valid),
    };
  }

  return {
    addClass,
    removeClass,
    addClassToLabel,
    removeClassFromLabel,
    addClassToHelptext,
    removeClassFromHelptext,
    helptextHasClass,
    setHelptextAttr,
    removeHelptextAttr,
    registerInputFocusHandler,
    deregisterInputFocusHandler,
    registerInputBlurHandler,
    deregisterInputBlurHandler,
    registerInputInputHandler,
    deregisterInputInputHandler,
    registerInputKeydownHandler,
    deregisterInputKeydownHandler,
    getNativeInput,
  };
}

export default textfieldAdapter;

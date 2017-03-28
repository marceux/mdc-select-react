import simpleMenuAdapter from './simpleMenuAdapter';

/**
 * Adapter-generating function.
 *
 * Extends the simpleMenuAdapter, overrides some methods, and adds new ones
 * for addonMenuFoundation to use
 *
 * @name addonMenuAdapter
 * @param {PureComponent} component React Component
 * @returns {Object} MDC Adapter
 */
function addonMenuAdapter(component) {
  function notifySelected(detail) {
    const event = new CustomEvent('MDCSimpleMenu:selected', { bubbles: true, detail });
    component.rootNode.dispatchEvent(event);
  }

  function notifyCancel() {
    const event = new CustomEvent('MDCSimpleMenu:cancel', { bubbles: true });
    component.rootNode.dispatchEvent(event);

    // This is a little hackish, but we're going to call our onCancel func too
    if (component.props.onCancel) {
      component.props.onCancel();
    }
  }

  function getExtendedElement() {
    return component.props.extendedElement();
  }

  return Object.assign({}, simpleMenuAdapter(component), {
    notifySelected,
    notifyCancel,
    getExtendedElement,
  });
}

export default addonMenuAdapter;

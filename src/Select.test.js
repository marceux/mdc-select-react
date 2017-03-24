import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Select from './Select';

describe('<Select />', () => {
  let component;
  let infoStub;
  let instance;
  let onBlur;
  let onChange;
  let onFocus;
  let options;
  let props;
  let stub;
  let stub2;

  beforeAll(() => {
    // Hack because the console.info for sinon is STUPID
    infoStub = sinon.stub(console, 'info', () => {});

    // We have to stub the 2d rendering context call because it uses `document` global
    stub = sinon.stub(Select.prototype, 'create2dRenderingContext', () => ({
      font: '',
      measureText: () => ({width: 0}),
    }));

    stub2 = sinon.stub(Select.prototype, 'openMenu', () => ({}));
  });

  beforeEach(() => {
    options = [
      { id: 'apple', label: 'Apple', value: 'apple' },
      { id: 'orange', label: 'Orange', value: 'orange' },
      { id: 'strawberry', label: 'Strawberry', value: 'strawberry' },
      { id: 'grape', label: 'Grape', value: 'grape' },
    ];

    onBlur = sinon.spy();

    onChange = sinon.spy();

    onFocus = sinon.spy();

    props = {
      onBlur,
      onChange,
      onFocus,
      options,
    };

    component = mount(<Select {...props} />);

    // Get the latest instance found in the component
    instance = component.instance();
  });

  afterAll(() => {
    // Restore the stub after all the tests are done
    stub.restore();
    stub2.restore();

    infoStub.restore();
  });

  it('allows for default selected text via props', () => {
    // This is the default text
    expect(component).toHaveState('selectedText', 'Select...');

    // Create new component with placeholder text
    component = mount(<Select options={options} placeholder={'Select a Fruit'} />);

    expect(component).toHaveState('selectedText', 'Select a Fruit');
  });

  it('has the appropriate refs', () => {
    expect(instance.rootNode).toBeDefined();
    expect(instance.menuNode).toBeDefined();
  });

  describe('- MDCSelectFoundation', () => {
    let foundation;
    let rootComponent;
    let rootNode;

    beforeEach(() => {
      // Get the root component
      rootComponent = component.find('.mdc-select');

      // Get the dom node for the root component
      rootNode = instance.rootNode;

      foundation = instance.foundation;
    });

    it('has an adapter whose properties are methods belonging to the component', () => {
      const adapter = foundation.adapter_;

      const adapterMethods = [
        'addClass', 'removeClass', 'setAttr', 'rmAttr', 'computeBoundingRect',
        'registerInteractionHandler', 'deregisterInteractionHandler', 'focus', 'makeTabbable', 'makeUntabbable',
        'getComputedStyleValue', 'setStyle', 'create2dRenderingContext', 'setMenuElStyle', 'setMenuElAttr',
        'rmMenuElAttr', 'getMenuElOffsetHeight', 'getOffsetTopForOptionAtIndex', 'openMenu', 'isMenuOpen',
        'setSelectedTextContent', 'getNumberOfOptions', 'getTextForOptionAtIndex',
        'getValueForOptionAtIndex', 'setAttrForOptionAtIndex', 'rmAttrForOptionAtIndex',
        'registerMenuInteractionHandler', 'deregisterMenuInteractionHandler', 'getWindowInnerHeight',
      ];

      adapterMethods.forEach(method => expect(instance[method]).toEqual(adapter[method]));
    });

    it('opens and closes the component', () => {
      // Open the select
      foundation.open_();

      expect(rootComponent).toHaveClassName('.mdc-select--open');

      // We are going to spy on the focus method
      const spy = sinon.spy(rootNode, 'focus');

      // Close the select
      foundation.close_();

      expect(rootComponent).not.toHaveClassName('.mdc-select--open');
      expect(spy.called).toEqual(true);

      spy.restore();
    });

    it('sets/unsets a disabled state', () => {
      foundation.setDisabled(true);

      expect(rootComponent).toHaveClassName('.mdc-select--disabled');
      expect(rootNode.getAttribute('tab-index', '-1'));
      expect(rootNode.getAttribute('aria-disabled')).toEqual('true');

      foundation.setDisabled(false);

      expect(rootComponent).not.toHaveClassName('.mdc-select--disabled');
      expect(rootNode.getAttribute('tab-index', '0'));
      expect(rootNode.getAttribute('aria-disabled')).toEqual(null);
    });

    it('selects an option by index', () => {
      // Default, we are going to start at -1
      expect(foundation.selectedIndex_).toEqual(-1);

      // We are going to iterate over all the items and check the values
      options.forEach((option, index) => {
        // We are going to choose the first index
        // We are adding '1' because the system automatically adds a default option
        foundation.setSelectedIndex(index);

        // get the DOMNode for the option at index 0, and check aria-selected
        const optionNode = instance.optionNodes[index];
        expect(optionNode.getAttribute('aria-selected')).toEqual('true');

        // Test to see that the selected index changed, and so did label to current option
        expect(foundation.selectedIndex_).toEqual(index);
        expect(component).toHaveState('selectedText', option.label);
      });
    });

    it('gets the value of the current selected index', () => {
      // We are going to choose the first index
      foundation.setSelectedIndex(-1);

      expect(foundation.getValue()).toEqual('');

      foundation.setSelectedIndex(0);

      expect(foundation.getValue()).toEqual('apple');
    });
  });
});

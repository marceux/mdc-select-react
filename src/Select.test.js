import React from 'react';
import { mount } from 'enzyme';
import Select from './Select';

describe('<Select />', () => {
  let component;
  let instance;

  beforeAll(() => {
    component = mount(<Select />);

    instance = component.instance();
  });

  it('has methods that correspond to the MDCSelectFoundation adapter', () => {
    const adapterMethods = [
      'addClass', 'removeClass', 'setAttr', 'rmAttr', 'computeBoundingRect',
      'registerInteractionHandler', 'deregisterInteractionHandler', 'focus', 'makeTabbable', 'makeUntabbable',
      'getComputedStyleValue', 'setStyle', 'create2dRenderingContext', 'setMenuElStyle', 'setMenuElAttr',
      'rmMenuElAttr', 'getMenuElOffsetHeight', 'getOffsetTopForOptionAtIndex', 'openMenu', 'isMenuOpen',
      'setSelectedTextContent', 'getNumberOfOptions', 'getTextForOptionAtIndex',
      'getValueForOptionAtIndex', 'setAttrForOptionAtIndex', 'rmAttrForOptionAtIndex',
      'registerMenuInteractionHandler', 'deregisterMenuInteractionHandler', 'getWindowInnerHeight',
    ];

    adapterMethods.forEach(method => {
      expect(instance[method]).not.toBeUndefined();
    });
  });

  it('has a reference to the root element', () => {
    expect(component).toHaveRef('root');
  });

  it('can add/remove classes to/from the root element', () => {
    instance.addClass('testing');
    expect(component.ref('root')).toHaveClassName('testing');

    instance.removeClass('testing');
    expect(component.ref('root')).not.toHaveClassName('testing');
  });

  it('can set/remove attributes and their values from the root element', () => {
    const DOMNode = component.ref('root').getDOMNode();

    instance.setAttr('width', '1px');
    expect(DOMNode.getAttribute('width')).toEqual('1px');

    instance.rmAttr('width');
    expect(DOMNode.getAttribute('width')).toEqual(null);
  });

  describe('- computeBoundingRect', () => {
    it('calls getBoundingClientRect() on root element to get bounding rect', () => {
      // Call the method we're testing and look at the output
      expect(instance.computeBoundingRect()).toMatchObject({
        left: 0,
        top: 0,
      });
    });
  });

  describe('- makeTabbable', () => {
    it('renders the root element with a tab-index of 0', () => {
      // the state starts with a tab-index of -1
      expect(component.find('.mdc-select')).toHaveProp('tabIndex', '-1');

      instance.makeTabbable();
      expect(component.find('.mdc-select')).toHaveProp('tabIndex', '0');
    });
  });

  describe('- makeUntabbable', () => {
    it('renders the root element with a tab-index of 0', () => {
      // the state starts with a tab-index of 0 from previous test
      expect(component.find('.mdc-select')).toHaveProp('tabIndex', '0');

      instance.makeUntabbable();
      expect(component.find('.mdc-select')).toHaveProp('tabIndex', '-1');
    });
  });

  describe('- getComputedStyleValue', () => {
    it('gets the root elements computed style value of the given propertyName', () => {
      const DOMNode = component.ref('root').getDOMNode();

      // Manually set the style property value
      DOMNode.style.setProperty('width', '100px');

      expect(instance.getComputedStyleValue('width')).toEqual('100px');
    });
  });

  describe('- setStyle', () => {
    it('sets the css property, propertyName, to a value on the root element', () => {
      instance.setStyle('width', '200px');

      // This relies on using the previous method to get the actual property
      expect(instance.getComputedStyleValue('width')).toEqual('200px');
    });
  });

  describe('- setMenuElStyle', () => {
    it('sets the css property, propertyName, to a value on the menu element', () => {
      instance.setMenuElStyle('width', '300px');

      const DOMNode = component.ref('menu').getDOMNode();

      expect(DOMNode.style.width).toEqual('300px');
    });
  });

  describe('- setMenuElAttr', () => {
    it('sets an attribute with value on the menu element', () => {
      instance.setMenuElAttr('height', '300px');

      const DOMNode = component.ref('menu').getDOMNode();

      expect(DOMNode.getAttribute('height')).toEqual('300px');
    });
  });

  describe('- rmMenuElAttr', () => {
    it('removes an attribute from the menu element', () => {
      instance.rmMenuElAttr('height');

      const DOMNode = component.ref('menu').getDOMNode();

      expect(DOMNode.getAttribute('height')).toEqual(null);
    });
  });
});

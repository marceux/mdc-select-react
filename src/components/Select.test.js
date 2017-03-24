import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Select from './Select';

describe('<Select />', () => {
  let component;
  let instance;
  let onBlur;
  let onChange;
  let onFocus;
  let options;
  let props;

  // Stubs
  let getContextStub;

  beforeAll(() => {
    // We need to stub the canvas element and return the object
    // expected by the foundation
    getContextStub = sinon.stub(HTMLCanvasElement.prototype, 'getContext');

    getContextStub.returns({
      font: '',
      measureText: () => ({ width: 0 }),
    });
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
    getContextStub.restore();
  });

  it('allows for default selected text via props', () => {
    // This is the default text
    expect(component).toHaveState('selectedText', 'Select...');

    // Create new component with placeholder text
    component = mount(<Select options={options} placeholder={'Select a Fruit'} />);

    expect(component).toHaveState('selectedText', 'Select a Fruit');
  });

  it('sets the appropriate refs after render', () => {
    expect(instance.rootNode).toBeDefined();
    expect(instance.menuNode).toBeDefined();
    expect(instance.optionNodes).toBeDefined();
  });

  it('closes the menu when the menu node receives a cancel event', () => {
    const { rootNode } = instance;

    // Create and dispatch a cancel event
    const closeEvent = new CustomEvent('MDCSimpleMenu:cancel');
    rootNode.dispatchEvent(closeEvent);

    expect(component).toHaveState('open', false);
  });

  it('calls the onBlur handler on blur events and when it is closed', () => {
    // We start off with 0 onBlur calls
    expect(onBlur.called).toEqual(false);

    // Set state to open, then dispatch blur
    component.setState({ open: true });
    component.find('.mdc-select').simulate('blur');
    expect(onBlur.called).toEqual(false);

    // Set state to close, then dispatch blur
    component.setState({ open: false });
    component.find('.mdc-select').simulate('blur');
    expect(onBlur.called).toEqual(true);
  });

  it('calls the onChange handler only if the `value` state changes', () => {
    expect(onChange.called).toEqual(false);

    component.setState({ value: 'banana' });

    expect(onChange.called).toEqual(true);
  });

  it('calls the onFocus handler on focus events and when it is closed', () => {
    // We start off with 0 onFocus calls
    expect(onFocus.called).toEqual(false);

    // Set state to open, then dispatch blur
    component.setState({ open: true });
    component.find('.mdc-select').simulate('focus');
    expect(onFocus.called).toEqual(false);

    // Set state to close, then dispatch blur
    component.setState({ open: false });
    component.find('.mdc-select').simulate('focus');
    expect(onFocus.called).toEqual(true);
  });

  it('is disabled when a disabled prop is passed', () => {
    // New props, component, instance
    props.disabled = true;
    component = mount(<Select {...props} />);
    instance = component.instance();

    expect(instance.foundation.isDisabled()).toEqual(true);

    component.setProps({ disabled: false });
    expect(instance.foundation.isDisabled()).toEqual(false);

    component.setProps({ disabled: true });
    expect(instance.foundation.isDisabled()).toEqual(true);
  });

  it('uses the default text or placeholder if value and label not provided', () => {
    // Added empty option to the beginning
    options = [
      { id: '', label: '', value: '' },
      ...options,
    ];

    props.options = options;
    props.placeholder = undefined;

    component = mount(<Select {...props} />);
    const foundation = component.instance().foundation;

    // Set the selected index to the second option
    foundation.setSelectedIndex(1);

    // Expect the value to change
    expect(component).toHaveState('value', 'apple');
    expect(component).toHaveState('selectedText', 'Apple');

    // Now, select our default bullshit option
    foundation.setSelectedIndex(0);

    // Expect the value to change
    expect(component).toHaveState('value', undefined);
    expect(component).toHaveState('selectedText', 'Select...');

    component.setProps({ placeholder: 'Testing' });

    expect(component).toHaveState('selectedText', 'Testing');

    // Trigger the selection again
    foundation.setSelectedIndex(1);
    foundation.setSelectedIndex(0);

    expect(component).toHaveState('selectedText', 'Testing');
  });
});

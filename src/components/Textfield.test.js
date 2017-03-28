import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Textfield from './Textfield';

describe('<Textfield />', () => {
  let component;
  let instance;
  let props;
  let checkValidity;
  let onBlur;
  let onChange;
  let onFocus;

  beforeEach(() => {
    checkValidity = sinon.stub();
    onBlur = sinon.spy();
    onChange = sinon.spy();
    onFocus = sinon.spy();

    props = {
      checkValidity,
      label: 'Label',
      onBlur,
      onChange,
      onFocus,
    };

    component = mount(<Textfield {...props} />);

    // Get the latest instance found in the component
    instance = component.instance();
  });

  it('sets the appropriate refs after render', () => {
    expect(instance.rootNode).toBeDefined();
    expect(instance.labelNode).toBeDefined();
    expect(instance.inputNode).toBeDefined();
  });

  it('renders the label with the correct label text', () => {
    expect(component.find('.mdc-textfield__label').text()).toEqual('Label');
  });

  it('passes the helpText state as props to sub-component', () => {
    // Set the helpText prop to 'Help'
    component.setProps({ helpMsg: 'Help' });
    expect(component.state('helpClasses').size).toEqual(1);
    expect(component.find('.mdc-textfield-helptext').prop('children')).toEqual('Help');

    // Add persistentHelp flag, should add to helpClasses size
    component.setProps({ persistentHelp: true });
    expect(component.state('helpClasses').size).toEqual(2);

    // Add default error message
    component.setProps({ errorMsg: 'Error' });
    expect(component.state('helpClasses').size).toEqual(3);
    expect(component.find('.mdc-textfield-helptext').prop('children')).toEqual('Help');

    // Set to invalid component, and error message should change
    component.setState({ valid: false });
    expect(component.find('.mdc-textfield-helptext').prop('children')).toEqual('Error');
  });

  it('updates valid state on component blur', () => {
    const input = component.find('.mdc-textfield__input');

    // We are going to force checkValidity to return false
    checkValidity.returns(false);

    input.simulate('blur');

    expect(component).toHaveState('valid', false);
    expect(onBlur.called).toEqual(true);
  });

  it('calls the correct event handlers for the correct events', () => {
    const input = component.find('.mdc-textfield__input');

    input.simulate('focus');
    expect(onFocus.called).toEqual(true);

    input.simulate('change', 'Hello');
    expect(onChange.called).toEqual(true);
  });

  it('gets disabled by props', () => {
    expect(component).toHaveState('disabled', false);
    component.setProps({ disabled: true });
    expect(component).toHaveState('disabled', true);
  });
});

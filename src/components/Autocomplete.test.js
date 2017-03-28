import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Autocomplete from './Autocomplete';

describe('<Autocomplete />', () => {
  let component;
  let instance;
  let onBlur;
  let onChange;
  let onFocus;
  let options;
  let props;

  beforeEach(() => {
    options = [
      { id: 'apple', text: 'Apple', value: 'apple' },
      { id: 'orange', text: 'Orange', value: 'orange' },
      { id: 'strawberry', text: 'Strawberry', value: 'strawberry' },
      { id: 'grape', text: 'Grape', value: 'grape' },
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

    component = mount(<Autocomplete {...props} />);

    // Get the latest instance found in the component
    instance = component.instance();
  });

  it('limits menu options by typing in textfield', () => {
    const menu = component.find('AddonMenu');
    const textfield = component.find('.mdc-textfield__input');

    expect(menu.prop('options').length).toEqual(4);

    textfield.simulate('change', { target: { value: 'ap' } });
    expect(menu.prop('options').length).toEqual(2);

    textfield.simulate('change', { target: { value: 'Gr' } });
    expect(menu.prop('options').length).toEqual(1);
  });
});

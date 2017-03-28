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

    component = mount(<Autocomplete {...props} />);

    // Get the latest instance found in the component
    instance = component.instance();
  });

  it('changes to a focused state on clicks', () => {
    component.find('.mdac-autocomplete').simulate('click');

    expect(component).toHaveState('focused', true);
  });
});

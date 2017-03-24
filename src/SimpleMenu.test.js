import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import SimpleMenu from './SimpleMenu';

describe('<SimpleMenu />', () => {
  let animationSpy;
  let component;
  let instance;
  let options;
  let props;

  beforeAll(() => {
    if (!global.window.requestAnimationFrame) {
      global.window.requestAnimationFrame = sinon.spy();
    } else {
      animationSpy = sinon.spy(global.window, 'requestAnimtionFrame');
    }

    // We are going to "spy" on requestAnimationFrame to avoid errors
    global['window']['requestAnimationFrame'] = sinon.spy();
  });

  beforeEach(() => {
    options = [
      { id: 'apple', label: 'Apple', value: 'apple' },
      { id: 'orange', label: 'Orange', value: 'orange' },
      { id: 'strawberry', label: 'Strawberry', value: 'strawberry' },
      { id: 'grape', label: 'Grape', value: 'grape' },
    ];

    props = {
      options,
      open: false,
      onSelect: sinon.spy(),
      onCancel: sinon.spy(),
    };

    component = mount(<SimpleMenu {...props} />);

    // Get the latest instance found in the component
    instance = component.instance();
  });

  afterAll(() => {
    if (animationSpy) {
      animationSpy.restore();
    }
  });

  it('accepts a collection to render its options', () => {
    // Find all of the option elements in the current component
    const optionEls = component.find('.mdc-list-item');

    // We want to have the same amount of options rendered that we passed
    expect(optionEls.length).toEqual(options.length);

    // With the children we created in the "beforeAll"
    options.forEach((option, index) => {
      // Add one to get current index to account for default
      const currentIndex = index;

      // Get a specific rendered option
      const optionEl = optionEls.at(currentIndex);

      // Expect inner text to match label
      expect(optionEl.text()).toEqual(option.label);
      expect(optionEl.prop('id')).toEqual(option.id);
    });
  });

  it('updates options when they change, not when they do not change', () => {
    let prevOptions = instance.optionNodes;

    // Only returning the first two options this time
    component.setProps({
      options: [
        options[0],
        options[1],
      ],
    });

    expect(component.find('.mdc-list-item').length).toEqual(2);
    expect(Object.keys(instance.optionNodes).length).toEqual(2);

    // Set options to old options
    component.setProps({
      options: options,
    });

    expect(component.find('.mdc-list-item').length).toEqual(4);
    expect(Object.keys(instance.optionNodes).length).toEqual(4);

    // Update our prevOptions
    prevOptions = instance.optionNodes;

    // Changing a prop that is NOT options
    component.setProps({
      selectedText: 'Changing',
    });

    expect(component.find('.mdc-list-item').length).toEqual(4);
    expect(Object.keys(instance.optionNodes).length).toEqual(4);
  });

  it('opens and closes with the foundation based on props', () => {
    // We expect our open prop to be false at first
    expect(component).toHaveProp('open', false);

    const openSpy = sinon.spy(instance.foundation, 'open');
    const closeSpy = sinon.spy(instance.foundation, 'close');

    // Open the Simple Menu
    component.setProps({ open: true });

    expect(openSpy.called).toEqual(true);

    // Close the Simple Menu
    component.setProps({ open: false });

    expect(closeSpy.called).toEqual(true);

    // Restore the spies!
    closeSpy.restore();
    openSpy.restore();
  });

  describe('- MDCSimpleMenuFoundation', () => {
    let foundation;

    beforeEach(() => {
      foundation = instance.foundation;
    });

    it('has an adapter whose properties are methods belonging to the component', () => {
      const adapter = foundation.adapter_;

      const adapterMethods = [
        'addClass', 'removeClass', 'hasClass', 'hasNecessaryDom',
        'getInnerDimensions', 'hasAnchor', 'getAnchorDimensions', 'getWindowDimensions',
        'setScale', 'setInnerScale', 'getNumberOfItems',
        'registerInteractionHandler', 'deregisterInteractionHandler',
        'registerDocumentClickHandler', 'deregisterDocumentClickHandler',
        'getYParamsForItemAtIndex', 'setTransitionDelayForItemAtIndex', 'getIndexForEventTarget',
        'notifySelected', 'notifyCancel', 'saveFocus', 'restoreFocus', 'isFocused', 'focus',
        'getFocusedItemIndex', 'focusItemAtIndex', 'isRtl',
        'setTransformOrigin', 'setPosition', 'getAccurateTime',
      ];

      adapterMethods.forEach(method => expect(instance[method]).toEqual(adapter[method]));
    });
  });
});

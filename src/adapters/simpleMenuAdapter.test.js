import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import simpleMenuAdapter from './simpleMenuAdapter';

describe('simpleMenuAdapter()', () => {
  it('has an adapter whose properties are methods belonging to the component', () => {
    const adapter = simpleMenuAdapter();

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

    adapterMethods.forEach(method => expect(adapter).toHaveProperty(method));
  });
});

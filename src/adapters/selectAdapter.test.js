import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import selectAdapter from './selectAdapter';

describe('selectAdapter()', () => {
  it('has all of the expected methods', () => {
    const adapter = selectAdapter();

    const adapterMethods = [
      'addClass', 'removeClass', 'setAttr', 'rmAttr', 'computeBoundingRect',
      'registerInteractionHandler', 'deregisterInteractionHandler',
      'focus', 'makeTabbable', 'makeUntabbable',
      'getComputedStyleValue', 'setStyle', 'create2dRenderingContext',
      'setMenuElStyle', 'setMenuElAttr', 'rmMenuElAttr',
      'getMenuElOffsetHeight', 'getOffsetTopForOptionAtIndex',
      'openMenu', 'isMenuOpen',
      'setSelectedTextContent', 'getNumberOfOptions', 'getTextForOptionAtIndex',
      'getValueForOptionAtIndex', 'setAttrForOptionAtIndex', 'rmAttrForOptionAtIndex',
      'registerMenuInteractionHandler', 'deregisterMenuInteractionHandler',
      'getWindowInnerHeight',
    ];

    adapterMethods.forEach(method => expect(adapter).toHaveProperty(method));
  });
});

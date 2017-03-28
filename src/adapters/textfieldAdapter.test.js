import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import textfieldAdapter from './textfieldAdapter';

describe('textfieldAdapter()', () => {
  it('has all of the expected methods', () => {
    const adapter = textfieldAdapter();

    const adapterMethods = [
      'addClass', 'removeClass',
      'addClassToLabel', 'removeClassFromLabel',
      'addClassToHelptext', 'removeClassFromHelptext', 'helptextHasClass',
      'setHelptextAttr', 'removeHelptextAttr',
      'registerInputFocusHandler', 'deregisterInputFocusHandler',
      'registerInputBlurHandler', 'deregisterInputBlurHandler',
      'registerInputInputHandler', 'deregisterInputInputHandler',
      'registerInputKeydownHandler', 'deregisterInputKeydownHandler',
      'getNativeInput',
    ];

    adapterMethods.forEach(method => expect(adapter).toHaveProperty(method));
  });
});

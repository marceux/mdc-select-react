import sinon from 'sinon';

import datalistAdapter from './datalistAdapter';

describe('datalistAdapter()', () => {
  it('returns an adapter with all of the correct methods', () => {
    const adapter = datalistAdapter();

    const adapterMethods = [
      'addClass', 'removeClass',
      'registerInputEventHandler', 'deregisterInputEventHandler',
      'registerBtnClickHandler', 'deregisterBtnClickHandler',
      'registerInteractionEventHandler', 'deregisterInteractionEventHandler',
      'registerDocumentClickHandler', 'deregisterDocumentClickHandler',
      'focusOnInput', 'isInputFocused',
      'matchExists', 'focusOnElementAtIndex',
      'getIndexForEventTarget', 'getNumberOfItems', 'selectItemAtIndex',
      'notifyCancel',
    ];

    adapterMethods.forEach(method => expect(adapter).toHaveProperty(method));
  });
});

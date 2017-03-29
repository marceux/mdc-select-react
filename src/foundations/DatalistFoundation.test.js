import sinon from 'sinon';

import DatalistFoundation from './DatalistFoundation';

describe('DatalistFoundation', () => {
  let adapter;
  let foundation;

  beforeAll(() => {
    adapter = {
      addClass: sinon.stub(),
      removeClass: sinon.stub(),
      hasClass: sinon.stub(),
      registerInputEventHandler: sinon.stub(),
      deregisterInputEventHandler: sinon.stub(),
      registerBtnEventHandler: sinon.stub(),
      deregisterBtnEventHandler: sinon.stub(),
      registerInteractionEventHandler: sinon.stub(),
      deregisterInteractionEventHandler: sinon.stub(),
      registerDocumentEventHandler: sinon.stub(),
      deregisterDocumentEventHandler: sinon.stub(),
      isInputFocused: sinon.stub(),
      matchExists: sinon.stub(),
      focusOnElementAtIndex: sinon.spy(),
      getIndexForEventTarget: sinon.stub(),
      getNumberOfItems: sinon.stub(),
      selectItemAtIndex: sinon.stub(),
      notifyCancel: sinon.stub(),
    }

    foundation = new DatalistFoundation(adapter);
  });

  it('has a default isOpen state of false', () => {
    expect(foundation.isOpen()).toEqual(false);
  });

  it('toggles between open and close', () => {
    foundation.open();
    expect(foundation.isOpen()).toEqual(true);

    foundation.close();
    expect(foundation.isOpen()).toEqual(false);

    foundation.toggle();
    expect(foundation.isOpen()).toEqual(true);

    foundation.toggle();
    expect(foundation.isOpen()).toEqual(false);
  });

  it('opens when the input is clicked and it is already focused', () => {
    adapter.isInputFocused.returns(false);
    foundation.inputClickHandler_();
    expect(foundation.isOpen()).toEqual(false);

    adapter.isInputFocused.returns(true);
    foundation.inputClickHandler_();
    expect(foundation.isOpen()).toEqual(true);
  });

  it('opens and closes if it detects input typing and checks matches', () => {
    adapter.matchExists.returns(true);
    foundation.inputKeydownHandler_({ key: 'Misc' });
    expect(foundation.isOpen()).toEqual(true);

    adapter.matchExists.returns(false);
    foundation.inputKeydownHandler_({ key: 'Misc' });
    expect(foundation.isOpen()).toEqual(false);
  });

  it('focuses on elements at indexes if arrow key pressed', () => {
    foundation.inputKeydownHandler_({ key: 'ArrowDown' });
    expect(adapter.focusOnElementAtIndex.calledWith(0)).toEqual(true);
    
    adapter.getNumberOfItems.returns(2);
    foundation.inputKeydownHandler_({ key: 'ArrowUp' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
  });
});

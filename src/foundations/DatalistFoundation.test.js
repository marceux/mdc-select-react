import sinon from 'sinon';

import DatalistFoundation from './DatalistFoundation';

describe('DatalistFoundation', () => {
  let adapter;
  let foundation;

  beforeAll(() => {
    adapter = {
      addClass: sinon.spy(),
      removeClass: sinon.spy(),
      registerInputEventHandler: sinon.spy(),
      deregisterInputEventHandler: sinon.spy(),
      registerBtnClickHandler: sinon.spy(),
      deregisterBtnClickHandler: sinon.spy(),
      registerInteractionEventHandler: sinon.spy(),
      deregisterInteractionEventHandler: sinon.spy(),
      registerDocumentClickHandler: sinon.spy(),
      deregisterDocumentClickHandler: sinon.spy(),
      focusOnInput: sinon.spy(),
      isInputFocused: sinon.stub(),
      matchExists: sinon.stub(),
      focusOnElementAtIndex: sinon.spy(),
      getIndexForEventTarget: sinon.stub(),
      getNumberOfItems: sinon.stub(),
      selectItemAtIndex: sinon.spy(),
      notifyCancel: sinon.spy(),
    };

    foundation = new DatalistFoundation(adapter);
  });

  it('registers/deregisters event handlers with init/destroy', () => {
    // Initialize our foundation
    foundation.init();
    // Destroy our foundation
    foundation.destroy();

    // We are going to use method names and the expect arguments they will be called
    // with to test and make sure that they all work
    let scenarios = [
      ['registerInputEventHandler', 'click', foundation.inputClickHandler_],
      ['registerInputEventHandler', 'keydown', foundation.inputKeyDownHandler_],
      ['registerInteractionEventHandler', 'click', foundation.itemClickHandler_],
      ['registerInteractionEventHandler', 'keydown', foundation.itemKeydownHandler_],
      ['registerInteractionEventHandler', 'keyup', foundation.itemKeyupHandler_],
      ['deregisterInputEventHandler', 'click', foundation.inputClickHandler_],
      ['deregisterInputEventHandler', 'keydown', foundation.inputKeyDownHandler_],
      ['deregisterInteractionEventHandler', 'click', foundation.itemClickHandler_],
      ['deregisterInteractionEventHandler', 'keydown', foundation.itemKeydownHandler_],
      ['deregisterInteractionEventHandler', 'keyup', foundation.itemKeyupHandler_],
    ];

    // All of the methods with two arguments will use this iterator
    scenarios.forEach(scenario => {
      const method = scenario[0];
      const arg1 = scenario[1];
      const arg2 = scenario[2];

      // Setting the func/stub found within the adapter object
      const func = adapter[method];

      expect(func.calledWith(arg1, arg2)).toEqual(true);
    });

    // Now we are going to iterate over all the methods that take one arg
    scenarios = [
      ['registerBtnClickHandler', foundation.toggle],
      ['deregisterBtnClickHandler', foundation.toggle],
      ['registerDocumentClickHandler', foundation.documentClickHandler_],
      ['deregisterDocumentClickHandler', foundation.documentClickHandler_],
    ];

    scenarios.forEach(scenario => {
      const method = scenario[0];
      const arg = scenario[1];

      // Setting the func/stub found within the adapter object
      const func = adapter[method];

      expect(func.calledWith(arg)).toEqual(true);
    });
  });

  it('has a default isOpen state of false', () => {
    expect(foundation.isOpen()).toEqual(false);
  });

  it('toggles between open and close', () => {
    foundation.open();
    expect(foundation.isOpen()).toEqual(true);
    expect(adapter.addClass.called).toEqual(true); // expect a class to be added

    foundation.close();
    expect(foundation.isOpen()).toEqual(false);
    expect(adapter.removeClass.called).toEqual(true); // expect a class to be removed
    expect(adapter.focusOnInput.called).toEqual(true); // focuses on input again

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

  it('focuses on items at indexes if arrow key pressed from input', () => {
    foundation.inputKeydownHandler_({ key: 'ArrowDown' });
    expect(adapter.focusOnElementAtIndex.calledWith(0)).toEqual(true);
    
    adapter.getNumberOfItems.returns(2);
    foundation.inputKeydownHandler_({ key: 'ArrowUp' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
  });

  it('selects item at an index when an item is clicked', () => {
    // We're going to open the foundation for starters
    foundation.open();

    // Next is to prepare our stub: it will return a null index
    // This means our adapter COULD NOT FIND an index for the element
    // that dispatched the click event
    // If it's a -1, none of the proceeding functions will be called
    adapter.getIndexForEventTarget.returns(-1);
    // fire our click handler with a null target
    foundation.itemClickHandler_({ target: null });
    // expect our adapter callback function to NOT be called
    expect(adapter.selectItemAtIndex.called).toEqual(false);
    // expect foundation to STILL remain open
    expect(foundation.isOpen()).toEqual(true);

    // We'll return the index of a hypothetical first item
    // This means our adapter DID FIND an index for the element
    // that dispatched the click event
    // The proceeding functions should be called
    adapter.getIndexForEventTarget.returns(0);
    // fire our click handler with a null target (really doesn't matter)
    foundation.itemClickHandler_({ target: null });
    // expect our adapter callback function to NOT be called
    expect(adapter.selectItemAtIndex.called).toEqual(true);
    // Now expect foundation to close
    expect(foundation.isOpen()).toEqual(false);
  });

  it('cycles through the list of items on keyboard presses', () => {
    // Reset our spy call count
    adapter.focusOnElementAtIndex.reset(); 

    // Expect failure for the alt/ctrl/meta keys
    foundation.itemKeydownHandler_({ altKey: true });
    expect(adapter.focusOnElementAtIndex.called).toEqual(false);
    foundation.itemKeydownHandler_({ ctrlKey: true });
    expect(adapter.focusOnElementAtIndex.called).toEqual(false);
    foundation.itemKeydownHandler_({ metaKey: true });
    expect(adapter.focusOnElementAtIndex.called).toEqual(false);

    // Now let's prepare our stubs...
    // The length will always be 3
    adapter.getNumberOfItems.returns(3);

    // For the next couple tests, our current index will always be 0
    adapter.getIndexForEventTarget.returns(0);

    // Now we'll test keyDown and keyUp
    foundation.itemKeydownHandler_({ key: 'ArrowDown' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
    foundation.itemKeydownHandler_({ key: 'ArrowUp' });
    expect(adapter.focusOnElementAtIndex.calledWith(2)).toEqual(true);

    // Next we'll conduct the next few tests with the LAST INDEX, 2
    adapter.getIndexForEventTarget.returns(2);

    // Now we'll test keyDown and keyUp
    foundation.itemKeydownHandler_({ key: 'ArrowDown' });
    expect(adapter.focusOnElementAtIndex.calledWith(0)).toEqual(true);
    foundation.itemKeydownHandler_({ key: 'ArrowUp' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
  });

  it('selects items at index if tab, enter, or space is pressed', () => {
    const keys = ['Tab', 'Enter', 'Space'];

    // We expect all of the keys to call selectItemAtIndex
    keys.forEach(key => {
      adapter.selectItemAtIndex.reset();

      // Pretend we pressed the esc button
      foundation.itemKeyupHandler_({ key });

      expect(adapter.selectItemAtIndex.called).toEqual(true);
    });
  });

  it('cancels out if esc pressed', () => {
    // Reset our spy
    adapter.notifyCancel.reset();

    // Pretend we pressed the esc button
    foundation.itemKeyupHandler_({ key: 'Escape' });

    expect(adapter.notifyCancel.called).toEqual(true);
  });

  it('closes the list on canceling out', () => {
    // reset our spy
    adapter.notifyCancel.reset();

    // Cancel our foundation
    foundation.cancel();

    expect(adapter.notifyCancel.called).toEqual(true);
    expect(foundation.isOpen()).toEqual(false);
  });

  it('cancels when the document is clicked', () => {
    // reset our stub 
    adapter.notifyCancel.reset();

    foundation.documentClickHandler_();

    expect(adapter.notifyCancel.called).toEqual(true);
  });
});

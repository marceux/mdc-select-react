import sinon from 'sinon';

import DatalistFoundation from './DatalistFoundation';

describe('DatalistFoundation', () => {
  let adapter;
  let foundation;

  beforeAll(() => {
    adapter = {
      addClass: sinon.spy(),
      removeClass: sinon.spy(),
      registerInteractionEventHandler: sinon.spy(),
      deregisterInteractionEventHandler: sinon.spy(),
      registerDocumentClickHandler: sinon.spy(),
      deregisterDocumentClickHandler: sinon.spy(),
      storeFocus: sinon.spy(),
      restoreFocus: sinon.spy(),
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
      ['registerInteractionEventHandler', 'click', foundation.itemClickHandler_],
      ['registerInteractionEventHandler', 'keydown', foundation.itemKeyDownHandler_],
      ['registerInteractionEventHandler', 'keyup', foundation.itemKeyUpHandler_],
      ['deregisterInteractionEventHandler', 'click', foundation.itemClickHandler_],
      ['deregisterInteractionEventHandler', 'keydown', foundation.itemKeyDownHandler_],
      ['deregisterInteractionEventHandler', 'keyup', foundation.itemKeyUpHandler_],
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
  });

  it('has a default isOpen state of false', () => {
    expect(foundation.isOpen_).toEqual(false);
  });

  it('toggles between open and close', () => {
    foundation.open();
    expect(foundation.isOpen_).toEqual(true);
    expect(adapter.addClass.called).toEqual(true); // expect a class to be added

    foundation.close();
    expect(foundation.isOpen_).toEqual(false);
    expect(adapter.removeClass.called).toEqual(true); // expect a class to be removed

    foundation.toggle();
    expect(foundation.isOpen_).toEqual(true);

    foundation.toggle();
    expect(foundation.isOpen_).toEqual(false);

    // With our store function called too
    foundation.open(true);
    expect(foundation.isOpen_).toEqual(true);
    expect(adapter.storeFocus.called).toEqual(true);

    // With our restore function called too
    foundation.close(true);
    expect(foundation.isOpen_).toEqual(false);
    expect(adapter.restoreFocus.called).toEqual(true);
  });

  it('focuses on specific indexes', () => {
    foundation.focusOnItemAtIndex(0);
    expect(adapter.focusOnElementAtIndex.calledWith(0)).toEqual(true);

    foundation.focusOnItemAtIndex(1);
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
  });

  it('does not cycle through focusing on items if certain keys are pressed', () => {
    // Reset our spy call count
    adapter.focusOnElementAtIndex.reset(); 

    // Expect failure for the alt/ctrl/meta keys
    expect(foundation.handleItemKeyDown_({ altKey: true })).toEqual(true);
    expect(adapter.focusOnElementAtIndex.called).toEqual(false);
    expect(foundation.handleItemKeyDown_({ ctrlKey: true })).toEqual(true);
    expect(adapter.focusOnElementAtIndex.called).toEqual(false);
    expect(foundation.handleItemKeyDown_({ metaKey: true })).toEqual(true);
    expect(adapter.focusOnElementAtIndex.called).toEqual(false);
  });

  it('closes if tab is pressed and first or last item is triggering event', () => {
    // Reset our spy call count and set the return to 0
    adapter.focusOnElementAtIndex.reset();
    adapter.restoreFocus.reset();
    adapter.notifyCancel.reset();
    adapter.getNumberOfItems.returns(3);

    // Open the component and expect it to be open
    foundation.open();
    expect(foundation.isOpen_).toEqual(true);

    // We are going to be located at the first index, then
    // we are going to press a tab + shift, then
    // we are going to close the component and restore focus
    adapter.getIndexForEventTarget.returns(0);
    foundation.handleItemKeyDown_({ key: 'Tab', shiftKey: true });
    expect(foundation.isOpen_).toEqual(false);

    // Open again, and change returned index to 2
    adapter.getIndexForEventTarget.returns(2);
    foundation.open();

    // We are going to handle the item key down without shift
    foundation.handleItemKeyDown_({ key: 'Tab' });
    expect(foundation.isOpen_).toEqual(false);

    // From both tests, we expect these functions to be called twice
    expect(adapter.restoreFocus.calledTwice).toEqual(true);
    expect(adapter.notifyCancel.calledTwice).toEqual(true);
  });

  it('cycles through the list of items on keyboard presses', () => {
    // Now let's prepare our stubs...
    adapter.focusOnElementAtIndex.reset();
    adapter.getNumberOfItems.returns(3); // length will always be 3

    // For the next couple tests, our current index will always be 0
    adapter.getIndexForEventTarget.returns(0);

    // Now we'll test ArrowDown, ArrowUp, Tab, Shift+Tab
    foundation.handleItemKeyDown_({ key: 'ArrowDown' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
    foundation.handleItemKeyDown_({ key: 'ArrowUp' });
    expect(adapter.focusOnElementAtIndex.calledWith(2)).toEqual(true);
    foundation.handleItemKeyDown_({ key: 'Tab' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);

    // Next we'll conduct the next few tests with the LAST INDEX, 2
    adapter.getIndexForEventTarget.returns(2);

    // Now we'll test keyDown and keyUp
    foundation.handleItemKeyDown_({ key: 'ArrowDown' });
    expect(adapter.focusOnElementAtIndex.calledWith(0)).toEqual(true);
    foundation.handleItemKeyDown_({ key: 'ArrowUp' });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
    foundation.handleItemKeyDown_({ key: 'Tab', shiftKey: true });
    expect(adapter.focusOnElementAtIndex.calledWith(1)).toEqual(true);
  });

  it('does nothing if keydown event does not use known keys', () => {
    // return 0 number of items
    adapter.getNumberOfItems.returns(0);
    expect(foundation.handleItemKeyDown_({ key: 'a' })).toEqual(true);

    // return 1 number of items
    adapter.getNumberOfItems.returns(1);
    expect(foundation.handleItemKeyDown_({ key: 'a' })).toEqual(true);

    // return 2 number of items
    adapter.getNumberOfItems.returns(2);
    expect(foundation.handleItemKeyDown_({ key: 'a' })).toEqual(true);
  });

  it('selects items at index if enter or space is pressed', () => {
    const keys = ['Enter', 'Space'];

    // We expect all of the keys to call selectItemAtIndex
    keys.forEach(key => {
      adapter.restoreFocus.reset();
      adapter.selectItemAtIndex.reset();

      // Pretend we pressed the esc button
      foundation.handleItemKeyUp_({ key });

      expect(adapter.restoreFocus.called).toEqual(true);
      expect(adapter.selectItemAtIndex.called).toEqual(true);
    });
  });

  it('cancels out if esc pressed', () => {
    // Reset our spies
    adapter.restoreFocus.reset();
    adapter.notifyCancel.reset();

    // Pretend we pressed the esc button
    foundation.handleItemKeyUp_({ key: 'Escape' });

    expect(adapter.notifyCancel.called).toEqual(true);
  });

  it('selects item at an index when an item is clicked', () => {
    // reset our spy
    adapter.selectItemAtIndex.reset();

    // We're going to open the foundation for starters
    foundation.open();

    // Next is to prepare our stub: it will return a null index
    // This means our adapter COULD NOT FIND an index for the element
    // that dispatched the click event
    // If it's a -1, none of the proceeding functions will be called
    adapter.getIndexForEventTarget.returns(-1);
    // fire our click handler with a null target
    foundation.handleItemClick_({ target: null });
    // expect our adapter callback function to NOT be called
    expect(adapter.selectItemAtIndex.called).toEqual(false);
    // expect foundation to STILL remain open
    expect(foundation.isOpen_).toEqual(true);

    // We'll return the index of a hypothetical first item
    // This means our adapter DID FIND an index for the element
    // that dispatched the click event
    // The proceeding functions should be called
    adapter.getIndexForEventTarget.returns(0);
    // fire our click handler with a null target (really doesn't matter)
    foundation.handleItemClick_({ target: null });
    // expect our adapter callback function to NOT be called
    expect(adapter.selectItemAtIndex.calledWith(0)).toEqual(true);
    // Now expect foundation to close
    expect(foundation.isOpen_).toEqual(false);
  });

  it('cancels when the document is clicked', () => {
    // reset our stub 
    adapter.notifyCancel.reset();

    foundation.handleDocumentClick_();

    expect(foundation.isOpen_).toEqual(false);
    expect(adapter.notifyCancel.called).toEqual(true);
  });
});
